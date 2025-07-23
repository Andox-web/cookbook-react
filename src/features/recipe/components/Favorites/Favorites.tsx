import React, { useEffect, useState } from 'react';
import type { Recipe } from '../../types/RecipeTypes';
import { RecipeService } from '../../services/recipeService';
import { FaLeaf, FaClock, FaStar, FaRegStar, FaUtensils, FaEye } from 'react-icons/fa';
import styles from './Favorites.module.css';

export const Favorites: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    setRecipes(RecipeService.getFavorites());
  }, []);

  const handleToggleFavorite = (id: string) => {
    RecipeService.toggleFavorite(id);
    setRecipes(RecipeService.getFavorites());
  };

  const handleSeeDetails = (id: string) => {
    // À remplacer par ta navigation ou modal
    alert('Voir détails pour la recette ' + id);
  };

  return (
    <div className={styles.homeBg}>
      <h1 className={styles.title}>
        <FaLeaf style={{ verticalAlign: 'middle', marginRight: 10 }} />
        Vos Recettes Favorites
      </h1>
      <div className={styles.cardGrid}>
        {recipes.map((recipe) => (
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
