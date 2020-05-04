const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/route');

const app = express();

dotenv.config();

const port = process.env.PORT;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

mongoose
  .connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  )
  .then(result => {
    app.listen(port);
    console.log('Your first node api is running on port: ' + port);
  })
  .catch(err => console.log(err));
  

module.exports = app;
