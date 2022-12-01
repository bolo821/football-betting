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
    routerContractAddress: '0xcfaa82c9046c65667583f89b286e7236Bd9dcC4d',
    routerContractAbi,
    adminWalletAddress: '0xD202A47A68dAeA035a211D295A31753FFa13dF3F',
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