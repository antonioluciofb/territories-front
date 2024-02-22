import React from 'react';
import Tooltip from './Tooltip';
import clsx from 'clsx';

// import { Container } from './styles';

interface IActionButton {
  tooltipMessage: string;
  tooltipPosition?: string;
  icon: React.ReactNode;
  onClick: () => void;
  bgColor: string;
  bgColorDark: string;
  disabled?: boolean;
}

// eslint-disable-next-line no-empty-pattern
const ActionButton: React.FC<IActionButton> = ({
  tooltipMessage,
  tooltipPosition = 'bottom-14 right-[50%] translate-x-1/2',
  disabled,
  icon,
  bgColor,
  bgColorDark,
  onClick,
}) => {
  return (
    <Tooltip message={tooltipMessage} position={tooltipPosition}>
      <button
        className={clsx(
          'px-3 py-3 duration-300 rounded-xl flex justify-center items-center text-white font-bold disabled:opacity-50',
          bgColor && `${bgColor} hover:${bgColorDark}`,
        )}
        disabled={disabled}
        onClick={onClick}
      >
        {icon}
      </button>
    </Tooltip>
  );
};
export default ActionButton;
