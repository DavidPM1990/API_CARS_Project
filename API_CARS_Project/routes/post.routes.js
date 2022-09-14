const router = require("express").Router();
const carModel = require("../models/Car.model")




// ------------------- GET ---------------------------

router.get('/post/make-post', (req, res, next) => {
    res.render('post/make-post')
})













// ---------------------- POST -----------------------


router.post('/post/make-post', (req, res, next) => {
    console.log(req.body)

    const {model, carClass, make, fuel_type, city_mpg, combination_mpg, cylinders, transmission, year} = req.body

    carModel.create({model, carClass, make, fuel_type, city_mpg, combination_mpg, cylinders, transmission, year})
    .then(createdCarInDatabase => res.redirect('/post/make-post'))
})






module.exports = router;
