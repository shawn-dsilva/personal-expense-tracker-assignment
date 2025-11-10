from rest_framework.views import APIView
from rest_framework.response import Response
from transactions.serializers import BudgetSerializer


class CreateBudgetView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = BudgetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
