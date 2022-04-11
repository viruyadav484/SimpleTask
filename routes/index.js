var express = require('express');
var router = express.Router();
var userController =  require('../controller/Usercontroller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/registraion', function(req, res, next) {
  res.render('registration',{"output": ""});
});

router.post('/registraion', function(req, res, next) {
  console.log("user registration data is here ",req.body)
  userController.registred(req.body).then((result)=>{
    console.log("result",result);
    var msg = result.status == 1 ? "User register successfully !!!!!!!!!!!!!!!!!" : "Failed to registered , User already exits..";
     res.render('registration',{"output": msg});
   }).catch((err)=>{
      console.log("err",err);
   });
  // res.render('registration');
});


router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  userController.userLogin(req.body).then((result)=>{
    if(result.status){
        result.status == 1 ? res.redirect('/admin') : res.redirect('/users?userName='+req.body.email);
    }else{
      res.render('login');
    }
  
  }).catch((err)=>{
    console.log("login error",err);
  })
});



module.exports = router;
