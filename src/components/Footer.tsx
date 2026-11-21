import type { BusinessInfo } from '../hooks/useSiteData';

interface FooterProps {
  business: BusinessInfo | null;
}

export default function Footer({ business }: FooterProps) {
  return (
    <footer>
      <div className="wrap">
        <div className="fg">
          <div>
            <a
              className="logo"
              href="#home"
              style={{ display: 'inline-block', textAlign: 'left', marginBottom: 14, color: 'var(--ink)' }}
            >
              MP Micro<small>IT Solutions</small>
            </a>
            <p>IT services and hardware solutions, based in Santa Mesa, Manila.</p>
          </div>
          <div>
            <h2>Navigate</h2>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#walkthrough">Projects</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h2>Services</h2>
            <ul>
              <li><a href="#services">Network Cabling</a></li>
              <li><a href="#services">IT Hardware Supply</a></li>
              <li><a href="#services">CCTV &amp; Security</a></li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li>{business?.address || 'Donia Elena Tower, P. Sanchez St. corner 3rd St., Santa Mesa, Manila'}</li>
              <li>
                <a href={`tel:${business?.phone?.replace(/\s/g, '') || '+639567296257'}`}>
                  {business?.phone || '+63 956 729 6257'}
                </a>
              </li>
              <li>
                {/* ✅ Naka-mailto na link at dynamic fallback */}
                <a 
                  href={`mailto:${business?.email || 'mpmicroitsolutions@gmail.com'}`}
                  style={{ wordBreak: 'break-all' }} // Para hindi umapaw sa mobile
                >
                  {business?.email || 'mpmicroitsolutions@gmail.com'}
                </a>
              </li>
              <li>{business?.hours || 'Mon – Fri, 8:00 AM – 5:00 PM'}</li>
            </ul>
          </div>
        </div>
        <div className="copy">
          <span>
            © <span id="yr">{new Date().getFullYear()}</span> MP Micro IT Solutions. All rights reserved.
          </span>
          <span>Content pending owner confirmation.</span>
        </div>
      </div>
    </footer>
  );
}