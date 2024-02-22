import ActionButton from './ActionButton';
import React, { useState } from 'react';
import Table from './Table';
import { convertStringDateToCompleteDate } from '@Utils/date';
import { TerritoryClosures } from '@Types/TerritoryClosures';
import { Trash } from 'phosphor-react';
import DeleteModal from './DeleteModal';

// import { Container } from './styles';

interface ITerritoryClosuresList {
  territoryClosures?: TerritoryClosures[];
  onDeleteTerritoryClosure?: (territoryClosureId: string) => Promise<void>;
}

// startDate: string;
// endDate: string;
// periodRange: string;
// cards: Array<Card>;
// records: Array<Record>;

// eslint-disable-next-line no-empty-pattern
const TerritoryClosuresList: React.FC<ITerritoryClosuresList> = ({
  territoryClosures,
  onDeleteTerritoryClosure,
}) => {
  const [territoryClosureToBeDeleted, setTerritoryClosureToBeDeleted] =
    useState<TerritoryClosures | null>();

  const columns = [
    {
      key: 'startDate',
      label: 'Data de início',
    },
    {
      key: 'endDate',
      label: 'Data de fim',
    },
    {
      key: 'periodRange',
      label: 'Período',
    },
    {
      key: 'cards',
      label: 'Cartões',
    },
    {
      key: 'records',
      label: 'Registros',
    },
    {
      key: 'actions',
      label: 'Ações',
    },
  ];

  return (
    <>
      {territoryClosureToBeDeleted && (
        <DeleteModal
          isOpen={!!territoryClosureToBeDeleted}
          onClose={() => setTerritoryClosureToBeDeleted(null)}
          message={`Tem certeza que deseja deletar o fechamento de território do período ${territoryClosureToBeDeleted.periodRange}?`}
          onDelete={async () => {
            if (onDeleteTerritoryClosure) {
              await onDeleteTerritoryClosure(
                territoryClosureToBeDeleted.id || '',
              );
            }
            setTerritoryClosureToBeDeleted(null);
          }}
        />
      )}
      <Table
        columns={columns}
        data={territoryClosures?.map((territoryClosure) => ({
          ...territoryClosure,
          startDate: convertStringDateToCompleteDate(
            territoryClosure.startDate,
          ),
          endDate: convertStringDateToCompleteDate(territoryClosure.endDate),
          cards: territoryClosure.cards.length,
          records: territoryClosure.records.length,
          actions: (
            <ActionButton
              tooltipMessage="Deletar"
              // disabled={card.finished}
              icon={<Trash size={15} className="fill-white" />}
              onClick={() => {
                setTerritoryClosureToBeDeleted(territoryClosure);
              }}
              bgColor="bg-red-500"
              bgColorDark="bg-red-600"
            />
          ),
        }))}
      />
    </>
  );
};

export default TerritoryClosuresList;
