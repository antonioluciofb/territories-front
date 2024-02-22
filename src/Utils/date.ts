export const convertStringDateToLocaleString = (date: string) => {
  return Intl.DateTimeFormat("pt-BR").format(new Date(date));
};

export const convertStringDateToCompleteDate = (date: string) => {
  return Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));
};
