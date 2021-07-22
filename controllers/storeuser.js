const UserModel = require('../models/user');
const path = require('path');
module.exports = async (req, res) => {
    try {
        await UserModel.create(req.body);
    }
    catch (e) {
        //console.log(e);
        var Keys = Object.keys(e.errors);
        var validationErrors = Keys.map(key => {
            return e.errors[key].message;
        });
        console.log(validationErrors);
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        //req.session.validationErrors = validationErrors;

        return res.redirect('/auth/register');
    }
    res.redirect('/');
}



