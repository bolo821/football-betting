const router = require('express').Router();
const leaderboardController = require('../controllers/leaderboard');

router.get('/', async (req, res) => {
    const data = await leaderboardController.getLeaderboard();
    res.status(200).json(data);
});

router.put('/:account', async (req, res) => {
    const updateRes = await leaderboardController.updateLeaderboard(req.params.account, req.body);
    if (updateRes) res.status(200).json('Success');
    else res.status(500).json("Error");
});

module.exports = router;