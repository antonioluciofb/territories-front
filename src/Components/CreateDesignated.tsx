import React, { useState } from 'react';
import Modal from 'react-modal';
import Input from './Input';
import { createCustomStyle } from '@Utils/modals';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  ICreateDesignated as CreateDesignated,
  Designated,
} from '@Types/Designated';
import { toast } from 'react-toastify';
import ReactSelect from 'react-select';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { offices } from '@Constants/offices';

// import { Container } from './styles';

interface ICreateDesignated {
  isOpen: boolean;
  prevDesignated?: Designated;
  onClose: () => void;
  onSave?: (createDesignatedData: CreateDesignated) => Promise<void>;
}

// eslint-disable-next-line no-empty-pattern
const CreateDesignated: React.FC<ICreateDesignated> = ({
  isOpen,
  prevDesignated,
  onClose,
  onSave,
}) => {
  console.log('🚀 ~ prevDesignated:', prevDesignated);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const designatedSchema = object({
    name: string().required('* Obrigatório'),
    office: string().required('* Obrigatório'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      name: prevDesignated?.name || '',
      office: prevDesignated?.office || '',
    },
    resolver: yupResolver(designatedSchema),
  });

  const onSubmit: SubmitHandler<CreateDesignated> = async (
    createDesignatedData,
  ) => {
    setIsCreating(true);
    try {
      await onSave?.({ ...createDesignatedData, id: prevDesignated?.id });
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('🚀 ~ error:', { error });
      toast.error(error.message);
    }
    setIsCreating(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={createCustomStyle({
        maxWidth: '550px',
        height: 'fit-content',
        maxHeight: 'fit-content',
      })}
    >
      <div className="w-full h-full flex flex-col justify-between items-start">
        <h2 className="text-3xl font-bold  text-gray-800">
          {prevDesignated ? 'Editar' : 'Criar'} um responsável
        </h2>
        <div className="w-full my-6 flex flex-wrap justify-start items-center gap-5">
          <Input
            label="Nome do responsável"
            placeholder="Nome do responsável"
            customSize="medium"
            {...register('name', {
              required: 'Obrigatório',
            })}
            error={errors.name?.message}
          />
          <div className="w-5/12 flex flex-col items-start justify-start">
            <label className="text-gray-700 text-sm font-bold mb-2">
              Cargo
              {errors.office && (
                <span className="text-red-500 text-sm ml-2">
                  {errors.office.message}
                </span>
              )}
            </label>
            <ReactSelect
              className="w-full"
              placeholder="Pesquisador"
              isClearable
              isSearchable
              menuPosition="fixed"
              name="color"
              styles={{
                control: (provided) => ({
                  ...provided,
                  height: '41px',
                }),
              }}
              options={[
                {
                  label: 'Lider',
                  value: 'leader',
                },
                {
                  label: 'Sub Lider',
                  value: 'subleader',
                },
                {
                  label: 'Pesquisador',
                  value: 'researcher',
                },
              ]}
              defaultValue={
                prevDesignated?.office
                  ? {
                      label: offices?.[prevDesignated?.office || ''],
                      value: offices?.[prevDesignated?.office || ''],
                    }
                  : undefined
              }
              onChange={(option) => {
                setValue('office', option?.value as string);
              }}
            />
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
            {prevDesignated ? 'Salvar' : 'Criar'}
          </button>
        </div>
      </div>
      {isCreating && (
        <p className="w-full text-center text-xl font-bold animate-pulse mt-4">
          {prevDesignated ? 'Editando' : 'Criando'} responsável...
        </p>
      )}
    </Modal>
  );
};

export default CreateDesignated;
