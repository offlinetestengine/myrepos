//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var http = require("http");
var url = require("url");
var show = {};
var port;
var MongoClient = mongodb.MongoClient;
var addr = 'mongodb://db1:root@ds011873.mlab.com:11873/offlinedb';
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
   // port=Number(process.env.PORT||5000)
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(show);
        res.end(" ");
    }).listen(2332);
