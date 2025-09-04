# Système de Gestion An-Nour

Un système complet de gestion pour le séminaire intercommunal de formation islamique et managériale An-Nour.

## 🎯 Objectifs

- Faciliter la gestion du séminaire avant et après l'événement
- Gagner du temps et optimiser les activités des comités
- Centraliser toutes les informations des séminaristes et des activités

## 🎨 Design

- **Couleurs principales** : Vert #AACD06 et Bleu #004576
- **Design responsive** compatible PC, tablette et mobile
- **Interface moderne** avec navigation intuitive

## 🚀 Fonctionnalités

### SuperAdmin
- ✅ Création et suppression de comptes administrateurs
- ✅ Génération des identifiants de connexion
- ✅ Tableau de bord détaillé avec statistiques et état d'avancement

### Comité Administration
- ✅ Interface de connexion sécurisée
- ✅ Communication avec tous les comités
- ✅ Création de comptes mini-administrateurs
- ✅ Partage des tâches par l'administrateur du comité
- ✅ Inscription des membres du comité d'organisation
- ✅ Enregistrement des séminaristes
- ✅ Génération de badges (formateur, visiteur, séminariste, comité d'organisation)
- ✅ Génération de diplômes (formateur, séminariste, comité d'organisation, remerciement)
- ✅ Génération de billets de santé
- ✅ Génération de PDF avec la liste des séminaristes
- ✅ Interface de modification des informations des séminaristes
- ✅ Génération de bulletins

### Comité Scientifique
- ✅ Toutes les fonctionnalités des autres comités
- ✅ Établissement du programme de formation
- ✅ Planification des emplois du temps
- ✅ Ajout des notes des séminaristes
- ✅ Gestion des emplois du temps (modifiables)
- ✅ Communication étroite avec le comité d'administration
- ✅ Établissement du programme général du séminaire
- ✅ Ajout des séminaristes dans une classe
- ✅ Calcul automatique de la moyenne

### Comité Santé
- ✅ Fonctionnalités basiques des autres comités
- ✅ Gestion des consultations médicales
- ✅ Suivi des antécédents médicaux
- ✅ Génération de fiches de consultation
- ✅ Statistiques de santé

### Comité Finance
- ✅ Fonctionnalités basiques des autres comités
- ✅ Vente de tickets
- ✅ Paiement et suivi des paiements
- ✅ Génération de tickets

## 🛠️ Technologies

- **Frontend** : React avec Next.js 15
- **Styling** : Tailwind CSS v4
- **UI Components** : shadcn/ui
- **Icons** : Lucide React
- **Backend** : Django Python (à implémenter)

## 📱 Pages et Modules

### Authentification
- Page de connexion avec logo An-Nour
- Gestion des sessions utilisateur

### Dashboard
- Statistiques générales
- Données démographiques
- Enregistrements récents
- Navigation vers tous les modules

### Gestion des Séminaristes
- Liste complète avec recherche et filtres
- Ajout de nouveaux séminaristes
- Modification des informations
- Suppression avec confirmation
- Export des données

### Module Scientifique
- Gestion des notes par niveau
- Génération de bulletins individuels
- Calcul automatique des moyennes
- Statistiques académiques

### Module Santé
- Gestion des consultations
- Fiches médicales détaillées
- Suivi des antécédents
- Statistiques de santé

### Gestion des Accès
- Création d'utilisateurs par commission
- Modification des permissions
- Suppression sécurisée des accès

## 🎨 Couleurs du Système

\`\`\`css
/* Couleurs principales An-Nour */
--primary: #AACD06;     /* Vert An-Nour */
--secondary: #004576;   /* Bleu An-Nour */
--background: #ffffff;  /* Blanc */
--foreground: #333333;  /* Gris foncé */
--muted: #f0f0f0;      /* Gris clair */
\`\`\`

## 📋 Structure du Projet

\`\`\`
├── app/
│   ├── page.tsx                 # Page de connexion
│   ├── dashboard/               # Tableau de bord
│   ├── seminaristes/           # Gestion séminaristes
│   ├── scientifique/           # Module scientifique
│   ├── notes/                  # Gestion des notes
│   ├── sante/                  # Module santé
│   └── acces/                  # Gestion des accès
├── components/
│   ├── auth/                   # Composants d'authentification
│   ├── dashboard/              # Composants du dashboard
│   ├── layout/                 # Layout et navigation
│   ├── seminaristes/           # Composants séminaristes
│   ├── scientific/             # Composants scientifiques
│   ├── health/                 # Composants santé
│   ├── access/                 # Composants gestion accès
│   └── ui/                     # Composants UI réutilisables
\`\`\`

## 🚀 Installation et Démarrage

1. Cloner le projet
2. Installer les dépendances : `npm install`
3. Lancer le serveur de développement : `npm run dev`
4. Ouvrir [http://localhost:3000](http://localhost:3000)

## 📝 Notes de Développement

- Interface entièrement responsive
- Navigation intuitive avec sidebar
- Modals pour toutes les actions importantes
- Système de couleurs cohérent
- Composants réutilisables
- Code TypeScript strict

## 🔮 Prochaines Étapes

- Intégration avec l'API Django
- Authentification JWT
- Génération de PDF réels
- Système de notifications
- Sauvegarde automatique
- Tests unitaires et d'intégration

---

**An Nour, pour une spiritualité étincelante.**
