var express = require('express');
var router = express.Router();
var userController =  require('../controller/Usercontroller');
/* GET users listing. */
router.get('/', function(req, res, next) {
  // userController.getAllusers().then((result)=>{
  //   res.render('admin',{"userDetail": result});
  // }).catch((err)=>{
  //   console.log("login error",err);
  // })
  userController.getAllusers().then((result)=>{
    res.render('admin',{"userDetail": result});
  }).catch((err)=>{
    console.log("login error",err);
  })

});

module.exports = router;