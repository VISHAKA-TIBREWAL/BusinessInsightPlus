import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost' | 'link';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        className={`px-4 py-2 rounded-md ${
          variant === 'default' ? 'bg-blue-500 text-white' : 
          variant === 'destructive' ? 'bg-red-500 text-white' : 
          variant === 'outline' ? 'border border-gray-300' : 
          variant === 'ghost' ? 'hover:bg-gray-100' : 
          'text-blue-500 underline'
        } ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };