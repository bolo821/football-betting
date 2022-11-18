const router = require('express').Router();
const referralController = require('../controllers/referral');

router.post('/', async (req, res) => {
    const addRes = referralController.addReferral(req.body);
    if (addRes) {
        res.status(200).json(addRes);
    } else {
        res.status(500).json('Error');
    }
});

router.get('/:referralAccount', async (req, res) => {
    const referredUsers = await referralController.getReferredUsers(req.params.referralAccount);
    res.status(200).json(referredUsers);
});

router.put('/:account', async (req, res) => {
    const updateRes = await referralController.updateReferral(req.params.account, req.body);
    if (updateRes) res.status(200).json('Success');
    else res.status(500).json("Error");
});

module.exports = router;