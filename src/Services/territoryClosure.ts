/* eslint-disable @typescript-eslint/no-explicit-any */
import { clientApi } from './client';

const closeTerritory = async () => {
  try {
    const { data } = await clientApi.post('territorial-closure');

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getTerritoryClosures = async () => {
  try {
    const { data } = await clientApi.get('territorial-closure');

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteTerritoryClosure = async (id: string) => {
  try {
    const { data } = await clientApi.delete(`territorial-closure/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const territoryClosureService = {
  closeTerritory,
  getTerritoryClosures,
  deleteTerritoryClosure,
};
