from django.db import models
from seminarists.models import Seminarist
from users.models import User

# Create your models here.
class Ticket(models.Model):
    """Modèle pour les tickets de paiement"""
    PAYMENT_STATUS_CHOICES = [
        ('PENDING', 'En attente'),
        ('PAID', 'Payé'),
        ('CANCELLED', 'Annulé'),
        ('REFUNDED', 'Remboursé'),
    ]

    PAYMENT_METHOD_CHOICES = [
        ('CASH', 'Espèces'),
        ('MOBILE_MONEY', 'Mobile Money'),
        ('BANK_TRANSFER', 'Virement bancaire'),
        ('CHECK', 'Chèque'),
    ]

    ticket_number = models.CharField(max_length=20, unique=True, editable=False)
    seminarist = models.ForeignKey(Seminarist, on_delete=models.CASCADE, verbose_name='Séminariste')
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Montant')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='PENDING',
                                      verbose_name='Statut de paiement')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, blank=True,
                                      verbose_name='Méthode de paiement')
    payment_date = models.DateTimeField(null=True, blank=True, verbose_name='Date de paiement')
    payment_reference = models.CharField(max_length=100, blank=True, verbose_name='Référence de paiement')

    # Métadonnées
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Créé par')

    def save(self, *args, **kwargs):
        if not self.ticket_number:
            # Génération automatique du numéro de ticket
            year = self.created_at.year if self.created_at else 2024
            count = Ticket.objects.filter(ticket_number__startswith=f'TK-{year}').count() + 1
            self.ticket_number = f'TK-{year}-{count:04d}'
        super().save(*args, **kwargs)

    class Meta:
        db_table = 'tickets'
        verbose_name = 'Ticket'
        verbose_name_plural = 'Tickets'
        ordering = ['-created_at']
