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

export const useRouterContract = () => useContract(config.routerContractAddress, config.routerContractAbi);