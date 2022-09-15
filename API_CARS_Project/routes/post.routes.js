const router = require("express").Router();
const carModel = require("../models/Car.model");
const postModel = require("../models/post.model");

// ------------------- GET ---------------------------

router.get("/post/view-all-posts", (req, res, next) => {
  postModel.find().then((allPosts) => {
    res.render("post/view-all-posts", { allPosts });
  })
    .catch((err) => next(err));
});

router.get('/post/view-post/:id', (req, res, next) => {

  console.log(req.params.id)

  postModel.findById(req.params.id)
    .populate('carId', 'model carClass make fuel_type city_mpg combination_mpg cylinders transmission year')
    .then(postAboutCar => {
      console.log(postAboutCar)
      res.render('post/view-post', postAboutCar)
    })
})

router.get("/post/make-post/:id", (req, res, next) => {
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

router.post("/post/make-post", (req, res, next) => {
  const { model, carClass, make, fuel_type, city_mpg, combination_mpg, cylinders, transmission, year, } = req.body;

  carModel
    .create({ model, carClass, make, fuel_type, city_mpg, combination_mpg, cylinders, transmission, year, })
    .then((createdCarInDatabase) =>
      res.redirect(`/post/make-post/${createdCarInDatabase._id}`)
    )
    .catch((err) => next(err));
});

router.post("/post/submit-post/:id", (req, res, next) => {

  postModel
    .create({
      title: req.body.title,
      description: req.body.description,
      carId: req.params.id,
    })
    .then((createPostInDatabase) => res.redirect(`/post/view-post/${createPostInDatabase._id}`))
    .catch((err) => next(err));
});

router.post('/post/edit-post/:id', (req, res, next) => {
  const updatedPost = req.params.id
  const { title, description } = req.body;
  postModel.findByIdAndUpdate(updatedPost, { title, description })
    .then((editPost) => {
      console.log(editPost)
      res.redirect(`/post/view-post/${editPost._id}`);
    })
    // Utilizamos el next(err) para controlar el error
    .catch((err) => next(err));
});

module.exports = router;
