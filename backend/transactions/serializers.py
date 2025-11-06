import re
from rest_framework import serializers

from users.serializers import UserSerializer
from .models import Category, Transaction

from django.contrib.auth import get_user_model


class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = ["id", "type", "amount", "date", "category"]
