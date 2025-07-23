export type RecipeCategory = 'Entrée' | 'Plat' | 'Dessert' | 'Boisson' | 'Autre';

export interface Recipe {
  id: string;
  title: string;
  image: string;
  duration: number; // en minutes
  category: RecipeCategory;
  ingredients: string[];
  steps: string[];
  isFavorite: boolean;
}
