// Tipos para as APIs de carros

export interface Brand {
  codigo: string;
  nome: string;
}

export interface Model {
  codigo: number;
  nome: string;
}

export interface ModelsResponse {
  modelos: Model[];
}

// Tipos para paginação
export interface PaginatedBrands {
  data: Brand[];
  hasNextPage: boolean;
  page: number;
}

export interface PaginatedModels {
  data: Model[];
  hasNextPage: boolean;
  page: number;
}

// Request types
export interface GetModelsRequest {
  brandCode: string;
}
