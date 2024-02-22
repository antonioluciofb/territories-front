import { createCustomStyle } from '@Utils/modals';
import React, { useState } from 'react';
import Modal from 'react-modal';

interface IDeleteModal {
  isOpen: boolean;
  message?: string;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

// eslint-disable-next-line no-empty-pattern
const DeleteModal: React.FC<IDeleteModal> = ({
  isOpen,
  message,
  onClose,
  onDelete,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={createCustomStyle({
        width: 'fit-content',
        height: 'fit-content',
        maxHeight: 'fit-content',
        padding: '0',
      })}
      shouldCloseOnEsc
    >
      <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
            Deletar
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="default-modal"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-gray-500 text-2xl leading-relaxed dark:text-gray-400">
            {message}
          </p>
        </div>

        <div className="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
          <div className="">
            <button
              data-modal-toggle="default-modal"
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-800 mr-5"
              onClick={async () => {
                setLoading(true);
                await onDelete();
                setLoading(false);
              }}
            >
              Deletar
            </button>
            <button
              data-modal-toggle="default-modal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-400 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
          {loading && (
            <p className="text-center text-xl font-bold animate-bounce">
              Deletando...
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
