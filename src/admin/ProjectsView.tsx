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
      {/* Header Card - Responsive Layout */}
      <div className="card" style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: '1.5rem', 
        flexWrap: 'wrap',
        padding: 'clamp(1rem, 3vw, 1.5rem)' 
      }}>
        <div style={{ flex: '1 1 250px', minWidth: '0' }}>
          <b style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', display: 'block', marginBottom: '0.2rem' }}>
            Project photos
          </b>
          <div className="mut" style={{ fontSize: 'clamp(0.8rem, 2vw, 1rem)', lineHeight: '1.5' }}>
            Set SAMPLE to false once the owner confirms a project is real. Its “Sample Image” badge disappears.
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: 'max-content'
        }}>
          <span className="mut" style={{ fontWeight: 600, fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}>
            {admin.projects.filter(p => !p.isSample).length} of {admin.projects.length} confirmed
          </span>
          <button 
            className="btn" 
            onClick={handleConfirmAll}
            style={{ 
              flex: '1 1 auto', 
              minWidth: '140px',
              padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)'
            }}
          >
            {admin.projects.every(p => !p.isSample) ? 'Mark all as sample' : 'Confirm all'}
          </button>
        </div>
      </div>
      
      {/* Grid of Projects - Responsive auto-fill */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: 'clamp(1rem, 3vw, 1.5rem)' 
      }}>
        {admin.projects.map(p => (
          <div key={p.id} className="card" style={{ padding: 'clamp(0.75rem, 2vw, 1rem)' }}>
            {/* Image Placeholder */}
            <div className="ph" style={{ 
              height: 'clamp(10rem, 25vw, 12rem)', 
              borderRadius: '1.5rem', 
              background: 'var(--soft)', 
              display: 'grid', 
              placeItems: 'center', 
              position: 'relative', 
              marginBottom: '1rem', 
              overflow: 'hidden' 
            }}>
              <Ic name={p.icon as any || 'image'} s={40} />
              {p.isSample && (
                <span className="tagb" style={{ position: 'absolute', top: '1rem', left: '1rem', fontSize: '0.75rem' }}>
                  Sample Image
                </span>
              )}
            </div>
            
            {/* Content */}
            <div style={{ padding: '0 0.5rem' }}>
              <b style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', display: 'block', marginBottom: '0.2rem' }}>
                {p.title || 'Untitled Project'}
              </b>
              <div className="mut" style={{ marginBottom: '1.2rem', fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}>
                {p.category || 'Uncategorized'}
              </div>
              
              {/* Footer (Toggle) */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                borderTop: '1px solid var(--line)', 
                paddingTop: '1rem',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <code style={{ fontWeight: 600, fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: 'var(--mut)' }}>
                  {/* ✅ SAFE FIX: Hindi na magc-crash kahit null o undefined */}
                  SAMPLE = {p.isSample?.toString() ?? 'false'}
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