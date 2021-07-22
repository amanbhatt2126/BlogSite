module.exports = (req, res) => {
    var username = "";
    var password = "";
    var data = req.flash('data')[0];
    if (typeof data != "undefined") {
        username = data.username;
        password = data.password;
    }

    res.render('register', {
        errors: req.flash('validationErrors'),
        username, password
    });
}