export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const getDateFromLocaleString = (dateString: string) => {
  const date = dateString.split("/");
  const newDate = `${date[2]}-${date[1]}-${date[0]}T00:00:00.000`;
  return new Date(newDate);
};

export const getDateStringFromFilterString = (dateString: string = "") => {
  const date = dateString.split("-");

  if (!date.length) {
    return;
  }

  const newDateString = `${date[0]}-${date[1]}-${date[2]}T00:00:00.000`;
  const newDate = new Date(newDateString);
  return newDate.toISOString();
};
