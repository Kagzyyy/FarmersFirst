
import React from 'react';
import Icon from './Icon';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const baseClasses = "fixed top-5 right-5 flex items-center p-4 mb-4 w-full max-w-xs text-slate-500 bg-white rounded-lg shadow-lg";
  const typeClasses = {
    success: 'text-green-500 bg-green-100',
    error: 'text-red-500 bg-red-100',
  };
  const iconName = type === 'success' ? 'check' : 'error';
  
  return (
    <div className={baseClasses} role="alert">
      <div className={`inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg ${typeClasses[type]}`}>
          <Icon name={iconName} className="w-5 h-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button type="button" onClick={onClose} className="ml-auto -mx-1.5 -my-1.5 bg-white text-slate-400 hover:text-slate-900 rounded-lg focus:ring-2 focus:ring-slate-300 p-1.5 hover:bg-slate-100 inline-flex h-8 w-8" aria-label="Close">
        <span className="sr-only">Close</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
    </div>
  );
};

export default Toast;
