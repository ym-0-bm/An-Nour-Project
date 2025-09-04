from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class AuditLog(models.Model):
    """Modèle pour l'audit des actions"""
    ACTION_CHOICES = [
        ('CREATE', 'Création'),
        ('UPDATE', 'Modification'),
        ('DELETE', 'Suppression'),
        ('LOGIN', 'Connexion'),
        ('LOGOUT', 'Déconnexion'),
        ('EXPORT', 'Export'),
        ('IMPORT', 'Import'),
    ]

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Utilisateur')
    action = models.CharField(max_length=20, choices=ACTION_CHOICES, verbose_name='Action')
    model_name = models.CharField(max_length=50, verbose_name='Modèle')
    object_id = models.CharField(max_length=50, verbose_name='ID Objet')
    object_repr = models.CharField(max_length=200, verbose_name='Représentation')
    changes = models.JSONField(default=dict, verbose_name='Changements')
    ip_address = models.GenericIPAddressField(verbose_name='Adresse IP')
    user_agent = models.TextField(verbose_name='User Agent')
    timestamp = models.DateTimeField(auto_now_add=True, verbose_name='Horodatage')

    class Meta:
        db_table = 'audit_logs'
        verbose_name = 'Log d\'audit'
        verbose_name_plural = 'Logs d\'audit'
        ordering = ['-timestamp']
