import axios from 'axios';
import socketIOClient from 'socket.io-client';
import config from './';
import Web3 from 'web3';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const apiUrl = `${SERVER_URL}/api`;

export const api = axios.create({
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

var web3_ = null;
if (window.ethereum) {
    web3_ = new Web3(window.ethereum);
} else {
    web3_ = new Web3(new Web3.providers.HttpProvider(config.rpcUrl));
}

export const routerContract = new web3_.eth.Contract(config.routerContractAbi, config.routerContractAddress);
const web3Signed = new Web3(window.ethereum);
export const routerContractSigned = new web3Signed.eth.Contract(config.routerContractAbi, config.routerContractAddress);
export const web3 = web3_;

export const wciContract = new web3Signed.eth.Contract(config.erc20Abi, config.wciAddress);
export const usdtContract = new web3Signed.eth.Contract(config.usdtAbi, config.usdtAddress);
export const usdcContract = new web3Signed.eth.Contract(config.erc20Abi, config.usdcAddress);
export const shibContract = new web3Signed.eth.Contract(config.erc20Abi, config.shibAddress);
export const dogeContract = new web3Signed.eth.Contract(config.erc20Abi, config.dogeAddress);