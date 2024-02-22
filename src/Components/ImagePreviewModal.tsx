/* eslint-disable @typescript-eslint/no-unused-vars */
import { createCustomStyle } from '@Utils/modals';
import React from 'react';
import ReactModal from 'react-modal';
import ActionButton from './ActionButton';
import { Link } from 'phosphor-react';
import ShareButton from './ShareButton';
import { Card } from '@Types/Cards';

// import { Container } from './styles';

interface IImagePreviewModal {
  isOpen: boolean;
  onRequestClose: () => void;
  src: string;
  card?: Card;
  withoutButtons?: boolean;
}

// eslint-disable-next-line no-empty-pattern
const ImagePreviewModal: React.FC<IImagePreviewModal> = ({
  isOpen,
  onRequestClose,
  src,
  withoutButtons,
  card,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={createCustomStyle({
        width: 'fit-content',
        maxWidth: '54vw',
        height: 'fit-content',
        maxHeight: '98vh',
        alignItems: 'flex-end',
        overflow: 'hidden',
      })}
    >
      {!withoutButtons && (
        <div className="w-full flex justify-end items-center gap-4">
          <ActionButton
            bgColor="bg-gray-500"
            bgColorDark="bg-gray-600"
            icon={<Link size={24} />}
            onClick={() => window.open(src, '_blank')}
            tooltipMessage="Abrir em tamanho original"
            tooltipPosition="top-16 right-1"
          />
          {card && <ShareButton card={card} tooltipPosition="top-16 right-1" />}
        </div>
      )}
      <div className="w-full h-full flex justify-center items-center">
        <img src={src} alt="Card preview" loading="lazy" />
      </div>
    </ReactModal>
  );
};

export default ImagePreviewModal;
