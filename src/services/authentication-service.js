import httpService from './http-service';
import axios from 'axios';
import {API_BASE_URL} from '../assets/config/environment';
const BASE_USERS_URL = '/users';

export async function login(headers = {}) {
  return axios.post(`${API_BASE_URL}${BASE_USERS_URL}/login`, {}, {headers});
}

export async function register(data = {}, headers = {}) {
  return axios.post(`${API_BASE_URL}${BASE_USERS_URL}/register`, data, {
    headers,
  });
}
