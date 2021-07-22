const path = require('path');
const BlogPostModel = require('../models/blogpost');
module.exports = (req, res) => {
    //console.log(req.body.body);
    if (req.files == null || req.body.title.length === 0 || req.body.body.length == 0) {

        req.flash('error', 'Title or Body and background image cannot be empty');
        req.flash('data', req.body);
        return res.redirect('/posts/new');
    }
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..', 'public/assets/img', image.name), async (error) => {
        try {
            const res = await BlogPostModel.create({ ...req.body, image: '/assets/img/' + image.name, userid: req.session.user_id });
        }
        catch (err) {

            console.log(err);
        }
    })

    res.redirect('/');

}