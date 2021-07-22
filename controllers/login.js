module.exports = (req, res) => {

    var data = req.flash('error')[0];
    var error = "";
    if (typeof data != 'undefined') {
        error = data;
    }
    res.render('login', {
        error
    });
}