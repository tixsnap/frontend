export interface ITransaction {
  id: string;
  user: {
    id: string;
    email: string;
  };
  event: {
    name: string;
    price: number;
    imageUrl: string;
  };
  paymentProof: {
    paymentPicture: string | null;
  };
  eventId: string;
  totalPayment: number;
  status:
    | "WAITING_PAYMENT"
    | "WAITING_FOR_CONFIRMATION"
    | "DONE"
    | "REJECTED"
    | "EXPIRED"
    | "CANCELED";
  validUntilPaymentProof: string;
  validUntilConfirmation: string;
  totalTicket: number;
  createdAt: string;
}
