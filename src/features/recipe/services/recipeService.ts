import type { Recipe } from '../types/RecipeTypes';

const STORAGE_KEY = 'recipes';

const getAll = (): Recipe[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveAll = (recipes: Recipe[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
};

export const RecipeService = {
  getAll,

  getById(id: string): Recipe | undefined {
    return getAll().find((r) => r.id === id);
  },

  add(recipe: Recipe): void {
    const recipes = getAll();
    recipes.push(recipe);
    saveAll(recipes);
  },

  update(updated: Recipe): void {
    const recipes = getAll().map((r) => (r.id === updated.id ? updated : r));
    saveAll(recipes);
  },

  toggleFavorite(id: string): void {
    const recipes = getAll().map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
    saveAll(recipes);
  },

  search(query: string, category?: string): Recipe[] {
    const lowerQuery = query.toLowerCase();
    return getAll().filter(
      (r) =>
        (r.title.toLowerCase().includes(lowerQuery) ||
          r.ingredients.some((i) => i.toLowerCase().includes(lowerQuery))) &&
        (!category || r.category === category),
    );
  },

  getFavorites(): Recipe[] {
    return getAll().filter((r) => r.isFavorite);
  },
};
