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
    routerContractAddress: '0x2f97D3A3B3555Cc7AA431f897d371E4fd6EC3Ec8',
    routerContractAbi,
    adminWalletAddress: '0x1Cd10B65307d033066e10111B3e1466dd435B88d',
    adminWalletKey: '5fc3cf3e66abdb003424f2ebdbbbad37a2d2049ae583ee6cf59cbbecc73cbf8a',
}

// module.exports = {
//     netId: 5,
//     rpcUrl: "https://goerli.infura.io/v3/4da8a7d74b014664838d33fb259b6a14",
//     blockExplorer: "https://goerli.etherscan.io",
//     nativeCoin: {
//         name: "ETH",
//         symbol: "ETH",
//         decimal: 18,
//     },
//     routerContractAddress: '0x84FA6D420c9Ac86AeEc2117e647F79B8BE5a2E66',
//     routerContractAbi,
//     adminWalletAddress: '0x718C6E457500202F23Be231b439C8A92A46c288C',
//     adminWalletKey: '2a3098d2cece5d96877f700e614913426a246b47024b4dcb463b709ed11c3c09',
// };