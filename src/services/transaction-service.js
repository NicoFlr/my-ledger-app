import httpService from './http-service';
const BASE_TRANSACTIONS_URL = '/transactions';

export async function createTransaction(data = {}) {
  return httpService.post(`${BASE_TRANSACTIONS_URL}`, data, {});
}

export async function createTransactionForUser(userId, data = {}) {
  return httpService.post(`${BASE_TRANSACTIONS_URL}/users/${userId}`, data, {});
}

export async function updateTransaction(transactionId, data = {}) {
  return httpService.put(`${BASE_TRANSACTIONS_URL}/${transactionId}`, data, {});
}

export async function deleteTransaction(transactionId, data = {}) {
  return httpService.delete(`${BASE_TRANSACTIONS_URL}/${transactionId}`, data, {});
}
