from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    """Modèle utilisateur étendu"""
    ROLE_CHOICES = [
        ('SUPER_ADMIN', 'Super Administrateur'),
        ('ADMINISTRATION', 'Comité Administration'),
        ('SCIENTIFIQUE', 'Comité Scientifique'),
        ('SANTE', 'Comité Santé'),
        ('FINANCE', 'Comité Finance'),
    ]

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'role']

    class Meta:
        db_table = 'auth_user'
        verbose_name = 'Utilisateur'
        verbose_name_plural = 'Utilisateurs'
