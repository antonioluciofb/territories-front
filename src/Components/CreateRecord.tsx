import Modal from 'react-modal';
import React, { useState } from 'react';
import Select from 'react-select';
import { createCustomStyle } from '@Utils/modals';
import clsx from 'clsx';
import { Card } from '@Types/Cards';
import { Image } from 'phosphor-react';
import Tooltip from './Tooltip';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Designated } from '@Types/Designated';
import { CreateRecord as ICreateRecordProp, Record } from '@Types/Records';
import ImagePreviewModal from './ImagePreviewModal';

// import { Container } from './styles';

interface ICreateRecordData {
  designated: string;
  card: string;
  periodOfDay: string;
  date: string;
  pendingBlocks: number[];
}

interface ICreateRecord {
  isOpen: boolean;
  cards: Card[];
  designated: Designated[];
  prevSelectedCard?: Card | null;
  prevSelectedRecord?: Record | null;
  onClose: () => void;
  onCreate?: (createRecordData: ICreateRecordData) => Promise<void>;
  onEdit?: (createRecordData: ICreateRecordProp) => Promise<void>;
}

// eslint-disable-next-line no-empty-pattern
const CreateRecord: React.FC<ICreateRecord> = ({
  isOpen,
  cards,
  designated,
  prevSelectedCard,
  prevSelectedRecord,
  onClose,
  onCreate,
  onEdit,
}) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(
    prevSelectedCard || null,
  );
  const [openCardImage, setOpenCardImage] = useState(false);

  const [hasPendingBlocksProblem, setHasPendingBlocksProblem] = useState('');

  const [isCreating, setIsCreating] = useState<boolean>(false);

  const userSchema = object({
    card: string().required('Cartão é obrigatório'),
    designated: string().required('Responsável é obrigatório'),
    periodOfDay: string().required('Período é obrigatório'),
    date: string().required('Data é obrigatória'),
  });

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      card: prevSelectedCard?.id || '',
      designated: prevSelectedRecord?.designated?.id || '',
      periodOfDay: prevSelectedRecord?.periodOfDay || '',
      date:
        prevSelectedRecord?.createdAt.split(' ')[0] ||
        new Date().toISOString().split('T')[0],
    },
    resolver: yupResolver(userSchema),
  });

  const onSubmit: SubmitHandler<{
    card: string;
    periodOfDay: string;
    date: string;
    designated: string;
  }> = async (recordData) => {
    console.log('🚀 ~ recordData:', recordData);
    if (!selectedBlock.length && !prevSelectedRecord) {
      setHasPendingBlocksProblem('Selecione ao menos uma quadra finalizada');
      return;
    }

    setHasPendingBlocksProblem('');
    setIsCreating(true);

    const dataRecord = {
      id: prevSelectedRecord?.id,
      pendingBlocks:
        blocksList?.filter((block) => !selectedBlock.includes(block)) || [],
      ...recordData,
    };

    try {
      prevSelectedRecord?.id
        ? await onEdit?.(dataRecord)
        : await onCreate?.(dataRecord);
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsCreating(false);
  };

  const cardsOptions = cards.reduce((acc, card) => {
    if (card.pendingBlocks?.length === 0) return acc;

    acc.push({
      value: card.id,
      label: card.name,
    });
    return acc;
  }, [] as { value: string; label: string }[]);

  const blocksList = prevSelectedRecord
    ? selectedCard?.blocks.map((block) => block.number)
    : selectedCard?.pendingBlocks;

  const periodOptions = [
    {
      value: 'Manhã',
      label: 'Manhã',
    },
    {
      value: 'Tarde',
      label: 'Tarde',
    },
    {
      value: 'Noite',
      label: 'Noite',
    },
  ];

  const designatedOptions = designated.map((designated) => ({
    value: designated.id,
    label: designated.name,
  }));

  console.log('🚀 ~ .filter ~ prevSelectedRecord:', prevSelectedRecord);
  const prevSelectedBlock =
    prevSelectedCard && !prevSelectedRecord
      ? []
      : prevSelectedCard?.blocks
          .map((block) => block.number)
          .filter(
            (block) => !prevSelectedRecord?.pendingBlocks?.includes(block),
          );

  const [selectedBlock, setSelectedBlock] = useState<number[]>(
    prevSelectedBlock || [],
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={createCustomStyle({
        height: 'fit-content',
        maxHeight: 'fit-content',
      })}
    >
      <ImagePreviewModal
        isOpen={openCardImage}
        onRequestClose={() => setOpenCardImage(false)}
        src={selectedCard?.img || ''}
        withoutButtons
      />
      <div className="w-full h-full flex flex-col items-start justify-start">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="text-center text-4xl font-bold text-gray-700 mb-4">
            {prevSelectedRecord ? 'Editar registro' : 'Criar um novo registro'}
          </h2>

          {prevSelectedRecord && (
            <Tooltip message="Ver imagem" position="right-12">
              <button
                className="px-3 py-3 bg-blue-600 hover:bg-blue-800 duration-300 rounded-xl flex justify-center items-center text-white font-bold disabled:opacity-50"
                onClick={() => setOpenCardImage(true)}
                disabled={!selectedCard}
              >
                <Image size={15} />
              </button>
            </Tooltip>
          )}
        </div>
        <div className="w-full flex flex-row gap-10 items-start justify-start">
          <div className="w-5/12 mt-4 flex flex-col items-start justify-start">
            <label className="text-gray-700 font-bold mb-2">
              Cartão
              {errors.card && (
                <span className="text-red-500 text-sm ml-2">
                  *{errors.card.message}
                </span>
              )}
            </label>
            <Select
              className="w-full"
              classNamePrefix="select"
              placeholder="Selecione um cartão"
              isClearable
              isSearchable
              isDisabled={prevSelectedRecord?.id !== undefined}
              name="color"
              options={cardsOptions}
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

                setSelectedCard(selectedCard);
                setValue('card', selectedCard.id);
              }}
            />
          </div>
          <div className="w-5/12 mt-4 flex flex-col items-start justify-start">
            <label className="text-gray-700 font-bold mb-2">
              Responsável
              {errors.designated && (
                <span className="text-red-500 text-sm ml-2">
                  *{errors.designated.message}
                </span>
              )}
            </label>
            <Select
              className="w-full"
              classNamePrefix="select"
              placeholder="Selecione um responsável"
              isClearable
              isSearchable
              name="color"
              defaultValue={
                prevSelectedRecord && {
                  value: prevSelectedRecord.designated.id,
                  label: prevSelectedRecord.designated.name,
                }
              }
              options={designatedOptions}
              onChange={(option) => {
                setValue('designated', option?.value as string);
              }}
            />
          </div>
        </div>
        <div className="w-full flex flex-row gap-10 items-start justify-start mb-0">
          <div className="w-5/12 mt-4 flex flex-col items-start justify-start">
            <label className="text-gray-700 font-bold mb-2">
              Período
              {errors.periodOfDay && (
                <span className="text-red-500 text-sm ml-2">
                  *{errors.periodOfDay.message}
                </span>
              )}
            </label>
            <Select
              className="w-full"
              classNamePrefix="select"
              placeholder="Selecione um período"
              isClearable
              isSearchable
              name="color"
              options={periodOptions}
              defaultValue={
                prevSelectedRecord
                  ? {
                      value: prevSelectedRecord.periodOfDay,
                      label: prevSelectedRecord.periodOfDay,
                    }
                  : undefined
              }
              onChange={(option) => {
                setValue('periodOfDay', option?.value as string);
              }}
            />
          </div>
          <div className="w-5/12 mt-4 flex flex-col items-start justify-start">
            <label className="text-gray-700 font-bold mb-2">
              Data
              {errors.date && (
                <span className="text-red-500 text-sm ml-2">
                  *{errors.date.message}
                </span>
              )}
            </label>
            <input
              className="w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
              type="date"
              placeholder="Data"
              {...register('date')}
            />
          </div>
        </div>
        <div className="w-full flex flex-row gap-10 items-start justify-start mb-8">
          <div className="w-5/12 mt-4 flex flex-col items-start justify-start">
            <label className="text-gray-700 font-bold mb-2">
              Quadras Finalizadas
              {hasPendingBlocksProblem && (
                <span className="text-red-500 text-sm ml-2">
                  *{hasPendingBlocksProblem}
                </span>
              )}
            </label>
            <div className="w-full flex flex-wrap gap-2 mt-1 items-center justify-start">
              {blocksList ? (
                blocksList?.map((block) => (
                  <div
                    // className="w-8 h-8 rounded-md flex flex-row gap-4 items-center justify-center border-2 border-gray-500 cursor-pointer font-bold"
                    className={clsx(
                      'w-8 h-8 rounded-md flex flex-row gap-4 items-center justify-center border-4 cursor-pointer font-bold',
                      selectedBlock.includes(block)
                        ? 'border-green-500 text-white bg-green-500'
                        : 'border-gray-800 text-gray-800',
                    )}
                    onClick={() => {
                      if (selectedBlock.includes(block)) {
                        setSelectedBlock(
                          selectedBlock.filter((item) => item !== block),
                        );
                      } else {
                        setSelectedBlock([...selectedBlock, block]);
                      }
                    }}
                  >
                    {block}
                  </div>
                ))
              ) : (
                <p>---</p>
              )}
            </div>
          </div>
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
            {prevSelectedRecord ? 'Salvar' : 'Criar'}
          </button>
        </div>
        {isCreating && (
          <p className="w-full text-center text-xl font-bold animate-pulse mt-4">
            {prevSelectedRecord ? 'Salvando' : 'Criando'} registro...
          </p>
        )}
      </div>
    </Modal>
  );
};

export default CreateRecord;
