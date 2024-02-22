// Input.tsx
import React, { forwardRef, InputHTMLAttributes } from 'react';

const sizes = {
  small: 'w-[120px]',
  medium: 'w-[200px]',
  large: 'w-[300px]',
} as const;

type Size = keyof typeof sizes;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  customSize?: Size;
}

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, placeholder, type = 'text', customSize = 'small', error, ...rest },
    ref,
  ) => {
    return (
      <div
        className={`flex flex-col justify-start items-start ${sizes[customSize]} relative`}
      >
        <label
          className={`block text-gray-700 text-sm font-bold mb-2 ${
            error ? 'text-red-500' : ''
          }`}
          htmlFor={label}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={label}
          className={`w-full border border-gray-400 p-2 rounded-md focus:outline-none focus:border-blue-500 ${
            error ? 'border-red-500' : ''
          }`}
          type={type}
          placeholder={placeholder}
          {...rest}
        />
        {error && (
          <p className="text-red-500 text-xs font-bold mt-2">{error}</p>
        )}
      </div>
    );
  },
);

export default Input;
