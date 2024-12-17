import { create } from 'zustand';
import type { Transaction, TransactionCategory } from '@/types';

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

// Dummy transaction data
const initialTransactions: Transaction[] = [
  {
    id: '1',
    type: 'receive',
    amount: 1000,
    category: 'salary',
    date: new Date('2024-03-01'),
    description: 'Monthly salary',
  },
  {
    id: '2',
    type: 'send',
    amount: 50,
    category: 'food',
    date: new Date('2024-03-02'),
    description: 'Groceries',
  },
  {
    id: '3',
    type: 'send',
    amount: 30,
    category: 'entertainment',
    date: new Date('2024-03-03'),
    description: 'Movie tickets',
  },
];

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: initialTransactions,
  addTransaction: (transaction) => {
    set((state) => ({
      transactions: [
        {
          ...transaction,
          id: Math.random().toString(),
          date: new Date(),
        },
        ...state.transactions,
      ],
    }));
  },
}));