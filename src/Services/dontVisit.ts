/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICreateDontVisitData } from '@Types/DontVisit';
import { clientApi } from './client';

const getDontVisits = async () => {
  try {
    const { data } = await clientApi.get('/dontVisit');

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getDontVisit = async (id: string) => {
  try {
    const { data } = await clientApi.get(`/dontVisit/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const createDontVisit = async ({
  card,
  number,
  observations,
  street,
  type,
}: ICreateDontVisitData) => {
  try {
    const { data } = await clientApi.post('/dontVisit', {
      card,
      number,
      observations,
      street,
      type,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteDontVisit = async (id: string) => {
  try {
    const { data } = await clientApi.delete(`/dontVisit/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const updateDontVisit = async (data: ICreateDontVisitData) => {
  try {
    const response = await clientApi.put(`/dontVisit/${data.id}`, data);

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const dontVisitService = {
  getDontVisits,
  getDontVisit,
  createDontVisit,
  deleteDontVisit,
  updateDontVisit,
};
