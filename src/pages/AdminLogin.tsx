// src/pages/AdminLogin.tsx
import { useState } from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import '../admin/admin.css'; // Siguraduhing tama ang path sa css mo

export default function AdminLogin() {
  const { step, setStep, loading, error, handleLogin, handleVerifyOtp } = useAdminAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const onLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const onOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerifyOtp(otpCode);
  };

  return (
    <div className="admin-wrapper" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Logo Section */}
        <div style={{ textAlign: 'center' }}>
          <div className="lg" style={{ margin: '0 auto 16px', width: '56px', height: '56px', fontSize: '24px', borderRadius: '50%' }}>M</div>
          <h2 style={{ fontSize: '24px', margin: 0, fontWeight: 600 }}>Admin Portal</h2>
          <p className="mut" style={{ marginTop: '8px' }}>MP Micro IT Solutions</p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{ background: '#fef2f2', color: '#ef4444', padding: '12px', borderRadius: '8px', fontSize: '13px', textAlign: 'center', border: '1px solid #fecaca' }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        {step === 'login' ? (
          <form onSubmit={onLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="mut" style={{ display: 'block', marginBottom: '6px' }}>Email</label>
              <input 
                type="email" 
                className="inp" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="admin@mpmicro.com"
              />
            </div>
            <div>
              <label className="mut" style={{ display: 'block', marginBottom: '6px' }}>Password</label>
              <input 
                type="password" 
                className="inp" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="btn" style={{ marginTop: '8px', width: '100%' }} disabled={loading}>
              {loading ? 'Checking credentials...' : 'Login'}
            </button>
          </form>
        ) : (
          /* OTP Form */
          <form onSubmit={onOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '14px', textAlign: 'center', color: 'var(--mut)' }}>
              Enter the 6-digit code sent to <br />
              <b style={{ color: 'var(--ink)' }}>{email}</b>
            </p>
            <div>
              <label className="mut" style={{ display: 'block', marginBottom: '6px' }}>One-Time Password</label>
              <input 
                type="text" 
                className="inp" 
                value={otpCode} 
                onChange={(e) => setOtpCode(e.target.value)} 
                required 
                maxLength={6}
                placeholder="123456"
                style={{ letterSpacing: '8px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}
              />
            </div>
            <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Enter'}
            </button>
            <button 
              type="button" 
              className="btn g" 
              onClick={() => setStep('login')}
              disabled={loading}
              style={{ width: '100%' }}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}