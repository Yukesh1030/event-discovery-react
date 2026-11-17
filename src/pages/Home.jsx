import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight, Compass, ShieldCheck, Users2, Sparkles } from "lucide-react";

import EventHero from "../components/EventHero";
import CategorySection from "../components/CategorySection";
import EventGrid from "../components/EventGrid";
import Footer from "../components/Footer";

import { initialEvents, getStoredSeats } from "../data/events";

import "./Home.css";

function Home() {
  const [seatsMap, setSeatsMap] = useState({});

  useEffect(() => {
    const syncSeats = () => {
      setSeatsMap(getStoredSeats());
    };
    syncSeats();

    window.addEventListener("stackly_registrations_updated", syncSeats);
    return () => {
      window.removeEventListener("stackly_registrations_updated", syncSeats);
    };
  }, []);

  // Filter featured events for homepage showcase
  const featuredEvents = initialEvents.filter((event) => event.featured).slice(0, 3);

  // Features list for "Why Choose STACKLY"
  const perks = [
    {
      icon: Sparkles,
      title: "World-Class Speakers",
      description: "Learn directly from Google Developer Experts, principal engineers, and startup founders.",
      badgeColor: "perk-blue"
    },
    {
      icon: ShieldCheck,
      title: "Guaranteed Reservation",
      description: "Instant pass confirmation with local verification and real-time seat availability.",
      badgeColor: "perk-green"
    },
    {
      icon: Compass,
      title: "Hands-on Practical Labs",
      description: "Every workshop includes curated interactive coding sessions, frameworks, and slide resources.",
      badgeColor: "perk-yellow"
    },
    {
      icon: Users2,
      title: "Vibrant Community",
      description: "Join thousands of builders, designers, and entrepreneurs across tech hubs in India and globally.",
      badgeColor: "perk-purple"
    }
  ];

  return (
    <main className="home-page">
      {/* Hero Section */}
      <EventHero />

      {/* Category Section */}
      <CategorySection />

      {/* Featured Events Showcase */}
      <section id="featured-events" className="featured-section">
        <div className="section-container">
          <div className="section-header-row">
            <motion.div
              className="section-header-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-eyebrow">HANDPICKED EXPERIENCES</span>
              <h2 className="section-title">
                Featured <span>Workshops & Summits.</span>
              </h2>
              <p className="section-subtitle">
                Explore top-rated conferences curated by industry leaders. Limited seats available.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/explore" className="view-all-link">
                <span>Explore All Events</span>
                <ArrowUpRight size={18} />
              </Link>
            </motion.div>
          </div>

          <EventGrid events={featuredEvents} seatsMap={seatsMap} />

          <div className="featured-footer-cta">
            <Link to="/explore" className="explore-more-btn">
              <span>View All 12+ Events</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose STACKLY */}
      <section className="why-stackly-section">
        <div className="section-container">
          <motion.div
            className="why-header text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-eyebrow">THE STACKLY STANDARD</span>
            <h2 className="section-title">
              Engineered for <span>Impactful Learning.</span>
            </h2>
            <p className="section-subtitle centered-subtitle">
              We bridge the gap between high-level theory and real-world implementation through immersive conference experiences.
            </p>
          </motion.div>

          <div className="perks-grid">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={perk.title}
                  className="perk-card"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                >
                  <div className={`perk-icon-wrapper ${perk.badgeColor}`}>
                    <Icon size={24} />
                  </div>
                  <h3>{perk.title}</h3>
                  <p>{perk.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="cta-banner-section">
        <div className="section-container">
          <motion.div
            className="cta-banner-card"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="cta-banner-content">
              <span className="cta-badge">JOIN 5,000+ ATTENDEES</span>
              <h2>Ready to expand your skillset and network?</h2>
              <p>
                Register for premier technology summits, design studios, and founder conferences. No complex forms, instant confirmation.
              </p>
              <div className="cta-actions">
                <Link to="/explore" className="cta-primary-btn">
                  <span>Explore Upcoming Events</span>
                  <ArrowUpRight size={18} />
                </Link>
                <Link to="/registrations" className="cta-secondary-btn">
                  <span>View My Registrations</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}

export default Home;
