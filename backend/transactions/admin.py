from django.contrib import admin

from transactions.models import Category, Transaction

# Register your models here.
admin.site.register(Transaction)
admin.site.register(Category)
