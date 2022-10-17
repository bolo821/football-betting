const routerContractAbi = require('./abis/routerContract.json');

module.exports = {
    netId: 1,
    rpcUrl: "https://mainnet.infura.io/v3/4da8a7d74b014664838d33fb259b6a14",
    blockExplorer: "https://etherscan.io",
    nativeCoin: {
        name: "ETH",
        symbol: "ETH",
        decimal: 18,
    },
    routerContractAddress: '0x9683ee11E9a9A6faA1F424Dd4762Fcc3CBfaF8C7',
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
//     routerContractAddress: '0x1F4083864534A69a0F08A1EfdaF97FD13Ee7915b',
//     routerContractAbi,
//     adminWalletAddress: '0x718C6E457500202F23Be231b439C8A92A46c288C',
// };