// components/EventList.tsx
import { FC } from "react";
import Image from "next/image";

interface Event {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  details: string;
}

interface EventListProps {
  events?: Event[];
}

const EventList: FC<EventListProps> = ({ events }) => {
  // Sample data (replace with actual data from props/API)
  const defaultEvents: Event[] = [
    {
      id: 1,
      title: "Summer Music Festival",
      date: "2024-07-15",
      imageUrl: "/placeholder.svg",
      details: "Annual outdoor music festival featuring top artists",
    },
    {
      id: 2,
      title: "Tech Conference",
      date: "2024-08-22",
      imageUrl: "/placeholder.svg",
      details: "Leading technology trends and innovations showcase",
    },
    {
      id: 3,
      title: "Contemporary Art Exhibition",
      date: "2024-09-10",
      imageUrl: "/placeholder.svg",
      details: "Modern art showcase featuring emerging international artists",
    },
    {
      id: 4,
      title: "City Marathon",
      date: "2024-10-05",
      imageUrl: "/placeholder.svg",
      details: "Annual 42km race through downtown with 5k/10k options",
    },
    {
      id: 5,
      title: "International Food Festival",
      date: "2024-11-15",
      imageUrl: "/placeholder.svg",
      details:
        "Culinary experience with 50+ countries' cuisines and live demonstrations",
    },
    {
      id: 6,
      title: "Literary Conference",
      date: "2024-12-03",
      imageUrl: "/placeholder.svg",
      details:
        "Celebration of contemporary literature with bestselling authors",
    },
  ];

  const displayedEvents = events || defaultEvents;

  return (
    <div className="sm:px-40 lg:px-20" style={{ backgroundColor: "#252A34" }}>
      <h2 className="text-left text-4xl font-bold  text-teal-300 mb-12 pl-5">
        Featured Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedEvents.slice(0, 6).map((event) => (
          <article
            key={event.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-32">
              <Image
                src={event.imageUrl}
                alt={event.title}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded text-sm">
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {event.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {event.details}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default EventList;
