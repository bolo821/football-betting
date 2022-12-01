import routerContractAbi from './abis/routerContract.json';
import erc20Abi from './abis/ERC20.json';
import usdtAbi from './abis/usdt.json';

const config = {
    netId: 1,
    rpcUrl: "https://mainnet.infura.io/v3/4da8a7d74b014664838d33fb259b6a14",
    blockExplorer: "https://etherscan.io",
    nativeCoin: {
        name: "ETH",
        symbol: "ETH",
        decimal: 18,
    },
    routerContractAddress: '0xcfaa82c9046c65667583f89b286e7236Bd9dcC4d',
    routerContractAbi,
    adminWalletAddress: '0xD202A47A68dAeA035a211D295A31753FFa13dF3F',
    erc20Abi,
    usdtAbi,
    wciAddress: '0xC5a9BC46A7dbe1c6dE493E84A18f02E70E2c5A32',
    usdtAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    usdcAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    shibAddress: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
    dogeAddress: '0x4206931337dc273a630d328dA6441786BfaD668f',
};

// const config = {
//     netId: 5,
//     rpcUrl: "https://goerli.infura.io/v3/41edc44a52744312836fd6c63d09881f",
//     blockExplorer: "https://goerli.etherscan.io",
//     nativeCoin: {
//         name: "ETH",
//         symbol: "ETH",
//         decimal: 18,
//     },
//     routerContractAddress: '0x357BBe116bAa257147cdC2E02B3d0533Aa1Cd444',
//     wciAddress: '0xd2A7909A095A91BAD17C6b6E7978b88DEDBFf334',
//     routerContractAbi,
//     erc20Abi,
//     adminWalletAddress: '0x718C6E457500202F23Be231b439C8A92A46c288C',
//     erc20Abi,
//     usdtAbi,
//     usdtAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
//     usdcAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
//     shibAddress: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
//     dogeAddress: '0x4206931337dc273a630d328dA6441786BfaD668f',
// };

export default config;