# backend/users/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Exemple : endpoint pour lister les utilisateurs
    path("", views.UserListView.as_view(), name="user-list"),
]
