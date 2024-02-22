import { useContextHook } from '@Context/index';
import { createInitials } from '@Utils/createInitials';
import React from 'react';

// import { Container } from './styles';

interface IHeader {}

// eslint-disable-next-line no-empty-pattern
const Header: React.FC<IHeader> = ({}) => {
  const { userDetails, handleLogout } = useContextHook();

  return (
    <div className="w-full lg:h-16 bg-slate-700 rounded-ee-3xl rounded-es-3xl flex justify-center lg:justify-between lg:items-center flex-col lg:flex-row px-8 mb-12">
      <p className="text-white font-bold text-2xl xl:text-3xl text-center my-4 lg:my-0">
        Controle de Território
      </p>

      <div className="w-full lg:w-72 flex items-center justify-center lg:justify-between flex-col md:flex-row md:mb-4 lg:mb-0">
        <div className="w-fit flex items-center justify-center md:mr-4">
          <div className="w-10 h-10 mb-4 md:mb-0 bg-white rounded-full flex justify-center items-center text-xl font-bold mr-2 border-2 border-gray-800">
            {createInitials(userDetails?.name)}
          </div>

          <p className="text-white font-bold text-2xl ml-2">
            {userDetails?.name}
          </p>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-xl hover:bg-red-600 transition-all mb-4 md:mb-0 w-full md:w-40"
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Header;
