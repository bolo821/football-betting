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
    routerContractAddress: '0xFDb9EeF1B3A320165A5D9A3ebc204c255299f982',
    routerContractAbi,
};

export default config;