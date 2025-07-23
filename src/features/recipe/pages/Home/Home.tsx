import React, { useEffect, useState } from 'react';
import type { Recipe, RecipeCategory } from '../../types/RecipeTypes';
import { RecipeService } from '../../services/recipeService';
import { FaLeaf, FaClock, FaStar, FaRegStar, FaUtensils, FaEye, FaSearch } from 'react-icons/fa';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    setRecipes(RecipeService.getAll());
  }, []);

  const handleToggleFavorite = (id: string) => {
    RecipeService.toggleFavorite(id);
    setRecipes(RecipeService.getAll());
  };

  const handleSeeDetails = (id: string) => {
    navigate(`/recipes/${id}`);
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
