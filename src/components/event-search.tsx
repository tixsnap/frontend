"use client";
import { useState, useEffect } from "react";

const EventSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [focusedElement, setFocusedElement] = useState<
    "search" | "category" | "location" | null
  >(null);

  const categories = ["All Categories", "Music", "Sports", "Tech", "Art"];

  const locations = [
    "All Locations",
    "Jakarta",
    "BSD",
    "Batam",
    "Yogyakarta",
    "Surabaya",
    "Medan",
    "Online",
  ];

  // Responsive design handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Base styles
  const containerStyle: React.CSSProperties = {
    maxWidth: 1200,
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#252A34",
    borderRadius: 30,
    borderColor: "#ddd",
    border: "1px solid #ddd",
    display: "flex",
    gap: "1rem",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
  };

  const groupStyle: React.CSSProperties = {
    flex: 1,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "#FFFFFF",
  };

  const baseInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem",
    border: "1px solid #ddd",
    borderRadius: 5,
    fontSize: "1rem",
    transition: "border-color 0.3s ease",
  };

  const searchInputStyle: React.CSSProperties = {
    ...baseInputStyle,
    paddingLeft: "2.5rem",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23999' d='M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0.8rem center",
    backgroundSize: "1.2rem",
    backgroundColor: "#FFFFFF",
    borderColor: focusedElement === "search" ? "#08D9D6" : "#252A34",
    boxShadow:
      focusedElement === "search" ? "0 0 0 2px rgba(0,123,255,0.25)" : "none",
  };

  const selectStyle: React.CSSProperties = {
    ...baseInputStyle,
    appearance: "none",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23999' d='M12,15.5a1,1,0,0,1-.707-.293l-4-4a1,1,0,0,1,1.414-1.414L12,13.086l3.293-3.293a1,1,0,0,1,1.414,1.414l-4,4A1,1,0,0,1,12,15.5Z'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.8rem center",
    backgroundSize: "1.2rem",
    backgroundColor: "#FFFFFF",
    borderColor: focusedElement === "search" ? "#08D9D6" : "#252A34",
    boxShadow:
      focusedElement === "category" ? "0 0 0 2px rgba(0,123,255,0.25)" : "none",
  };

  return (
    <div
      className="max-w-7xl mx-auto px-36 pt-3 pb-3"
      style={{ backgroundColor: "#252A34" }}
    >
      <div style={containerStyle}>
        <div style={groupStyle}>
          <label htmlFor="event-search" style={labelStyle}>
            Search Events
          </label>
          <input
            id="event-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter event name or keyword..."
            onFocus={() => setFocusedElement("search")}
            onBlur={() => setFocusedElement(null)}
            style={searchInputStyle}
          />
        </div>

        <div style={groupStyle}>
          <label htmlFor="category-filter" style={labelStyle}>
            Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={selectStyle}
            onFocus={() => setFocusedElement("category")}
            onBlur={() => setFocusedElement(null)}
          >
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div style={groupStyle}>
          <label htmlFor="location-filter" style={labelStyle}>
            Location
          </label>
          <select
            id="location-filter"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={{
              ...selectStyle,
              borderColor: focusedElement === "location" ? "#007bff" : "#ddd",
            }}
            onFocus={() => setFocusedElement("location")}
            onBlur={() => setFocusedElement(null)}
          >
            {locations.map((location) => (
              <option key={location} value={location.toLowerCase()}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default EventSearch;
