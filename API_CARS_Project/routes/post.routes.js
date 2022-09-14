const router = require("express").Router()
const postModel = require("../models/post.model")


// router.get('/post/make-post', (req, res) => {
//     res.render('post/view_post');
// });













router.post('/post/make-post', (req, res) => {
    const { title, description } = req.body;

    postModel
        .create({ title, description })
        .then((newPost) => {
            res.render("post/make-post")
        })
        .catch((err) => {
            console.error(err);

        })

});

module.exports = router;
