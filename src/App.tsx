import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './admin/AdminPage';

export default function App() {
  return (
    <Routes>
      {/* Public Site */}
      <Route path="/" element={<HomePage />} />
      
      {/* Admin Dashboard */}
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}