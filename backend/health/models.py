from django.db import models
from seminarists.models import Seminarist
from users.models import User


# Create your models here.
class Consultation(models.Model):
    """Modèle pour les consultations médicales"""
    seminarist = models.ForeignKey(Seminarist, on_delete=models.CASCADE, verbose_name='Séminariste')
    consultation_date = models.DateTimeField(verbose_name='Date de consultation')
    doctor = models.CharField(max_length=100, verbose_name='Médecin responsable')
    reason = models.CharField(max_length=200, verbose_name='Motif de consultation')
    diagnosis = models.TextField(verbose_name='Observations et diagnostic')
    treatment = models.TextField(verbose_name='Traitement prescrit')
    additional_notes = models.TextField(blank=True, verbose_name='Notes médicales supplémentaires')

    # Métadonnées
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Créé par')

    class Meta:
        db_table = 'consultations'
        verbose_name = 'Consultation'
        verbose_name_plural = 'Consultations'
        ordering = ['-consultation_date']
