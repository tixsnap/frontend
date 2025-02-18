import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero";
// import EventSearch from "@/components/event-search";
import EventList from "@/components/event-list";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      {/* <EventSearch /> */}
      <EventList />
    </div>
  );
}
