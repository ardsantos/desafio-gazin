export const getIdade = (dataNascimento: Date) => {
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  const mesAtual = hoje.getMonth() + 1;
  const diaAtual = hoje.getDate();
  const anoNascimento = dataNascimento.getFullYear();
  const mesNascimento = dataNascimento.getMonth() + 1;
  const diaNascimento = dataNascimento.getDate();

  let idade = anoAtual - anoNascimento;

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && diaAtual < diaNascimento)
  ) {
    idade--;
  }

  return idade;
};
