import React, { useState } from 'react';
import ActionButton from './ActionButton';
import { ShareNetwork } from 'phosphor-react';
import { Card } from '@Types/Cards';
import { cardsService } from '@Services/cards';
import { base64StringToFile } from '@Utils/base64ToFile';
import ReactModal from 'react-modal';
import { createCustomStyle } from '@Utils/modals';
import { toast } from 'react-toastify';

// import { Container } from './styles';

interface IShareButton {
  card: Card;
  tooltipPosition?: string;
}

// eslint-disable-next-line no-empty-pattern
const ShareButton: React.FC<IShareButton> = ({ card, tooltipPosition }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const shareFile = async () => {
    if (!navigator.canShare) {
      alert('Seu navegador não suporta compartilhamento');
      return;
    }

    setLoading(true);

    const file = base64StringToFile(
      await cardsService.getImageCard(
        card.img?.split?.('.com/')?.[1]?.replace?.('+', ' '),
      ),
      'territorio.png',
    );

    const message: ShareData = {
      files: [
        new File([file], 'territorio.png', {
          type: 'image/png',
        }),
      ],
    };

    if (navigator.canShare(message)) {
      try {
        await navigator.share(message);
        toast.success('Imagem compartilhada com sucesso');
      } catch (error) {
        console.error('Error sharing', error);
      }
    } else {
      console.error('Your browser does not support sharing');
    }
    setLoading(false);
  };

  const shareText = async () => {
    if (!navigator.canShare) {
      alert('Seu navegador não suporta compartilhamento');
      return;
    }

    setLoading(true);

    const dontVisit =
      card.dontVisit.length > 0
        ? `\n\n*Não visitar:* ${card.dontVisit.map(
            (block) =>
              `\n\nTipo: ${block.type}\nRua ${block.street}\nNúmero: ${block.number}\nObersevação: ${block.observations}`,
          )}`
        : '';

    const text = `*Território:* ${
      card.name
    }\n\n*Quadras Pendentes:* ${card.pendingBlocks.join()}${dontVisit}`;

    const message: ShareData = {
      title: 'Território',
      text,
    };

    if (navigator.canShare(message)) {
      try {
        await navigator.share(message);
        toast.success('Texto compartilhado com sucesso');
      } catch (error) {
        console.error('Error sharing', error);
      }
    } else {
      console.error('Your browser does not support sharing');
    }
    setLoading(false);
  };

  const onClose = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <ReactModal
        isOpen={isOpenModal}
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
              Compartilhar
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
              Deseja compartilhar o território?
            </p>
          </div>

          <div className="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
            <div className="w-full flex justify-center items-center">
              <button
                data-modal-toggle="default-modal"
                type="button"
                className="w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-600 dark:focus:ring-green-800 mr-5"
                onClick={async () => {
                  setLoading(true);
                  shareText();
                  setLoading(false);
                }}
              >
                Enviar texto
              </button>
              <button
                data-modal-toggle="default-modal"
                type="button"
                className="w-full whitespace-nowrap text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-600 dark:focus:ring-green-800"
                onClick={shareFile}
              >
                Enviar imagem
              </button>
            </div>
          </div>
          {loading && (
            <p className="text-center text-xl font-bold animate-pulse mb-4">
              Enviando...
            </p>
          )}
        </div>
      </ReactModal>
      <ActionButton
        bgColor="bg-green-500"
        bgColorDark="bg-green-600"
        icon={<ShareNetwork size={20} />}
        disabled={card.finished}
        onClick={() => setIsOpenModal(true)}
        tooltipMessage="Enviar para"
        tooltipPosition={tooltipPosition}
      />
    </>
  );
};

export default ShareButton;
