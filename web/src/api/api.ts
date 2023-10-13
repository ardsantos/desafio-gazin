import { create } from "apisauce";
import { NivelFormData } from "../pages/niveis/NivelForm";
import { Nivel } from "../pages/niveis/utils/types";

interface RequestError {
  message: string;
}

const apiSauce = create({ baseURL: "http://localhost:3030" });

const apiNiveis = {
  findAll: async () => apiSauce.get<Nivel[], RequestError>("/niveis"),
  create: async (data: NivelFormData) =>
    apiSauce.post<Nivel, RequestError>("/niveis", data),
  findOne: async (id: number) =>
    apiSauce.get<Nivel, RequestError>(`/niveis/${id}`),
  update: async (id: number, data: NivelFormData) =>
    apiSauce.patch<Nivel, RequestError>(`/niveis/${id}`, data),
  delete: async (id: number) =>
    apiSauce.delete<Nivel, RequestError>(`/niveis/${id}`),
};

const apiDesenvolvedores = {};

export const api = {
  niveis: apiNiveis,
  desenvolvedores: apiDesenvolvedores,
};
