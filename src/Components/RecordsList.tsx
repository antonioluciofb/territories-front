import React, { useState } from 'react';
import Table from './Table';
import { CreateRecord as ICreateRecord, Record } from '@Types/Records';
import { squashBlocks } from '@Utils/cards';
import ActionButton from './ActionButton';
import { Pencil } from 'phosphor-react';
import CreateRecord from './CreateRecord';
import { useContextHook } from '@Context/index';

interface RecordsListProps {
  records?: Record[];
  onEditRegister: (record: ICreateRecord) => Promise<void>;
}

const RecordsList: React.FC<RecordsListProps> = ({
  records,
  onEditRegister,
}) => {
  const { allData } = useContextHook();

  const { cards, designateds } = allData;

  const [selectedRegisterToEdit, setSelectedRegisterToEdit] =
    useState<Record | null>();

  const columns = [
    { key: 'card', label: 'Cartão' },
    { key: 'designated', label: 'Responsável' },
    { key: 'pendingBlocks', label: 'Quadras pendentes' },
    { key: 'periodOfDay', label: 'Período' },
    { key: 'createdAt', label: 'Criado em' },
    { key: 'actions', label: 'Ações' },
  ];

  return (
    <>
      {selectedRegisterToEdit && (
        <CreateRecord
          isOpen={!!selectedRegisterToEdit}
          cards={cards || []}
          designated={designateds || []}
          onClose={() => setSelectedRegisterToEdit(null)}
          prevSelectedRecord={selectedRegisterToEdit}
          prevSelectedCard={selectedRegisterToEdit.card}
          onEdit={onEditRegister}
        />
      )}

      <Table
        data={records?.map((record) => ({
          ...record,
          card: record.card.name,
          designated: record.designated.name,
          pendingBlocks: squashBlocks(record.pendingBlocks),
          actions: (
            <div className="flex gap-4">
              <ActionButton
                tooltipMessage="Editar"
                icon={<Pencil size={20} className="fill-white" />}
                onClick={() => setSelectedRegisterToEdit(record)}
                bgColor="bg-gray-600"
                bgColorDark="bg-gray-700"
              />
            </div>
          ),
        }))}
        columns={columns}
        filters={[
          {
            name: 'Cartão',
            field: 'card',
          },
          {
            name: 'Responsável',
            field: 'designated',
          },
          {
            name: 'Período',
            field: 'periodOfDay',
          },
        ]}
      />
    </>
  );
};

export default RecordsList;
