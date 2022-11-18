const Referral = require('mongoose').model('Referral');

const addReferral = async (data) => {
    try {
        const findRes = await Referral.findOne({ account: data.account });
        if (findRes) {
            return false;
        } else {
            await new Referral(data).save();
            return true;
        }
    } catch (err) {
        console.log('Error in adding referral: ', err);
        return false;
    }
}
const getReferredUsers = async (referralAccount) => {
    try {
        const findRes = await Referral.find({ referrer: referralAccount });
        return findRes;
    } catch (err) {
        return [];
    }
}
const updateReferral = async (account, updateData) => {
    try {
        await Referral.findOneAndUpdate({ account }, updateData);
        return true;
    } catch (err) {
        console.log('error in updating referral: ', err);
        return false;
    }
}

module.exports = { addReferral, getReferredUsers, updateReferral };