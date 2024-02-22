import ActionButton from './ActionButton';
import React, { useState } from 'react';
import Table from './Table';
import { Designated, ICreateDesignated } from '@Types/Designated';
import { offices } from '@Constants/offices';
import { Pencil, Trash } from 'phosphor-react';
import DeleteModal from './DeleteModal';
import CreateDesignated from './CreateDesignated';

// import { Container } from './styles';

interface IDesignatedsList {
  designateds?: Designated[];
  onEditDesignated?: (designated: ICreateDesignated) => Promise<void>;
  handleDeleteDesignated: (designatedId: string) => Promise<void>;
}

// eslint-disable-next-line no-empty-pattern
const DesignatedsList: React.FC<IDesignatedsList> = ({
  designateds,
  handleDeleteDesignated,
  onEditDesignated,
}) => {
  const [designatedToBeDeleted, setDesignatedToBeDeleted] =
    useState<Designated | null>();
  const [selectedDesignatedToEdit, setSelectedDesignatedToEdit] =
    useState<Designated | null>();

  const columns = [
    { key: 'name', label: 'Nome' },
    { key: 'office', label: 'Cargo' },
    { key: 'actions', label: 'Ações' },
  ];

  return (
    <>
      {designatedToBeDeleted && (
        <DeleteModal
          isOpen={!!designatedToBeDeleted}
          onClose={() => setDesignatedToBeDeleted(null)}
          message={`Tem certeza que deseja deletar o responsável de campo ${designatedToBeDeleted.name}?`}
          onDelete={async () => {
            await handleDeleteDesignated(
              designatedToBeDeleted.id as string,
            );
            setDesignatedToBeDeleted(null);
          }}
        />
      )}
      {selectedDesignatedToEdit && (
        <CreateDesignated
          isOpen={!!selectedDesignatedToEdit}
          onClose={() => setSelectedDesignatedToEdit(null)}
          prevDesignated={selectedDesignatedToEdit}
          onSave={onEditDesignated}
        />
      )}
      <Table
        columns={columns}
        data={designateds?.map((designated) => ({
          ...designated,
          office: offices[designated.office],
          actions: (
            <div className="flex gap-4">
              <ActionButton
                tooltipMessage="Editar"
                icon={<Pencil size={20} className="fill-white" />}
                onClick={() => setSelectedDesignatedToEdit(designated)}
                bgColor="bg-gray-600"
                bgColorDark="bg-gray-700"
              />
              <ActionButton
                tooltipMessage="Excluir"
                icon={<Trash size={15} className="fill-white" />}
                onClick={() => setDesignatedToBeDeleted(designated)}
                bgColor="bg-red-600"
                bgColorDark="bg-red-700"
              />
            </div>
          ),
        }))}
        filters={[
          {
            name: 'Cargo',
            field: 'office',
          },
        ]}
      />
    </>
  );
};

export default DesignatedsList;
