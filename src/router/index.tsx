import { Routes, Route } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import { Home } from '../features/recipe/components/Home/Home';
import { Favorites } from '../features/recipe/components/Favorites/Favorites';

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
    <Route path="/add" element={<AppLayout>ATO LAY PAGE /add </AppLayout>} />
    <Route
      path="/favorites"
      element={
        <AppLayout>
          <Favorites />
        </AppLayout>
      }
    />
  </Routes>
);

export default AppRoutes;
