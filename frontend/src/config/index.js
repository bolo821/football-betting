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
    routerContractAddress: '0x3e4cD2B5Db9f27cFc45cd260064414Be04867179',
    routerContractAbi,
};

export default config;