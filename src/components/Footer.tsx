import { BUSINESS } from '../data/content';

export default function Footer() {
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
              <li>{BUSINESS.address}</li>
              <li><a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a></li>
              <li className="ph">{BUSINESS.emailPendingShort}</li>
              <li>{BUSINESS.hoursShort}</li>
            </ul>
          </div>
        </div>
        <div className="copy">
          <span>
            © <span id="yr">{new Date().getFullYear()}</span> MP Micro IT Solutions. All rights
            reserved.
          </span>
          <span>Content pending owner confirmation.</span>
        </div>
      </div>
    </footer>
  );
}