import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect, defi } from "./connectors";
import MetaMaskLogo from "../assets/images/wallets/metamask.png";
import WalletConnectLogo from "../assets/images/wallets/wallet_connect.png";
import DefiWalletLogo from '../assets/images/wallets/defi_wallet.png';

const Wallets = [
    {
        title: "MetaMask",
        description: "Connect woth MetaMask in your browser",
        logo: MetaMaskLogo,
        connector: injected,
    },
    {
        title: "WalletConnect",
        description: "Scan with WalletConnect to connect",
        logo: WalletConnectLogo,
        connector: walletconnect,
    },
    {
        title: "Crypto.com DeFi Wallet",
        description: 'Connect with the CDC Defi Wallet',
        logo: DefiWalletLogo,
        connector: defi,
    }
];

const ConnectedWallet = () => {
    const { connector } = useWeb3React();
    if (connector) {
        switch (connector) {
            case injected: {
                return {
                    name: "MetaMask",
                    logo: MetaMaskLogo,
                };
            }
            case walletconnect: {
                return {
                    name: "WalletConnect",
                    logo: WalletConnectLogo,
                };
            }
            default: {
                return {
                    name: "MetaMask",
                    logo: MetaMaskLogo,
                };
            }
        }
    } else {
        return {};
    }
};

export { Wallets, ConnectedWallet };
