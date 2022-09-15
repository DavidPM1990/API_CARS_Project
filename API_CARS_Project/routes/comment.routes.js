const router = require('express').Router();
const postModel = require('../models/post.model');
const userModel = require('../models/User.model');
const commentModel = require('../models/comment.model');
const isLoggedin = require("../middleware/is-loggedin.middleware");


// -------------------- GET -------------- 

router.post('/comment', isLoggedin, (req, res, next) => {
    console.log(req.body)
    const { user, comment, post } = req.body;
    commentModel.create({ user, comment, post })
      .then((newComment) => {
        return postModel.updateOne(
          { _id: post },
          { $push: { comments: newComment._id } }
        );
      })
      .then(() => {
        res.redirect(`/post/view-post/${post}`);
      })
      .catch((err) => next(err));
  });




// -------------------- POST -------------- 

module.exports = router;
