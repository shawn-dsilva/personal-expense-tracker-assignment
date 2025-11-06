from unicodedata import category
from rest_framework import serializers
from .models import Category, Transaction


class CategorySerializer(serializers.ModelSerializer):
    value = serializers.IntegerField(source="id", read_only=True)
    label = serializers.CharField(source="name", read_only=True)

    class Meta:
        model = Category
        fields = ["id", "value", "name", "label"]


class TransactionSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = ["id", "type", "amount", "date", "category", "user"]
