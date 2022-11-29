const Match = require('mongoose').model('Match');
const Event = require('mongoose').model('Event');
const General = require('mongoose').model('General');
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
			let events = await Event.find({});
			let generals = await General.find({});
			let matchCount = resEth.length / 4;
			let totalBet = [];
			let totalBetWci = [];

			for (let i=0; i<matchCount; i++) {
				totalBet.push(web3.utils.fromWei(resEth[matchCount*3 + i], 'ether'));
				totalBetWci.push(web3.utils.fromWei(resWci[matchCount*3 + i], 'gwei'));
			}

			for (let i=0; i<matchCount; i++) {
				for (let j=0; j<matches.length; j++) {
					if (matches[j].matchId === i) {
						if (matches[j].totalBet !== totalBet[i]) {
							await Match.findOneAndUpdate({ matchId: matches[j].matchId }, { totalBet: totalBet[i] });
						}
						if (matches[j].totalBetWci !== totalBetWci[i]) {
							await Match.findOneAndUpdate({ matchId: matches[j].matchId }, { totalBetWci: totalBetWci[i] });
						}
					}
				}

				for (let j=0; j<events.length; j++) {
					if (events[j].matchId === i) {
						if (events[j].totalBet !== totalBet[i]) {
							await Event.findOneAndUpdate({ matchId: events[j].matchId }, { totalBet: totalBet[i] });
						}
						if (events[j].totalBetWci !== totalBetWci[i]) {
							await Event.findOneAndUpdate({ matchId: events[j].matchId }, { totalBetWci: totalBetWci[i] });
						}
					}
				}

				for (let j=0; j<generals.length; j++) {
					if (generals[j].matchId === i) {
						if (generals[j].totalBet !== totalBet[i]) {
							await General.findOneAndUpdate({ matchId: generals[j].matchId }, { totalBet: totalBet[i] });
						}
						if (generals[j].totalBetWci !== totalBetWci[i]) {
							await General.findOneAndUpdate({ matchId: generals[j].matchId }, { totalBetWci: totalBetWci[i] });
						}
					}
				}
			}

			socket.emit('BET');
			socket.broadcast.emit('BET');
		});

		socket.on('CLAIMED', () => {
			socket.emit('CLAIMED');
			socket.broadcast.emit('CLAIMED');
		});

		socket.on('REFRESH', () => {
			socket.emit('REFRESH');
			socket.broadcast.emit('REFRESH');
		});

		socket.on('disconnect', () => {
			delete users[socket.id];
		});
	});

	return io;
}