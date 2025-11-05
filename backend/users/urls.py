from django.urls import path
from .views import LoginView, ProtectedView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path("protected/", ProtectedView.as_view()),
    path("auth/login/", LoginView.as_view()),
]
