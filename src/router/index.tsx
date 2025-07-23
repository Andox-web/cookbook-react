import { Routes, Route } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import { Home } from '../features/recipe/pages/Home/Home';
import { Favorites } from '../features/recipe/pages/Favorites/Favorites';
import { RecipeDetail } from '../features/recipe/pages/RecipeDetail/RecipeDetail';
import { AddRecipe } from '../features/recipe/pages/add/AddRecipe';

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <AppLayout>
          <Home />
        </AppLayout>
      }
    />
    <Route
      path="/add"
      element={
        <AppLayout>
          <AddRecipe />
        </AppLayout>
      }
    />
    <Route
      path="/favorites"
      element={
        <AppLayout>
          <Favorites />
        </AppLayout>
      }
    />
    <Route
      path="/recipes/:id"
      element={
        <AppLayout>
          <RecipeDetail />
        </AppLayout>
      }
    />
  </Routes>
);

export default AppRoutes;
