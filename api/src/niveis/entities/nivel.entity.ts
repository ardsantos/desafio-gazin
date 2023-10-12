import { Nivel } from '@prisma/client';

export class NivelEntity {
  id: number;
  nivel: string;

  constructor(nivel: Nivel) {
    Object.assign(this, nivel);
  }
}
