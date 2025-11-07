# EQ360 Dashboard - Frontend React

Application React moderne pour consommer l'API EQ360 de développement personnel gamifié.

## 🚀 Technologies

- **React 19** avec Vite
- **Tailwind CSS 4** pour le styling
- **React Router DOM** pour la navigation
- **Axios** pour les appels API
- **Zustand** pour la gestion d'état
- **Lucide React** pour les icônes

## 📁 Structure du projet

```
src/
├── api/                    # Requêtes API centralisées
│   ├── apiClient.js        # Configuration Axios + JWT
│   ├── authApi.js
│   ├── tachesApi.js
│   ├── objectifsApi.js
│   ├── projetsApi.js
│   └── sppaApi.js
│
├── components/
│   ├── ui/                 # Composants réutilisables
│   └── layout/             # Sidebar, Header
│
├── features/               # Features organisées par domaine
│   ├── auth/
│   ├── dashboard/
│   ├── taches/
│   ├── objectifs/
│   ├── projets/
│   └── sppa/
│
├── layouts/                # Layouts principaux
│   ├── PublicLayout.jsx
│   └── DashboardLayout.jsx
│
├── routes/                 # Configuration du routage
│   ├── AppRouter.jsx
│   └── ProtectedRoute.jsx
│
├── store/                  # Zustand stores
│   └── authStore.js
│
├── App.jsx
└── main.jsx
```

## 🔧 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 🌐 Configuration API

L'URL de base de l'API est configurée dans `src/api/apiClient.js` :

```javascript
baseURL: 'http://localhost:8000/api'
```

Modifiez cette URL selon votre configuration backend.

## 🔐 Authentification

L'application utilise JWT pour l'authentification :
- Le token est stocké dans `localStorage`
- Axios ajoute automatiquement le header `Authorization: Bearer <token>`
- Les routes du dashboard sont protégées par `ProtectedRoute`

## 📍 Routes disponibles

- `/login` - Connexion
- `/register` - Inscription
- `/dashboard` - Tableau de bord principal
- `/dashboard/tasks` - Gestion des tâches
- `/dashboard/objectifs` - Gestion des objectifs
- `/dashboard/projets` - Gestion des projets
- `/dashboard/sppa` - Gestion des SPPA

## 🎨 Design

- Palette : gris foncé + accents bleus/verts
- Sidebar sombre (bg-gray-900)
- Layout responsive
- Typographie moderne (Inter/Roboto)

## 🚀 Build pour production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.
