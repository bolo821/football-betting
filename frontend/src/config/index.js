import routerContractAbi from './abis/routerContract.json';
import wciTokenAbi from './abis/wciToken.json';

// const config = {
//     netId: 1,
//     rpcUrl: "https://mainnet.infura.io/v3/4da8a7d74b014664838d33fb259b6a14",
//     blockExplorer: "https://etherscan.io",
//     nativeCoin: {
//         name: "ETH",
//         symbol: "ETH",
//         decimal: 18,
//     },
//     routerContractAddress: '0x9683ee11E9a9A6faA1F424Dd4762Fcc3CBfaF8C7',
//     routerContractAbi,
//     adminWalletAddress: '0xbCffB0493d5b5EE9550F495BFC05667DdC9878f9',
// };

const config = {
    netId: 5,
    rpcUrl: "https://goerli.infura.io/v3/41edc44a52744312836fd6c63d09881f",
    blockExplorer: "https://goerli.etherscan.io",
    nativeCoin: {
        name: "ETH",
        symbol: "ETH",
        decimal: 18,
    },
    routerContractAddress: '0xED77c98E19A8FA02AB03E52Da6F2d13e492F3Cc1',
    wciTokenAddress: '0x12Bc9bbb73AbEc4e93b4A244E25906CE35B5e939',
    routerContractAbi,
    wciTokenAbi,
    adminWalletAddress: '0x718C6E457500202F23Be231b439C8A92A46c288C',
};

export default config;