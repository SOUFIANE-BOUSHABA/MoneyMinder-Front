
export interface Transaction {
  id?: number;
  date: Date;
  amount: number;
  type: 'EXPENSE' | 'INCOME';
  categoryId: number;
  accountId: number;
  description?: string;
  category?: string;
  account?: string;
  status?: 'Completed' | 'Pending' | 'Failed';
}

export interface TransactionRequest {
  date: Date;
  amount: number;
  type: 'EXPENSE' | 'INCOME';
  categoryId: number;
  accountId: number;
  description?: string;
}
