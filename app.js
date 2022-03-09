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
// Image Api
app.use("/uploads/image", express.static("./uploads/image"));
app.post('/images', imageApi.uploadImg, imageApi.newImage)
app.get('/download/:name', imageApi.downloadFiles)
// Add comment Api
app.post('/comments/:productId', async function (req, res) {
  let response = await productApi.comment(req.body, req.params.productId)
  res.json(response)
})
// Products Api
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
// Register and Login Api
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
// Cart api
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

// Instamojo Payment gateway Api
app.post('/pay', async function (req, res) {
  let response = await orderApi.pay(req.body)
  res.json(response)
})
app.get('/pay/:id', async function (req, res) {
  let response = await orderApi.get(req.params.id)
  res.json(response)
})
// Filter Api
app.get('/filterProduct/:min/:max', async function (req, res) {
  let mini = req.params.min;
  let maxi = req.params.max;
  let response = await productApi.filter(mini, maxi)
  res.json(response)
})

app.listen(9090, function () {
  console.log('server started on port 9090...')
});
