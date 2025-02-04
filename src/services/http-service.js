import axios from 'axios';
import {API_BASE_URL} from '../assets/config/environment';
import {getStringItem} from './phone-storage-service';
import {PhoneStorage} from '../constants/phoneStorageConstants';

const httpService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpService.interceptors.request.use(
  async request => {
    const jwToken = await getStringItem(PhoneStorage.jwt);
    if (jwToken !== null) {
      request.headers.Authorization = jwToken;
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

export const get = async (endpoint, data = {}, signal = {}) => {
  try {
    const response = await httpService.post(endpoint, {data, signal});
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log(`GET Request to ${endpoint} canceled:`, error.message);
    } else {
      console.error(`Error fetching data () => ${error}`);
    }
    throw error;
  }
};

export const post = async (endpoint, data = {}, params = {}) => {
  try {
    const response = await httpService.post(endpoint, data, {params});
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log(`POST Request to ${endpoint} canceled:`, error.message);
    } else {
      console.error(`Error posting data () => ${error}`);
    }
    throw error;
  }
};

export const put = async (endpoint, data = {}, params = {}) => {
  try {
    const response = await httpService.put(endpoint, data, {params});
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log(`PUT Request to ${endpoint} canceled:`, error.message);
    } else {
      console.error(`Error putting data () => ${error}`);
    }
    throw error;
  }
};

export default httpService;
