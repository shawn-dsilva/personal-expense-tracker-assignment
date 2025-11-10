from os import read
from unicodedata import category
from rest_framework import serializers
from .models import Budget, Category, Transaction


class CategorySerializer(serializers.ModelSerializer):
    value = serializers.IntegerField(source="id", read_only=True)
    label = serializers.CharField(source="name", read_only=True)

    class Meta:
        model = Category
        fields = ["id", "value", "name", "label"]


class TransactionSerializer(serializers.ModelSerializer):
    # Source is important to map the nested serializer to the correct field
    category_read = CategorySerializer(source="category", read_only=True)

    class Meta:
        model = Transaction
        fields = ["id", "type", "amount", "date", "category_read", "category", "user"]


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ["user", "month", "amount"]
