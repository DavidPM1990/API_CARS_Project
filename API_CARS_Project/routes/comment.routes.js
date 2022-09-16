const router = require('express').Router();
const postModel = require('../models/post.model');
const userModel = require('../models/User.model');
const commentModel = require('../models/comment.model');
const isLoggedin = require("../middleware/is-loggedin.middleware");


// -------------------- GET -------------- 

// -------------------- POST -------------- 

router.post('/comment', isLoggedin, (req, res, next) => {
    const { comment, post } = req.body;
    commentModel
      .create({ user: req.session.user._id, comment, post })
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

  router.post('/comment/delete/:_id', (req, res, next) => {
    let thisCommentId = req.params._id
    
    commentModel
    .findById(thisCommentId)
    .populate("user")
    .then((infoAboutComment) => {

      console.log(infoAboutComment)

      if(infoAboutComment.user._id.toString() === req.session.user._id){
        commentModel
        .findByIdAndDelete(thisCommentId)
        .then(() => res.redirect(`/post/view-post/${infoAboutComment.post}`))
        .catch(e => console.log(e))
      } 
      else {
        commentModel
        .findById(thisCommentId)
        .then(() => res.redirect(`/post/view-post/${infoAboutComment.post}`))
        .catch(e => console.log(e))        

        console.log("NO TIENEN LAS MISMA ID")
      }
    })
    .catch(e => console.log(e)) 


  })





module.exports = router;
