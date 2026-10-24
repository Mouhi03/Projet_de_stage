# ParkingPlus / SmartPark – Projet de stage 2025

Application web de **gestion de places de parking d'entreprise** réalisée dans le cadre d'un stage de fin d'année (2025).
Elle permet à des employés de s'authentifier, de visualiser les places disponibles, de réserver une place, de choisir une formule d'abonnement et de contacter l'administration.

Le projet est composé de deux parties indépendantes :

| Partie | Technologie | Dossier |
|---|---|---|
| Frontend | Angular 20 (composants standalone, TypeScript, SCSS) | `Frontend/` |
| Backend | Spring Boot 3.2.4, Java 17, Spring Security, JWT, JPA, MySQL | `Backend/` |

---

## Fonctionnalités

### Frontend (Angular)

- **Page de connexion** avec trois formulaires animés : connexion, inscription et mot de passe oublié.
- **Tableau de bord** (`/home`) avec trois vues :
  - **Parking** : grille de places (10 par défaut), réservation d'une place via un formulaire (nom, numéro de badge, modèle de voiture, plaque d'immatriculation) et annulation d'une réservation.
  - **À propos** : présentation du service, trois formules d'abonnement (Normal 85 MAD, Premium 120 MAD, Deluxe 180 MAD) avec choix du mode de paiement, et formulaire de contact.
  - **Paramètres** : nombre de places (1 à 100), préférences de notification, options administrateur (surréservation, attribution automatique).
- Déconnexion.

### Backend (Spring Boot)

API REST d'authentification, avec mots de passe hachés (BCrypt) et jetons JWT valables 10 heures.

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Connexion (email + mot de passe), retourne un jeton JWT |
| `POST` | `/api/auth/signup` | Création de compte, retourne un jeton JWT |
| `POST` | `/api/auth/forgot-password?email=...` | Réinitialisation du mot de passe (réponse neutre, aucun e-mail n'est réellement envoyé) |

Toutes les autres routes nécessitent l'en-tête `Authorization: Bearer <token>`.

---

## Structure du projet

```
Projet_de_stage/
├── Backend/
│   ├── pom.xml
│   └── src/main/java/com/smartpark/
│       ├── AuthApplication.java      # point d'entrée
│       ├── controller/               # AuthController (login, signup, forgot-password)
│       ├── model/                    # User, LoginRequest, AuthResponse
│       ├── repository/               # UserRepository (JPA)
│       ├── service/                  # AuthService, UserService, CustomUserDetailsService
│       └── security/                 # SecurityConfig, JwtUtil, JwtAuthenticationFilter
└── Frontend/
    └── src/app/
        ├── app.routes.ts             # routes : /login, /home, /about
        └── components/
            ├── login/                # connexion, inscription, mot de passe oublié
            ├── home/                 # tableau de bord (parking, abonnements, contact, paramètres)
            ├── header/, footer/, about/
```

---

## Prérequis

- Node.js 20+ et npm
- Java 17+
- Maven 3.9+
- MySQL 8

---

## Installation et lancement

### 1. Base de données

Créer la base MySQL :

```sql
CREATE DATABASE auth_system;
```

Les tables sont créées automatiquement au démarrage (`spring.jpa.hibernate.ddl-auto=update`).

### 2. Backend

Dans `Backend/src/main/resources/application.properties`, renseigner vos propres identifiants MySQL et un secret JWT (`jwt.secret`, 32 caractères minimum) :

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/auth_system
spring.datasource.username=<votre_utilisateur>
spring.datasource.password=<votre_mot_de_passe>
jwt.secret=<une_longue_chaine_aleatoire>
```

Puis lancer l'API (disponible sur `http://localhost:8080`) :

```bash
cd Backend
mvn spring-boot:run
```

### 3. Frontend

```bash
cd Frontend
npm install
npm start
```

L'application est accessible sur `http://localhost:4200`.
Pour un build de développement : `npx ng build --configuration development`.

---

## Compte de démonstration

Le formulaire de connexion du frontend utilise actuellement des identifiants de démonstration en dur :

- Email : `user@test.com`
- Mot de passe : `user123`

---

## État d'avancement et limites connues

Ce projet est un **prototype**. Il faut en avoir conscience avant tout usage réel :

- **Le frontend n'est pas encore relié au backend.** La connexion compare l'email et le mot de passe à des valeurs codées en dur ; l'inscription, le mot de passe oublié et le formulaire de contact simulent simplement un appel réseau.
- **Les réservations, abonnements et paramètres ne sont pas persistés** : ils vivent en mémoire dans le navigateur et sont perdus au rechargement de la page. Le backend ne gère que les utilisateurs.
- Aucune garde de route : `/home` est accessible sans être connecté.
- L'envoi d'e-mail de réinitialisation du mot de passe n'est pas implémenté.
- Le build de production Angular (`ng build`) échoue actuellement à cause du budget de taille de `home.component.scss` (13 ko pour une limite de 8 ko) ; le build de développement fonctionne.
- Le test unitaire par défaut (`app.spec.ts`) ne correspond plus à l'application.

## Pistes d'amélioration

- Connecter le frontend à l'API (`HttpClient`, stockage du JWT, intercepteur, `AuthGuard`).
- Ajouter côté backend les entités et endpoints pour les places, réservations et abonnements.
- Externaliser les secrets (variables d'environnement) et ne plus les versionner.
- Implémenter l'envoi réel d'e-mails de réinitialisation.
- Ajouter des tests (backend et frontend) et un rôle administrateur.
