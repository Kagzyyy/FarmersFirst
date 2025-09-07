
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string | null;
}

const Input: React.FC<InputProps> = ({ label, id, className = '', error, ...props }) => {
  const errorClasses = error 
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
    : 'border-slate-700 focus:ring-primary focus:border-primary';

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-md font-medium text-textSecondary mb-2">
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-4 py-3 border rounded-lg text-lg bg-slate-800 text-white placeholder-slate-400 focus:ring-2 outline-none transition ${errorClasses} ${className}`}
        {...props}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
