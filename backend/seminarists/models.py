from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator

User = get_user_model()

# Create your models here.
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
        return today.year - self.birth_date.year - (
                    (today.month, today.day) < (self.birth_date.month, self.birth_date.day))

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
