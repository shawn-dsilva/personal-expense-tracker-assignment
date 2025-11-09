from django.urls import path
from .views import (
    CreateCategoryView,
    CreateTransactionView,
    DeleteTransactionView,
    ListAllCategoriesView,
    ListAllTransactionsView,
    DisplayTransactionSummaryView,
    UpdateTransactionView,
)


urlpatterns = [
    path("transactions/add/", CreateTransactionView.as_view()),
    path("transactions/all/", ListAllTransactionsView.as_view()),
    path("transactions/summary/", DisplayTransactionSummaryView.as_view()),
    path("transactions/delete/<int:transaction_id>/", DeleteTransactionView.as_view()),
    path("transactions/update/<int:transaction_id>/", UpdateTransactionView.as_view()),
    path("categories/add/", CreateCategoryView.as_view()),
    path("categories/all/", ListAllCategoriesView.as_view()),
]
