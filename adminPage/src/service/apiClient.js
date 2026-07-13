import axios from 'axios';
import {config} from '../config/config'
export const apiClient = axios.create({
    baseURL: config.apiURL,
    headers: {
    'Content-Type': 'application/json', 
  },
  withCredentials: true
})