from copy import deepcopy
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from transactions.models import Category, Transaction
from transactions.serializers import CategorySerializer, TransactionSerializer
from rest_framework.pagination import LimitOffsetPagination


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


class ListAllTransactionsView(APIView, LimitOffsetPagination):
    def get(self, request, *args, **kwargs):
        # TODO: ADD PAGINATION

        user = request.user.id
        transactions = Transaction.objects.filter(user=user).order_by("-date")
        paginator = LimitOffsetPagination()
        result_page = paginator.paginate_queryset(transactions, request)
        serializer = TransactionSerializer(
            result_page,
            many=True,
        )
        return paginator.get_paginated_response(serializer.data)


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
