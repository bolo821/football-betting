import routerContractAbi from './abis/routerContract.json';

const config = {
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
};

// const config = {
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
//     adminWalletAddress: '0xcF4b79f3F8f303B974621dBEBE1c53f91FE5fe06',
// };

export default config;