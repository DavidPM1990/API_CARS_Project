const router = require("express").Router()
const bcrypt = require('bcryptjs')
const userModel = require("../models/User.model")
const saltRounds = 10
const { USER, ADMIN } = require('../const/user.const');

// GET

router.get('/auth/signup', (req, res) => {
    res.render('auth/signup');
});

router.get('/auth/login', (req, res) => {
    res.render('auth/login');
});


router.get('/post/view_post', (req, res) => {
    res.render('post/view_post');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

// POST

router.post('/auth/signup', (req, res, next) => {

    console.log(req.body)

    const { username, email, password } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => {
            console.log("HASH -->", hashedPassword);
            userModel.create({ username, email, password: hashedPassword })
        })
        .then(createdUser => res.redirect('/'))
        .catch(error => next(error))
})


// router.post('/auth/signup', (req, res) => {
//     const { username, email, password } = req.body;

//     userModel
//         .create({ username, email, password })
//         .then((newUser) => {
//             res.redirect("/")
//         })
//         .catch((err) => {
//             console.error(err);
//             res.render('auth/signup', { messageError: 'Ha ocurrido un error' });
//         })

// });

// router.post('/auth/login', (req, res) => {
//     const { username, email, password, } = req.body;
//     userModel
//         .findOne({ username, email, password })
//         .then(() => {
//             res.redirect("/cars")
//         })
//         .catch((err) => {
//             console.error(err);

//         })

// });

router.post('/auth/login', (req, res, next) => {

    const { username, password } = req.body

    userModel
        .findOne({ username })
        .then(user => {
            // console.log('USER PASSWORD -->', user.password)
            // console.log('BODY PASSWORD -->', password)
            // console.log('BCRYPT PASSWORD -->', bcrypt.compareSync(password, user.password))
            if (!user) {
                res.render('auth/login', { errorMessage: 'Username no registrado en la Base de Datos' })
                return
            } else if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/login', { errorMessage: 'Usuario o contraseña incorrecta' })
                return
            } else {
                req.session.user = user
                res.redirect('/')
            }
        })
        .catch(error => next(error))
})



module.exports = router;
