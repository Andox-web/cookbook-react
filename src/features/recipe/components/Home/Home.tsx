import React, { useEffect, useState } from 'react';
import type { Recipe, RecipeCategory } from '../../types/RecipeTypes';
import { RecipeService } from '../../services/recipeService';
import { FaLeaf, FaClock, FaStar, FaRegStar, FaUtensils, FaEye, FaSearch } from 'react-icons/fa';
import styles from './Home.module.css';

const testRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Salade César',
    image: 'test.jpg',
    duration: 15,
    category: 'Entrée',
    ingredients: ['Laitue', 'Poulet', 'Parmesan', 'Croûtons', 'Sauce César'],
    steps: ['Laver la laitue', 'Cuire le poulet', 'Mélanger tous les ingrédients'],
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Spaghetti Bolognaise',
    image: 'test.jpg',
    duration: 40,
    category: 'Plat',
    ingredients: ['Spaghetti', 'Viande hachée', 'Tomates', 'Oignon', 'Ail'],
    steps: ['Cuire les pâtes', 'Préparer la sauce', 'Mélanger et servir'],
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Tiramisu',
    image: 'test.jpg',
    duration: 30,
    category: 'Dessert',
    ingredients: ['Mascarpone', 'Café', 'Biscuits', 'Oeufs', 'Cacao'],
    steps: ['Préparer la crème', 'Tremper les biscuits', 'Monter le dessert'],
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Quiche Lorraine',
    image: 'test.jpg',
    duration: 50,
    category: 'Plat',
    ingredients: ['Pâte brisée', 'Lardons', 'Crème', 'Oeufs', 'Gruyère'],
    steps: ['Préparer la pâte', 'Mélanger la garniture', 'Cuire au four'],
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Soupe de légumes',
    image: 'test.jpg',
    duration: 35,
    category: 'Entrée',
    ingredients: ['Carottes', 'Pommes de terre', 'Poireaux', 'Oignons', 'Bouillon'],
    steps: ['Éplucher les légumes', 'Cuire dans le bouillon', 'Mixer'],
    isFavorite: true,
  },
  {
    id: '6',
    title: 'Mojito',
    image: 'test.jpg',
    duration: 10,
    category: 'Boisson',
    ingredients: ['Menthe', 'Citron vert', 'Rhum', 'Eau gazeuse', 'Sucre'],
    steps: ['Écraser la menthe', 'Ajouter les ingrédients', 'Mélanger'],
    isFavorite: false,
  },
  {
    id: '7',
    title: 'Crêpes',
    image: 'test.jpg',
    duration: 25,
    category: 'Dessert',
    ingredients: ['Farine', 'Lait', 'Oeufs', 'Beurre', 'Sucre'],
    steps: ['Préparer la pâte', 'Cuire les crêpes', 'Servir chaud'],
    isFavorite: false,
  },
  {
    id: '8',
    title: 'Poulet curry',
    image: 'test.jpg',
    duration: 45,
    category: 'Plat',
    ingredients: ['Poulet', 'Curry', 'Crème', 'Oignons', 'Riz'],
    steps: ['Cuire le poulet', 'Ajouter le curry', 'Servir avec du riz'],
    isFavorite: true,
  },
  {
    id: '9',
    title: 'Salade de fruits',
    image: 'test.jpg',
    duration: 15,
    category: 'Dessert',
    ingredients: ['Fruits variés', 'Jus de citron', 'Sucre'],
    steps: ['Couper les fruits', 'Mélanger', 'Ajouter le jus de citron'],
    isFavorite: false,
  },
  {
    id: '10',
    title: 'Omelette',
    image: 'test.jpg',
    duration: 10,
    category: 'Plat',
    ingredients: ['Oeufs', 'Lait', 'Sel', 'Poivre', 'Beurre'],
    steps: ['Battre les oeufs', 'Cuire à la poêle', 'Servir chaud'],
    isFavorite: false,
  },
];

const categories: (RecipeCategory | 'Toutes')[] = [
  'Toutes',
  'Entrée',
  'Plat',
  'Dessert',
  'Boisson',
  'Autre',
];

export const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<RecipeCategory | 'Toutes'>('Toutes');

  useEffect(() => {
    if (RecipeService.getAll().length === 0) {
      testRecipes.forEach((r) => RecipeService.add(r));
    }
    setRecipes(RecipeService.getAll());
  }, []);

  const handleToggleFavorite = (id: string) => {
    RecipeService.toggleFavorite(id);
    setRecipes(RecipeService.getAll());
  };

  const handleSeeDetails = (id: string) => {
    // À remplacer par ta navigation ou modal
    alert('Voir détails pour la recette ' + id);
  };

  // Filtrage
  const filteredRecipes = recipes.filter((recipe) => {
    const matchCategory = category === 'Toutes' || recipe.category === category;
    const matchSearch =
      search.trim() === '' ||
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.some((ing) => ing.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div className={styles.homeBg}>
      <h1 className={styles.title}>
        <FaLeaf style={{ verticalAlign: 'middle', marginRight: 10 }} />
        Recettes
      </h1>
      <div className={styles.filterBar}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Rechercher une recette ou un ingrédient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <select
          className={styles.categorySelect}
          value={category}
          onChange={(e) => setCategory(e.target.value as RecipeCategory | 'Toutes')}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.cardGrid}>
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className={styles.card}>
            {recipe.image && <img src={recipe.image} alt={recipe.title} className={styles.img} />}
            <div className={styles.cardTitle}>
              <FaUtensils />
              {recipe.title}
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Catégorie :</span> {recipe.category}
              </div>
              <div className={styles.infoItem}>
                <FaClock color="#38b000" style={{ marginRight: 4 }} />
                <span className={styles.label}>Durée :</span> {recipe.duration} min
              </div>
            </div>
            <div className={styles.infoRow}></div>
            <div className={styles.infoRow}>
              <div className={styles.infoItem} style={{ width: '100%' }}>
                <span className={styles.label}>Ingrédients :</span>
                <span className={styles.ingredientText}>{recipe.ingredients.join(', ')}</span>
              </div>
            </div>
            <div className={styles.buttonRow}>
              <button
                className={styles.favBtn}
                title={recipe.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                onClick={() => handleToggleFavorite(recipe.id)}
              >
                {recipe.isFavorite ? <FaStar color="#38b000" /> : <FaRegStar color="#38b000" />}
              </button>
              <button
                className={styles.detailBtn}
                title="Voir détails"
                onClick={() => handleSeeDetails(recipe.id)}
              >
                <FaEye /> Voir détails
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
