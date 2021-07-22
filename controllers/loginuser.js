const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

module.exports = async (req, res) => {
    const body = req.body;
    const user = await UserModel.findOne({ username: body.username });


    if (user !== null) {

        const response = await bcrypt.compare(body.password, user.password);

        if (!response) {
            req.flash('error', 'wrong password try again')
            return res.redirect('/auth/login');
        }
        else { req.session.user_id = user._id; return res.redirect('/'); }

    }
    else {


        req.flash('error', 'username not found');
        return res.redirect('/auth/login');
    }

    res.redirect('/');
}