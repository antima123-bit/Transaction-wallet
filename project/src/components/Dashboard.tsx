import React from 'react';
import { PlusCircle, TrendingUp } from 'lucide-react';
import { Button } from './ui/Button';
import { TransactionCard } from './TransactionCard';
import { TransactionForm } from './TransactionForm';
import { TransactionChart } from './TransactionChart';
import { useAuthStore } from '@/store/useAuthStore';
import { useTransactionStore } from '@/store/useTransactionStore';
import { formatCurrency } from '@/lib/utils';

export const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = React.useState(false);
  const user = useAuthStore((state) => state.user);
  const transactions = useTransactionStore((state) => state.transactions);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-2">Balance</h2>
          <p className="text-3xl font-bold text-[#00BFFF]">
            {formatCurrency(user.walletBalance)}
          </p>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-2">Statistics</h2>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-[#28A745]" />
            <span className="text-[#28A745] font-medium">+12.5% this month</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <TransactionChart transactions={transactions} />
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Transaction</span>
        </Button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>

      {showForm && (
        <TransactionForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};