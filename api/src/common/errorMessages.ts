const getEnumAllowedValues = (enumerator: Record<string, string>) => {
  const valuesList = Object.keys(enumerator);
  return valuesList.join(', ');
};

export const ErrorMessages = {
  required: (field: string) => `O campo ${field} é obrigatório.`,
  string: (field: string) => `O campo ${field} deve ser uma string.`,
  number: (field: string) => `O campo ${field} deve ser um número.`,
  enum: (field: string, enumerator: Record<string, string>) =>
    `O campo ${field} deve ser um dos seguintes valores: ${getEnumAllowedValues(
      enumerator,
    )}.`,
  date: (field: string) => `O campo ${field} deve ser uma data válida.`,
  object: (field: string) => `O campo ${field} deve ser um objeto.`,
};
