# Axiome Group BTP - Frontend

Ce projet est le frontend de l'application de gestion de chantiers pour Axiome Group BTP. Il est développé en Angular et consomme l'API backend du projet AppAxiomeGroupBTP-BACK.

## Fonctionnalités

- Authentification et gestion des utilisateurs
- Tableau de bord avec statistiques et activités récentes
- Gestion des chantiers (création, modification, suppression, visualisation)
- Gestion des budgets et factures
- Rapports et statistiques

## Prérequis

- Node.js (v14+)
- npm ou yarn
- Angular CLI

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/aziztechs/AppAxiomeGroupBTP-FRONT.git
cd AppAxiomeGroupBTP-FRONT
```

2. Installer les dépendances :
```bash
npm install
# ou
yarn install
```

3. Configurer l'environnement :
   - Modifier les fichiers dans `src/environments` pour pointer vers votre API backend

## Développement

Pour lancer le serveur de développement :
```bash
ng serve
```

L'application sera accessible à l'adresse `http://localhost:4200/`.

## Production

Pour construire l'application pour la production :
```bash
ng build --prod
```

Les fichiers générés seront stockés dans le répertoire `dist/`.

## Structure du projet

- `src/app/components` : Composants de l'application
- `src/app/services` : Services pour la communication avec l'API
- `src/app/models` : Interfaces TypeScript pour les modèles de données
- `src/app/guards` : Guards pour la protection des routes
- `src/app/interceptors` : Intercepteurs HTTP pour l'authentification

## Connexion avec le backend

Cette application frontend est conçue pour fonctionner avec l'API backend du projet AppAxiomeGroupBTP-BACK. Assurez-vous que le backend est correctement configuré et en cours d'exécution avant d'utiliser cette application.

## Licence

Ce projet est sous licence privée et appartient à Axiome Group BTP.

