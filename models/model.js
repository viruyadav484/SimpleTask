var db = require('./connection');
function Models (){
  this.registerUser=(collectionName,userDetail)=>{
      return new Promise((resolve,reject)=>{  
         db.collection(collectionName).find().sort({"_id": -1}).toArray((err,result)=>{
             if(err){
                 reject(err);
             }else{
                 var flag=1;
                 var _id;
                 if(result.length == 0){
                    _id = 1;
                 }else{
                     _id = result[0]._id+1;
                     for(let row of result){
                        if(row.userName == userDetail.userName)
                        flag=0
                     }
                 }
                 console.log("flag",flag);
                 if(flag == 1){
                    userDetail._id = _id;
                    console.log("result +++++++++++++++++",userDetail);
                       db.collection(collectionName).insertOne(userDetail,(err,result)=>{
                           console.log("result +++++++++++++++++",result);
                          err ? reject(err) :   resolve({"status":1});
                      })
                 }else{
                    console.log("result",result);
                    resolve({"status":0})
                 }
             }
         })
   
     })
   }

   this.Find = (collectionName,condition)=>{
      return new Promise((resolve,reject)=>{ 
        db.collection(collectionName).find(condition).toArray((err,responce)=>{
           err ? reject(err) : resolve(responce);
        })
      });
   }
}

module.exports = new Models();