export type RecipeCategory = 'Entrée' | 'Plat' | 'Dessert' | 'Boisson' | 'Autre';

export interface Recipe {
  id: string;
  title: string;
  image: string; // image encodée en base64 (ex: "data:image/png;base64,...")
  duration: number; // en minutes
  category: RecipeCategory;
  ingredients: string[];
  steps: string[];
  isFavorite: boolean;
}
