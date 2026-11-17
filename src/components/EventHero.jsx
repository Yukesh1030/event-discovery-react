import { motion } from "motion/react";
import { ArrowUpRight, CalendarDays, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

import "./EventHero.css";

function EventHero() {
  return (
    <section className="event-hero">
      <div className="hero-container">

        {/* Hero Content */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="hero-eyebrow">
            <span className="live-dot"></span>
            THE NEXT BIG TECH EXPERIENCE
          </div>

          <h1>
            Ideas become
            <span className="hero-highlight"> experiences.</span>
          </h1>

          <p className="hero-description">
            Discover inspiring events, hands-on workshops and
            meaningful connections. Your next big opportunity
            starts here.
          </p>

          <div className="hero-event-info">
            <div>
              <CalendarDays size={18} />
              <span>December 12, 2026</span>
            </div>

            <div>
              <MapPin size={18} />
              <span>Bengaluru, India</span>
            </div>

            <div>
              <Users size={18} />
              <span>500+ Attendees</span>
            </div>
          </div>

          <div className="hero-actions">
            <Link to="/explore" className="hero-primary-btn">
              Explore Events
              <ArrowUpRight size={19} />
            </Link>

            <a href="#featured-events" className="hero-secondary-btn">
              Discover More
            </a>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-art-card">
            <div className="hero-art-top">
              <span>STACKLY PRESENTS</span>
              <span className="hero-edition">2026 EDITION</span>
            </div>

            <div className="hero-art-center">
              <span className="hero-art-label">BUILD WHAT'S NEXT</span>

              <h2>
                TECH
                <br />
                <span>FORWARD.</span>
              </h2>

              <div className="hero-art-shapes">
                <span className="shape shape-blue"></span>
                <span className="shape shape-yellow"></span>
                <span className="shape shape-green"></span>
                <span className="shape shape-red"></span>
              </div>
            </div>

            <div className="hero-art-bottom">
              <span>LEARN. CREATE. CONNECT.</span>
              <ArrowUpRight size={22} />
            </div>
          </div>

          <motion.div
            className="hero-floating-note"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="floating-note-icon">✦</span>
            <div>
              <strong>Learn something new</strong>
              <small>Make your next move</small>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export default EventHero;
