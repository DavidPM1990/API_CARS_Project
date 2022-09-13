const router = require("express").Router();
const AxiosCarsInfo = require('../services/CarApi.service');
const axiosCars = new AxiosCarsInfo();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// router.get("/cars", (req, res, next) => {
//   res.render("cars");
// });


router.get('/cars', (req, res, next) => {
  let {search} = req.query
  console.log('----------------------------',search ,'--------------------------')
  console.log('----------------------------',typeof search ,'--------------------------') 

  // if(search === Number){

  //   const yearProm = axiosCars.getCarsByYear(search)
  // }

  search = search.toLowerCase()

  const brandProm = axiosCars.getCarBrand(search)
  const modelProm = axiosCars.getCarModel(search)

  return Promise.all([brandProm,modelProm])

  .then(values => {
    const [brands, models] = values

    if(!brands.length && !models.length) res.send('error')
    if(brands.length) res.render('cars' , {brands})
    if(models.length) res.render('cars' , {models})

    
  })
  .catch((err) => next(err));
})



  

// router.get('/cars', (req, res, next) => {
//   const {brand} = req.query
//   axiosCars
//     .getCarBrand(brand)
//     .then((info) => {
//       console.log(info)
//       res.render('cars', {info});
//     })
//     .catch((err) => next(err));
// });

// router.get('/cars', (req, res, next) => {
//   const {carModel} = req.query
//   axiosCars
//     .getCarModel(carModel)
//     .then((info) => {
//       console.log(info)
//       res.render('cars', {info});
//     })
//     .catch((err) => next(err));
// });

// router.get('/cars', (req, res, next) => {
//   const {brand} = req.query
//   axiosCars
//     .getCarBrand(brand)
//     .then((info) => {
//       console.log(info)
//       res.render('cars', {info});
//     })
//     .catch((err) => next(err));
// });

// ---------------POST---------------




module.exports = router;