import { Desenvolvedor, Nivel } from '@prisma/client';
import { Expose } from 'class-transformer';
import { getIdade } from '../utils/getIdade';

export class DesenvolvedorEntity {
  id: number;
  nivelId: number;
  nome: string;
  sexo: string;
  dataNascimento: Date;
  hobby: string;

  Nivel: Nivel;

  @Expose()
  get idade() {
    return getIdade(this.dataNascimento);
  }

  constructor(desenvolvedor: Desenvolvedor & { Nivel: Nivel }) {
    Object.assign(this, desenvolvedor);
  }
}
