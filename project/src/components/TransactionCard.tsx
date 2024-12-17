import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Transaction } from '@/types';

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const isReceive = transaction.type === 'receive';
  
  return (
    <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:bg-gray-800 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "p-2 rounded-full",
            isReceive ? "bg-green-500/10" : "bg-red-500/10"
          )}>
            {isReceive ? (
              <ArrowDownLeft className="w-5 h-5 text-green-500" />
            ) : (
              <ArrowUpRight className="w-5 h-5 text-red-500" />
            )}
          </div>
          <div>
            <p className="text-gray-200 font-medium">{transaction.category}</p>
            <p className="text-sm text-gray-400">{transaction.description}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={cn(
            "font-medium",
            isReceive ? "text-green-500" : "text-red-500"
          )}>
            {isReceive ? '+' : '-'}${transaction.amount.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400">
            {new Date(transaction.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};