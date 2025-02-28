export interface Invoice {
  id?: number;
  invoiceNumber: string;
  issueDate: Date;
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'OVERDUE';
  userId?: number;
  paymentPercentage?: number;
}

export interface InvoiceRequest {
  invoiceNumber: string;
  issueDate: Date;
  totalAmount: number;
  status?: 'PENDING' | 'PAID' | 'OVERDUE';
}
