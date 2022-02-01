var express = require('express');
const user = require('../models/user');
var router = express.Router();
const axios = require('axios');
const pictures = require('../models/picture');
const Rating = require('../models/rating');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
/////////////////////////////////////////////////////////////////////////////////////////////
//Fetch and Save a NASA picture to database//
//////////////////////////////////////////////////////////////////////////////////////////////
router.get('/apod/pictures', async function (req, res, next) {
  try {
    let DEMO_KEY = process.env.DEMO_KEY
    let response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=' + DEMO_KEY + '&count=' + req.query.count)
    let operations = [];
    response.data.forEach(element => {
      const picture = new pictures({
        title: element.title,
        url: element.url
      });
      console.log(picture)
      operations.push(picture.save())
    });
    let data = await Promise.all(operations);
    res.json(data);
  }
  catch (err) {
    res.json(err);
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////
//Save User Rating//
/////////////////////////////////////////////////////////////////////////////////////////////
router.post('/saverating', async (req, res) => {
  let titleFound = await pictures.findOne({ title: req.body.title });
  let emailFound = await user.findOne({ email: req.body.email });


  //If title and email exists then only we save the rating
  if (titleFound && emailFound && emailFound.active == 'Y') {
    const rating = new Rating({
      title: req.body.title,
      email: req.body.email,
      rating: req.body.rating
    });

    await rating.save().then(data => { res.json(data); }).catch(err => { res.json({ message: err }) });

  }
  else {
    res.status(400).send({ "message": "InvalidUserInput" })
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////
//Updating User Rating//
//////////////////////////////////////////////////////////////////////////////////////////////
router.post('/updaterating', async (req, res) => {
  try {
    //only update if that rating exists, and is active(not deleted)
    let doc = await Rating.findOneAndUpdate({ email: req.body.email, title: req.body.title,active : "Y" }, { rating: req.body.rating }, { new: true });
    res.json(doc);
  }
  catch (err) {
    throw err;
  }
})
//////////////////////////////////////////////////////////////////////////////////////////////
//Deleting User Rating//
//////////////////////////////////////////////////////////////////////////////////////////////
router.post('/deleterating', async (req, res) => {
  try {
    //delete rating if that rating exits, and has not been deleted previously
    let doc = await Rating.findOneAndUpdate({ email: req.body.email, title: req.body.title,active : "Y" }, { active: "N" }, { new: true });
    res.json({ "message": "User rating Deleted" });
  }
  catch (err) {
    throw err;
  }
})
//////////////////////////////////////////////////////////////////////////////////////////////
//Get all of a User's rating//
//Doing a virtual delete and making user Rating zero instead of physical delete//
//////////////////////////////////////////////////////////////////////////////////////////////
router.post('/userratings', async (req, res) => {
  try {
    let doc = await Rating.find({ email: req.body.email,active :"Y" });
    res.json(doc);
  }
  catch (err) {
    throw err;
  }
})



module.exports = router;
