import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://parallelum.com.br',
});