const BlogPostModel = require('../models/blogpost');
module.exports = async (req, res) => {


    try {
        const blogposts = await BlogPostModel.find().populate('userid'); res.render('index', {
            blogposts: blogposts
        });
    }
    catch (err) { console.log(err); }

}