import { useWeb3React } from "@web3-react/core";
import { useMemo } from 'react';
import Web3 from 'web3';
import config from '../config';

export const useContract = (address, abi) => {
    const { library } = useWeb3React();

    return useMemo(() => {
        if (!address || !abi || !library) return null;
    
        try {
            const web3 = new Web3(library.provider);
            return new web3.eth.Contract(abi, address);
        } catch (err) {
            console.log('error: ', err);
            return null;
        }
    }, [ library, address, abi ]);
}

export const useCoinflipCROContract = () => useContract(config.coinflipCROAddress, config.coinflipCROAbi);
export const useDepositContract = () => useContract(config.depositAddress, config.depositAbi);
export const useMngContract = () => useContract(config.mngAddress, config.mngAbi);
export const useCoinflipMNGContract = () => useContract(config.coinflipMNGAddress, config.coinflipMNGAbi);
export const useLionContract = () => useContract(config.lionAddress, config.lionAbi);
export const useCoinflipLIONContract = () => useContract(config.coinflipLIONAddress, config.coinflipLIONAbi);
export const useUSDTContract = () => useContract(config.usdtAddress, config.erc20Abi);
export const useCoinflipUSDTContract = () => useContract(config.coinflipUSDTAddress, config.coinflipERC20Abi);
export const useUSDCContract = () => useContract(config.usdcAddress, config.erc20Abi);
export const useCoinflipUSDCContract = () => useContract(config.coinflipUSDCAddress, config.coinflipERC20Abi);
export const useMMFContract = () => useContract(config.mmfAddress, config.erc20Abi);
export const useCoinflipMMFContract = () => useContract(config.coinflipMMFAddress, config.coinflipERC20Abi);
export const useGDRTContract = () => useContract(config.gdrtAddress, config.erc20Abi);
export const useCoinflipGDRTContract = () => useContract(config.coinflipGDRTAddress, config.coinflipERC20Abi);
export const useDARKCRYSTALContract = () => useContract(config.darkcrystalAddress, config.erc20Abi);
export const useCoinflipDARKCRYSTALContract = () => useContract(config.coinflipDARKCRYSTALAddress, config.coinflipERC20Abi);