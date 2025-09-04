from django.db import models
from seminarists.models import Seminarist
from users.models import User

# Create your models here.
class Document(models.Model):
    """Modèle pour les documents générés"""
    DOCUMENT_TYPE_CHOICES = [
        ('BADGE_SEMINARIST', 'Badge Séminariste'),
        ('BADGE_TRAINER', 'Badge Formateur'),
        ('BADGE_VISITOR', 'Badge Visiteur'),
        ('BADGE_COMMITTEE', 'Badge Comité'),
        ('DIPLOMA_SEMINARIST', 'Diplôme Séminariste'),
        ('DIPLOMA_TRAINER', 'Diplôme Formateur'),
        ('DIPLOMA_COMMITTEE', 'Diplôme Comité'),
        ('DIPLOMA_THANKS', 'Diplôme Remerciement'),
        ('HEALTH_TICKET', 'Billet de Santé'),
        ('BULLETIN', 'Bulletin de Notes'),
        ('SEMINARIST_LIST', 'Liste Séminaristes'),
        ('CONSULTATION_FORM', 'Fiche de Consultation'),
    ]

    document_type = models.CharField(max_length=30, choices=DOCUMENT_TYPE_CHOICES, verbose_name='Type de document')
    title = models.CharField(max_length=200, verbose_name='Titre')
    file_path = models.FileField(upload_to='documents/', verbose_name='Fichier')
    seminarist = models.ForeignKey(Seminarist, on_delete=models.CASCADE, null=True, blank=True,
                                   verbose_name='Séminariste')

    # Métadonnées
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Créé par')

    class Meta:
        db_table = 'documents'
        verbose_name = 'Document'
        verbose_name_plural = 'Documents'
        ordering = ['-created_at']
