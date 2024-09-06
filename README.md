# AngularCRUD

## Présentation de l'application

AngularCRUD est une application web développée avec Angular qui permet de gérer une liste de produits. Les fonctionnalités principales incluent l'ajout, la modification, la suppression et l'affichage des produits. Cette application utilise un serveur JSON pour simuler une API RESTful pour les opérations CRUD (Create, Read, Update, Delete).

## Choix d'architecture principaux

### Structure du projet

L'application est structurée de manière modulaire pour faciliter la maintenance et l'évolutivité. Voici les principaux dossiers et fichiers :

- **src/app** : Contient les composants, services et modules de l'application.
  - **components** : Contient les composants Angular.
    - **product-add** : Composant pour ajouter un produit.
    - **product-edit** : Composant pour modifier un produit.
    - **product-get** : Composant pour afficher la liste des produits.
  - **services** : Contient les services Angular.
    - **products.service.ts** : Service pour gérer les opérations CRUD sur les produits.
  - **interfaces** : Contient les interfaces TypeScript.
    - **product.interface.ts** : Interface pour définir la structure d'un produit.

### Services

Les services sont utilisés pour encapsuler la logique métier et les appels HTTP. Le service `ProductsService` est responsable de toutes les opérations CRUD sur les produits.

### Composants

Les composants sont utilisés pour gérer l'interface utilisateur. Chaque composant est responsable d'une fonctionnalité spécifique, comme l'ajout, la modification ou l'affichage des produits.

## Installation et lancement de l'application

### Prérequis

- Node.js (version 12 ou supérieure)
- Angular CLI (version 12 ou supérieure)
- JSON Server (pour simuler une API RESTful)

### Étapes d'installation

1. **Cloner le dépôt**

   ```sh
   git clone https://github.com/votre-utilisateur/angularcrud.git
   cd angularcrud
   ```

2. **Installer les dépendances**

   ```sh
   npm install
   ```

3. **Installer JSON Server**

   ```sh
   npm install -g json-server
   ```

### Lancer l'application

1. **Démarrer le serveur JSON**

   JSON Server utilise un fichier `db.json` pour simuler une API RESTful. Assurez-vous que ce fichier est présent à la racine de votre projet.

   ```sh
   json-server --watch db.json
   ```

2. **Démarrer l'application Angular**

   Utilisez Angular CLI pour démarrer l'application.

   ```sh
   ng serve
   ```

3. **Accéder à l'application**

   Ouvrez votre navigateur et accédez à l'URL suivante :

   ```
   http://localhost:4200
   ```

## Conclusion

AngularCRUD est une application simple mais complète pour gérer une liste de produits. Elle utilise Angular pour le front-end et JSON Server pour simuler une API RESTful. Cette architecture modulaire et ces choix technologiques permettent de développer une application maintenable et évolutive.
