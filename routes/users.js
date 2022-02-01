var express = require('express');
const { ReadConcernLevel } = require('mongodb');
var router = express.Router();
const mongoose = require('mongoose');
require('dotenv/config');
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//////////////////////////////////////////////////////////////////////////////////////////////
//Creating Users//
//////////////////////////////////////////////////////////////////////////////////////////////
router.post('/',async (req,res) => {
  try{
  const user = new User({
    email : req.body.email
  });
  let doc = await user.save();
  res.json(doc)
}
catch(err)
{
  throw err;
}
});

//////////////////////////////////////////////////////////////////////////////////////////////
//Delete user(Email)//
//Doing a virtual delete and making user Active as "N" instead of doing physical delete//
//////////////////////////////////////////////////////////////////////////////////////////////
router.post('/delete',async (req,res) => {
try{
  //We only want to delete(make Active = N) if the user exists and has active = Y
let doc = await User.findOneAndUpdate({ email: req.body.email,active:"Y" }, { active: "N" });
  if(doc != null){
  res.json({"message":"User deleted"});
  }
  else res.status(404).send({"message":"User not found"})
}
catch(err)
{
  throw err;
}
})

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true,useUnifiedTopology: true}, () => console.log('connected to DB!'));

var db = mongoose.connection;

module.exports = router;
