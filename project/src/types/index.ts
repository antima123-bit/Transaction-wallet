export interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  category: TransactionCategory;
  date: Date;
  description?: string;
}

export type TransactionCategory = 
  | 'savings'
  | 'food'
  | 'salary'
  | 'entertainment'
  | 'transportation'
  | 'utilities'
  | 'other';

export interface User {
  id: string;
  username: string;
  email: string;
  walletBalance: number;
}