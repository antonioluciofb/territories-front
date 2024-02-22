/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, ICreateCardData } from '@Types/Cards';
import { clientApi } from './client';

const getCards = async (): Promise<Card[]> => {
  try {
    const { data } = await clientApi.get('/cards');

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getCard = async (id: string) => {
  try {
    const { data } = await clientApi.get(`/cards/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const createCard = async ({ name, blocks, img }: ICreateCardData) => {
  try {
    const { data } = await clientApi.post('/cards', { name, blocks, img });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteCard = async (id: string) => {
  try {
    const { data } = await clientApi.delete(`/cards/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const updateCard = async ({ id, ...card }: ICreateCardData) => {
  try {
    const { data } = await clientApi.put(`/cards/${id}`, card);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getImageCard = async (key: string) => {
  try {
    const { data } = await clientApi.get(`/storage/getCardImage/${key}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const cardsService = {
  getCards,
  getCard,
  createCard,
  deleteCard,
  updateCard,
  getImageCard,
};
