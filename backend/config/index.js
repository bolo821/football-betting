const routerContractAbi = require('./abis/routerContract.json');

module.exports = {
    netId: 1,
    rpcUrl: "https://mainnet.infura.io/v3/41edc44a52744312836fd6c63d09881f",
    blockExplorer: "https://etherscan.io",
    nativeCoin: {
        name: "ETH",
        symbol: "ETH",
        decimal: 18,
    },
    routerContractAddress: '0xa36799739dB0Db84B500AfDD1695F6A670c244f0',
    routerContractAbi,
    adminWalletAddress: '0xbCffB0493d5b5EE9550F495BFC05667DdC9878f9',
}

// module.exports = {
//     netId: 5,
//     rpcUrl: "https://goerli.infura.io/v3/41edc44a52744312836fd6c63d09881f",
//     blockExplorer: "https://goerli.etherscan.io",
//     nativeCoin: {
//         name: "ETH",
//         symbol: "ETH",
//         decimal: 18,
//     },
//     routerContractAddress: '0xED77c98E19A8FA02AB03E52Da6F2d13e492F3Cc1',
//     routerContractAbi,
//     adminWalletAddress: '0x718C6E457500202F23Be231b439C8A92A46c288C',
// };