"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const EventSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const router = useRouter();

  const categories = [
    "All Categories",
    "Music",
    "Sports",
    "Technology",
    "Business",
    "Art & Culture",
  ];

  const locations = [
    "All Locations",
    "New York",
    "London",
    "Paris",
    "Tokyo",
    "Online",
  ];

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (searchQuery) queryParams.set("q", searchQuery);
    if (selectedCategory !== "All Categories")
      queryParams.set("category", selectedCategory);
    if (selectedLocation !== "All Locations")
      queryParams.set("location", selectedLocation);

    router.push(`/events?${queryParams.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div style={{ backgroundColor: "#252A34" }} className="px-40 pt-12 pb-32">
      <div
        className="px-6 py-6 flex justify-between gap-8 border-2 border-white rounded-3xl"
        style={{ backgroundColor: "#252A34" }}
      >
        <div className="flex-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="     Search events..."
            className="w-full py-1.5 bg-white font-semibold rounded-xl transition-transform duration-200 hover:scale-110"
          />
        </div>

        <div className="flex-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-2 bg-white rounded-xl font-medium text-center transition-transform duration-200 hover:scale-110"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-auto">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full py-2 border-white rounded-xl font-medium text-center transition-transform duration-200 hover:scale-110"
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="px-2 bg-teal-300 rounded-xl w-28 font-bold transition-transform duration-200 hover:scale-110"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default EventSearch;
