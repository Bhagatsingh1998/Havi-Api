const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors');

const apiRoutes = require('./routes/api');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

const MONGODB_URI = `mongodb+srv://owner:owner@nodeapp-oke9f.mongodb.net/HaviAPI`;
const PORT = process.env.Port || 5000;

app.use('/user',apiRoutes);

app.use((req, res, next) => { 
  const error = new Error("Technical Error. Try after some time");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  let statusCode = error.status || 500;
  res.status(error.status || 500);
  res.json({
    statusCode: statusCode,
    status: 'Error', 
    message: error.message,
    userDetails: null,
    request: {
      url: req.url,
      verb: req.method
    }
  });
}); 

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(connection => {
  app.listen(PORT)
})
.then(listening => {
  console.log('Server connected at PORT AT 5000');
})
.catch(err => {
  console.log(err);
});     