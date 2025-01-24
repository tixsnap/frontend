import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero";
import EventSearch from "@/components/event-search";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <EventSearch />
    </div>
  );
}
