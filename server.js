//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var express = require('express');
var http = require("http");
var url = require("url");
var show = {};
var MongoClient = mongodb.MongoClient;
var addr = 'mongodb://db1:root@ds011873.mlab.com:11873/offlinedb';

var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

MongoClient.connect(addr, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
       // console.log('Connection established to', addr);
        console.log("good to go");
        var collection = db.collection('table1');
        collection.find().toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else if (result.length) {
                show = JSON.stringify(result);   
            } else {
                console.log('No document(s) found with defined "find" criteria!');
            }         
            db.close();
        });
    }
});
http.createServer(function (req, res)
    {
//  var  port=Number(process.env.PORT||2332)
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(show);
        res.end(" ");
    }).listen(process.env.PORT || 5000);
console.log("5000");
