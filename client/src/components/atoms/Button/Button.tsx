// src/components/atoms/Button/Button.tsx
import { FC } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onClick,
  children,
}) => {
  const baseStyles = 'rounded-md font-medium transition-colors';
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  };
  
  return (
    <button 
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};