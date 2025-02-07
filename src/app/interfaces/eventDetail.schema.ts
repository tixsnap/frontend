export interface EventDetailPageProps {
  eventName: string;
  isPaidEvent: boolean;
  imageUrl: string;
  description: string;
  startDate: string; // change to date later
  endDate: string;
  availableSeats: number;
  price?: number; // optional for free event
}
