import ActionButton from './ActionButton';
import React, { useState } from 'react';
import Table from './Table';
import { DontVisit, ICreateDontVisitData } from '@Types/DontVisit';
import { toast } from 'react-toastify';
import { Pencil, Trash } from 'phosphor-react';
import DeleteModal from './DeleteModal';
import CreateDontVisit from './CreateDontVisit';
import { useContextHook } from '@Context/index';

interface DontVisitListProps {
  dontVisits?: DontVisit[];
  onDelete: (id: string) => Promise<void>;
  onEdit?: (dontVisit: ICreateDontVisitData) => Promise<void>;
}

const DontVisitsList: React.FC<DontVisitListProps> = ({
  dontVisits,
  onDelete,
  onEdit,
}) => {
  const { allData } = useContextHook();
  const [dontVisitToBeDeleted, setDontVisitToBeDeleted] =
    useState<DontVisit | null>();

  const [selectedDontVisitToEdit, setSelectedDontVisitToEdit] =
    useState<DontVisit | null>();

  const columns = [
    { key: 'card', label: 'Cartão' },
    { key: 'type', label: 'Tipo' },
    { key: 'street', label: 'Rua' },
    { key: 'number', label: 'Número' },
    { key: 'observations', label: 'Observação' },
    { key: 'actions', label: 'Ações' },
  ];

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);
      setDontVisitToBeDeleted(null);
      toast.success('Não visitar deletado com sucesso!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {selectedDontVisitToEdit && (
        <CreateDontVisit
          isOpen={!!selectedDontVisitToEdit}
          onClose={() => setSelectedDontVisitToEdit(null)}
          cards={allData.cards || []}
          prevSelectedCard={selectedDontVisitToEdit.card}
          prevSelectedDontVisit={selectedDontVisitToEdit}
          onEdit={onEdit}
        />
      )}
      <Table
        data={dontVisits?.map((dontVisit) => ({
          ...dontVisit,
          card: dontVisit.card.name,
          actions: (
            <div className="flex gap-4">
              <ActionButton
                tooltipMessage="Editar"
                icon={<Pencil size={20} className="fill-white" />}
                onClick={() => setSelectedDontVisitToEdit(dontVisit)}
                bgColor="bg-gray-600"
                bgColorDark="bg-gray-700"
              />
              <ActionButton
                tooltipMessage="Excluir"
                icon={<Trash size={20} className="fill-white" />}
                onClick={() => setDontVisitToBeDeleted(dontVisit)}
                bgColor="bg-red-600"
                bgColorDark="bg-red-700"
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
            name: 'Tipo',
            field: 'type',
          },
        ]}
      />

      {dontVisitToBeDeleted && (
        <DeleteModal
          isOpen={!!dontVisitToBeDeleted}
          message={`Você tem certeza que deseja excluir o não visitar do cartão ${dontVisitToBeDeleted.card.name}?`}
          onClose={() => setDontVisitToBeDeleted(null)}
          onDelete={() => handleDelete(dontVisitToBeDeleted?.id || '')}
        />
      )}
    </>
  );
};

export default DontVisitsList;
