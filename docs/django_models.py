"""
Modèles Django pour le système An-Nour
"""

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

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

class Seminarist(models.Model):
    """Modèle pour les séminaristes"""
    GENDER_CHOICES = [
        ('M', 'Masculin'),
        ('F', 'Féminin'),
    ]
    
    CATEGORY_CHOICES = [
        ('FORMATION', 'Formation'),
        ('PEPINIERE', 'Pépinière'),
    ]
    
    # Informations générales
    matricule = models.CharField(max_length=20, unique=True, editable=False)
    first_name = models.CharField(max_length=100, verbose_name='Prénom')
    last_name = models.CharField(max_length=100, verbose_name='Nom')
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, verbose_name='Genre')
    birth_date = models.DateField(verbose_name='Date de naissance')
    
    # Coordonnées
    phone = models.CharField(max_length=20, verbose_name='Téléphone')
    email = models.EmailField(verbose_name='Email')
    parent_phone = models.CharField(max_length=20, verbose_name='Téléphone parent')
    commune = models.CharField(max_length=100, verbose_name='Commune')
    
    # Catégorie
    status = models.CharField(max_length=50, verbose_name='Statut')
    education_level = models.CharField(max_length=50, verbose_name='Niveau d\'étude')
    dormitory = models.CharField(max_length=50, verbose_name='Dortoir')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, verbose_name='Catégorie')
    
    # Informations médicales
    medical_history = models.TextField(blank=True, verbose_name='Antécédents médicaux')
    allergies = models.TextField(blank=True, verbose_name='Allergies')
    
    # Fichiers
    photo = models.ImageField(upload_to='photos/seminarists/', blank=True, verbose_name='Photo')
    
    # Métadonnées
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_seminarists')
    
    def save(self, *args, **kwargs):
        if not self.matricule:
            # Génération automatique du matricule
            year = self.birth_date.year if self.birth_date else 2024
            count = Seminarist.objects.filter(matricule__startswith=f'AN{str(year)[-2:]}').count() + 1
            self.matricule = f'AN{str(year)[-2:]}-{count:04d}'
        super().save(*args, **kwargs)
    
    @property
    def full_name(self):
        return f"{self.last_name} {self.first_name}"
    
    @property
    def age(self):
        from datetime import date
        today = date.today()
        return today.year - self.birth_date.year - ((today.month, today.day) < (self.birth_date.month, self.birth_date.day))
    
    class Meta:
        db_table = 'seminarists'
        verbose_name = 'Séminariste'
        verbose_name_plural = 'Séminaristes'
        ordering = ['-created_at']

class Level(models.Model):
    """Modèle pour les niveaux"""
    name = models.CharField(max_length=50, unique=True, verbose_name='Nom du niveau')
    description = models.TextField(blank=True, verbose_name='Description')
    order = models.IntegerField(default=1, verbose_name='Ordre')
    is_active = models.BooleanField(default=True, verbose_name='Actif')
    
    class Meta:
        db_table = 'levels'
        verbose_name = 'Niveau'
        verbose_name_plural = 'Niveaux'
        ordering = ['order']

class Subject(models.Model):
    """Modèle pour les matières"""
    name = models.CharField(max_length=100, verbose_name='Nom de la matière')
    code = models.CharField(max_length=20, unique=True, verbose_name='Code')
    coefficient = models.IntegerField(default=1, verbose_name='Coefficient')
    level = models.ForeignKey(Level, on_delete=models.CASCADE, verbose_name='Niveau')
    is_active = models.BooleanField(default=True, verbose_name='Actif')
    
    class Meta:
        db_table = 'subjects'
        verbose_name = 'Matière'
        verbose_name_plural = 'Matières'

class Grade(models.Model):
    """Modèle pour les notes"""
    seminarist = models.ForeignKey(Seminarist, on_delete=models.CASCADE, verbose_name='Séminariste')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, verbose_name='Matière')
    grade = models.DecimalField(
        max_digits=4, 
        decimal_places=2, 
        validators=[MinValueValidator(0), MaxValueValidator(20)],
        verbose_name='Note'
    )
    appreciation = models.CharField(max_length=200, blank=True, verbose_name='Appréciation')
    exam_date = models.DateField(verbose_name='Date d\'examen')
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Créé par')
    
    class Meta:
        db_table = 'grades'
        verbose_name = 'Note'
        verbose_name_plural = 'Notes'
        unique_together = ['seminarist', 'subject', 'exam_date']

class Conduct(models.Model):
    """Modèle pour la conduite"""
    seminarist = models.ForeignKey(Seminarist, on_delete=models.CASCADE, verbose_name='Séminariste')
    grade = models.DecimalField(
        max_digits=4, 
        decimal_places=2, 
        validators=[MinValueValidator(0), MaxValueValidator(20)],
        verbose_name='Note de conduite'
    )
    appreciation = models.CharField(max_length=200, blank=True, verbose_name='Appréciation')
    period = models.CharField(max_length=50, verbose_name='Période')
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Créé par')
    
    class Meta:
        db_table = 'conduct'
        verbose_name = 'Conduite'
        verbose_name_plural = 'Conduites'

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
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='PENDING', verbose_name='Statut de paiement')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, blank=True, verbose_name='Méthode de paiement')
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
    seminarist = models.ForeignKey(Seminarist, on_delete=models.CASCADE, null=True, blank=True, verbose_name='Séminariste')
    
    # Métadonnées
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Créé par')
    
    class Meta:
        db_table = 'documents'
        verbose_name = 'Document'
        verbose_name_plural = 'Documents'
        ordering = ['-created_at']

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
