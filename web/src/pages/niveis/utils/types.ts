export interface Nivel {
  id: number;
  nivel: string;
}

export interface NivelFormData {
  nivel: string;
}

export interface NivelDataToSubmit {
  nivel: string;
}

export interface NiveisQueryParams {
  nivel?: string;
}
