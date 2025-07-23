# 🍳 Application de Gestion de Recettes de Cuisine

Application React complète pour **gérer, consulter et rechercher** des recettes culinaires avec persistance des données.

## 🚀 Fonctionnalités Principales

### 📋 Liste des Recettes
- Affichage des recettes avec : titre, image, durée, catégorie
- Vue condensée pour une navigation rapide

### 🔍 Détail d'une Recette
- Consultation complète : ingrédients, étapes de préparation
- Affichage des informations détaillées au clic

### ✨ Gestion des Recettes
- Ajout de nouvelles recettes via formulaire
- Édition des recettes existantes
- Validation des données saisies

### 🔎 Recherche & Filtres
- Recherche texte libre (titre, ingrédients)
- Filtrage par catégorie : Entrée, Plat, Dessert...
- Combinaison des filtres et recherche

### ⭐ Gestion des Favoris
- Marquage/démarquage des recettes favorites
- Liste dédiée pour accéder aux favoris

### 🔄 Persistance des Données
- Sauvegarde automatique dans `localStorage`
- Conservation des données entre les sessions
- Maintien des favoris après fermeture

### 🗺 Navigation Multi-Pages
- Routes dédiées avec React Router :
  - `/` : Accueil avec toutes les recettes
  - `/recipes/:id` : Détail d'une recette
  - `/add` : Ajout d'une nouvelle recette
  - `/favorites` : Recettes favorites