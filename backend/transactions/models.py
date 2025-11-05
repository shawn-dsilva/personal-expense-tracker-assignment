from django.db import models
from django.core.validators import MinValueValidator
from django.contrib.auth import get_user_model


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# Create your models here.
class Transaction(models.Model):
    class Type(models.TextChoices):
        INCOME = "INCOME", "Income"
        EXPENSE = "EXPENSE", "Expense"

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    type = models.CharField(max_length=7, choices=Type.choices)
    amount = models.IntegerField(validators=[MinValueValidator(1)])
    date = models.DateTimeField()
    category = models.ForeignKey(
        Category, on_delete=models.SET_DEFAULT, null=False, default="uncategorized"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.type} : {self.amount} on {self.date.strftime('%d-%m-%Y')}"
