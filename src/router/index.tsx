import { Routes, Route } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AppLayout> ATO LAY PAGE / </AppLayout>} />
    <Route path="/add" element={<AppLayout>ATO LAY PAGE /add </AppLayout>} />
    <Route path="/favorites" element={<AppLayout>ATO LAY PAGE /favorites </AppLayout>} />
  </Routes>
);

export default AppRoutes;
