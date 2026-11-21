// src/admin/ServicesView.tsx
import { useState, useEffect } from 'react';
import type { AdminState } from './useAdmin';
import type { BusinessInfo, ServicesInfo } from './adminData'; // ✅ Tamang types
import { Ic } from './AdminIcons';

export default function ServicesView({ admin }: { admin: AdminState }) {
  const [form, setForm] = useState<Partial<BusinessInfo>>({ 
    phone: '', 
    email: '', 
    hours: '', 
    address: '' 
  });
  
  const [svcForm, setSvcForm] = useState<Partial<ServicesInfo>>({ 
    network_desc: '', 
    cctv_desc: '', 
    hardware_desc: '' 
  });

  // I-load ang Business Info
  useEffect(() => {
    if (admin.businessInfo) {
      setForm({
        phone: admin.businessInfo.phone || '',
        email: admin.businessInfo.email || '',
        hours: admin.businessInfo.hours || '',
        address: admin.businessInfo.address || ''
      });
    }
  }, [admin.businessInfo]);

  // I-load ang Services Info
  useEffect(() => {
    if (admin.servicesInfo) {
      setSvcForm({
        network_desc: admin.servicesInfo.network_desc || '',
        cctv_desc: admin.servicesInfo.cctv_desc || '',
        hardware_desc: admin.servicesInfo.hardware_desc || ''
      });
    }
  }, [admin.servicesInfo]);

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSvcChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSvcForm({ ...svcForm, [e.target.name]: e.target.value });
  };

  return (
    <section id="v-svc" className="view on" style={{ alignContent: 'start', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
      
      {/* SERVICES FORM */}
      <div className="card" style={{ alignSelf: 'start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <span className="circ" style={{ background: 'var(--soft)' }}><Ic name="wrench" s={18} /></span>
          <div>
            <b style={{ fontSize: '1.2rem' }}>Our Services</b>
            <div className="mut">I-type dito ang descriptions na lalabas sa public site.</div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div>
            <label className="mut" style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginBottom: '0.5rem' }}>
              <Ic name="network" s={16} /> Network Cabling & Infrastructure
            </label>
            <textarea 
              name="network_desc" 
              value={svcForm.network_desc || ''} 
              onChange={handleSvcChange} 
              className="inp" 
              rows={3} 
              placeholder="Structured cabling installation..." 
            />
          </div>

          <div>
            <label className="mut" style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginBottom: '0.5rem' }}>
              <Ic name="video" s={16} /> CCTV & Security System
            </label>
            <textarea 
              name="cctv_desc" 
              value={svcForm.cctv_desc || ''} 
              onChange={handleSvcChange} 
              className="inp" 
              rows={3} 
              placeholder="Supply and professional installation..." 
            />
          </div>

          <div>
            <label className="mut" style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginBottom: '0.5rem' }}>
              <Ic name="monitor" s={16} /> IT Hardware Supply
            </label>
            <textarea 
              name="hardware_desc" 
              value={svcForm.hardware_desc || ''} 
              onChange={handleSvcChange} 
              className="inp" 
              rows={3} 
              placeholder="Sourcing and supply of desktop computers..." 
            />
          </div>
        </div>

        <button 
          className="btn" 
          onClick={() => admin.updateServicesInfo({ ...(admin.servicesInfo || {}), ...svcForm })} 
          style={{ marginTop: '1.5rem', width: '100%' }}
        >
          Save Services
        </button>
      </div>

      {/* BUSINESS INFO FORM */}
      <div className="card" style={{ alignSelf: 'start' }}>
        <b style={{ fontSize: '1.1rem' }}>Business information</b>
        <div className="mut" style={{ marginBottom: '1.5rem' }}>Lalabas ito sa Contact at Footer ng public site.</div>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label className="mut" style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginBottom: '0.5rem' }}>
              <Ic name="phone" s={16} /> Official phone
            </label>
            <input 
              name="phone" 
              value={form.phone || ''} 
              onChange={handleInfoChange} 
              className="inp" 
              placeholder="+63 …" 
            />
          </div>
          
          <div>
            <label className="mut" style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginBottom: '0.5rem' }}>
              <Ic name="mail" s={16} /> Business email
            </label>
            <input 
              name="email" 
              value={form.email || ''} 
              onChange={handleInfoChange} 
              className="inp" 
              placeholder="name@company.com" 
            />
          </div>

          <div>
            <label className="mut" style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginBottom: '0.5rem' }}>
              <Ic name="clock" s={16} /> Operating hours
            </label>
            <input 
              name="hours" 
              value={form.hours || ''} 
              onChange={handleInfoChange} 
              className="inp" 
              placeholder="Mon–Fri, 8:00 AM – 5:00 PM" 
            />
          </div>

          <div>
            <label className="mut" style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginBottom: '0.5rem' }}>
              <Ic name="mapPin" s={16} /> Address
            </label>
            <textarea 
              name="address" 
              value={form.address || ''} 
              onChange={handleInfoChange} 
              className="inp" 
              rows={2} 
              placeholder="Donia Elena Tower..." 
            />
          </div>
        </div>
        
        <button 
          className="btn" 
          onClick={() => admin.updateBusinessInfo({ ...(admin.businessInfo || {}), ...form })} 
          style={{ marginTop: '1.5rem', width: '100%' }}
        >
          Save changes
        </button>
      </div>
    </section>
  );
}