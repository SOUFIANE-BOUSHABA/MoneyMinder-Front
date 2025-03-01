export interface Quote {
  id?: number;
  quoteNumber: string;
  issueDate: Date;
  totalAmount: number;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED';
  userId?: number;
  paymentPercentage?: number;
}

export interface QuoteRequest {
  quoteNumber: string;
  issueDate: Date;
  totalAmount: number;
  status?: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED';
}
