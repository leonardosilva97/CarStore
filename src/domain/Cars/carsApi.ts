import { api } from '~/api/apiConfig';
import { Brand, ModelsResponse, GetModelsRequest } from './carsTypes';

async function getBrands(): Promise<Brand[]> {
  try {
    const response = await api.get<Brand[]>('/fipe/api/v1/carros/marcas');
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao buscar marcas');
  }
}

async function getModels({ brandCode }: GetModelsRequest): Promise<ModelsResponse> {
  try {
    const response = await api.get<ModelsResponse>(`/fipe/api/v1/carros/marcas/${brandCode}/modelos`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao buscar modelos');
  }
}

export const carsApi = {
  getBrands,
  getModels,
};
