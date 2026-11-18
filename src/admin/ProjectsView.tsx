import type { AdminState } from './useAdmin';
import { Ic } from './AdminIcons';

export default function ProjectsView({ admin }: { admin: AdminState }) {
  
  const handleConfirmAll = async () => {
    // Kung lahat confirmed na, gagawin nating sample lahat. Kung hindi pa, iko-confirm lahat.
    const allConfirmed = admin.projects.every(p => !p.isSample);
    
    // I-loop natin at i-update isa-isa sa Supabase
    for (const p of admin.projects) {
      if (p.isSample === allConfirmed) {
        await admin.toggleProjectSample(p.id, p.isSample);
      }
    }
  };

  return (
    <section id="v-proj" className="view on" style={{ alignContent: 'start' }}>
      {/* Header Card */}
      <div className="card" style={{ flexDirection: 'row', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '17rem' }}>
          <b style={{ fontSize: '1.2rem', display: 'block', marginBottom: '0.2rem' }}>Project photos</b>
          <div className="mut">Set SAMPLE to false once the owner confirms a project is real. Its “Sample Image” badge disappears.</div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span className="mut" style={{ fontWeight: 600 }}>
            {admin.projects.filter(p => !p.isSample).length} of {admin.projects.length} confirmed
          </span>
          <button className="btn" onClick={handleConfirmAll}>
            {admin.projects.every(p => !p.isSample) ? 'Mark all as sample' : 'Confirm all'}
          </button>
        </div>
      </div>
      
      {/* Grid of Projects */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {admin.projects.map(p => (
          <div key={p.id} className="card" style={{ padding: '1rem' }}>
            {/* Image Placeholder */}
            <div className="ph" style={{ height: '12rem', borderRadius: '1.5rem', background: 'var(--soft)', display: 'grid', placeItems: 'center', position: 'relative', marginBottom: '1rem', overflow: 'hidden' }}>
              <Ic name={p.icon as any || 'image'} s={40} />
              {p.isSample && (
                <span className="tagb" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  Sample Image
                </span>
              )}
            </div>
            
            {/* Content */}
            <div style={{ padding: '0 0.5rem' }}>
              <b style={{ fontSize: '1.1rem', display: 'block', marginBottom: '0.2rem' }}>{p.title}</b>
              <div className="mut" style={{ marginBottom: '1.2rem' }}>{p.category}</div>
              
              {/* Footer (Toggle) */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--line)', paddingTop: '1rem' }}>
                <code style={{ fontWeight: 600, fontSize: '.85rem', color: 'var(--mut)' }}>
                  SAMPLE = {p.isSample.toString()}
                </code>
                <button 
                  className="tg" 
                  role="switch" 
                  aria-checked={p.isSample}
                  onClick={() => admin.toggleProjectSample(p.id, p.isSample)}
                >
                  <i></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}