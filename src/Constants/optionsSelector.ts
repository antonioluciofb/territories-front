import { OptionsType } from '@Types/Create';

interface SelectorOptions {
  key: OptionsType;
  value: string;
  uniteText: string;
  hasButton: boolean;
}

export const selectorOptions = {
  cards: {
    key: 'cards',
    value: 'Cartões',
    uniteText: 'cartão',
    hasButton: true,
  },
  records: {
    key: 'records',
    value: 'Registros',
    uniteText: 'registro',
    hasButton: true,
  },
  dontVisit: {
    key: 'dontVisit',
    value: 'Não Visitar',
    uniteText: 'não visitar',
    hasButton: true,
  },
  designateds: {
    key: 'designateds',
    value: 'Responsáveis',
    uniteText: 'responsável',
    hasButton: true,
  },
  territoryClosures: {
    key: 'territoryClosures',
    value: 'Fechamentos',
    uniteText: 'fechamento',
    hasButton: false,
  },
} as {
  [key in OptionsType]: SelectorOptions;
};

export const arraySelectorOptions = Object.values(selectorOptions);
