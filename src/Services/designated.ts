/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICreateDesignated } from '@Types/Designated';
import { clientApi } from './client';

const getDesignateds = async () => {
  try {
    const { data } = await clientApi.get('/designated');

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getDesignated = async (id: string) => {
  try {
    const { data } = await clientApi.get(`/designated/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const createdFieldMananger = async ({
  name,
  office,
}: ICreateDesignated) => {
  try {
    const { data } = await clientApi.post('/designated', {
      name,
      office,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteDesignated = async (id: string) => {
  try {
    const { data } = await clientApi.delete(`/designated/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const updateDesignated = async (data: ICreateDesignated) => {
  try {
    const response = await clientApi.put(`/designated/${data.id}`, data);

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const designatedService = {
  getDesignateds,
  getDesignated,
  createdFieldMananger,
  deleteDesignated,
  updateDesignated,
};
