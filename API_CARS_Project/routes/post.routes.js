const router = require("express").Router();
const isLoggedin = require("../middleware/is-loggedin.middleware");
const carModel = require("../models/Car.model");
const postModel = require("../models/post.model");
const userModel = require("../models/User.model");
const commentModel = require('../models/comment.model')

// ------------------- GET ---------------------------

router.get("/post/view-all-posts", (req, res, next) => {
  postModel.find().then((allPosts) => {
    res.render("post/view-all-posts", { allPosts });
  })
    .catch((err) => next(err));
});

router.get('/post/view-post/:id', (req, res, next) => {

  postModel.findById(req.params.id)
  .populate('carId', 'model carClass make fuel_type city_mpg combination_mpg cylinders transmission year')
  .populate('author', 'username email profileImg')
  .populate({path: 'comments', populate: { path: 'user' }})
  .then(postAboutCar => {
    res.render('post/view-post', postAboutCar)
  })
})


router.get("/post/make-post/:id", isLoggedin, (req, res, next) => {
  const { id } = req.params;
  res.render("post/make-post", { id })
});

router.get("/post/edit-post/:id", (req, res, next) => {
  const { id } = req.params;
  postModel
    .findById(id)
    .then(post => {
      res.render("post/edit-post", post)
    })
    .catch((err) => next(err))
});

// ---------------------- POST -----------------------

router.post("/post/make-post", isLoggedin, (req, res, next) => {
  const { model, carClass, make, fuel_type, city_mpg, combination_mpg, cylinders, transmission, year, } = req.body;

  carModel
    .create({ model, carClass, make, fuel_type, city_mpg, combination_mpg, cylinders, transmission, year, })
    .then((createdCarInDatabase) =>
      res.redirect(`/post/make-post/${createdCarInDatabase._id}`)
    )
    .catch((err) => next(err));
});

router.post('/post/view-post/delete/:id', (req, res, next) =>{ 
  let thisPostId = req.params.id
  console.log(req.session.user._id)
  postModel.findById(thisPostId)
  .then((infoAboutPost) => {   
    
    if(req.session.user._id === infoAboutPost.author.toString()){

      console.log('-------- se ha borrado el POST ---------')
      
      postModel.findByIdAndDelete(thisPostId)
      .then(() => res.redirect('/post/view-all-posts'))

    } else {
      console.log('no entra nunca aca')
      res.render(`post/view-post/${thisPostId}`, { errorMessage: 'You are not allowed to delete this post' })
    }
  })
  .catch(error => next(error));
  })
 
  router.post('/post/edit-post/:id', isLoggedin, (req, res, next) => {
    let updatedPost = req.params.id
    let { title, description } = req.body;

    postModel.findById(updatedPost)    
    .then((infoAboutEditionPost) => {

      if(req.session.user._id === infoAboutEditionPost.author.toString()){

      console.log('-------- se ha editado el POST ---------')

      postModel.findByIdAndUpdate(updatedPost, { title, description })
        .then((editPost) => {
          console.log(editPost)
          res.redirect(`/post/view-post/${editPost._id}`);
        })
        // Utilizamos el next(err) para controlar el error
        .catch((err) => next(err));

      } else {
      console.log('no entra nunca aca')

        res.redirect(`/post/view-post/${updatedPost}`, { errorMessage: 'You are not allowed to edit this post' })
      }
    })

  });

router.post("/post/submit-post/:id", isLoggedin, (req, res, next) => {
  postModel
    .create({
      title: req.body.title,
      description: req.body.description,
      carId: req.params.id,
      author: req.session.user._id
    })
    .then((createPostInDatabase) => res.redirect(`/post/view-post/${createPostInDatabase._id}`))
    .catch((err) => next(err));
});


module.exports = router;
