import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { DeFiWeb3Connector } from "deficonnect";
import config from '../config';

const POLLING_INTERVAL = 15000;
const RPC_URL = config.rpcUrl;
const NET_ID = config.netId;

export const injected = new InjectedConnector({
    supportedChainIds: [ NET_ID ],
});

export const walletconnect = new WalletConnectConnector({
    rpc: { [NET_ID]: RPC_URL },
    chainId: NET_ID,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
});

export const defi = new DeFiWeb3Connector({
    supportedChainIds: [ NET_ID ],
    rpc: {
        [ NET_ID ]: RPC_URL,
    },
    pollingInterval: POLLING_INTERVAL,
});