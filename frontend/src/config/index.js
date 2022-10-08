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
    netId: 1,
    rpcUrl: "https://mainnet.infura.io/v3/",
    blockExplorer: "https://etherscan.io",
    nativeCoin: {
        name: "ETH",
        symbol: "ETH",
        decimal: 18,
    },
    routerContractAddress: '0xb9eAFfBE61F11C3682Dd276e8eE3d42e2871c036',
    routerContractAbi,
    adminWalletAddress: '0xcF4b79f3F8f303B974621dBEBE1c53f91FE5fe06',
};

export default config;