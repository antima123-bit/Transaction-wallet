import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-200">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg",
          "text-white placeholder-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent",
          "transition-colors duration-200",
          error && "border-[#FF4C4C] focus:ring-[#FF4C4C]",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-[#FF4C4C]">{error}</p>
      )}
    </div>
  );
};