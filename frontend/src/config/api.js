import axios from 'axios';
import socketIOClient from 'socket.io-client';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const apiUrl = `${SERVER_URL}/api`;

const api = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json'
    }
});

export const getSecureApi = token =>  axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token,
  }
});

export const SOCKET = socketIOClient(SERVER_URL);

export default api;