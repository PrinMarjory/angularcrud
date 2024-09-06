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

## Choix techniques

### Gestion des formulaires réactifs avec ReactiveFormsModule

L'utilisation des **formulaires réactifs** via le module `ReactiveFormsModule` permet une gestion plus facile et contrôlée des formulaires avec validation en temps réél et manipulation des données.

**Exemple :**
Dans le composant `ProductAddComponent`, le formulaire est défini à l'aide de `FormBuilder` :

```typescript
this.productForm = this.fb.group({
  name: ['', Validators.required],
  description: [''],
  price: [null, [Validators.required, Validators.min(0)]],
});
```
 L'utilisation des validators intégrés (comme Validators.required et Validators.min(0)) garantit que l'utilisateur ne puisse pas envoyer un produit sans nom ou avec un prix négatif. Cette approche améliore l'expérience utilisateur et la robustesse des données envoyées au serveur.

### Service pour la gestion des produits
Le service ProductsService joue un rôle clé dans l'application. Il centralise toute la logique métier et les appels HTTP vers le serveur JSON, rendant l'application plus modulaire et maintenable. L'idée est de séparer la logique de communication avec l'API de la gestion des interfaces utilisateur.

**Exemple :**
La méthode `addProduct()` dans `ProductsService` :

```typescript
addProduct(product: NewProductInterface): Observable<ProductInterface> {
  return this.http.post<ProductInterface>(ProductsService.url, product);
}
```
En encapsulant l'appel HTTP dans une méthode de service, le composant ProductAddComponent peut simplement se concentrer sur l'interface utilisateur et déléguer toute la logique de création à cette méthode. 

### Gestion des opérations CRUD avec Observable
Les services Angular utilisent le module HttpClient, qui retourne des objets Observable. Ces observables permettent une gestion asynchrone des opérations CRUD. Cela garantit une architecture réactive où l'interface utilisateur est mise à jour automatiquement en fonction des réponses du serveur.

**Exemple :**
Dans `ProductAddComponent`, la méthode `register()` fait appel à `addProduct()` :

```typescript
this.productsService.addProduct(product).subscribe({
  next: (response) => {
    // Succès : réinitialiser le formulaire et naviguer vers une autre page
    this.productForm.reset();
    this.isSubmitted = false;
    this.router.navigate(['/get']);
  },
  error: (error) => {
    // Gestion d'erreur
    this.errorMessage = 'Une erreur est survenue lors de l\'ajout du produit.';
  }
});
```

Le modèle `subscribe()` est utilisé ici pour gérer la réponse de manière asynchrone, garantissant que l'application ne bloque pas pendant la requête HTTP.

### Utilisation de bootstrap.Modal pour la suppression avec confirmation
Un des aspects stratégiques du projet est l'utilisation de la modal de Bootstrap pour la suppression des produits dans le composant `ProductGetComponent`. Cette modal est utilisée pour demander à l'utilisateur une confirmation avant de supprimer un produit, évitant ainsi des suppressions accidentelles.

```typescript
const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteModal')!);
modal.show();
```
Le code récupère une instance de la modal Bootstrap et l'affiche à l'utilisateur. L'interaction avec la modal se fait via l'API JavaScript de Bootstrap. 

### Gestion des routes avec ActivatedRoute
Pour l'édition d'un produit, `ProductEditComponent` utilise `ActivatedRoute` pour récupérer l'ID du produit depuis l'URL. 

```typescript
 constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
  ) {}
this.route.params.subscribe((params) => {
  this.id = params['id'];
  if (this.id) {
    this.productsService.loadOneProduct(this.id).subscribe({
      next: (product) => {
        this.product = product;
        this.productForm.patchValue(this.product);
      },
    });
  }
});
```
Ici, `ActivatedRoute` permet de récupérer l'ID du produit dans l'URL `(edit/:id)`, puis de charger ce produit à partir du serveur JSON. L'utilisation de `patchValue()` permet de pré-remplir le formulaire avec les valeurs du produit récupéré.

### Interfaces TypeScript pour garantir la sécurité des types
Le projet utilise les interfaces TypeScript pour définir clairement la structure des données échangées. Cela assure une meilleure sécurité des types et une prévention des erreurs lors des opérations CRUD.

```typescript
export interface ProductInterface {
  id: string;
  name: string;
  description?: string;
  price: number;
}
```
L'interface `ProductInterface` garantit que chaque produit possède un id, un name, et un price, tandis que description est optionnel. Cela permet de s'assurer que les données manipulées sont toujours conformes au modèle attendu.

L'interface `NewProductInterface` est utilisée pour définir la structure des données lors de la création d'un nouveau produit. L'utilisation de `Omit<ProductInterface, 'id'>` permet de créer une nouvelle interface qui contient toutes les propriétés de ProductInterface sauf id, car un nouvel objet produit n'a pas encore d'identifiant. Lors de la création d'un nouveau produit, l'ID sera généré par le serveur JSON

L'interface `PatchProductInterface` est utilisée pour les opérations de mise à jour partielle (patch) d'un produit. L'utilisation de `Partial<NewProductInterface>` permet de créer une nouvelle interface où toutes les propriétés de `NewProductInterface` sont optionnelles. Cela est utile pour les opérations de mise à jour partielle où seules certaines propriétés d'un produit peuvent être modifiés.

## Installation et lancement de l'application

### Prérequis

- Node.js (version 12 ou supérieure)
- Angular CLI (version 12 ou supérieure)
- JSON Server (pour simuler une API RESTful)

### Étapes d'installation

1. **Télécharger et extraire l'archive**

   Téléchargez l'archive `angularcrud.zip` et extrayez-la dans le répertoire de votre choix.

   ```sh
   unzip angularcrud.zip
   cd angularcrud

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
