const  Web3 = require('web3');
const config = require('../config');
const BigNumber = require('bignumber.js');

const web3 = new Web3(new Web3.providers.HttpProvider(config.rpcUrl));
const routerContract = new web3.eth.Contract(config.routerContractAbi, config.routerContractAddress);

const Provide = require('@truffle/hdwallet-provider');
const rpcUrl = config.rpcUrl;
const ownerKey = config.adminWalletKey;
const ownerAddress = config.adminWalletAddress;
const provider = new Provide(ownerKey, rpcUrl);
const web3Signed = new Web3(provider);
const routerContractSigned = new web3Signed.eth.Contract(config.routerContractAbi, config.routerContractAddress);

const calculateGasMargin = (value) => {
	return BigNumber(value).multipliedBy(BigNumber(13)).dividedToIntegerBy(BigNumber(10));
}

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

const setBetStatus = async (matchId, status) => {
    try {
        const gasLimit = await routerContractSigned.methods.setBetStatus(matchId, status).estimateGas({ from: ownerAddress });
        const res = await routerContractSigned.methods.setBetStatus(matchId, status)
        .send({ from: ownerAddress, gasLimit: calculateGasMargin(gasLimit) })
        .catch(async err => {
            console.log('error in bet block: ', err);
            await setBetStatus(matchId, status);
        });

        if (res) {
            console.log("Updated the status for match " + matchId);
        }
    
        // if (res) {
        //     req.app.get('io').emit('BET');
        // }
    } catch (err) {
        await setBetStatus(matchId, status);
    }
}

module.exports = { getMatchId, getBetStatus, setBetStatus };