import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import type { AdminState } from './useAdmin';
import { STAGES, SERVICES_LIST } from './adminData';
import { Ic } from './AdminIcons';

export default function DashboardView({ admin }: { admin: AdminState }) {
  const c1Ref = useRef<HTMLCanvasElement>(null);
  const c2Ref = useRef<HTMLCanvasElement>(null);
  const c3Ref = useRef<HTMLCanvasElement>(null);
  const sp0Ref = useRef<HTMLCanvasElement>(null);
  const sp1Ref = useRef<HTMLCanvasElement>(null);
  const sp2Ref = useRef<HTMLCanvasElement>(null);
  const sp3Ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const isDark = admin.theme === 'dark';
    const ink = isDark ? '#f8fafc' : '#111827';
    const on = isDark ? '#111827' : '#fff';
    const mut = isDark ? '#94a3b8' : '#6b7280';
    const soft = isDark ? '#1e293b' : '#f3f4f6';
    const grid = isDark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.06)';
    const dn = isDark ? ['#f8fafc', '#94a3b8', '#64748b', '#334155'] : ['#111827', '#6b7280', '#9ca3af', '#e5e7eb'];

    const tip = { backgroundColor: ink, titleColor: on, bodyColor: on, cornerRadius: 12, padding: 10, displayColors: false };

    // --- 1. DYNAMIC CALCULATIONS PARA SA GRAPHS ---

    // Para sa Line Chart (Inquiries vs completed) - I-group natin per month (base sa 'date' text mo)
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const inquiriesPerMonth = new Array(12).fill(0);
    const completedPerMonth = new Array(12).fill(0);

    admin.inquiries.forEach(inq => {
      // Assuming format ng date mo ay "Nov 18" or "Nov 18, 2023"
      const monthStr = inq.date.split(' ')[0]; 
      const monthIdx = monthLabels.indexOf(monthStr);
      if (monthIdx !== -1) {
        inquiriesPerMonth[monthIdx]++;
        if (inq.stage === 3) { // Assuming stage 3 ay "Technical Assistance" (Completed)
          completedPerMonth[monthIdx]++;
        }
      }
    });

    // Slice natin para lang sa mga recent months (e.g., last 8 months) para hindi siksikan
    const recentMonths = monthLabels.slice(3, 11); // Apr to Nov (base sa design mo)
    const recentInquiries = inquiriesPerMonth.slice(3, 11);
    const recentCompleted = completedPerMonth.slice(3, 11);

    const c1 = new Chart(c1Ref.current!, {
      type: 'line',
      data: {
        labels: recentMonths,
        datasets: [
          { 
            label: 'Inquiries', 
            data: recentInquiries, 
            borderColor: ink, 
            tension: .4, 
            borderWidth: 2.5, 
            pointRadius: 0, 
            fill: true, 
            backgroundColor: (ctx) => { const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 150); g.addColorStop(0, isDark ? 'rgba(255,255,255,.22)' : 'rgba(0,0,0,.15)'); g.addColorStop(1, 'rgba(128,128,128,0)'); return g; } 
          },
          { 
            label: 'Done', 
            data: recentCompleted, 
            borderColor: mut, 
            borderDash: [5, 5], 
            tension: .4, 
            borderWidth: 2.5, 
            pointRadius: 0 
          }
        ]
      },
      options: { maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, plugins: { legend: { display: false }, tooltip: tip }, scales: { x: { grid: { display: false }, border: { display: false } }, y: { grid: { color: grid }, border: { display: false }, ticks: { maxTicksLimit: 4, stepSize: 1 } } } }
    });

    // Para sa Doughnut Chart (Service Categories) - Bilangin kung ilan per service
    const serviceCounts = SERVICES_LIST.map((_, index) => 
      admin.inquiries.filter(inq => inq.serviceindex === index).length
    );

    const c2 = new Chart(c2Ref.current!, {
      type: 'doughnut',
      data: { 
        labels: SERVICES_LIST, 
        datasets: [{ 
          data: serviceCounts, // <--- DYNAMIC NA
          backgroundColor: dn, 
          borderWidth: 0, 
          spacing: 3, 
          borderRadius: 8, 
          hoverOffset: 6 
        }] 
      },
      options: { maintainAspectRatio: false, cutout: '72%', plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 7, padding: 9, font: { size: 9 }, color: mut } }, tooltip: tip } }
    });

    // Para sa Bar Chart (Process pipeline) - Bilangin per stage
    const barData = STAGES.map((_, i) => admin.inquiries.filter(x => x.stage === i).length);
    const maxIdx = barData.indexOf(Math.max(...barData));
    const c3 = new Chart(c3Ref.current!, {
      type: 'bar',
      data: { labels: ['01 Consult', '02 Assess', '03 Implement', '04 Assist'], datasets: [{ data: barData, borderRadius: 60, borderSkipped: false, barPercentage: .72, backgroundColor: (ctx) => ctx.dataIndex === maxIdx ? ink : soft, hoverBackgroundColor: ink }] },
      options: { maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: tip }, scales: { x: { grid: { display: false }, border: { display: false }, ticks: { color: mut } }, y: { grid: { color: grid }, border: { display: false }, ticks: { color: mut, precision: 0, maxTicksLimit: 5 } } } }
    });

    // Helper para sa Sparklines
    const spark = (ref: any, data: number[], color: string) => new Chart(ref.current!, {
      type: 'line',
      data: { labels: data.map((_, i) => i), datasets: [{ data, borderColor: color, borderWidth: 2, tension: .45, pointRadius: 0 }] },
      options: { events: [], plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } }
    });

    // --- 2. DYNAMIC SPARKLINES ---
    // Gumawa tayo ng maliit na trend based sa recentInquiries at recentCompleted
    const sp0Data = recentInquiries.length ? recentInquiries : [0,0,0,0]; // Client inquiries
    const sp1Data = STAGES.map((_, i) => admin.inquiries.filter(x => x.stage === i).length); // Active projects trend (per stage)
    const sp2Data = recentCompleted.length ? recentCompleted : [0,0,0,0]; // Completed projects
    const sp3Data = [2.4, 2.2, 2.5, 2.1, 2.3, 2.0, 2.2, 2.4]; // Avg reply (Hard to compute without timestamps, keep as is or mock trend)

    const sp0 = spark(sp0Ref, sp0Data, on);
    const sp1 = spark(sp1Ref, sp1Data, ink);
    const sp2 = spark(sp2Ref, sp2Data, ink);
    const sp3 = spark(sp3Ref, sp3Data, ink);

    return () => [c1, c2, c3, sp0, sp1, sp2, sp3].forEach(c => c.destroy());
  }, [admin.theme, admin.inquiries]);

  return (
    <section id="v-dash" className="view on">
      <div className="c1">
        <div className="card hero">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ opacity: .65 }}>Client inquiries</div>
              <div style={{ opacity: .45, fontSize: '.85rem' }}>in the queue</div>
            </div>
            <span className="circ"><Ic name="arrow" s={18} /></span>
          </div>
          <div className="big">{admin.inquiries.length}</div>
          <div className="cv" style={{ maxHeight: '4.3rem' }}><canvas ref={sp0Ref}></canvas></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', opacity: .55, fontSize: '.85rem' }}>
            <span>Santa Mesa, Manila</span><span>{new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
        
        <div className="card">
          <div className="kr">
            <div><div className="mut">Active projects</div><div className="kv">{admin.inquiries.filter(i => i.stage > 0 && i.stage < 3).length}</div></div>
            <div className="spw"><canvas ref={sp1Ref}></canvas></div>
          </div>
          <div className="kr">
            <div><div className="mut">Completed projects</div><div className="kv">{admin.inquiries.filter(i => i.stage === 3).length}</div></div>
            <div className="spw"><canvas ref={sp2Ref}></canvas></div>
          </div>
          <div className="kr">
            <div><div className="mut">Avg. first reply</div><div className="kv">2.4 hrs</div></div>
            <div className="spw"><canvas ref={sp3Ref}></canvas></div>
          </div>
        </div>
      </div>

      <div className="card c2">
        <div className="hd">
          <span className="circ"><Ic name="network" s={18} /></span>
          <b>Process pipeline</b>
        </div>
        <div className="mut" style={{ margin: '-0.3rem 0 0.5rem 3.4rem' }}>Active clients per stage</div>
        <div className="cv"><canvas ref={c3Ref}></canvas></div>
      </div>

      <div className="c3">
        <div className="card">
          <div className="hd">
            <b>Inquiries vs completed</b>
            <div className="lgd"><span><i></i>Inquiries</span><span><i className="g"></i>Done</span></div>
          </div>
          <div className="cv"><canvas ref={c1Ref}></canvas></div>
        </div>
        <div className="card">
          <div className="hd"><b>Service categories</b></div>
          <div className="cv"><canvas ref={c2Ref}></canvas></div>
        </div>
      </div>

      <div className="card tblc">
        <div className="hd">
          <b>Client inquiries <span className="mut">({admin.filteredInquiries.length})</span></b>
          <div style={{ display: 'flex', gap: '.8rem', marginLeft: 'auto' }}>
            <input className="inp" style={{ width: '17rem' }} placeholder="Search name, company, email" value={admin.search} onChange={(e) => admin.setSearch(e.target.value)} />
            <select className="inp" value={admin.stageFilter} onChange={(e) => admin.setStageFilter(e.target.value)}>
              <option value="">All stages</option>
              {STAGES.map((s, i) => <option key={i} value={i}>{i + 1} · {s}</option>)}
            </select>
          </div>
        </div>
        <div className="tw">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Service needed</th>
                <th>Received</th>
                <th>Stage</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {admin.filteredInquiries.map(inq => (
                <tr key={inq.id} onClick={() => admin.setSelectedInquiry(inq)}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
                      <span className="ini">{inq.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</span>
                      <div><div style={{ fontWeight: 600 }}>{inq.name}</div><div className="mut">{inq.company}</div></div>
                    </div>
                  </td>
                  <td>{SERVICES_LIST[inq.serviceindex]}</td>
                  <td>{inq.date}</td>
                  <td><span className="dot" style={{ opacity: [.3, .55, .8, 1][inq.stage] }}></span>{STAGES[inq.stage]}</td>
                  <td className="mut">{inq.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}