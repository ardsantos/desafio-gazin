import { Nivel } from "../../niveis/utils/types";

export interface Desenvolvedor {
  id: number;
  nivelId: number;
  nome: string;
  sexo: string;
  dataNascimento: Date;
  hobby: string;

  Nivel: Nivel;
}

export interface DesenvolvedorFormData {
  nome: string;
  nivelId: string;
  sexo: string;
  dataNascimento: string;
  hobby: string;
}

export interface DesenvolvedorDataToSubmit {
  nivelId: number;
  nome: string;
  sexo: string;
  dataNascimento: Date;
  hobby: string;
}

export interface DesenvolvedoresQueryParams {
  nome?: string;
  sexo?: string;
  dataNascimento?: string;
  hobby?: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export const sexoOptions: SelectOption[] = [
  { label: "Feminino", value: "F" },
  { label: "Masculino", value: "M" },
];
