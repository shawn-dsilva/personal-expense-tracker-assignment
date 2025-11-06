from django.urls import path
from .views import CreateTransactionView


urlpatterns = [
    path("transactions/add/", CreateTransactionView.as_view()),
]
