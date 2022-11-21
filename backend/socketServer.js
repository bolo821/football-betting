const Match = require('mongoose').model('Match');
const Web3 = require('web3');
const config = require('./config');
const web3 = new Web3(new Web3.providers.HttpProvider(config.rpcUrl));
const routerContract = new web3.eth.Contract(config.routerContractAbi, config.routerContractAddress);

var users = {};

module.exports = (server, options) => {
	const io = require('socket.io')(server, options);

	io.on('connection', (socket) => {
		socket.on('CONNECT', (account_id) => {
            users = { ...users, [ socket.id ]: account_id };
		});

		socket.on('BET', async () => {
			let resEth = await routerContract.methods.getBetSingleInformation(config.adminWalletAddress, 0).call();
			let resWci = await routerContract.methods.getBetSingleInformation(config.adminWalletAddress, 1).call();
			let matches = await Match.find({});
			let matchCount = matches.length;
			let totalBet = [];
			let totalBetWci = [];

			for (let i=0; i<matchCount; i++) {
				totalBet.push(web3.utils.fromWei(resEth[matchCount*3 + i], 'ether'));
				totalBetWci.push(web3.utils.fromWei(resWci[matchCount*3 + i], 'gwei'));
			}

			for (let i=0; i<matchCount; i++) {
				if (matches[i].totalBet !== totalBet[i]) {
					await Match.findOneAndUpdate({ matchId: matches[i].matchId }, { totalBet: totalBet[i] });
				}
				if (matches[i].totalBetWci !== totalBetWci[i]) {
					await Match.findOneAndUpdate({ matchId: matches[i].matchId }, { totalBetWci: totalBetWci[i] });
				}
			}

			socket.emit('BET');
			socket.broadcast.emit('BET');
		});

		socket.on('CLAIMED', () => {
			socket.emit('CLAIMED');
			socket.broadcast.emit('CLAIMED');
		})

		socket.on('disconnect', () => {
			delete users[socket.id];
		});
	});

	return io;
}