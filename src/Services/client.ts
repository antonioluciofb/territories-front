/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

const baseURL = 'http://localhost:8080';
const baseURLStage = import.meta.env.VITE_REACT_APP_BACKEND_URL_STAGE as string;
const baseURLProd = import.meta.env.VITE_REACT_APP_BACKEND_URL_PROD as string;

const envBaseURL: {
  [key: string]: string;
} = {
  development: baseURL,
  staging: baseURLStage,
  production: baseURLProd,
};

export const clientApi = axios.create({
  baseURL: envBaseURL[process.env.NODE_ENV || 'development'],
  headers: {
    'Content-Type': 'application/json',
  },
});
