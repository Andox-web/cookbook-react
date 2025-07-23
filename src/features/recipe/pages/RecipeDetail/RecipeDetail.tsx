import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaClock,
  FaStar,
  FaRegStar,
  FaUtensils,
  FaArrowLeft,
  FaLeaf,
  FaEdit,
  FaSave,
  FaTrash,
  FaPlus,
  FaTimes,
  FaPlusCircle,
} from 'react-icons/fa';
import styles from './RecipeDetail.module.css';
import type { Recipe } from '../../types/RecipeTypes';
import { RecipeService } from '../../services/recipeService';

const createEmptyRecipe = (): Recipe => ({
  id: Date.now().toString(),
  title: 'Nouvelle Recette',
  image: '',
  duration: 0,
  ingredients: [''],
  steps: [''],
  category: 'Autre',
  isFavorite: false,
});

export const RecipeDetail: React.FC<{ isNew?: boolean }> = ({ isNew = false }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(isNew ? createEmptyRecipe() : null);
  const [isEditing, setIsEditing] = useState(isNew);
  const [editedRecipe, setEditedRecipe] = useState<Recipe | null>(
    isNew ? createEmptyRecipe() : null,
  );
  const [isLoading, setIsLoading] = useState(!isNew);
  const isEditingRef = useRef(isEditing);

  useEffect(() => {
    isEditingRef.current = isEditing;
  }, [isEditing]);

  const loadRecipe = useCallback(() => {
    if (id && !isNew) {
      const foundRecipe = RecipeService.getById(id);
      setRecipe(foundRecipe || null);
      setIsLoading(false);
    } else if (isNew) {
      setIsLoading(false);
    }
  }, [id, isNew]);

  useEffect(() => {
    loadRecipe();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'recipes' && id && !isEditingRef.current) {
        loadRecipe();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [id, loadRecipe]);

  useEffect(() => {
    if (isEditing && recipe) {
      setEditedRecipe({ ...recipe });
    }
  }, [isEditing, recipe]);

  const handleToggleFavorite = () => {
    if (recipe) {
      RecipeService.toggleFavorite(recipe.id);
      setRecipe({ ...recipe, isFavorite: !recipe.isFavorite });
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && recipe) {
      setEditedRecipe({ ...recipe });
    }
  };

  const handleSave = () => {
    if (editedRecipe) {
      if (isNew) {
        RecipeService.add(editedRecipe);
        navigate(`/recipes/${editedRecipe.id}`);
      } else {
        RecipeService.update(editedRecipe);
        setRecipe(editedRecipe);
        setIsEditing(false);
      }
    }
  };

  const handleCancel = () => {
    if (isNew) {
      navigate('/');
    } else {
      setIsEditing(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditedRecipe((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleIngredientChange = (index: number, value: string) => {
    setEditedRecipe((prev) => {
      if (!prev) return null;
      const newIngredients = [...prev.ingredients];
      newIngredients[index] = value;
      return { ...prev, ingredients: newIngredients };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedRecipe((prev) =>
          prev
            ? {
                ...prev,
                image: reader.result as string,
              }
            : null,
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStepChange = (index: number, value: string) => {
    setEditedRecipe((prev) => {
      if (!prev) return null;
      const newSteps = [...prev.steps];
      newSteps[index] = value;
      return { ...prev, steps: newSteps };
    });
  };

  const addIngredient = () => {
    setEditedRecipe((prev) =>
      prev
        ? {
            ...prev,
            ingredients: [...prev.ingredients, ''],
          }
        : null,
    );
  };

  const removeIngredient = (index: number) => {
    setEditedRecipe((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index),
      };
    });
  };

  const addStep = () => {
    setEditedRecipe((prev) =>
      prev
        ? {
            ...prev,
            steps: [...prev.steps, ''],
          }
        : null,
    );
  };

  const removeStep = (index: number) => {
    setEditedRecipe((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        steps: prev.steps.filter((_, i) => i !== index),
      };
    });
  };

  if (isLoading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (!recipe && !isNew) {
    return (
      <div className={styles.notFound}>
        <h2>Recette non trouvée</h2>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          <FaArrowLeft /> Retour à l'accueil
        </button>
      </div>
    );
  }

  const displayRecipe = isEditing ? editedRecipe : recipe;
  const isCreating = isNew && isEditing;

  return (
    <div className={styles.detailContainer}>
      {!isCreating && (
        <button onClick={() => navigate('/')} className={styles.backButton}>
          <FaArrowLeft /> Retour
        </button>
      )}

      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          {isEditing ? (
            <div className={styles.imageContainer}>
              {displayRecipe?.image ? (
                <img src={displayRecipe.image} alt={displayRecipe.title} className={styles.image} />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <FaPlusCircle size={48} color="#b7efc5" />
                  <span>Aucune image sélectionnée</span>
                </div>
              )}
              <div className={styles.fileInputContainer}>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.fileInput}
                />
                <label htmlFor="imageUpload" className={styles.fileInputLabel}>
                  Choisir une image
                </label>
              </div>
            </div>
          ) : displayRecipe?.image ? (
            <div className={styles.imageContainer}>
              <img src={displayRecipe.image} alt={displayRecipe.title} className={styles.image} />
            </div>
          ) : null}
        </div>

        <div className={styles.rightColumn}>
          {isCreating ? (
            <div className={styles.newRecipeHeader}>
              <h1 className={styles.newRecipeTitle}>
                <FaPlus /> Création d'une nouvelle recette
              </h1>
            </div>
          ) : null}

          <div className={`${styles.header} ${isEditing ? styles.headerEditing : ''}`}>
            <div className={styles.titleSection}>
              {isEditing ? (
                <input
                  type="text"
                  name="title"
                  value={displayRecipe?.title || ''}
                  onChange={handleChange}
                  className={styles.editTitle}
                  placeholder="Titre de votre recette"
                />
              ) : (
                <h1 className={styles.title}>
                  <FaUtensils /> {displayRecipe?.title}
                </h1>
              )}

              {!isNew && !isEditing && (
                <button
                  className={styles.favButton}
                  onClick={handleToggleFavorite}
                  aria-label={recipe?.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                >
                  {recipe?.isFavorite ? (
                    <FaStar color="#ffd700" size={24} />
                  ) : (
                    <FaRegStar color="#38b000" size={24} />
                  )}
                </button>
              )}
            </div>

            <div className={styles.actions}>
              {!isNew && (
                <button
                  onClick={handleEditToggle}
                  className={isEditing ? styles.cancelButton : styles.editButton}
                >
                  {isEditing ? <FaTimes /> : <FaEdit />}
                  {isEditing ? ' Annuler' : ' Modifier'}
                </button>
              )}

              {isEditing && (
                <button onClick={handleSave} className={styles.saveButton}>
                  <FaSave /> {isNew ? 'Créer la recette' : 'Enregistrer'}
                </button>
              )}

              {isCreating && (
                <button onClick={handleCancel} className={styles.cancelButton}>
                  <FaTimes /> Annuler
                </button>
              )}
            </div>
          </div>

          <div className={styles.metaInfo}>
            <div className={styles.metaItem}>
              <FaClock className={styles.icon} />
              <span className={styles.metaLabel}>Temps de préparation:</span>
              {isEditing ? (
                <input
                  type="number"
                  name="duration"
                  value={displayRecipe?.duration || 0}
                  onChange={handleChange}
                  className={styles.editNumberInput}
                  min="1"
                />
              ) : (
                <span className={styles.metaValue}>{displayRecipe?.duration} minutes</span>
              )}
            </div>
            <div className={styles.metaItem}>
              <FaLeaf className={styles.icon} />
              <span className={styles.metaLabel}>Catégorie:</span>
              {isEditing ? (
                <select
                  name="category"
                  value={displayRecipe?.category || ''}
                  onChange={handleChange}
                  className={styles.editSelect}
                >
                  <option value="Entrée">Entrée</option>
                  <option value="Plat">Plat</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Boisson">Boisson</option>
                  <option value="Autre">Autre</option>
                </select>
              ) : (
                <span className={styles.metaValue}>{displayRecipe?.category}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Ingrédients</h2>
          {isEditing && (
            <button onClick={addIngredient} className={styles.addButton}>
              <FaPlus /> Ajouter
            </button>
          )}
        </div>

        {isEditing ? (
          <div className={styles.editableList}>
            {displayRecipe?.ingredients.map((ingredient, index) => (
              <div key={index} className={styles.editableItem}>
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className={styles.editInput}
                  placeholder="Ingrédient"
                />
                <button
                  onClick={() => removeIngredient(index)}
                  className={styles.removeButton}
                  aria-label="Supprimer"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <ul className={styles.ingredientList}>
            {displayRecipe?.ingredients.map((ingredient, index) => (
              <li key={index} className={styles.ingredientItem}>
                {ingredient}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Préparation</h2>
          {isEditing && (
            <button onClick={addStep} className={styles.addButton}>
              <FaPlus /> Ajouter une étape
            </button>
          )}
        </div>

        {isEditing ? (
          <div className={styles.editableList}>
            {displayRecipe?.steps.map((step, index) => (
              <div key={index} className={styles.editableItem}>
                <span className={styles.stepNumber}>{index + 1}.</span>
                <textarea
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  className={styles.editTextarea}
                  placeholder="Description de l'étape"
                  rows={3}
                />
                <button
                  onClick={() => removeStep(index)}
                  className={styles.removeButton}
                  aria-label="Supprimer"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <ol className={styles.stepsList}>
            {displayRecipe?.steps.map((step, index) => (
              <li key={index} className={styles.stepItem}>
                <span className={styles.stepNumber}>{index + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};
