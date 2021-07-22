const BlogPostModel = require('../models/blogpost');
module.exports = async (req, res) => {

    let blogpost;
    try {
        blogpost = await BlogPostModel.findById(req.params.id).populate('userid');
    }
    catch (err) {
        return res.render('notfound');
    }
    //console.log(blogpost);
    res.render('post', {
        blogpost: blogpost
    });
}