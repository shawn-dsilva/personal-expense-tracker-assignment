from rest_framework.views import APIView
from rest_framework.response import Response
from transactions.models import Category
from transactions.serializers import CategorySerializer


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
