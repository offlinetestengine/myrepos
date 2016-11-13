var express = require('express');
var app = express();
var mongodb = require('mongodb');
var http = require("http");
var url = require("url");
var show = {};
//var port;

var MongoClient = mongodb.MongoClient;
var addr = 'mongodb://db1:root@ds011873.mlab.com:11873/offlinedb';

//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});

app.get('/', function (req, res) 
        {
   //  port=Number(process.env.PORT||1337)
  MongoClient.connect(addr, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', addr);
        var collection = db.collection('table1');
        collection.find().toArray(function (err, result) {
          if (err) {
                console.log(err);
            } 
          else if (result.length) {
                show = JSON.stringify(result); 
                res.send(show);
                console.log(" data sent "); 
            } 
          else {
                console.log('No document(s) found with defined "find" criteria!');
            }         
            db.close();
        });
    }
});
  

})


app.listen(Number(process.env.PORT||1337), function () {
    
    
  console.log('listening on port 1337!')

})

