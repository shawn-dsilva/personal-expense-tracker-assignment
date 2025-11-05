from django.db import models
from django.core.validators import MinValueValidator


# Create your models here.
class Transaction(models.Model):
    class Type(models.TextChoices):
        INCOME = "INCOME", "Income"
        EXPENSE = "EXPENSE", "Expense"

    type = models.CharField(max_length=7, choices=Type.choices)
    amount = models.IntegerField(validators=[MinValueValidator(1)])
    date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
