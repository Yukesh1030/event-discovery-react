// LocalStorage management for STACKLY registrations and favourites
import { updateStoredSeatCount } from "../data/events";

const REGISTRATIONS_KEY = "stackly_registrations";
const FAVORITES_KEY = "stackly_favorites";

/**
 * Retrieve all registered events from LocalStorage
 */
export const getRegistrations = () => {
  try {
    const raw = localStorage.getItem(REGISTRATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error reading registrations from LocalStorage", err);
    return [];
  }
};

/**
 * Check if the user is already registered for an event
 */
export const isUserRegistered = (eventId) => {
  const list = getRegistrations();
  return list.some((reg) => String(reg.eventId) === String(eventId));
};

/**
 * Add a new registration
 * Validates against duplicate registration for the same event
 */
export const registerForEvent = (event, formData) => {
  const currentRegistrations = getRegistrations();

  // Prevent duplicate registration
  const alreadyRegistered = currentRegistrations.some(
    (reg) => String(reg.eventId) === String(event.id)
  );

  if (alreadyRegistered) {
    return {
      success: false,
      message: "You are already registered for this event."
    };
  }

  const newRegistration = {
    registrationId: `STK-${Date.now().toString().slice(-6)}`,
    eventId: event.id,
    eventTitle: event.title,
    eventCategory: event.category,
    eventDate: event.date,
    eventTime: event.time,
    eventLocation: event.location,
    eventVenue: event.venue,
    eventImage: event.image,
    name: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: formData.phone.trim(),
    registeredAt: new Date().toISOString()
  };

  try {
    const updated = [newRegistration, ...currentRegistrations];
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));

    // Decrement available seat count in LocalStorage
    updateStoredSeatCount(event.id, -1);

    // Dispatch custom event so components can update in real-time
    window.dispatchEvent(new Event("stackly_registrations_updated"));

    return {
      success: true,
      registration: newRegistration,
      message: "Registration completed successfully!"
    };
  } catch (err) {
    console.error("Error saving registration to LocalStorage", err);
    return {
      success: false,
      message: "Failed to save registration. Please try again."
    };
  }
};

/**
 * Cancel a registration by eventId
 */
export const cancelRegistration = (eventId) => {
  try {
    const current = getRegistrations();
    const updated = current.filter((reg) => String(reg.eventId) !== String(eventId));
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));

    // Increment available seat count back in LocalStorage
    updateStoredSeatCount(eventId, 1);

    // Dispatch update event
    window.dispatchEvent(new Event("stackly_registrations_updated"));

    return {
      success: true,
      message: "Registration cancelled successfully."
    };
  } catch (err) {
    console.error("Error cancelling registration", err);
    return {
      success: false,
      message: "Could not cancel registration. Please try again."
    };
  }
};

/**
 * Get favourites array
 */
export const getFavorites = () => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error reading favorites", err);
    return [];
  }
};

/**
 * Toggle favourite status for an event
 */
export const toggleFavorite = (eventId) => {
  try {
    const favs = getFavorites();
    const numericId = Number(eventId);
    let updated;
    let isNowFav;

    if (favs.includes(numericId)) {
      updated = favs.filter((id) => id !== numericId);
      isNowFav = false;
    } else {
      updated = [...favs, numericId];
      isNowFav = true;
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("stackly_favorites_updated"));
    return isNowFav;
  } catch (err) {
    console.error("Error toggling favorite", err);
    return false;
  }
};

/**
 * Check if an event is favourited
 */
export const isEventFavorite = (eventId) => {
  const favs = getFavorites();
  return favs.includes(Number(eventId));
};
