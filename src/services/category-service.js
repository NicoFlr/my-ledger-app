import httpService from './http-service';
const BASE_CATEGORIES_URL = '/categories';

export async function getAllCategories() {
    return httpService.get(`${BASE_CATEGORIES_URL}`);
  }
