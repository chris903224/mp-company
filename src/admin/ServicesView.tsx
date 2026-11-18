import { BUSINESS_INFO } from './adminData';

export default function ServicesView() {
  return (
    <section id="v-svc" className="view on" style={{ alignContent: 'start', gridTemplateColumns: '2fr 1fr' }}>
      <div className="card" style={{ alignSelf: 'start' }}>
        <b style={{ fontSize: '1.1rem' }}>Business information</b>
        <div className="mut" style={{ marginBottom: '1rem' }}>Stays “to be confirmed” until you fill it in.</div>
        
        <div className="grid gap-3">
          {BUSINESS_INFO.map((b, i) => (
            <div key={i}>
              <label className="mut">{b.label}</label>
              <input type={b.type} className="inp" placeholder={b.placeholder} />
            </div>
          ))}
        </div>
        
        <button className="btn mt-4">Save changes</button>
      </div>
    </section>
  );
}