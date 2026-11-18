import type { ReactNode } from 'react';
import { Ic } from './AdminIcons';

interface LayoutProps {
  activeTab: string;
  setActiveTab: (t: string) => void;
  theme: string;
  toggleTheme: () => void;
  children: ReactNode;
}

export default function AdminLayout({ activeTab, setActiveTab, theme, toggleTheme, children }: LayoutProps) {
  return (
    <div className="admin-wrapper" data-theme={theme}>
      <div className="shell">
        {/* TOP BAR — a <div>, not <header>, so global site header styles can't leak in */}
        <div className="top" role="banner">
          <button className="circ menu-btn" aria-label="Open menu"><Ic name="menu" /></button>

          <div className="logo">
            <span className="lg"><Ic name="cpu" /></span>
            <b>MP MICRO IT SOLUTIONS</b>
          </div>

          <nav className="tabs">
            <button className={`tab ${activeTab === 'dash' ? 'on' : ''}`} onClick={() => setActiveTab('dash')}>Dashboard</button>
            <button className={`tab ${activeTab === 'proj' ? 'on' : ''}`} onClick={() => setActiveTab('proj')}>Projects</button>
            <button className={`tab ${activeTab === 'svc' ? 'on' : ''}`} onClick={() => setActiveTab('svc')}>Services & info</button>
          </nav>

          <button className="circ" aria-label="Search"><Ic name="search" /></button>
          <button className="circ" aria-label="Notifications"><Ic name="bell" /><span className="nd"></span></button>
          <button className="circ" onClick={toggleTheme} aria-label="Toggle theme">
            <Ic name={theme === 'light' ? 'moon' : 'sun'} />
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
                <button className={`it ${activeTab === 'proj' ? 'on' : ''}`} onClick={() => setActiveTab('proj')}><Ic name="image" /><span>Projects</span></button>
                <button className={`it ${activeTab === 'svc' ? 'on' : ''}`} onClick={() => setActiveTab('svc')}><Ic name="wrench" /><span>Services</span></button>
              </div>
              <div className="grp">
                <button className="it" onClick={() => setActiveTab('svc')}><Ic name="building" /><span>Business info</span></button>
                <button className="it" onClick={toggleTheme}><Ic name={theme === 'light' ? 'moon' : 'sun'} /><span>Light / dark mode</span></button>
              </div>
            </div>
          </div>

          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
}