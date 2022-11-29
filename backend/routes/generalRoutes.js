const router = require('express').Router();
const generalController = require('../controllers/general');

router.post('/', (req, res) => {
    generalController.addGeneral(req, res);
});

router.get('/', (req, res) => {
    generalController.getGeneral(req, res);
});

router.put('/:matchId', (req, res) => {
    generalController.updateGeneral(req, res);
});

module.exports = router;