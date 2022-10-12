import routerContractAbi from './abis/routerContract.json';

// const config = {
//     netId: 1,
//     rpcUrl: "https://mainnet.infura.io/v3/4da8a7d74b014664838d33fb259b6a14",
//     blockExplorer: "https://etherscan.io",
//     nativeCoin: {
//         name: "ETH",
//         symbol: "ETH",
//         decimal: 18,
//     },
//     routerContractAddress: '0xb9eAFfBE61F11C3682Dd276e8eE3d42e2871c036',
//     routerContractAbi,
//     adminWalletAddress: '0x1Cd10B65307d033066e10111B3e1466dd435B88d',
// };

const config = {
    netId: 5,
    rpcUrl: "https://goerli.infura.io/v3/4da8a7d74b014664838d33fb259b6a14",
    blockExplorer: "https://goerli.etherscan.io",
    nativeCoin: {
        name: "ETH",
        symbol: "ETH",
        decimal: 18,
    },
    routerContractAddress: '0x84FA6D420c9Ac86AeEc2117e647F79B8BE5a2E66',
    routerContractAbi,
    adminWalletAddress: '0xcF4b79f3F8f303B974621dBEBE1c53f91FE5fe06',
};

export default config;