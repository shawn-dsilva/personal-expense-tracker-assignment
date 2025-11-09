from copy import deepcopy
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from transactions.models import Category, Transaction
from transactions.serializers import CategorySerializer, TransactionSerializer
from .pagination import OnlyPageNumberPagination


# Create your views here.
class CreateTransactionView(APIView):
    def post(self, request, *args, **kwargs):

        user = request.user.id
        mutable_data = deepcopy(request.data)
        mutable_data["user"] = user

        serializer = TransactionSerializer(
            data=mutable_data,
            context={"request": request},
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class ListAllTransactionsView(APIView, OnlyPageNumberPagination):
    def get(self, request, *args, **kwargs):
        # TODO: ADD PAGINATION

        user = request.user.id
        transactions = Transaction.objects.filter(user=user).order_by("-date")

        if request.query_params.get("category"):
            category = request.query_params.get("category")
            transactions = transactions.filter(category_id=category)

        if request.query_params.get("date_from") and request.query_params.get(
            "date_to"
        ):
            date_from = request.query_params.get("date_from")
            date_to = request.query_params.get("date_to")
            transactions = transactions.filter(date__range=[date_from, date_to])

        if request.query_params.get("amount_min") and request.query_params.get(
            "amount_max"
        ):
            amount_min = request.query_params.get("amount_min")
            amount_max = request.query_params.get("amount_max")
            transactions = transactions.filter(amount__range=[amount_min, amount_max])

        paginator = OnlyPageNumberPagination()
        result_page = paginator.paginate_queryset(transactions, request)
        serializer = TransactionSerializer(
            result_page,
            many=True,
        )
        return paginator.get_paginated_response(serializer.data)


class DisplayTransactionSummaryView(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user.id
        transactions = Transaction.objects.filter(user=user)

        total_income = sum(t.amount for t in transactions if t.type == "income")
        total_expense = sum(t.amount for t in transactions if t.type == "expense")
        balance = total_income - total_expense

        summary = {
            "total_income": total_income,
            "total_expense": total_expense,
            "balance": balance,
        }
        return Response(summary, status=200)


class DeleteTransactionView(APIView):
    def delete(self, request, transaction_id, *args, **kwargs):
        user = request.user.id
        try:
            transaction = Transaction.objects.get(id=transaction_id, user=user)
            transaction.delete()
            return Response(status=204)
        except Transaction.DoesNotExist:
            return Response(
                {"error": "Transaction not found or unauthorized."}, status=404
            )


class CreateCategoryView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class ListAllCategoriesView(APIView):
    def get(self, request, *args, **kwargs):
        serializer = CategorySerializer(Category.objects.all(), many=True)
        return Response(serializer.data, status=200)


class UpdateTransactionView(APIView):
    def put(self, request, transaction_id, *args, **kwargs):
        user = request.user.id
        mutable_data = deepcopy(request.data)
        mutable_data["user"] = user

        transaction = Transaction.objects.get(id=transaction_id, user=user)

        if transaction is None:
            return Response(
                {"error": "Transaction not found or unauthorized."}, status=404
            )

        serializer = TransactionSerializer(
            instance=transaction,
            data=mutable_data,
            context={"request": request},
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
