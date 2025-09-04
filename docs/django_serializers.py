"""
Serializers Django REST Framework pour le système An-Nour
"""

from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Seminarist, Grade, Consultation, Ticket, Level, Subject

class UserSerializer(serializers.ModelSerializer):
    """Serializer pour les utilisateurs"""
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'is_active', 'created_at', 'last_login', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'created_at': {'read_only': True},
            'last_login': {'read_only': True},
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    """Serializer pour la connexion"""
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            user = authenticate(username=email, password=password)
            if not user:
                raise serializers.ValidationError('Identifiants invalides')
            if not user.is_active:
                raise serializers.ValidationError('Compte désactivé')
            attrs['user'] = user
            return attrs
        else:
            raise serializers.ValidationError('Email et mot de passe requis')

class SeminaristSerializer(serializers.ModelSerializer):
    """Serializer pour les séminaristes"""
    full_name = serializers.ReadOnlyField()
    age = serializers.ReadOnlyField()
    
    class Meta:
        model = Seminarist
        fields = '__all__'
        read_only_fields = ['matricule', 'created_at', 'updated_at', 'created_by']
    
    def validate_email(self, value):
        """Validation de l'unicité de l'email"""
        if Seminarist.objects.filter(email=value).exclude(pk=self.instance.pk if self.instance else None).exists():
            raise serializers.ValidationError("Cet email est déjà utilisé")
        return value

class SeminaristListSerializer(serializers.ModelSerializer):
    """Serializer simplifié pour la liste des séminaristes"""
    full_name = serializers.ReadOnlyField()
    
    class Meta:
        model = Seminarist
        fields = ['id', 'matricule', 'first_name', 'last_name', 'full_name', 'gender', 'dormitory', 'category', 'created_at']

class LevelSerializer(serializers.ModelSerializer):
    """Serializer pour les niveaux"""
    students_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Level
        fields = ['id', 'name', 'description', 'order', 'is_active', 'students_count']
    
    def get_students_count(self, obj):
        return Seminarist.objects.filter(education_level=obj.name).count()

class SubjectSerializer(serializers.ModelSerializer):
    """Serializer pour les matières"""
    level_name = serializers.CharField(source='level.name', read_only=True)
    
    class Meta:
        model = Subject
        fields = ['id', 'name', 'code', 'coefficient', 'level', 'level_name', 'is_active']

class GradeSerializer(serializers.ModelSerializer):
    """Serializer pour les notes"""
    seminarist_name = serializers.CharField(source='seminarist.full_name', read_only=True)
    seminarist_matricule = serializers.CharField(source='seminarist.matricule', read_only=True)
    subject_name = serializers.CharField(source='subject.name', read_only=True)
    
    class Meta:
        model = Grade
        fields = ['id', 'seminarist', 'seminarist_name', 'seminarist_matricule', 
                 'subject', 'subject_name', 'grade', 'appreciation', 'exam_date', 'created_at']
        read_only_fields = ['created_at', 'created_by']

class BulkGradeSerializer(serializers.Serializer):
    """Serializer pour l'ajout en masse de notes"""
    level = serializers.CharField()
    subject = serializers.CharField()
    grades = serializers.ListField(
        child=serializers.DictField(
            child=serializers.CharField()
        )
    )
    exam_date = serializers.DateField()

class ConsultationSerializer(serializers.ModelSerializer):
    """Serializer pour les consultations"""
    seminarist_name = serializers.CharField(source='seminarist.full_name', read_only=True)
    seminarist_matricule = serializers.CharField(source='seminarist.matricule', read_only=True)
    seminarist_gender = serializers.CharField(source='seminarist.gender', read_only=True)
    seminarist_level = serializers.CharField(source='seminarist.education_level', read_only=True)
    
    class Meta:
        model = Consultation
        fields = ['id', 'seminarist', 'seminarist_name', 'seminarist_matricule', 
                 'seminarist_gender', 'seminarist_level', 'consultation_date', 
                 'doctor', 'reason', 'diagnosis', 'treatment', 'additional_notes',
                 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at', 'created_by']

class ConsultationDetailSerializer(ConsultationSerializer):
    """Serializer détaillé pour les consultations"""
    seminarist_details = SeminaristSerializer(source='seminarist', read_only=True)
    
    class Meta(ConsultationSerializer.Meta):
        fields = ConsultationSerializer.Meta.fields + ['seminarist_details']

class TicketSerializer(serializers.ModelSerializer):
    """Serializer pour les tickets"""
    seminarist_name = serializers.CharField(source='seminarist.full_name', read_only=True)
    seminarist_matricule = serializers.CharField(source='seminarist.matricule', read_only=True)
    
    class Meta:
        model = Ticket
        fields = ['id', 'ticket_number', 'seminarist', 'seminarist_name', 
                 'seminarist_matricule', 'amount', 'payment_status', 
                 'payment_method', 'payment_date', 'payment_reference',
                 'created_at', 'updated_at']
        read_only_fields = ['ticket_number', 'created_at', 'updated_at', 'created_by']

class DashboardStatsSerializer(serializers.Serializer):
    """Serializer pour les statistiques du dashboard"""
    total_seminarists = serializers.IntegerField()
    male_seminarists = serializers.IntegerField()
    female_seminarists = serializers.IntegerField()
    pepiniere_seminarists = serializers.IntegerField()
    total_consultations = serializers.IntegerField()
    today_consultations = serializers.IntegerField()
    male_consultations = serializers.IntegerField()
    female_consultations = serializers.IntegerField()
    pepiniere_consultations = serializers.IntegerField()

class DemographicsSerializer(serializers.Serializer):
    """Serializer pour la démographie"""
    level = serializers.CharField()
    boys = serializers.IntegerField()
    girls = serializers.IntegerField()

class RecentRegistrationSerializer(serializers.Serializer):
    """Serializer pour les enregistrements récents"""
    matricule = serializers.CharField()
    full_name = serializers.CharField()
    gender = serializers.CharField()
    dormitory = serializers.CharField()
    residence = serializers.CharField()
    registration_date = serializers.DateTimeField()

class RecentConsultationSerializer(serializers.Serializer):
    """Serializer pour les consultations récentes"""
    matricule = serializers.CharField()
    full_name = serializers.CharField()
    gender = serializers.CharField()
    dormitory = serializers.CharField()
    reason = serializers.CharField()
    consultation_date = serializers.DateTimeField()
