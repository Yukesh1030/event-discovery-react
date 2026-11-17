import { motion } from "motion/react";
import EventCard from "./EventCard";

import "./EventGrid.css";

function EventGrid({ events = [], seatsMap = {} }) {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="event-grid">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          className="event-grid-item"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
        >
          <EventCard
            event={event}
            remainingSeats={seatsMap[event.id]}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default EventGrid;
