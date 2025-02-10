export interface IAttendees {
  user: {
    id: string;
    email: string;
  };
  event: {
    id: string;
    name: string;
    imageUrl: string;
  };
  totalTicket: number;
  totalPayment: number;
}
