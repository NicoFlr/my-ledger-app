import httpService from './http-service';
const BASE_USERS_URL = '/users';

export async function getUser(id, data = {}) {
  return httpService.get(`${BASE_USERS_URL}/${id}`, data);
}

export async function updateUser(userId, data = {}) {
  return httpService.put(`${BASE_USERS_URL}/update/${userId}`, data, {});
}

export async function updateUserPassword(userId, data = {}) {
  return httpService.put(
    `${BASE_USERS_URL}/${userId}/update-password`,
    data,
    {},
  );
}