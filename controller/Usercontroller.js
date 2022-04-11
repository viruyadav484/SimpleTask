var Models =  require("../models/model");
var crypto = require('crypto');

function UserController(){
    this.registred = (userDetail)=>{
        return new Promise((resolve,reject)=>{
            var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
            var key = 'password';
            var text = userDetail.password;
            var cipher = crypto.createCipher(algorithm, key);  
            var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
            var postData = {
                name: userDetail.name,
                userName: userDetail.email,
                password: encrypted,
                mobile: userDetail.mobile,
                address: userDetail.address,
                city: userDetail.city,
                gender: userDetail.gender,
                hobby: JSON.stringify(userDetail.hobbies),
                role: "user",
                info: Date()
            };
            var collectionName = 'Users';
            Models.registerUser(collectionName,postData).then((result)=>{
                    console.log("user responce ",result);
                     resolve(result);
                    }).catch((err)=>{
                       reject(err) 
                    })
            });
      
    }

  this.userLogin = (postBody)=>{
    return new Promise((resolve,reject)=>{
        var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
        var key = 'password';
        var text = postBody.password;
        var cipher = crypto.createCipher(algorithm, key);  
        var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
      var condition = {userName: postBody.email,password: encrypted};
      console.log("userlogin data",condition);
      // var setValue = { $set : {status: 1}};
      var collectionName = 'Users'; 
      Models.Find(collectionName,condition).then((result)=>{
         console.log("userlogin responce",result);
           var status = result.length > 0 ? result[0].role == 'admin' ? 1 : 2 : 0;
          resolve({status: status});
      }).catch((err)=>{
         reject(err)
      })
    });
  }
  this.getUserDetailByUsername = (postBody)=>{
    return new Promise((resolve,reject)=>{
        
      var condition = postBody;
      var collectionName = 'Users'; 
      Models.Find(collectionName,condition).then((result)=>{
         console.log("userDetails responce",result);
          resolve(result);
      }).catch((err)=>{
         reject(err)
      })
    });
  }
  this.getAllusers = ()=>{
    var condition = {};
    var collectionName = 'Users'; 
    return new Promise((resolve,reject)=>{ 
    Models.Find(collectionName,condition).then((result)=>{
       console.log("userDetails responce",result);
        resolve(result);
    }).catch((err)=>{
       reject(err)
    })
  });
 }
}

module.exports = new UserController();