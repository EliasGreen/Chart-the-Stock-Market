// init project
const express = require('express');
const app = express();
// socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);
// yahoo API
const {lookup, history} = require('yahoo-stocks');
const yahooFinance = require('yahoo-finance'); 
// dotenv
require('dotenv').config();
// body-parser
const bodyParser = require('body-parser');
//require/import the mongodb native drivers
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
// using Node.js `require()`
const mongoose = require('mongoose');
// connection URL
const url = process.env.MONGOLAB_URI;      
// connection
const promise_connection = mongoose.connect(url);
let db = mongoose.connection;
// if connection is success
promise_connection.then(function(db){
	console.log('Connected to mongodb');
});
/***********************************/
// set USEs
/***********************************/
app.use( bodyParser.json() );   
app.use(bodyParser.urlencoded({ 
  extended: true
}));
/***/
app.use(express.static('public'));
/***********************************/
// server
server.listen(process.env.PORT);

// listener on CONNECTION
io.on('connection', function (socket) {
  socket.on('add', function (stock) {
        socket.broadcast.emit('add_user', stock);
  });
  socket.on('delete', function (stock) {
        socket.broadcast.emit('delete_user', stock);
  });
});
/******************************/
// mongoDB models and schemas
/******************************/
// if connection is success
promise_connection.then(function(db){
	console.log('Connected to mongodb');
});
// describe the schema
let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
let stockSchema = new Schema({
    stock: String
});
// get the model
let stockModel = mongoose.model('stocks', stockSchema);

/***********************************/

// getting the layout(page) of application
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});

/******************************/
//       POST methods
/******************************/
app.post("/add-stock", function(request, response) {
  let isFound = false;
    lookup(request.body["stock"]).then((res) => {
        isFound = true;
      /******************/
      // add stock into DB
      /******************/
          // check if stock already exists
          stockModel.findOne({stock: request.body["stock"]}, (err, doc) => {
              if(doc === null) {
                 let obj = {stock: res.symbol};
                  let stock = new stockModel(obj);
                  stock.save(function (err) {
                    if (!err) {
                      response.json(res);;
                    }
                    else {
                      response.json({error: "not found"});
                    }
                  });
              }
              else {
                response.json({error: "not found"});
              }
          });
      /******************/
    });
  setTimeout(() => {if(!isFound) response.json({error: "not found"})}, 1000);
});
/***********************************/
app.post("/delete-stock", function(request, response) {
    stockModel.remove({stock: request.body["stock"]}, (err) => {if(!err) response.json({error: "zero"})});
});
/***********************************/
app.post("/get-stocks-db", function(request, response) {
  stockModel.find(function (err, documents) {
                  if (!err) response.json(documents);
                });
});
/***********************************/
app.post("/get-stock", function(request, response) {
            yahooFinance.historical({
                            symbol: request.body["stock"],
                            from: '2012-01-01',
                            to: '2018-01-01',
                          }, function (err, quotes) {
                                      response.json(quotes);
                          });
});
/***********************************/
