import { useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Ic } from './AdminIcons';

interface LayoutProps {
  activeTab: string;
  setActiveTab: (t: string) => void;
  theme: string;
  toggleTheme: () => void;
  children: ReactNode;
}

export default function AdminLayout({ activeTab, setActiveTab, theme, toggleTheme, children }: LayoutProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem('otp_verified');
    window.location.href = '/admin';
  };

  return (
    <div className="admin-wrapper" data-theme={theme}>
      <div className="shell">
        {/* TOP BAR */}
        <div className="top" role="banner">
          <button className="circ menu-btn" aria-label="Open menu"><Ic name="menu" /></button>

          <div className="logo">
            <span className="lg"><Ic name="cpu" /></span>
            <b>MP MICRO IT SOLUTIONS</b>
          </div>

          <nav className="tabs">
            <button className={`tab ${activeTab === 'dash' ? 'on' : ''}`} onClick={() => setActiveTab('dash')}>Dashboard</button>
            {/* IBINALIK ANG PROJECTS */}
            <button className={`tab ${activeTab === 'proj' ? 'on' : ''}`} onClick={() => setActiveTab('proj')}>Projects</button>
            <button className={`tab ${activeTab === 'svc' ? 'on' : ''}`} onClick={() => setActiveTab('svc')}>Services & info</button>
          </nav>

          <button className="circ" aria-label="Search"><Ic name="search" /></button>
          <button className="circ" aria-label="Notifications"><Ic name="bell" /><span className="nd"></span></button>
          <button className="circ" onClick={toggleTheme} aria-label="Toggle theme">
            <Ic name={theme === 'light' ? 'moon' : 'sun'} />
          </button>
          
          <button 
            className="circ" 
            onClick={() => setShowLogoutConfirm(true)}
            aria-label="Logout"
            title="Logout"
            style={{ color: 'var(--err, #ef4444)' }}
          >
            <Ic name="logout" />
          </button>

          <div className="av">MP</div>
        </div>

        {/* GREETING */}
        <div className="greet">
          <h1>Welcome Back, <span>Admin</span></h1>
          <div className="flex gap-2 flex-wrap">
            <div className="pillb"><Ic name="calendar" s={16} />Nov 1 – Nov 17, 2026</div>
            <button className="pillb" onClick={() => setActiveTab('svc')}><Ic name="building" s={16} />Business info</button>
          </div>
        </div>

        {/* MAIN */}
        <div className="main">
          <div className="slot">
            <div className="rail">
              <div className="grp">
                <button className={`it ${activeTab === 'dash' ? 'on' : ''}`} onClick={() => setActiveTab('dash')}><Ic name="dashboard" /><span>Dashboard</span></button>
                <button className="it" onClick={() => setActiveTab('dash')}><Ic name="inbox" /><span>Inquiries</span></button>
                {/* IBINALIK ANG PROJECTS */}
                <button className={`it ${activeTab === 'proj' ? 'on' : ''}`} onClick={() => setActiveTab('proj')}><Ic name="image" /><span>Projects</span></button>
                <button className={`it ${activeTab === 'svc' ? 'on' : ''}`} onClick={() => setActiveTab('svc')}><Ic name="wrench" /><span>Services</span></button>
              </div>
              <div className="grp">
                <button className="it" onClick={() => setActiveTab('svc')}><Ic name="building" /><span>Business info</span></button>
                <button className="it" onClick={toggleTheme}><Ic name={theme === 'light' ? 'moon' : 'sun'} /><span>Light / dark mode</span></button>
                
                <button className="it" onClick={() => setShowLogoutConfirm(true)} style={{ color: 'var(--err, #ef4444)' }}>
                  <Ic name="logout" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          <div className="content">{children}</div>
        </div>
      </div>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutConfirm && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <div className="logout-icon"><Ic name="logout" s={32} /></div>
            <h3>Are you sure?</h3>
            <p>You will be logged out of your admin session.</p>
            <div className="logout-actions">
              <button className="btn g" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
              <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}