import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, AlertCircle, Calendar, MapPin, User, Mail, Phone, Ticket } from "lucide-react";
import { registerForEvent, isUserRegistered } from "../utils/storage";

import "./RegistrationForm.css";

function RegistrationForm({ event, isOpen, onClose, onRegisterSuccess }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [duplicateError, setDuplicateError] = useState("");

  if (!isOpen || !event) return null;

  // Validation rules
  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@domain.com)";
    }

    // Phone validation (10 digits)
    const cleanedPhone = formData.phone.replace(/[\s\-()]/g, "");
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(cleanedPhone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (duplicateError) {
      setDuplicateError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check duplicate first
    if (isUserRegistered(event.id)) {
      setDuplicateError("You have already registered for this event.");
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate quick registration processing
    setTimeout(() => {
      const result = registerForEvent(event, formData);
      setIsSubmitting(false);

      if (result.success) {
        setSuccessData(result.registration);
        if (onRegisterSuccess) {
          onRegisterSuccess(result.registration);
        }
      } else {
        setDuplicateError(result.message);
      }
    }, 400);
  };

  const handleModalClose = () => {
    setFormData({ name: "", email: "", phone: "" });
    setErrors({});
    setDuplicateError("");
    setSuccessData(null);
    onClose();
  };

  const goToRegistrations = () => {
    handleModalClose();
    navigate("/registrations");
  };

  return (
    <AnimatePresence>
      <div className="registration-modal-backdrop" onClick={handleModalClose}>
        <motion.div
          className="registration-modal-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Close button */}
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleModalClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {!successData ? (
            /* Registration Form View */
            <div className="modal-content">
              <div className="modal-header">
                <span className="modal-eyebrow">WORKSHOP REGISTRATION</span>
                <h2 className="modal-title">Register for Event</h2>
                <div className="modal-event-summary">
                  <div className="summary-title">{event.title}</div>
                  <div className="summary-details">
                    <span>
                      <Calendar size={13} /> {event.date}
                    </span>
                    <span>
                      <MapPin size={13} /> {event.location}
                    </span>
                  </div>
                </div>
              </div>

              {duplicateError && (
                <div className="modal-alert alert-error">
                  <AlertCircle size={18} />
                  <span>{duplicateError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="registration-form" noValidate>
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="reg-name">
                    Full Name <span className="required">*</span>
                  </label>
                  <div className={`input-wrapper ${errors.name ? "has-error" : ""}`}>
                    <User size={18} className="input-icon" />
                    <input
                      id="reg-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      autoComplete="name"
                    />
                  </div>
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                {/* Email Address */}
                <div className="form-group">
                  <label htmlFor="reg-email">
                    Email Address <span className="required">*</span>
                  </label>
                  <div className={`input-wrapper ${errors.email ? "has-error" : ""}`}>
                    <Mail size={18} className="input-icon" />
                    <input
                      id="reg-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@example.com"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                {/* Phone Number */}
                <div className="form-group">
                  <label htmlFor="reg-phone">
                    Phone Number <span className="required">*</span>
                  </label>
                  <div className={`input-wrapper ${errors.phone ? "has-error" : ""}`}>
                    <Phone size={18} className="input-icon" />
                    <input
                      id="reg-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210 (10 digits)"
                      autoComplete="tel"
                    />
                  </div>
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                {/* Pass info note */}
                <div className="free-pass-note">
                  <Ticket size={16} />
                  <span>Free RSVP pass • Instant confirmation • LocalStorage saved</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="modal-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Confirming Registration..." : "Complete Registration"}
                </button>
              </form>
            </div>
          ) : (
            /* Confirmation Success View */
            <div className="modal-success-content">
              <div className="success-icon-badge">
                <CheckCircle size={44} />
              </div>

              <span className="modal-eyebrow success-eyebrow">REGISTRATION CONFIRMED</span>
              <h2 className="success-heading">You&apos;re All Set!</h2>
              <p className="success-message">
                Your workshop seat has been reserved. A confirmation summary has been saved to your browser&apos;s LocalStorage.
              </p>

              {/* Ticket Card Summary */}
              <div className="confirmed-ticket-card">
                <div className="ticket-top">
                  <span className="ticket-id">PASS #{successData.registrationId}</span>
                  <span className="ticket-status">CONFIRMED</span>
                </div>
                <div className="ticket-event-name">{successData.eventTitle}</div>
                <div className="ticket-info-grid">
                  <div>
                    <label>Attendee</label>
                    <p>{successData.name}</p>
                  </div>
                  <div>
                    <label>Email</label>
                    <p>{successData.email}</p>
                  </div>
                  <div>
                    <label>Date & Time</label>
                    <p>{successData.eventDate}</p>
                  </div>
                  <div>
                    <label>Location</label>
                    <p>{successData.eventLocation}</p>
                  </div>
                </div>
              </div>

              <div className="success-actions">
                <button
                  type="button"
                  className="primary-success-btn"
                  onClick={goToRegistrations}
                >
                  View My Registrations
                </button>
                <button
                  type="button"
                  className="secondary-success-btn"
                  onClick={handleModalClose}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default RegistrationForm;
