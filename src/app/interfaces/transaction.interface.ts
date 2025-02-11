export interface ITransaction {
  id: string;
  totalPayment: string;
  userId: string;
  status: string;
  validUntilPaymentProof: string;
  validUntilConfirmation: string;
  createdAt: string;
  updatedAt: string;
  eventId: string;
  totalTicket: number;
}
