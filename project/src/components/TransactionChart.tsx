import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { Transaction } from '@/types';

interface TransactionChartProps {
  transactions: Transaction[];
}

export const TransactionChart: React.FC<TransactionChartProps> = ({ transactions }) => {
  const data = React.useMemo(() => {
    const grouped = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }
      if (transaction.type === 'receive') {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }
      return acc;
    }, {} as Record<string, { date: string; income: number; expense: number }>);

    return Object.values(grouped);
  }, [transactions]);

  return (
    <div className="h-[300px] bg-gray-800/50 p-4 rounded-lg border border-gray-700">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#28A745" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#28A745" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF4C4C" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF4C4C" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '0.375rem',
            }}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#28A745"
            fillOpacity={1}
            fill="url(#income)"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#FF4C4C"
            fillOpacity={1}
            fill="url(#expense)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};