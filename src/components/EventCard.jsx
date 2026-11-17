import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Calendar, MapPin, Clock, Users, ArrowUpRight, Heart, CheckCircle2 } from "lucide-react";
import { isUserRegistered, isEventFavorite, toggleFavorite } from "../utils/storage";

import "./EventCard.css";

function EventCard({ event, remainingSeats }) {
  const [isFavorite, setIsFavorite] = useState(() => isEventFavorite(event.id));
  const [isRegistered, setIsRegistered] = useState(() => isUserRegistered(event.id));

  useEffect(() => {
    const handleFavUpdate = () => {
      setIsFavorite(isEventFavorite(event.id));
    };
    const handleRegUpdate = () => {
      setIsRegistered(isUserRegistered(event.id));
    };

    window.addEventListener("stackly_favorites_updated", handleFavUpdate);
    window.addEventListener("stackly_registrations_updated", handleRegUpdate);

    return () => {
      window.removeEventListener("stackly_favorites_updated", handleFavUpdate);
      window.removeEventListener("stackly_registrations_updated", handleRegUpdate);
    };
  }, [event.id]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newStatus = toggleFavorite(event.id);
    setIsFavorite(newStatus);
  };

  // Category styling helper
  const categoryClass = `category-tag-${event.category.toLowerCase()}`;

  // Format date: e.g. "2026-12-12" -> "Dec 12, 2026"
  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return dateStr;
    }
  };

  const seatsLeft = remainingSeats !== undefined ? remainingSeats : event.seats;

  return (
    <motion.article
      className="event-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      {/* Event Image & Badges */}
      <div className="event-card-media">
        <img
          src={event.image}
          alt={event.title}
          className="event-card-img"
          loading="lazy"
        />

        {/* Category Badge */}
        <span className={`event-category-badge ${categoryClass}`}>
          {event.category}
        </span>

        {/* Favorite Button */}
        <button
          type="button"
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          title={isFavorite ? "Remove from favorites" : "Save to favorites"}
        >
          <Heart
            size={18}
            className={isFavorite ? "heart-filled" : "heart-outline"}
          />
        </button>

        {/* Registered status indicator */}
        {isRegistered && (
          <div className="event-registered-chip">
            <CheckCircle2 size={14} />
            <span>Registered</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="event-card-body">
        {/* Meta Info: Date and Time */}
        <div className="event-card-meta">
          <div className="meta-item">
            <Calendar size={14} />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="meta-item">
            <Clock size={14} />
            <span>{event.time.split(" - ")[0]}</span>
          </div>
        </div>

        {/* Event Title */}
        <h3 className="event-card-title">
          <Link to={`/events/${event.id}`}>{event.title}</Link>
        </h3>

        {/* Location */}
        <div className="event-card-location">
          <MapPin size={15} />
          <span>{event.location}</span>
        </div>

        {/* Description snippet */}
        <p className="event-card-snippet">
          {event.description.slice(0, 105)}...
        </p>

        {/* Card Footer: Seats & CTA */}
        <div className="event-card-footer">
          <div className="seats-indicator">
            <Users size={15} />
            <span className={seatsLeft < 20 ? "seats-low" : "seats-normal"}>
              {seatsLeft > 0 ? `${seatsLeft} seats left` : "Sold Out"}
            </span>
          </div>

          <Link to={`/events/${event.id}`} className="view-details-btn">
            <span>View Details</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default EventCard;
