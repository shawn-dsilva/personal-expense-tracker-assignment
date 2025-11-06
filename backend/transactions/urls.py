from django.urls import path
from .views import CreateTransactionView, ListAllTransactionsView


urlpatterns = [
    path("transactions/add/", CreateTransactionView.as_view()),
    path("transactions/all/", ListAllTransactionsView.as_view()),
]
