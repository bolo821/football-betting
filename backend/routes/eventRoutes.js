const router = require('express').Router();
const eventController = require('../controllers/event');

router.post('/', (req, res) => {
    eventController.addEvent(req, res);
});

router.get('/', (req, res) => {
    eventController.getEvent(req, res);
});

router.put('/:matchId', (req, res) => {
    eventController.updateEvent(req, res);
});

module.exports = router;