import routerContractAbi from './abis/routerContract.json';

// const config = {
//     netId: 1,
//     rpcUrl: "https://mainnet.infura.io/v3/",
//     blockExplorer: "https://etherscan.io/",
//     nativeCoin: {
//         name: "ETH",
//         symbol: "ETH",
//         decimal: 18,
//     },
// };

const config = {
    netId: 3,
    rpcUrl: "https://ropsten.infura.io/v3/",
    blockExplorer: "https://ropsten.etherscan.io/",
    nativeCoin: {
        name: "ETH",
        symbol: "ETH",
        decimal: 18,
    },
    routerContractAddress: '0x647e01989EC8f3c590799CA07b80DdE26176F6CE',
    routerContractAbi,
};

export default config;