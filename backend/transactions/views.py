from copy import deepcopy
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from transactions.models import Category, Transaction
from transactions.serializers import CategorySerializer, TransactionSerializer


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


class ListAllTransactionsView(APIView):
    def get(self, request, *args, **kwargs):
        # TODO: ADD PAGINATION

        user = request.user.id
        serializer = TransactionSerializer(
            Transaction.objects.filter(user=user).order_by("-date"),
            many=True,
        )
        return Response(serializer.data, status=200)


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
