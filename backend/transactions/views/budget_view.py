from rest_framework.views import APIView
from rest_framework.response import Response
from transactions.models import Budget, Transaction
from transactions.serializers import BudgetSerializer


class CreateBudgetView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user.id
        data = {**request.data, "user": user}
        serializer = BudgetSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class BudgetStatisticsView(APIView):
    def get(self, request, month, *args, **kwargs):
        user = request.user.id
        budget = Budget.objects.filter(user=user, date__month=month)
        transactions = Transaction.objects.filter(
            user=user, date__month=month
        ).order_by("-date")

        total_expense = sum(t.amount for t in transactions if t.type == "expense")

        budget_difference = budget.amount - total_expense

        summary = {
            "total_expense": total_expense,
            "budget": budget.amount,
            "budget_difference": budget_difference,
            "over_budget": False,
        }

        if total_expense > budget.amount:
            summary["over_budget"] = True
            return Response(summary, status=200)
        return Response(summary, status=200)
