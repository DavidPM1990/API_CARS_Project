const router = require("express").Router();
const isLoggedin = require("../middleware/is-loggedin.middleware");
const carModel = require("../models/Car.model");
const postModel = require("../models/post.model");
const userModel = require("../models/User.model");

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
  // populate comments {path: '', populate: { path: '' }}
  .then(postAboutCar => {
    res.render('post/view-post', postAboutCar)
  })
})


router.get("/post/make-post/:id", isLoggedin, (req, res, next) => {
  const { id } = req.params;
  res.render("post/make-post", { id })
});

// ---------------------- POST -----------------------

router.post("/post/make-post", (req, res, next) => {
  const { model, carClass, make, fuel_type, city_mpg, combination_mpg, cylinders, transmission, year,} = req.body;

  carModel
    .create({ model, carClass, make, fuel_type, city_mpg, combination_mpg, cylinders, transmission, year, })
    .then((createdCarInDatabase) =>
      res.redirect(`/post/make-post/${createdCarInDatabase._id}`)
    )
    .catch((err) => next(err));
});

router.post('/post/view-post/delete/:id', isLoggedin, (req, res, next) =>{ 
  let thisPostId = req.params.id
  postModel.findById(thisPostId)
  .then((infoAboutPost) => {   
    
    if(req.session.user._id === infoAboutPost.author.toString()){

      console.log('-------- se ha borrado el POST ---------')
      
      postModel.findByIdAndDelete(thisPostId)
      .then(() => res.redirect('/post/view-all-posts'))

    } else {
      res.redirect(`/post/view-post/${thisPostId}`, { errorMessage: 'You are not allowed to delete this post' })
    }
  })
  .catch(error => next(error));
  })


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

// Que las rutas solo puedan ejecutarlas los creadores del post
// happy code :D

module.exports = router;
