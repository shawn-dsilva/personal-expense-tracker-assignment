from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from backend.transactions.serializers import TransactionSerializer


# Create your views here.
class CreateTransactionView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
