module.exports = (req, res) => {
    var data = req.flash('error')[0];
    var error = "";
    if (typeof data != 'undefined') {
        error = data;
    }
    data = req.flash('data')[0];
    var title = "";
    var body = "";
    if (typeof data != 'undefined') {
        title = data.title;
        body = data.body;
    }
    //console.log(title);
    //console.log(body);
    if (req.session.user_id) {
        return res.render('create', {
            error, title, body
        });
    }
    else {
        return res.redirect('/auth/login');
    }
}