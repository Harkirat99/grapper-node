const express = require('express');
var fs = require('fs');
const cors = require('cors');
const data = require('data');
require('dotenv/config');
const morgan = require("morgan");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/grapper');
let db = mongoose.connection;
const multer = require("multer");
const upload = multer();

const { Router } = require('express');
const path = require("path");
global.__basedir = __dirname;
db.once('open', function () {
  console.log('connected to database');
})
db.on('error', function (err) {
  console.log(err);
})
const app = express();
bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
let userApi = require('./api/user');
let productApi = require('./api/product');
let imageApi = require('./api/image');
let cartApi = require('./api/cart');
let orderApi = require('./api/order');

//const product = require('./model/product');
app.use("/uploads/image", express.static("./uploads/image"));

//  app.post('/products', productApi.uploadImg, productApi.newProduct)

//app.post('/products', productApi.uploadImg, productApi.newProduct)
app.post('/images', imageApi.uploadImg, imageApi.newImage)
//app.get('/products', productApi.products);

//app.get('/products/:id', productApi.product)

app.get('/download/:name', imageApi.downloadFiles)

app.post('/comments/:productId', async function(req, res) {
  let response = await productApi.comment(req.body,req.params.productId)
  res.json(response)
})
app.post('/products', async function (req, res) {
  try {
    // JSON.parse(req.body)
    let response = await productApi.create(req.body)
    res.json(response)
  }
  catch (err) {
    res.json(err.message)
  }

})

app.get('/products', async function (req, res) {
  try {
    let response = await productApi.search(req.query)
    res.json(response)
  } catch (err) {
    res.json(err.message)
  }
})
app.get('/qury', async function (req, res) {
  try {
    let query = inflate(req.query)
    let response = await productApi.search(query)
    res.json(response)
  } catch (err) {
    res.json(err.message)
  }
})
app.get('/products/:id', async function (req, res) {
  try {
    let response = await productApi.get(req.params.id)
    res.json(response)
  } catch (err) {
    res.json(err.message)
  }
})

app.delete('/products/:id', async function (req, res) {
  try {
    let response = await productApi.delete(req.params.id)
    res.json(response)
  } catch (err) {
    res.json(err.message)
  }
})

// at Object.exports.quantity (c:\\projects\\grapper-node\\api\\cart.js:153:43)\n    at processTicksAndRejections (internal/process/task_queues.js:93:5)\n    at async c:\\projects\\grapper-node\\app.js:149:18'
// __proto__:Error

app.post('/register', async function (req, res) {
  let response = await userApi.create(req.body)
  res.json(response)
})

app.post('/login', async function (req, res) {
  try {
    let response = await userApi.login(req.body)
    res.json(response)
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }

})

app.post('/carts/:userId', async function (req, res) {
  let userId = req.params.userId
  let productId = req.body.productId;
  const quantity = Number.parseInt(req.body.quantity);
  let response = await cartApi.addItemToCart(userId, productId, quantity);
  res.json(response);
});

app.get('/carts/:userId', async function (req, res) {
  let userId = req.params.userId;
  let response = await cartApi.getCart(userId);
  // let response = await cartApi.getCart();
  res.json(response)
});

app.delete('/carts/:productId/:userId', async function (req, res) {
  // let id = req.params.id;
  let productId = req.params.productId;
  let userId = req.params.userId;

  let response = await cartApi.removeItem(productId, userId)
  res.json(response)
})

// app.delete('/carts', cartApi.emptyCart);

// app.delete('/carts/:userId',async function(req, res){

//   let response = await cartApi.emptyCart();
//   res.json(response)
// })

app.delete('/increase/:id', async function (req, res) {
  let id = req.params.id
  let size = 1;
  let response = await productApi.increaseSize(id, size)
  res.json(response);
})
app.delete('/decrease/:id', async function (req, res) {
  let id = req.params.id
  let size = 1;
  let response = await productApi.decreaseSize(id, size)
  res.json(response);
})

app.delete('/quantity/:productId/:userId', async function (req, res) {
  let productId = req.params.productId
  let quantity = 1;
  let userId = req.params.userId
  let response = await cartApi.quantity(productId, quantity, userId)
  res.json(response)
});

app.get('/decrease', async function (req, res) {
  let query = req.query
  let respo = await productApi.prod(query);
  res.json(respo)
})
app.get('/increase', async function (req, res) {
  let query = req.query
  let respo = await productApi.cate(query);
  res.json(respo)
})
app.get('/brands', async function (req, res) {
  let query = req.query
  let respo = await productApi.brand(query);
  res.json(respo)
})
app.post('/get', async function (req, res) {
  let response = await userApi.get(req.body)
  res.json(response)
})

app.post('/pay', async function (req, res) {
    let response = await orderApi.pay(req.body)
    res.json(response)
    // console.log(response)
})
app.get('/pay/:id', async function (req, res) {
  let response = await orderApi.get(req.params.id)
  res.json(response)
})

app.get('/filterProduct/:min/:max', async function(req,res){
  let mini = req.params.min;
  let maxi = req.params.max;
  let response = await productApi.filter(mini, maxi)
  res.json(response)
})
// // Testing payment gateway
// const Insta = require('instamojo-payment-nodejs');
// const API_KEY = "test_d5f178f6f910a5ec48a429d540d";

// const AUTH_KEY = "test_f3f32cda3a7aafc2a188579530f";

// Insta.setKeys(API_KEY, AUTH_KEY);

// Insta.isSandboxMode(true);


// // var data = new Insta.PaymentData();
// var data = new Insta.PaymentData();

// const REDIRECT_URL = "http://localhost:3000/success";

// data.setRedirectUrl(REDIRECT_URL);
// data.send_email = "True";
// data.purpose = "Test"; // REQUIRED


// app.post('/order', (req, res) => {
//   var name = 'harkirat';
//   var email = 'virkharkiratsingh99@gmail.com';
//   var amount = 12;

//   data.amount = amount;
//   data.name = name;
//   data.email = email; // REQUIRED

//   Insta.createPayment(data, function (error, response) {
//     if (error) {
//       console.log('error came')
//     } else {
//       // Payment redirection link at response.payment_request.longurl
//       res.send("Please check your email to make payment")
//     }
//   });
// });

// let orderApi = require('./api/order');
// app.post('/pay',async function(){

// })

// var Insta = require('instamojo');
// var API_KEY = 'test_d5f178f6f910a5ec48a429d540d';
// var AUTH_KEY = 'test_f3f32cda3a7aafc2a188579530f';
// Insta.setKeys(API_KEY, AUTH_KEY);

// isSandboxMode(true);
// var data = Insta.paymentData();

// data.purpose = req.body.purpose;
// data.amount =  req.body.amount;

// Insta.createPayment(data,function(error, response){
//   if(error){
//     console.log(error);
//   }
//   else{
//     console.log('response');
//   }
// })



app.listen(9090, function () {
  console.log('server started on port 9090...')
});
