const router = require("express").Router()
// const bcrypt = require('bcryptjs')
const userModel = require("../models/User.model")
// const saltRounds = 10

// GET

router.get('/auth/signup', (req, res) => {
    res.render('auth/signup');
});

router.get('/auth/login', (req, res) => {
    res.render('auth/login');
});

router.get('/cars', (req, res) => {
    res.render('cars');
});

router.get('/post/view_post', (req, res) => {
    res.render('post/view_post');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

// POST

router.post('/auth/signup', (req, res) => {
    const { username, password, email, description, profileImg } = req.body;
    userModel.create({ username, password, email, description, profileImg })
        .then((newUser) => {
            res.redirect("/")
        })
        .catch((err) => {
            console.error(err);

        })

});

router.post('/auth/login', (req, res) => {
    const { username, email, password, } = req.body;
    userModel.findOne({ username, email, password })
        .then(() => {
            res.redirect("/cars")
        })
        .catch((err) => {
            console.error(err);

        })

});


module.exports = router;
