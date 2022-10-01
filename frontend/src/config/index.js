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
    routerContractAddress: '0xC97d9E5C0610026aA7f1f400eB009cC12B0B6788',
    routerContractAbi,
};

export default config;