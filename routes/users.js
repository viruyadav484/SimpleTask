var express = require('express');
var router = express.Router();
var userController =  require('../controller/Usercontroller');
/* GET users listing. */
router.get('/', function(req, res, next) {
   userController.getUserDetailByUsername(req.query).then((result)=>{
    console.log("result is here show data +++++++++++++++++++",result);
    res.render('userHome',{"email": req.query.userName,"userDetail": result});
  }).catch((err)=>{
    console.log("login error",err);
  })

  
});

module.exports = router;
