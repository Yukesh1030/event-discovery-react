import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { Search, X, Calendar, MapPin, Heart, RotateCcw } from "lucide-react";

import EventGrid from "../components/EventGrid";
import Footer from "../components/Footer";

import { initialEvents, getStoredSeats } from "../data/events";
import { getFavorites } from "../utils/storage";

import "./ExploreEvents.css";

const CATEGORIES = ["All", "Technology", "Business", "Design", "Education"];

function ExploreEvents() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initial category from URL
  const initialCategoryParam = searchParams.get("category");
  const initialCat = initialCategoryParam && CATEGORIES.includes(initialCategoryParam)
    ? initialCategoryParam
    : "All";

  // Search, filters, sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("date-asc");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [seatsMap, setSeatsMap] = useState(() => getStoredSeats());
  const [favorites, setFavorites] = useState(() => getFavorites());

  // Keep selectedCategory in sync if URL query param changes externally
  const urlCategory = searchParams.get("category");
  const effectiveCategory = urlCategory && CATEGORIES.includes(urlCategory)
    ? urlCategory
    : selectedCategory;

  // Sync seat counts and favourites with LocalStorage
  useEffect(() => {
    const syncState = () => {
      setSeatsMap(getStoredSeats());
      setFavorites(getFavorites());
    };

    window.addEventListener("stackly_registrations_updated", syncState);
    window.addEventListener("stackly_favorites_updated", syncState);

    return () => {
      window.removeEventListener("stackly_registrations_updated", syncState);
      window.removeEventListener("stackly_favorites_updated", syncState);
    };
  }, []);

  // Extract unique locations from events list
  const availableLocations = useMemo(() => {
    const locSet = new Set(initialEvents.map((e) => e.location));
    return ["All", ...Array.from(locSet)];
  }, []);

  // Update category handler & synchronize URL
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLocation("All");
    setSortBy("date-asc");
    setShowFavoritesOnly(false);
    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  // Filter & Sort Logic
  const filteredEvents = useMemo(() => {
    return initialEvents
      .filter((event) => {
        // Search by event name or description
        const matchesQuery =
          searchQuery.trim() === "" ||
          event.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
          event.category.toLowerCase().includes(searchQuery.toLowerCase().trim());

        // Category filter
        const matchesCategory =
          effectiveCategory === "All" || event.category === effectiveCategory;

        // Location filter
        const matchesLocation =
          selectedLocation === "All" || event.location === selectedLocation;

        // Favorites filter
        const matchesFavorites = !showFavoritesOnly || favorites.includes(event.id);

        return matchesQuery && matchesCategory && matchesLocation && matchesFavorites;
      })
      .sort((a, b) => {
        if (sortBy === "date-asc") {
          return new Date(a.date) - new Date(b.date);
        }
        if (sortBy === "date-desc") {
          return new Date(b.date) - new Date(a.date);
        }
        if (sortBy === "seats-desc") {
          const seatsA = seatsMap[a.id] ?? a.seats;
          const seatsB = seatsMap[b.id] ?? b.seats;
          return seatsB - seatsA;
        }
        if (sortBy === "title-asc") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [searchQuery, effectiveCategory, selectedLocation, sortBy, showFavoritesOnly, favorites, seatsMap]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    effectiveCategory !== "All" ||
    selectedLocation !== "All" ||
    showFavoritesOnly ||
    sortBy !== "date-asc";

  return (
    <main className="explore-page">
      {/* Page Header */}
      <section className="explore-header-section">
        <div className="explore-container">
          <motion.div
            className="explore-header-content"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="explore-eyebrow">BROWSE ALL WORKSHOPS</span>
            <h1 className="explore-title">
              Explore <span>Events & Summits.</span>
            </h1>
            <p className="explore-description">
              Find developer conferences, business summits, design labs, and executive masterclasses across major tech hubs.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="search-bar-wrapper"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="search-input-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search events by name, topic, or keywords (e.g. AI, React, Cloud)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search events"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Filter Bar */}
          <div className="filters-control-bar">
            {/* Category Pills */}
            <div className="category-pills">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill ${effectiveCategory === cat ? "active" : ""}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Dropdown Filters and Favourites Toggle */}
            <div className="secondary-filters">
              {/* Location Selector */}
              <div className="filter-dropdown-wrapper">
                <MapPin size={15} className="dropdown-icon" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  aria-label="Filter by location"
                >
                  <option value="All">All Locations</option>
                  {availableLocations
                    .filter((loc) => loc !== "All")
                    .map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                </select>
              </div>

              {/* Sort By Selector */}
              <div className="filter-dropdown-wrapper">
                <Calendar size={15} className="dropdown-icon" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort events"
                >
                  <option value="date-asc">Date: Soonest First</option>
                  <option value="date-desc">Date: Latest First</option>
                  <option value="seats-desc">Most Available Seats</option>
                  <option value="title-asc">Title: A to Z</option>
                </select>
              </div>

              {/* Favorites toggle button */}
              <button
                type="button"
                className={`favorites-toggle-btn ${showFavoritesOnly ? "active" : ""}`}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                title="Show saved events"
              >
                <Heart size={16} className={showFavoritesOnly ? "heart-filled" : ""} />
                <span>Saved ({favorites.length})</span>
              </button>

              {/* Reset button if filters active */}
              {hasActiveFilters && (
                <button
                  type="button"
                  className="reset-filters-btn"
                  onClick={handleResetFilters}
                  title="Reset all filters"
                >
                  <RotateCcw size={15} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Events Results Section */}
      <section className="explore-results-section">
        <div className="explore-container">
          <div className="results-status-bar">
            <span className="results-count">
              Showing <strong>{filteredEvents.length}</strong> of{" "}
              <strong>{initialEvents.length}</strong> events
            </span>

            {effectiveCategory !== "All" && (
              <span className="active-tag-chip">
                Category: <strong>{effectiveCategory}</strong>
              </span>
            )}
            {selectedLocation !== "All" && (
              <span className="active-tag-chip">
                Location: <strong>{selectedLocation}</strong>
              </span>
            )}
            {showFavoritesOnly && (
              <span className="active-tag-chip">
                Favorites Only
              </span>
            )}
          </div>

          {filteredEvents.length > 0 ? (
            <EventGrid events={filteredEvents} seatsMap={seatsMap} />
          ) : (
            /* Empty State */
            <div className="empty-results-card">
              <div className="empty-icon-box">
                <Search size={32} />
              </div>
              <h3>No matching events found</h3>
              <p>
                We couldn&apos;t find any workshops or conferences matching your selected search query or filters.
              </p>
              <button
                type="button"
                className="empty-reset-btn"
                onClick={handleResetFilters}
              >
                <RotateCcw size={16} />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default ExploreEvents;
