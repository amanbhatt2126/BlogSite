const UserModel = require('../models/user');
module.exports = async (req, res, next) => {

    try {
        const user = await UserModel.findById(req.session.user_id);
        if (!user) return res.redirect('/');
    }
    catch (e) {
        console.log(err);
        return res.redirect('/');
    }

    next();

}