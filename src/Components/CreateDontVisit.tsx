/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Modal from 'react-modal';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card } from '@Types/Cards';
import { createCustomStyle } from '@Utils/modals';
import ReactSelect from 'react-select';
import Input from './Input';
import { DontVisit, ICreateDontVisitData } from '@Types/DontVisit';

// import { Container } from './styles';

interface ICreateDontVisit {
  isOpen: boolean;
  cards: Card[];
  prevSelectedCard?: Card | null;
  prevSelectedDontVisit?: DontVisit | null;
  onClose: () => void;
  onCreate?: (createDontVisitData: ICreateDontVisitData) => Promise<void>;
  onEdit?: (updateDontVisitData: ICreateDontVisitData) => Promise<void>;
}

// eslint-disable-next-line no-empty-pattern
const CreateDontVisit: React.FC<ICreateDontVisit> = ({
  isOpen,
  cards,
  prevSelectedCard,
  prevSelectedDontVisit,
  onClose,
  onCreate,
  onEdit,
}) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const userSchema = object({
    card: string().required('Cartão é obrigatório'),
    type: string().required('Tipo é obrigatório'),
    street: string().required('Rua é obrigatório'),
    number: string().required('Número é obrigatório'),
    observations: string().required('Observação é obrigatório'),
  });

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    clearErrors,
  } = useForm({
    mode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      card: prevSelectedCard?.id || '',
      type: prevSelectedDontVisit?.type || '',
      street: prevSelectedDontVisit?.street || '',
      number: prevSelectedDontVisit?.number || '',
      observations: prevSelectedDontVisit?.observations || '',
    },
    resolver: yupResolver(userSchema),
  });

  const onSubmit: SubmitHandler<{
    card: string;
    type: string;
    street: string;
    number: string;
    observations: string;
  }> = async (dontVisitData) => {
    setIsCreating(true);

    const dataDontVisit = {
      ...dontVisitData,
      id: prevSelectedDontVisit?.id || '',
    };

    try {
      prevSelectedDontVisit?.id
        ? await onEdit?.(dataDontVisit)
        : await onCreate?.(dataDontVisit);
      onClose();
    } catch (error) {}
    setIsCreating(false);
  };

  const cardOptions = cards.map((card) => ({
    value: card.id,
    label: card.name,
  }));

  const typeOptions = [
    { value: 'Casa', label: 'Casa' },
    { value: 'Apartamento', label: 'Apartamento' },
    { value: 'Comércio', label: 'Comércio' },
    { value: 'Outros', label: 'Outros' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={createCustomStyle({
        height: 'fit-content',
        maxHeight: 'fit-content',
      })}
    >
      <div className="w-full flex flex-row items-center justify-between">
        <h2 className="text-center text-4xl font-bold text-gray-700 mb-4">
          {prevSelectedDontVisit ? `Editar` : `Criar`} não visitar
        </h2>
      </div>
      <div className="w-full flex flex-row gap-10 items-start justify-start mb-5">
        <div className="w-5/12 mt-4 flex flex-col items-start justify-start">
          <label className="text-gray-700 font-bold mb-2">
            Cartão
            {errors.card && (
              <span className="text-red-500 text-sm ml-2">
                *{errors.card.message}
              </span>
            )}
          </label>
          <ReactSelect
            className="w-full"
            classNamePrefix="select"
            placeholder="Selecione um cartão"
            isClearable
            isSearchable
            name="color"
            menuPosition="fixed"
            options={cardOptions}
            defaultValue={
              prevSelectedCard
                ? {
                    value: prevSelectedCard.id,
                    label: prevSelectedCard.name,
                  }
                : undefined
            }
            onChange={(option) => {
              const selectedCard = cards.find(
                (card) => card.id === option?.value,
              ) as Card;

              setValue('card', selectedCard.id);
              clearErrors('card');
            }}
          />
        </div>
        <div className="w-5/12 mt-4 flex flex-col items-start justify-start">
          <label className="text-gray-700 font-bold mb-2">
            Tipo de imóvel
            {errors.type && (
              <span className="text-red-500 text-sm ml-2">
                *{errors.type.message}
              </span>
            )}
          </label>
          <ReactSelect
            className="w-full"
            classNamePrefix="select"
            placeholder="Selecione um tipo"
            isClearable
            isSearchable
            name="color"
            menuPosition="fixed"
            options={typeOptions}
            defaultValue={
              prevSelectedDontVisit
                ? {
                    value: prevSelectedDontVisit.id,
                    label: prevSelectedDontVisit.type,
                  }
                : undefined
            }
            onChange={(option) => {
              setValue('type', option?.value as string);
              clearErrors('type');
            }}
          />
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-start items-center gap-5 mb-8">
        <Input
          label="Rua"
          placeholder="Rua"
          customSize="medium"
          {...register('street', {
            required: '* Obrigatório',
          })}
          error={errors.street?.message}
        />
        <Input
          label="Número"
          placeholder="Número"
          type="number"
          customSize="medium"
          {...register('number', {
            required: '* Obrigatório',
            min: {
              value: 1,
              message: 'O valor mínimo é 1',
            },
          })}
          error={errors.number?.message}
        />
        <Input
          label="Observação"
          placeholder="Observação"
          customSize="large"
          {...register('observations')}
          error={errors.observations?.message}
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
          {prevSelectedDontVisit ? 'Salvar' : 'Criar'}
        </button>
      </div>
      {isCreating && (
        <p className="w-full text-center text-xl font-bold animate-pulse mt-4">
          {prevSelectedDontVisit ? 'Editando' : 'Criando'} não visitar...
        </p>
      )}
    </Modal>
  );
};

export default CreateDontVisit;
