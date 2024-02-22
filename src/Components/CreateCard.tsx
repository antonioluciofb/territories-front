import React, { useState } from 'react';
import Modal from 'react-modal';
import Input from './Input';
import { createCustomStyle } from '@Utils/modals';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Card, ICreateCardData } from '@Types/Cards';
import { toast } from 'react-toastify';

// import { Container } from './styles';

interface ICreateCard {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (cardData: ICreateCardData) => Promise<void>;
  cardToEdit?: Card;
}

// eslint-disable-next-line no-empty-pattern
const CreateCard: React.FC<ICreateCard> = ({
  isOpen,
  cardToEdit,
  onClose,
  onSave,
}) => {
  const [isCreating, setIsLoading] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      name: cardToEdit?.name || '',
      blocks: cardToEdit?.blocks.length || 0,
      img: cardToEdit?.img || '',
    },
  });

  const onSubmit: SubmitHandler<ICreateCardData> = async (cardData) => {
    setIsLoading(true);

    const dataCard = {
      ...cardData,
      id: cardToEdit?.id || '',
      blocks: Number(cardData.blocks),
    };

    try {
      await onSave?.(dataCard);
      toast.success('Cartão criado com sucesso!');
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={createCustomStyle({
        maxWidth: '550px',
        maxHeight: isCreating ? '290px' : '250px',
      })}
    >
      <div className="w-full h-full flex flex-col justify-between items-start">
        <h2 className="text-3xl font-bold  text-gray-800">
          {cardToEdit ? 'Editar' : 'Criar'} um cartão
        </h2>
        <div className="w-full flex flex-wrap justify-start items-center gap-5">
          <Input
            label="Nome do cartão"
            placeholder="Nome do cartão"
            customSize="medium"
            {...register('name', {
              required: '* Obrigatório',
            })}
            error={errors.name?.message}
          />
          <Input
            label="Qtd. de quadras"
            placeholder="Qtd. de quadras"
            type="number"
            customSize="small"
            {...register('blocks', {
              required: '* Obrigatório',
              min: {
                value: 1,
                message: 'O valor mínimo é 1',
              },
            })}
            error={errors.blocks?.message}
          />
          <Input
            label="Url da Imagem"
            placeholder="Url da Imagem"
            customSize="small"
            {...register('img')}
            error={errors.img?.message}
          />
        </div>
        <div className="w-full flex justify-evenly items-center gap-4">
          <button
            className="w-6/12 h-10 bg-gray-800 hover:bg-gray-600 duration-300 rounded-xl flex justify-center items-center text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onClose}
            disabled={isCreating}
          >
            Cancelar
          </button>
          <button
            className="w-6/12 h-10 bg-green-400 hover:bg-green-600 duration-300 rounded-xl flex justify-center items-center text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit(onSubmit)}
            disabled={isCreating}
          >
            {cardToEdit ? 'Salvar' : 'Criar'}
          </button>
        </div>
      </div>
      {isCreating && (
        <p className="w-full text-center text-xl font-bold animate-pulse mt-4">
          Criando...
        </p>
      )}
    </Modal>
  );
};

export default CreateCard;
