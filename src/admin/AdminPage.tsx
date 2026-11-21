import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import DashboardView from './DashboardView';
import ProjectsView from './ProjectsView';
import ServicesView from './ServicesView';
import { useAdmin } from './useAdmin';
import { STAGES, SERVICES_LIST } from './adminData';
import { Ic } from './AdminIcons';
import AdminLogin from '../pages/AdminLogin'; // ✅ Idinagdag ang import
import './admin.css';

export default function AdminPage() {
  // 1. State para i-check kung verified na ang OTP
  const [isVerified, setIsVerified] = useState(false);

  // 2. I-check ang session storage pagka-load
  useEffect(() => {
    const verified = sessionStorage.getItem('otp_verified');
    if (verified === 'true') {
      setIsVerified(true);
    }
  }, []);

  const admin = useAdmin();

  // 3. Kapag hindi pa verified, ipakita ang Login page
  if (!isVerified) {
    return <AdminLogin />;
  }

  // 4. Kapag verified na, ipakita ang normal Admin Dashboard
  return (
    <AdminLayout 
      activeTab={admin.activeTab} 
      setActiveTab={admin.setActiveTab} 
      theme={admin.theme} 
      toggleTheme={admin.toggleTheme}
    >
      {admin.isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', fontSize: '1.2rem', color: 'var(--mut)' }}>
          Loading data from Supabase...
        </div>
      ) : (
        <>
          {admin.activeTab === 'dash' && <DashboardView admin={admin} />}
          {admin.activeTab === 'proj' && <ProjectsView admin={admin} />}
          {admin.activeTab === 'svc' && <ServicesView admin={admin} />}
        </>
      )}
      
      {/* Inquiry Modal */}
      <div id="md" className="ov" style={{ display: admin.selectedInquiry ? 'flex' : 'none' }}>
        {admin.selectedInquiry && (
          <div className="card" style={{ width: '100%', maxWidth: '40rem', gap: '0.9231rem' }} role="dialog" aria-modal="true">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7692rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 600 }}>{admin.selectedInquiry.name}</div>
                <div className="mut">{admin.selectedInquiry.company}</div>
              </div>
              <button className="circ" onClick={() => admin.setSelectedInquiry(null)} aria-label="Close modal">
                <Ic name="x" s={18} />
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7692rem' }}>
              <div>
                <div className="mut">Email</div>
                <div style={{ wordBreak: 'break-all' }}>{admin.selectedInquiry.email}</div>
              </div>
              <div>
                <div className="mut">Phone</div>
                <div>{admin.selectedInquiry.phone}</div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <div className="mut">Service needed</div>
                <div>
                  {admin.selectedInquiry.serviceindex !== undefined && admin.selectedInquiry.serviceindex !== null 
                    ? SERVICES_LIST[admin.selectedInquiry.serviceindex] 
                    : 'N/A'}
                </div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <div className="mut">Message</div>
                <div style={{ background: 'var(--bg)', borderRadius: '1.385rem', padding: '0.9231rem', marginTop: '0.3077rem' }}>
                  {admin.selectedInquiry.message}
                </div>
              </div>
            </div>

            <div>
              <label className="mut" style={{ display: 'block', marginBottom: '0.3077rem' }}>Process stage</label>
              <select className="inp" style={{ width: '100%' }} defaultValue={admin.selectedInquiry.stage} id="stageSelect">
                {STAGES.map((s, i) => <option key={i} value={i}>{i + 1} · {s}</option>)}
              </select>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6154rem', marginTop: '0.3077rem' }}>
              <button className="btn g" onClick={() => admin.setSelectedInquiry(null)}>Cancel</button>
              <button className="btn" onClick={() => {
                const val = (document.getElementById('stageSelect') as HTMLSelectElement).value;
                admin.updateStage(admin.selectedInquiry!.id, Number(val));
              }}>Update stage</button>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      <div id="toast" className={admin.toastMsg ? 'show' : ''}>
        {admin.toastMsg}
      </div>
    </AdminLayout>
  );
}