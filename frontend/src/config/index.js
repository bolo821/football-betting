import coinflipCROAbi from '../constants/abis/coinflip_cro.json';
import depositAbi from '../constants/abis/deposit.json';
import mngAbi from '../constants/abis/mng.json';
import coinflipMNGAbi from '../constants/abis/coinflip_mng.json';
import lionAbi from '../constants/abis/lion.json';
import coinflipLIONAbi from '../constants/abis/coinflip_lion.json';
import coinflipERC20Abi from '../constants/abis/coinflip_erc20.json';
import erc20Abi from '../constants/abis/erc20.json';

const config = {
    netId: 25,
    rpcUrl: "https://evm.cronos.org",
    blockExplorer: "https://cronoscan.com/",
    nativeCoin: {
        name: "CRO",
        symbol: "CRO",
        decimal: 18,
    },
    managerAddress: '0xd3f83A76C84B089Bcb80830fef885aafe4afB564',
    depositAddress: '0x17e967b4241298bae5B188D69b1c0ed941D86336',
    depositAbi,
    coinflipCROAddress: '0x80CeC39EaDd363D37Bf78a43153E5DDef9985eb0',
    coinflipCROAbi,
    mngAddress: '0xC9b23289c60783649AA327732FCCEc2f5d0aC466',
    coinflipMNGAddress: '0x00C261647A085B76A4005152398A6441fb72F105',
    lionAddress: '0x49fB98F9b4a3183Cd88e7a115144fdf00fa6fB95',
    coinflipLIONAddress: '0xd53A607B67030f213B3F87A326c8AFe0e3d685fa',
    usdtAddress: '0x66e428c3f67a68878562e79A0234c1F83c208770',
    coinflipUSDTAddress: '0x053Fbe09655E0589e5886E4708c8c25c9CffcF9f',
    usdcAddress: '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59',
    coinflipUSDCAddress: '0xEaF55E0159a32D7D3d183db38D9B3ED23da6AAba',
    mmfAddress: '0x97749c9B61F878a880DfE312d2594AE07AEd7656',
    coinflipMMFAddress: '0xd1df7A746165C2738A40F77042bBFA52343b8d38',
    gdrtAddress: '0xec0d0f2d7ddf5e6f1ed18711fe5dd5c790e1c4d6',
    coinflipGDRTAddress: '0x2605906501AeFA111F83FA5E8267D92075FEaDdc',
    darkcrystalAddress: '0xEfA1FABC2AB6219174aD1c912F56f7de53cDc1E1',
    coinflipDARKCRYSTALAddress: '0x63E7F39A77e04b0a78651cC1B01b76d29D71ac3C',
    lionAbi,
    mngAbi,
    coinflipMNGAbi,
    coinflipLIONAbi,
    erc20Abi,
    coinflipERC20Abi,
};

export default config;