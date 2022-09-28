import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "./connectors";
import MetaMaskLogo from "../assets/images/wallets/meta-mask.svg";
import WalletConnectLogo from "../assets/images/wallets/wallet-connect.svg";

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
