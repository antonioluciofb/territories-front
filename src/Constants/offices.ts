export const offices = {
  leader: 'Lider',
  subleader: 'Sub Lider',
  researcher: 'Pesquisador',
} as {
  [key: string]: string;
};

export const arrayOfficesValues = Object.values(offices);
export const arrayOfficesKeys = Object.keys(offices);

export type Offices = (typeof arrayOfficesValues)[number];
