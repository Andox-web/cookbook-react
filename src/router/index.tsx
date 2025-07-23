import { Routes, Route } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import { Home } from '../features/recipe/pages/Home/Home';
import { AddRecipe } from '../features/recipe/pages/add/AddRecipe';
import { Favorites } from '../features/recipe/pages/Favorites/Favorites';
import { RecipeDetail } from '../features/recipe/pages/RecipeDetail/RecipeDetail';

const AppRoutes = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route index element={<Home/>} />
      <Route path="add" element={<AddRecipe />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="recipes/:id" element={<RecipeDetail />} />
    </Route>
  </Routes>
);

export default AppRoutes;