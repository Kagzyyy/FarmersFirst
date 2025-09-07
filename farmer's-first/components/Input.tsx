
import React from 'react';
import Icon from './Icon';
import type { IconName } from './Icon';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: IconName;
}

const Input: React.FC<InputProps> = ({ label, id, icon, ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon name={icon} className="h-5 w-5 text-slate-400" />
          </div>
        )}
        <input
          id={id}
          className={`block w-full text-lg border-slate-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 ${icon ? 'pl-10' : ''}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
