from django.urls import path
from .views import GetAuthUserView, LoginView, ProtectedView


urlpatterns = [
    path("protected/", ProtectedView.as_view()),
    path("auth/login/", LoginView.as_view()),
    path("auth/user/", GetAuthUserView.as_view()),
]
