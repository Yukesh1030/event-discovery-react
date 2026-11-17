import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  Trash2,
  ExternalLink,
  Ticket,
  User,
  Mail,
  Phone,
  AlertTriangle,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

import Footer from "../components/Footer";
import { getRegistrations, cancelRegistration } from "../utils/storage";

import "./MyRegistrations.css";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState(() => getRegistrations());
  const [cancelTarget, setCancelTarget] = useState(null); // registration object to cancel
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const handleUpdate = () => {
      setRegistrations(getRegistrations());
    };

    window.addEventListener("stackly_registrations_updated", handleUpdate);
    return () => {
      window.removeEventListener("stackly_registrations_updated", handleUpdate);
    };
  }, []);

  const handleOpenCancelModal = (reg) => {
    setCancelTarget(reg);
  };

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;

    const res = cancelRegistration(cancelTarget.eventId);
    if (res.success) {
      setToastMessage(`Registration for "${cancelTarget.eventTitle}" cancelled.`);
      setTimeout(() => setToastMessage(""), 3500);
    }
    setCancelTarget(null);
  };

  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return isoString;
    }
  };

  return (
    <main className="registrations-page">
      {/* Toast notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="toast-notification"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="registrations-header-section">
        <div className="registrations-container">
          <motion.div
            className="registrations-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="registrations-eyebrow">YOUR ATTENDEE PORTAL</span>
            <h1 className="registrations-title">
              My <span>Registrations.</span>
            </h1>
            <p className="registrations-subtitle">
              Manage your confirmed workshop passes, view schedule info, or cancel reservations anytime.
            </p>
          </motion.div>

          {/* Quick Counter Bar */}
          <div className="portal-status-bar">
            <span>
              Active Passes: <strong>{registrations.length}</strong>
            </span>
            <span className="portal-note">Stored securely in your local browser profile</span>
          </div>
        </div>
      </section>

      <section className="registrations-list-section">
        <div className="registrations-container">
          {registrations.length > 0 ? (
            <div className="registrations-list">
              {registrations.map((reg, index) => {
                const categoryClass = `category-tag-${reg.eventCategory.toLowerCase()}`;
                return (
                  <motion.article
                    key={reg.registrationId}
                    className="registration-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                  >
                    {/* Top Row: Pass Header */}
                    <div className="reg-card-header">
                      <div className="reg-pass-meta">
                        <span className="reg-pass-badge">
                          <Ticket size={14} />
                          {reg.registrationId}
                        </span>
                        <span className={`reg-category-pill ${categoryClass}`}>
                          {reg.eventCategory}
                        </span>
                      </div>
                      <span className="reg-status-confirmed">CONFIRMED PASS</span>
                    </div>

                    {/* Main Content Layout */}
                    <div className="reg-card-content-grid">
                      {/* Event Banner */}
                      <div className="reg-media">
                        <img
                          src={reg.eventImage}
                          alt={reg.eventTitle}
                          className="reg-img"
                        />
                      </div>

                      {/* Event Details */}
                      <div className="reg-info">
                        <h3 className="reg-event-title">
                          <Link to={`/events/${reg.eventId}`}>{reg.eventTitle}</Link>
                        </h3>

                        <div className="reg-meta-row">
                          <div className="reg-meta-item">
                            <Calendar size={15} />
                            <span>{reg.eventDate}</span>
                          </div>
                          <div className="reg-meta-item">
                            <Clock size={15} />
                            <span>{reg.eventTime}</span>
                          </div>
                          <div className="reg-meta-item">
                            <MapPin size={15} />
                            <span>{reg.eventLocation}</span>
                          </div>
                        </div>

                        {reg.eventVenue && (
                          <p className="reg-venue-text">
                            <strong>Venue:</strong> {reg.eventVenue}
                          </p>
                        )}

                        {/* Attendee Info Box */}
                        <div className="reg-attendee-box">
                          <div className="attendee-field">
                            <User size={14} />
                            <span>
                              <strong>Attendee:</strong> {reg.name}
                            </span>
                          </div>
                          <div className="attendee-field">
                            <Mail size={14} />
                            <span>
                              <strong>Email:</strong> {reg.email}
                            </span>
                          </div>
                          <div className="attendee-field">
                            <Phone size={14} />
                            <span>
                              <strong>Phone:</strong> {reg.phone}
                            </span>
                          </div>
                          {reg.registeredAt && (
                            <div className="attendee-field registered-on-date">
                              <span>
                                Registered on {formatDate(reg.registeredAt)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="reg-card-actions">
                      <Link
                        to={`/events/${reg.eventId}`}
                        className="reg-view-btn"
                      >
                        <span>Event Details</span>
                        <ExternalLink size={15} />
                      </Link>

                      <button
                        type="button"
                        className="reg-cancel-btn"
                        onClick={() => handleOpenCancelModal(reg)}
                      >
                        <Trash2 size={15} />
                        <span>Cancel Pass</span>
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <motion.div
              className="empty-registrations-card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="empty-ticket-icon">
                <Ticket size={42} />
              </div>
              <h2>No Registrations Found</h2>
              <p>
                You haven&apos;t registered for any workshops, summits, or masterclasses yet. Discover world-class upcoming events and reserve your seat today!
              </p>
              <Link to="/explore" className="empty-explore-btn">
                <span>Browse All Events</span>
                <ArrowRight size={17} />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Confirmation Modal for Cancellation */}
      <AnimatePresence>
        {cancelTarget && (
          <div className="cancel-modal-backdrop" onClick={() => setCancelTarget(null)}>
            <motion.div
              className="cancel-modal-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.2 }}
            >
              <div className="cancel-warning-icon">
                <AlertTriangle size={34} />
              </div>

              <h3>Cancel Registration?</h3>
              <p>
                Are you sure you want to cancel your pass for{" "}
                <strong>&quot;{cancelTarget.eventTitle}&quot;</strong>?
              </p>
              <p className="cancel-subnote">
                This will release your reserved seat back to other attendees and remove the ticket from your LocalStorage profile.
              </p>

              <div className="cancel-modal-actions">
                <button
                  type="button"
                  className="confirm-cancel-btn"
                  onClick={handleConfirmCancel}
                >
                  Yes, Cancel Registration
                </button>
                <button
                  type="button"
                  className="keep-pass-btn"
                  onClick={() => setCancelTarget(null)}
                >
                  Keep My Pass
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

export default MyRegistrations;
