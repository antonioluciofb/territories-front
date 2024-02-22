import ActionButton from './ActionButton';
import CreateRecord from './CreateRecord';
import ImagePreviewModal from './ImagePreviewModal';
import React, { useState } from 'react';
import StatusTag from './Status';
import Table from './Table';
import { Card, ICreateCardData } from '@Types/Cards';
import { cardsListColumns } from '@Constants/cards';
import { convertStringDateToLocaleString } from '@Utils/date';
import { CreateRecord as ICreateRecord } from '@Types/Records';
import { Designated } from '@Types/Designated';
import { getCardStatusColor, squashBlocks } from '@Utils/cards';
import {
  ArrowCounterClockwise,
  Image,
  Pencil,
  Scroll,
  Trash,
} from 'phosphor-react';
import RestartTerritory from './RestartTerritory';
import DeleteModal from './DeleteModal';
import { useContextHook } from '@Context/index';
import CreateCard from './CreateCard';
import ShareButton from './ShareButton';

interface ICardsList {
  cards?: Card[];
  designateds?: Designated[];
  handleDeleteCard: (cardId: string) => Promise<void>;
  onCreateRegister: (createRecordData: ICreateRecord) => Promise<void>;
  onEditCard: (cardData: ICreateCardData) => Promise<void>;
  onCloseTerritory: () => Promise<void>;
}

// eslint-disable-next-line no-empty-pattern
const CardsList: React.FC<ICardsList> = ({
  cards,
  designateds,
  handleDeleteCard,
  onCreateRegister,
  onEditCard,
  onCloseTerritory,
}) => {
  const { userDetails } = useContextHook();

  const [cardToBeDeleted, setCardToBeDeleted] = useState<Card | null>();
  const [isTerritoryClosure, setIsTerritoryClosure] = useState(false);

  const [selectedCardToRegister, setSelectedCardToRegister] =
    useState<Card | null>(null);
  const [selectedCardToEdit, setSelectedCardToEdit] = useState<Card | null>(
    null,
  );

  const [cardSrcPreview, setCardSrcPreview] = useState<string>('');

  const getText = (card: Card) => {
    if (card.finished) {
      return 'Finalizado';
    }
    if (card.inProgress) {
      return 'Em progresso';
    }
    return 'Não iniciado';
  };

  const isAllCardsFinished = cards?.every((card) => card.finished);

  const actionButtons = [
    {
      component: (
        <ActionButton
          tooltipMessage="Reiniciar território"
          // disabled={card.finished}
          icon={<ArrowCounterClockwise size={15} className="fill-white" />}
          onClick={() => {
            setIsTerritoryClosure(true);
          }}
          tooltipPosition="right-14"
          bgColor="bg-green-500"
          bgColorDark="bg-green-600"
        />
      ),
      isActive: isAllCardsFinished && cards && cards?.length > 0,
    },
  ].reduce((acc, curr) => {
    if (curr.isActive) {
      return [...acc, curr.component];
    }
    return acc;
  }, [] as JSX.Element[]);

  return (
    <>
      {isTerritoryClosure && (
        <RestartTerritory
          isOpen
          onClose={() => setIsTerritoryClosure(false)}
          onRestart={async () => {
            onCloseTerritory();
            setIsTerritoryClosure(false);
          }}
        />
      )}

      {cardToBeDeleted && (
        <DeleteModal
          isOpen
          onClose={() => setCardToBeDeleted(null)}
          message={`Tem certeza que deseja excluir o cartão ${cardToBeDeleted.name}?`}
          onDelete={async () => {
            await handleDeleteCard(cardToBeDeleted.id);
            setCardToBeDeleted(null);
          }}
        />
      )}

      {selectedCardToRegister && (
        <CreateRecord
          designated={designateds || []}
          isOpen={!!selectedCardToRegister}
          cards={cards || []}
          onClose={() => setSelectedCardToRegister(null)}
          onCreate={onCreateRegister}
          prevSelectedCard={selectedCardToRegister}
        />
      )}

      {selectedCardToEdit && (
        <CreateCard
          isOpen={!!selectedCardToEdit}
          onClose={() => setSelectedCardToEdit(null)}
          cardToEdit={selectedCardToEdit}
          onSave={onEditCard}
        />
      )}

      <ImagePreviewModal
        isOpen={!!cardSrcPreview}
        onRequestClose={() => setCardSrcPreview('')}
        src={cardSrcPreview}
        card={cards?.find((card) => card.img === cardSrcPreview)}
      />

      <Table
        isLoading={cards === undefined}
        columns={cardsListColumns}
        actionButtons={actionButtons}
        filters={[
          {
            name: 'Finalizado em',
            field: 'finishedAt',
          },
          {
            name: 'Status',
            field: 'status',
          },
          {
            name: 'Quadras pendentes',
            field: 'pendingBlocksCount',
          },
        ]}
        data={cards?.map((card) => ({
          name: card.name,
          pendingBlocks: squashBlocks(card.pendingBlocks),
          pendingBlocksCount: card.pendingBlocks.length,
          records: card.records.length,
          dontVisit: card.dontVisit.length || '---',
          finishedAt: card.finishedAt
            ? convertStringDateToLocaleString(card.finishedAt)
            : '---',
          status: (
            <StatusTag color={getCardStatusColor(card)} text={getText(card)} />
          ),
          actions: (
            <div className="flex gap-4">
              <ActionButton
                tooltipMessage="Novo registro"
                disabled={card.finished}
                icon={<Scroll size={20} className="fill-white" />}
                onClick={() => setSelectedCardToRegister(card)}
                bgColor="bg-cyan-600"
                bgColorDark="bg-cyan-700"
              />
              <ActionButton
                tooltipMessage="Ver imagem"
                disabled={!card.img}
                icon={<Image size={20} className="fill-white" />}
                onClick={() => setCardSrcPreview(card.img)}
                bgColor="bg-yellow-600"
                bgColorDark="bg-yellow-700"
              />
              <ActionButton
                tooltipMessage="Editar"
                disabled={card.finished}
                icon={<Pencil size={20} className="fill-white" />}
                onClick={() => setSelectedCardToEdit(card)}
                bgColor="bg-gray-600"
                bgColorDark="bg-gray-700"
              />
              <ShareButton card={card} />

              {userDetails?.isRoot && (
                <ActionButton
                  tooltipMessage="Excluir"
                  icon={<Trash size={20} className="fill-white" />}
                  onClick={() => setCardToBeDeleted(card)}
                  bgColor="bg-red-600"
                  bgColorDark="bg-red-700"
                />
              )}
            </div>
          ),
        }))}
      />
    </>
  );
};

export default CardsList;
