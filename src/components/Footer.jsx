import { Link } from "react-router-dom";
import brandLogo from "../assets/icons/Brand-logo.webp";
import { ArrowUpRight, Globe, Mail, MessageSquare, Share2 } from "lucide-react";

import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* Brand info */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={brandLogo} alt="STACKLY Logo" />
            </Link>
            <p className="footer-tagline">
              Discover inspiring events, hands-on workshops, and meaningful community connections. Built for innovators, creators, and future leaders.
            </p>
            <div className="footer-socials">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="Website">
                <Globe size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Community">
                <MessageSquare size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="Social">
                <Share2 size={18} />
              </a>
              <a href="mailto:support@stackly.events" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-links-col">
            <h4>Quick Navigation</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/explore">Explore Events</Link>
              </li>
              <li>
                <Link to="/registrations">My Registrations</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-links-col">
            <h4>Browse Categories</h4>
            <ul>
              <li>
                <Link to="/explore?category=Technology">Technology</Link>
              </li>
              <li>
                <Link to="/explore?category=Business">Business</Link>
              </li>
              <li>
                <Link to="/explore?category=Design">Design</Link>
              </li>
              <li>
                <Link to="/explore?category=Education">Education</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Notice */}
          <div className="footer-newsletter">
            <h4>Stay Connected</h4>
            <p>Get notified about upcoming workshops and speaker announcements.</p>
            <Link to="/explore" className="footer-explore-pill">
              <span>Find Upcoming Events</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {currentYear} STACKLY. Designed with Google developer aesthetics. All rights reserved.</p>
          <div className="footer-bottom-links">
            <span>Frontend React & LocalStorage Implementation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
