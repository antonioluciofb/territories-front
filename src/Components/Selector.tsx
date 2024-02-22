import React from 'react';
import clsx from 'clsx';
import { arraySelectorOptions } from 'Constants/optionsSelector';
import { OptionsType } from '@Types/Create';

// import { Container } from './styles';

interface ISelector {
  selectedOption: OptionsType;
  setSelectedOption: (option: OptionsType) => void;
}

// eslint-disable-next-line no-empty-pattern
const Selector: React.FC<ISelector> = ({
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-10/12 xl:w-fit px-6 h-20 bg-white rounded-full flex justify-evenly items-center mb-6">
        <div className="w-full h-full flex justify-start items-center overflow-x-auto">
          {arraySelectorOptions.map(({ key, value }, index) => (
            <div key={key} className="flex justify-center items-center">
              {index !== 0 && (
                <div className="w-1 mx-4 h-3/6 bg-gray-800 rounded-full" />
              )}
              <div
                className={clsx(
                  'px-10 py-2 bg-gray-800 text-white font-bold text-lg rounded-full cursor-pointer duration-300 whitespace-nowrap',
                  {
                    'opacity-50': selectedOption !== key,
                  },
                )}
                onClick={() => setSelectedOption(key)}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Selector;
