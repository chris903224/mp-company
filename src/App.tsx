import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './admin/AdminPage';

export default function App() {
  return (
    <Routes>
      {/* Public Site */}
      <Route path="/" element={<HomePage />} />
      
      {/* Admin Dashboard */}
      <Route path="/admin" element={<AdminPage />} />

      {/* 404 Fallback */}
      <Route 
        path="*" 
        element={
          <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
            <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>Oops! Hindi namin mahanap ang page na hinahanap mo.</p>
            <Link to="/" style={{ padding: '1rem 2rem', background: '#111', color: '#fff', textDecoration: 'none', borderRadius: '100px', fontWeight: 600 }}>
              Bumalik sa Home
            </Link>
          </div>
        } 
      />
    </Routes>
  );
}