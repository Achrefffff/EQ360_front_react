# Test Authentification - Guide Rapide

## 🚀 Démarrage

### Backend
```bash
cd C:\Users\dorra\Desktop\projetahmed\eq360
symfony server:start
```

### Frontend
```bash
cd C:\Users\dorra\Desktop\projetahmed\dashboard_EQ360
npm run dev
```

## ✅ Test Inscription

1. Aller sur http://localhost:5173/register
2. Remplir :
   - Nom: Test
   - Prénom: User
   - Email: test@test.com
   - Username: testuser
   - Date: 2000-01-01
   - Password: test123
3. Cliquer "S'inscrire"
4. Message de succès → Redirection vers /login

## ✅ Test Connexion

1. Sur http://localhost:5173/login
2. Entrer :
   - Email: test@test.com
   - Password: test123
3. Cliquer "Se connecter"
4. Redirection vers /dashboard

## ✅ Vérifications

- Token dans localStorage (F12 > Application > Local Storage)
- Accès aux pages protégées
- Bouton déconnexion fonctionne

## 🐛 Si erreur CORS

```bash
cd eq360
composer require nelmio/cors-bundle
```

Fichier `config/packages/nelmio_cors.yaml`:
```yaml
nelmio_cors:
    defaults:
        origin_regex: true
        allow_origin: ['*']
        allow_methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
        allow_headers: ['*']
        max_age: 3600
    paths:
        '^/api/': ~
```
