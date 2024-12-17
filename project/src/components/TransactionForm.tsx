import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useTransactionStore } from '@/store/useTransactionStore';
import { useAuthStore } from '@/store/useAuthStore';
import type { TransactionCategory } from '@/types';

interface TransactionFormProps {
  onClose: () => void;
}

const categories: TransactionCategory[] = [
  'savings',
  'food',
  'salary',
  'entertainment',
  'transportation',
  'utilities',
  'other',
];

export const TransactionForm: React.FC<TransactionFormProps> = ({ onClose }) => {
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const user = useAuthStore((state) => state.user);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    addTransaction({
      type: formData.get('type') as 'send' | 'receive',
      amount: Number(formData.get('amount')),
      category: formData.get('category') as TransactionCategory,
      description: formData.get('description') as string,
    });

    onClose();
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-white mb-6">Add Transaction</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="type"
                value="send"
                defaultChecked
                className="text-[#00BFFF]"
              />
              <span>Send</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="type"
                value="receive"
                className="text-[#00BFFF]"
              />
              <span>Receive</span>
            </label>
          </div>

          <Input
            label="Amount"
            name="amount"
            type="number"
            min="0"
            step="0.01"
            required
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-200">
              Category
            </label>
            <select
              name="category"
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white"
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Description"
            name="description"
            placeholder="Enter description"
          />

          <Button type="submit" className="w-full">
            Add Transaction
          </Button>
        </form>
      </div>
    </div>
  );
};