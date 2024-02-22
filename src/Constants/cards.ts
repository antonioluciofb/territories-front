export const cardStatusColors = {
  inProgress: 'bg-yellow-500',
  finished: 'bg-green-500',
  pending: 'bg-gray-500',
};

export const cardsListColumns = [
  {
    key: 'name',
    label: 'Nome',
  },
  {
    key: 'pendingBlocks',
    label: 'Qrds. Pendentes',
  },
  {
    key: 'dontVisit',
    label: 'Não visitar',
  },
  {
    key: 'finishedAt',
    label: 'Finalizado em',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'actions',
    label: 'Ações',
  },
];

export const alphabetArray = 'abcdefghijklmnopqrstuvwxyz'.split('');
