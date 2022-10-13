const router = require('express').Router();
const matchController = require('../controllers/match');
const { upload } = require('../middlewares/uploader');

router.post('/', upload.fields([{ name: 'team1Logo', maxCount: 1 }, { name: 'team2Logo', maxCount: 1 }]), (req, res) => {
    matchController.addMatch(req, res);
});

router.get('/', (req, res) => {
    matchController.getMatch(req, res);
});

router.put('/:matchId', (req, res) => {
    matchController.updateMatch(req, res);
});

module.exports = router;