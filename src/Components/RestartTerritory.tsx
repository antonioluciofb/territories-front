import { createCustomStyle } from '@Utils/modals';
import React, { useState } from 'react';
import Modal from 'react-modal';

// import { Container } from './styles';

interface IRestartTerritory {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => Promise<void>;
}

// eslint-disable-next-line no-empty-pattern
const RestartTerritory: React.FC<IRestartTerritory> = ({
  isOpen,
  onClose,
  onRestart,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={createCustomStyle({
        maxHeight: '250px',
      })}
      shouldCloseOnEsc
    >
      <div className="w-full h-full flex flex-col justify-evenly items-start">
        <p className="text-center text-3xl font-bold mb-4">
          Voce está prestes a reiniciar o território
        </p>
        <p className="text-center text-3xl font-bold mb-4">
          Tem certeza que deseja fazer isso?
        </p>
        <div className="w-full flex justify-evenly items-center">
          {!loading && (
            <>
              <button
                className="w-5/12 h-10 bg-gray-800 hover:bg-gray-600 duration-300 rounded-xl flex justify-center items-center text-white font-bold"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                className="w-5/12 h-10 bg-red-400 hover:bg-red-600 duration-300 rounded-xl flex justify-center items-center text-white font-bold"
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  await onRestart();
                  setLoading(false);
                }}
              >
                Reiniciar
              </button>
            </>
          )}
          {loading && (
            <p className="text-center text-xl font-bold animate-bounce">
              Reiniciando...
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RestartTerritory;
