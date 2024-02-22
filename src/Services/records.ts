/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateRecord } from '@Types/Records';
import { clientApi } from './client';

const getRecords = async () => {
  try {
    const { data } = await clientApi.get('/records');

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getRecord = async (id: string) => {
  try {
    const { data } = await clientApi.get(`/records/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const createRecord = async ({
  card,
  designated,
  periodOfDay,
  date,
  pendingBlocks,
}: CreateRecord) => {
  try {
    const { data } = await clientApi.post('/records', {
      card,
      designated,
      periodOfDay,
      date,
      pendingBlocks,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteRecord = async (id: string) => {
  try {
    const { data } = await clientApi.delete(`/records/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const updateRecord = async (record: CreateRecord) => {
  try {
    const { data } = await clientApi.put(`/records/${record.id}`, record);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const recordsService = {
  getRecords,
  getRecord,
  createRecord,
  deleteRecord,
  updateRecord,
};
