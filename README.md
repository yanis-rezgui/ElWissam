# EL AHLEM — Plateforme Web Immobilière

Plateforme web complète pour une agence immobilière (Bureau d'Affaires Immobilier EL AHLEM), composée d'un site public pour les visiteurs/clients et d'un panneau d'administration pour la gestion opérationnelle de l'agence.

> Conçu et développé par Yanis Rezgui — Développeur Full Stack

---

## Sommaire

- [Aperçu](#aperçu)
- [Stack technique](#stack-technique)
- [Architecture générale](#architecture-générale)
- [Fonctionnalités — Site public](#fonctionnalités--site-public)
- [Fonctionnalités — Panneau administrateur](#fonctionnalités--panneau-administrateur)
- [Structure des routes frontend](#structure-des-routes-frontend)
- [API — routes backend](#api--routes-backend)
- [Temps réel — Socket.IO](#temps-réel--socketio)
- [Base de données](#base-de-données)
- [Sécurité](#sécurité)
- [Variables d'environnement](#variables-denvironnement)
- [Installation & démarrage](#installation--démarrage)
- [Bonnes pratiques de maintenance](#bonnes-pratiques-de-maintenance)

---

## Aperçu

EL AHLEM est une solution numérique destinée à moderniser la présentation d'une agence immobilière : catalogue de biens consultable et filtrable, prise de rendez-vous en ligne, favoris utilisateurs, témoignages clients, et un espace d'administration complet permettant de gérer biens, visites, utilisateurs, communes et paramètres de l'agence, avec des notifications en temps réel.

Le projet est structuré en deux espaces distincts :

| Espace | Rôle |
|---|---|
| **Site public** | Consultation du catalogue, favoris, demandes de visite, contact, authentification |
| **Panneau admin** | Gestion complète du catalogue, des visites, des utilisateurs, des communes, des témoignages et des paramètres de l'agence |

---

## Stack technique

**Frontend**
- React + TypeScript
- Tailwind CSS
- framer-motion (animations)
- react-router-dom
- Context API pour la gestion d'état (un provider par domaine métier)

**Backend**
- Node.js + Express 5
- Prisma ORM + PostgreSQL
- Socket.IO (notifications temps réel)
- JWT (`jsonwebtoken`) + cookies httpOnly pour l'authentification
- bcrypt pour le hash des mots de passe
- Cloudinary pour le stockage et la gestion des images
- Multer pour l'upload de fichiers (FormData)
- Helmet + CORS + express-rate-limit pour la sécurité
- Nodemailer / Resend pour l'envoi d'emails

---

## Architecture générale

```
Utilisateur
    │
    ▼
Frontend React / TypeScript
    │  (requêtes HTTP + connexion Socket.IO authentifiée)
    ▼
API REST Express / Node.js  (préfixe /api/v1)
    │
    ▼
Prisma ORM
    │
    ▼
PostgreSQL
```

Des services externes interviennent en complément : Cloudinary (images), Nodemailer/Resend (emails), Socket.IO (notifications temps réel vers l'admin).

Le backend expose un unique serveur HTTP (`createServer(app)`) sur lequel Express et Socket.IO sont montés ensemble, ce qui permet de partager le même port et le même cycle de vie.

---

## Fonctionnalités — Site public

- **Accueil** : bannière principale, présentation de l'agence, sélection de biens, services, communes couvertes, témoignages
- **Catalogue (`/biens`)** : recherche par mot-clé, type de transaction, localisation, prix, type de bien, statut
- **Fiche bien (`/bien/:id`)** : informations détaillées, galerie photo (Cloudinary), localisation, ajout aux favoris, demande de visite
- **Favoris (`/favoris`)** : biens sauvegardés par l'utilisateur connecté
- **Profil (`/profile`)** : gestion du compte utilisateur
- **Services (`/services`)** et **Contact (`/contact`)**
- **Authentification** : connexion, mot de passe oublié (`/forgot-password`), réinitialisation par token (`/reset-password/:token`)
- **Mentions légales** et **Politique de confidentialité**

### Statuts d'un bien
`Disponible` · `Réservé` · `Vendu` · `Loué`

### Cycle de traitement d'une visite
`En attente` → `Contacté` → `Visite confirmée` → `Terminée` / `Annulée`

---

## Fonctionnalités — Panneau administrateur

Accessible sous `/admin/*`, protégé par `AdminRoute` + `AdminLayout`, avec sidebar responsive (framer-motion) et système de rooms Socket.IO réservé aux admins.

| Page | Rôle |
|---|---|
| Dashboard | Vue synthétique : nombre de biens, répartition, visites, notifications, témoignages, activité récente |
| Vos Biens | CRUD complet des biens (ajout, modification, statut, photos Cloudinary) |
| Demandes de visites | Suivi et traitement des demandes clients |
| Utilisateurs | Recherche, filtres par rôle (`USER` / `ADMIN`), modification, suppression |
| Avis clients | Gestion des témoignages (actif/inactif, note 1–5, suppression) |
| Communes | Ajout/modification/désactivation des zones géographiques couvertes |
| Notifications | Centralisation temps réel des événements (voir ci-dessous) |
| Général | Informations publiques de l'agence (nom, téléphone(s), email, adresse, Google Maps, réseaux sociaux) |
| Profil | Informations du compte admin, mot de passe, déconnexion |
| Guide d'utilisation | FAQ et documentation intégrées au panneau |

### Catégories de notifications
`NEW_BIEN` · `NEW_VISITE` · `NEW_USER` · `STATUS_CHANGED` · `NEW_TESTIMONIAL` · `SECURITY`

---

## Structure des routes frontend

```tsx
<Routes>
  <Route element={<PublicRoute><PublicLayout/></PublicRoute>}>
    <Route path="/" element={<Acceuil/>} />
    <Route path="/biens" element={<Biens/>} />
    <Route path="/bien/:id" element={<BienDetails/>} />
    <Route path="/profile" element={<Profile/>} />
    <Route path="/services" element={<Services/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/favoris" element={<Favorites/>} />
    <Route path="/mentions" element={<MentionsLegales/>} />
    <Route path="/privacy" element={<PrivacyPolicy/>} />
    <Route path="/forgot-password" element={<ForgotPassword/>} />
    <Route path="/reset-password/:token" element={<ResetPassword/>} />
  </Route>

  <Route path="/admin/*" element={<AdminRoute><AdminLayout/></AdminRoute>}>
    <Route path="dashboard" element={<Dashboard/>} />
    <Route path="biens" element={<AdminBiens/>} />
    <Route path="bien/:id" element={<AdminBienDetails/>} />
    <Route path="addBien" element={<AdminBienAjout/>} />
    <Route path="visites" element={<AdminVisites/>} />
    <Route path="testimonials" element={<AdminTestimonials/>} />
    <Route path="users" element={<AdminUsers/>} />
    <Route path="general" element={<General/>} />
    <Route path="profile" element={<AdminProfile/>} />
    <Route path="notifications" element={<Notifications/>} />
    <Route path="guide" element={<Guide/>} />
    <Route path="communes" element={<AdminCommunes/>} />
  </Route>
</Routes>
```

L'application imbrique une quinzaine de Context Providers (`BiensProvider`, `AuthProvider`, `NotificationsProvider`, `BiensAdminProvider`, `UsersAdminProvider`, `AgencyAdminProvider`, `AdminCommuneProvider`, etc.), chacun encapsulant l'état et les appels API d'un domaine métier précis.

---

## API — routes backend

Toutes les routes sont préfixées par `/api/v1` et passent par un rate limiter global (`globalRateLimiter`).

| Route | Responsabilité |
|---|---|
| `/api/v1/biens` | Gestion des biens immobiliers |
| `/api/v1/visites` | Gestion des demandes de visite |
| `/api/v1/auth` | Authentification (login, JWT, reset password) |
| `/api/v1/user` | Gestion du compte utilisateur connecté |
| `/api/v1/testimonials` | Témoignages clients |
| `/api/v1/users` | Gestion administrative des utilisateurs |
| `/api/v1/agency` | Informations publiques de l'agence |
| `/api/v1/notifications` | Notifications admin |
| `/api/v1/dashboard` | Données synthétiques du tableau de bord |
| `/api/v1/favoris` | Gestion des favoris utilisateur |
| `/api/v1/contact` | Formulaire de contact |
| `/api/v1/communes` | Gestion des communes |
| `/health` | Healthcheck (hors préfixe `/api/v1`) |

### Middlewares appliqués globalement (`app.js`)

```js
app.use(helmet());
app.use(cors({ origin: [/* origines autorisées */], credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', globalRateLimiter);
// ...routes
app.use(errorMiddleware); // gestion centralisée des erreurs, en dernier
```

---

## Temps réel — Socket.IO

Le serveur HTTP est partagé entre Express et Socket.IO (`createServer(app)` puis `initializeSocket(server)`), ce qui permet aux notifications d'être poussées instantanément vers le panneau admin sans polling.

### Authentification du socket (`socketAuth.js`)

Chaque connexion socket doit fournir un JWT valide via `socket.handshake.auth.token`. Le middleware décode le token, vérifie que l'utilisateur existe toujours en base, puis attache l'utilisateur authentifié à `socket.user` :

```js
const decoded = jwt.verify(token, JWT_SECRET);
const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
if (!user) return next(new Error("Unauthorized"));
socket.user = user;
```

### Rooms et accès (`socket.js`)

Seuls les comptes avec le rôle `ADMIN` sont autorisés à rester connectés : ils rejoignent automatiquement la room `admins`. Tout utilisateur non-admin est immédiatement déconnecté, ce qui garantit que les événements sensibles (nouvelle visite, nouvel utilisateur, changement de statut, alertes sécurité) ne sont jamais diffusés en dehors du panneau administrateur.

```js
if (user.role === "ADMIN") {
  socket.join("admins");
} else {
  socket.disconnect(true);
  return;
}
```

La configuration CORS du serveur Socket.IO reflète celle d'Express, pour autoriser les mêmes origines front (dev local + production Vercel).

---

## Base de données

- **PostgreSQL** comme SGBD relationnel
- **Prisma** comme ORM : définition des modèles, requêtes typées, gestion des relations et migrations
- Connexion via `@prisma/adapter-pg` + `pg`

Modèles métier identifiés : biens, visites, utilisateurs, témoignages, communes, notifications, informations de l'agence (`Agency` : name, phone[], email, address, mapsUrl, socialLinks).

---

## Sécurité

| Mécanisme | Rôle |
|---|---|
| **Helmet** | En-têtes HTTP de sécurité |
| **CORS** | Restriction des origines autorisées (dev + prod) |
| **express-rate-limit** | Limitation globale des requêtes sur `/api/v1` |
| **bcrypt** | Hash des mots de passe |
| **JWT + cookies httpOnly** | Sessions d'authentification (REST et Socket.IO) |
| **socketAuth** | Vérification JWT + rôle avant toute connexion WebSocket |
| **errorMiddleware** | Gestion centralisée des erreurs, montée en dernier dans la chaîne de middlewares |

---

## Variables d'environnement

À définir côté backend (`.env`, jamais commité) :

```
DATABASE_URL=
JWT_SECRET=
PORT=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
# + configuration Nodemailer si utilisée
```

---

## Installation & démarrage

### Backend

```bash
cd backend
npm install
npm run dev     # démarrage avec nodemon (rechargement auto)
npm start       # démarrage standard
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Le serveur backend expose `/health` pour vérifier rapidement que l'API répond correctement une fois démarrée.

---

## Bonnes pratiques de maintenance

- Maintenir à jour les informations de l'agence et les statuts des biens
- Retirer ou mettre à jour les biens indisponibles
- Vérifier les témoignages avant publication
- Consulter régulièrement les notifications et les demandes de visite
- Ne jamais exposer les secrets/variables d'environnement dans le dépôt
- Ne jamais partager les identifiants administrateur ; se déconnecter après usage sur poste partagé
- Maintenir les dépendances techniques à jour (Prisma, Express, Socket.IO en particulier, pour les correctifs de sécurité)

---

**Bureau d'Affaires Immobilier EL AHLEM**
*Guide technique du projet — plateforme web publique et espace d'administration*