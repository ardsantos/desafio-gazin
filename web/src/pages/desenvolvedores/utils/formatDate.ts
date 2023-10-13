export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const getDateFromLocaleString = (dateString: string) => {
  const date = dateString.split("/");
  const newDate = `${date[2]}-${date[1]}-${date[0]}`;
  return new Date(newDate);
};
