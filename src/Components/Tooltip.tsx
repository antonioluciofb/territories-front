import React from 'react';

// import { Container } from './styles';

interface ITooltip {
  message: string;
  children: React.ReactNode;
  position?: string;
}

// eslint-disable-next-line no-empty-pattern
const Tooltip: React.FC<ITooltip> = ({
  message,
  children,
  position = 'bottom-10',
}) => {
  return (
    <div className="group relative flex justify-center items-center">
      {children}
      <span
        className={`absolute ${position} scale-0 transition-all rounded bg-gray-800 p-2 text-md text-white group-hover:scale-100 whitespace-nowrap`}
      >
        {message}
      </span>
    </div>
  );
};

export default Tooltip;
