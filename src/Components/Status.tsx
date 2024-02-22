import clsx from 'clsx';
import React from 'react';

// import { Container } from './styles';

interface IStatusTag {
  text: string;
  color: string;
}

// eslint-disable-next-line no-empty-pattern
const StatusTag: React.FC<IStatusTag> = ({ color, text }) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-center rounded-full px-3 py-1',
        color,
      )}
    >
      <p className="text-center text-white font-medium whitespace-nowrap">{text}</p>
    </div>
  );
};

export default StatusTag;
