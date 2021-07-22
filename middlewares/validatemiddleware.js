module.exports = (req, res, next) => {
    if (req.files == null || req.body.title == null || req.body.body == null) {

        // req.flash('error', 'Title or Body cannot be empty. Please Fill in these fields.');
        return res.redirect('/posts/new');
    }
    next();
}