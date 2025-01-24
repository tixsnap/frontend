import React from "react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <div
      className="max-w-7xl mx-auto px-36 pt-20 pb-5"
      style={{ backgroundColor: "#252A34" }}
    >
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <Image
            src="/hero-section.png"
            alt="Hero Image"
            className="rounded-lg w-full h-auto"
            width={400}
            height={300}
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-6 pl-10">
          <h1 className="text-5xl font-bold text-white text-justify-full">
            Experience The Best{" "}
            <span className="text-teal-300 text-6xl">Events</span>{" "}
          </h1>

          <p className="text-lg text-white text-justify-full">
            Join us for unforgettable moments at the most exciting events of the
            year. Book your tickets now and be part of something extraordinary
            with TixSnap
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-red-500 text-white text-lg font-bold rounded-3xl hover:bg-teal-400 transition-transform: duration-200 hover:scale-110">
              Get Tickets
            </button>
            <button className="px-6 py-3 border-2 border-gray-300 text-white rounded-3xl transition-transform: duration-200 hover:scale-110">
              Discover More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
