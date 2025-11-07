from django.urls import path
from .views import (
    CreateCategoryView,
    CreateTransactionView,
    ListAllCategoriesView,
    ListAllTransactionsView,
    DisplayTransactionSummaryView,
)


urlpatterns = [
    path("transactions/add/", CreateTransactionView.as_view()),
    path("transactions/all/", ListAllTransactionsView.as_view()),
    path("transactions/summary/", DisplayTransactionSummaryView.as_view()),
    path("categories/add/", CreateCategoryView.as_view()),
    path("categories/all/", ListAllCategoriesView.as_view()),
]
