//Expres MongoDb Connectivity
var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/UserManagement";

mongoose.connect(url);
var db = mongoose.connection;
console.log("Mongodb database connected.....");

module.exports = db;