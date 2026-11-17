import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Share2,
  Heart,
  CheckCircle2,
  Ticket,
  Sparkles,
  ArrowUpRight
} from "lucide-react";

import RegistrationForm from "../components/RegistrationForm";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";

import { initialEvents, getStoredSeats } from "../data/events";
import { isUserRegistered, isEventFavorite, toggleFavorite } from "../utils/storage";

import "./EventDetails.css";

function EventDetails() {
  const { id } = useParams();

  // Find event by ID
  const event = initialEvents.find((e) => String(e.id) === String(id));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(() => (event ? isUserRegistered(event.id) : false));
  const [isFavorite, setIsFavorite] = useState(() => (event ? isEventFavorite(event.id) : false));
  const [seatsMap, setSeatsMap] = useState(() => getStoredSeats());
  const [copyNotice, setCopyNotice] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const syncStatus = () => {
      if (event) {
        setIsRegistered(isUserRegistered(event.id));
        setIsFavorite(isEventFavorite(event.id));
        setSeatsMap(getStoredSeats());
      }
    };

    window.addEventListener("stackly_registrations_updated", syncStatus);
    window.addEventListener("stackly_favorites_updated", syncStatus);

    return () => {
      window.removeEventListener("stackly_registrations_updated", syncStatus);
      window.removeEventListener("stackly_favorites_updated", syncStatus);
    };
  }, [event]);

  if (!event) {
    return (
      <main className="event-not-found-page">
        <div className="not-found-card">
          <h2>Event Not Found</h2>
          <p>The event you are looking for does not exist or may have been removed.</p>
          <Link to="/explore" className="back-explore-btn">
            <ArrowLeft size={16} />
            <span>Back to Explore Events</span>
          </Link>
        </div>
      </main>
    );
  }

  const remainingSeats = seatsMap[event.id] ?? event.seats;
  const isSoldOut = remainingSeats <= 0;

  // Category class
  const categoryClass = `category-tag-${event.category.toLowerCase()}`;

  // Handle Share link
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopyNotice(true);
      setTimeout(() => setCopyNotice(false), 2500);
    }
  };

  const handleFavoriteToggle = () => {
    const status = toggleFavorite(event.id);
    setIsFavorite(status);
  };

  // Find related events in the same category (excluding current event)
  const relatedEvents = initialEvents
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, 3);

  return (
    <main className="event-details-page">
      {/* Breadcrumb & Navigation */}
      <div className="details-container">
        <div className="details-nav-row">
          <Link to="/explore" className="back-link">
            <ArrowLeft size={16} />
            <span>All Events</span>
          </Link>

          <div className="nav-actions">
            <button
              type="button"
              className={`action-btn-circle ${isFavorite ? "fav-active" : ""}`}
              onClick={handleFavoriteToggle}
              title={isFavorite ? "Remove from favorites" : "Save to favorites"}
              aria-label="Toggle favorite"
            >
              <Heart size={18} className={isFavorite ? "heart-filled" : ""} />
            </button>

            <button
              type="button"
              className="action-btn-circle"
              onClick={handleShare}
              title="Share event link"
              aria-label="Share event"
            >
              <Share2 size={18} />
            </button>
            {copyNotice && <span className="copy-tooltip">Link copied!</span>}
          </div>
        </div>

        {/* Main Event Header Layout */}
        <div className="event-hero-grid">
          {/* Left Column: Visual Banner */}
          <motion.div
            className="event-banner-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={event.image}
              alt={event.title}
              className="event-banner-img"
            />
            <span className={`event-banner-badge ${categoryClass}`}>
              {event.category}
            </span>
          </motion.div>

          {/* Right Column: Quick Info & Registration Action Card */}
          <motion.div
            className="event-quick-info-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="quick-info-top">
              <span className="event-edition-label">OFFICIAL WORKSHOP • 2026</span>
              <span className="event-price-chip">{event.price}</span>
            </div>

            <h1 className="event-page-title">{event.title}</h1>

            {/* Quick Meta List */}
            <div className="quick-meta-list">
              <div className="quick-meta-item">
                <Calendar size={18} className="meta-icon" />
                <div>
                  <small>Date</small>
                  <strong>{event.date}</strong>
                </div>
              </div>

              <div className="quick-meta-item">
                <Clock size={18} className="meta-icon" />
                <div>
                  <small>Time</small>
                  <strong>{event.time}</strong>
                </div>
              </div>

              <div className="quick-meta-item">
                <MapPin size={18} className="meta-icon" />
                <div>
                  <small>Location & Venue</small>
                  <strong>{event.location}</strong>
                  <p className="venue-detail">{event.venue}</p>
                </div>
              </div>

              <div className="quick-meta-item">
                <Users size={18} className="meta-icon" />
                <div>
                  <small>Availability</small>
                  <strong className={remainingSeats < 20 ? "seats-low" : "seats-green"}>
                    {remainingSeats > 0 ? `${remainingSeats} Seats Remaining` : "Sold Out"}
                  </strong>
                </div>
              </div>
            </div>

            {/* Action Card: Register or Already Registered */}
            <div className="booking-card-action">
              {isRegistered ? (
                <div className="already-registered-box">
                  <div className="registered-header">
                    <CheckCircle2 size={22} className="check-icon" />
                    <div>
                      <h4>You are registered!</h4>
                      <p>Your seat has been reserved and stored in LocalStorage.</p>
                    </div>
                  </div>
                  <Link to="/registrations" className="view-my-pass-btn">
                    <span>View in My Registrations</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  className="register-now-btn"
                  onClick={() => setIsModalOpen(true)}
                  disabled={isSoldOut}
                >
                  <Ticket size={18} />
                  <span>{isSoldOut ? "Workshop Sold Out" : "Register Now (Free Pass)"}</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Detailed Sections: About, Speaker, Agenda */}
        <div className="event-details-body-grid">
          {/* Main Body */}
          <div className="details-main-column">
            {/* About Event */}
            <section className="details-section">
              <h2 className="section-subheading">About This Event</h2>
              <p className="description-text">{event.description}</p>
              <div className="event-tags-list">
                {event.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Agenda Breakdown */}
            <section className="details-section">
              <h2 className="section-subheading">Workshop Agenda & Schedule</h2>
              <div className="agenda-timeline">
                {event.agenda.map((item, index) => (
                  <div key={item} className="agenda-timeline-item">
                    <div className="agenda-number">0{index + 1}</div>
                    <div className="agenda-info">
                      <h4>{item}</h4>
                      <p>Interactive discussion, hands-on demonstration and live Q&A.</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column: Speaker & Perks */}
          <aside className="details-sidebar-column">
            {/* Keynote Speaker Card */}
            {event.speaker && (
              <div className="speaker-card">
                <span className="speaker-eyebrow">FEATURED SPEAKER</span>
                <div className="speaker-info-row">
                  <div className="speaker-avatar-initials">
                    {event.speaker.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3>{event.speaker.name}</h3>
                    <p className="speaker-role">{event.speaker.role}</p>
                    <span className="speaker-org">{event.speaker.organization}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Included in Workshop */}
            <div className="workshop-perks-card">
              <h4>What&apos;s Included</h4>
              <ul>
                <li>
                  <Sparkles size={16} /> Full access to all workshop sessions
                </li>
                <li>
                  <Sparkles size={16} /> Official Certificate of Participation
                </li>
                <li>
                  <Sparkles size={16} /> Curated slide deck & code repositories
                </li>
                <li>
                  <Sparkles size={16} /> Post-event networking session
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Related Events from same category */}
        {relatedEvents.length > 0 && (
          <section className="related-events-section">
            <div className="related-header">
              <span className="section-eyebrow">MORE IN {event.category.toUpperCase()}</span>
              <h2>Similar Events You Might Like</h2>
            </div>
            <div className="related-grid">
              {relatedEvents.map((relEvent) => (
                <EventCard
                  key={relEvent.id}
                  event={relEvent}
                  remainingSeats={seatsMap[relEvent.id]}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Registration Modal Dialog */}
      <RegistrationForm
        event={event}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegisterSuccess={() => {
          setIsRegistered(true);
        }}
      />

      <Footer />
    </main>
  );
}

export default EventDetails;
