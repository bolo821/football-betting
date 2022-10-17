const  Web3 = require('web3');
const config = require('../config');

const web3 = new Web3(new Web3.providers.HttpProvider(config.rpcUrl));
const routerContract = new web3.eth.Contract(config.routerContractAbi, config.routerContractAddress);

const getMatchId = async () => {
    try {
        console.log('start to get match id');
        const res = await routerContract.methods.getMatchId().call().catch(async (err) => {
            console.log('error in getting match id in block: ', err);
            return await getMatchId();
        });
        console.log('get match id result: ', res);
    
        if (res) {
            return res;
        } else {
            return null;
        }
    } catch (err) {
        console.log('error in getting match id: ', err);
        return await getBetStatus();
    }
}

const getBetStatus = async () => {
    try {
        const res = await routerContract.methods.getBetStatus().call().catch(async () => {
            return await getBetStatus();
        });
    
        if (res) {
            let statusData = res.map(ele => parseInt(ele));
            return statusData;
        }
    } catch (err) {
        return await getBetStatus();
    }
}


module.exports = { getMatchId, getBetStatus };