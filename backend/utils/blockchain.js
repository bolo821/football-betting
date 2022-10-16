const  Web3 = require('web3');
const config = require('../config');

const web3 = new Web3(new Web3.providers.HttpProvider(config.rpcUrl));
const routerContract = new web3.eth.Contract(config.routerContractAbi, config.routerContractAddress);

const getMatchId = async () => {
    try {
        const res = await routerContract.methods.getMatchId().call().catch(async () => {
            return await getMatchId();
        });
    
        if (res) {
            return res;
        } else {
            return null;
        }
    } catch (err) {
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