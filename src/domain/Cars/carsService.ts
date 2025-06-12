import { carsApi } from './carsApi';
import { Brand, Model, PaginatedBrands, PaginatedModels, GetModelsRequest } from './carsTypes';

const ITEMS_PER_PAGE = 10;

async function getBrands(page: number = 1): Promise<PaginatedBrands> {
  try {
    const allBrands = await carsApi.getBrands();
    

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = allBrands.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      hasNextPage: endIndex < allBrands.length,
      page,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao buscar marcas');
  }
}

async function getModels({ brandCode }: GetModelsRequest, page: number = 1): Promise<PaginatedModels> {
  try {
    const response = await carsApi.getModels({ brandCode });
    const allModels = response.modelos;
    
   
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = allModels.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      hasNextPage: endIndex < allModels.length,
      page,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao buscar modelos');
  }
}

export const carsService = {
  getBrands,
  getModels,
};
