export interface Payment {
  id?: number;
  amount: number;
  paymentDate: Date;
  method: 'CASH' | 'CARD' | 'TRANSFER';
  invoiceId?: number;
  quoteId?: number;
  invoiceNumber?: string;
  quoteNumber?: string;
}

export interface PaymentRequest {
  amount: number;
  paymentDate: Date;
  method: 'CASH' | 'CARD' | 'TRANSFER';
  invoiceId?: number;
  quoteId?: number;
}
