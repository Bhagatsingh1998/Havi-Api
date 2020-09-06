const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const apiRoutes = require('./routes/api');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const MONGODB_URI = `mongodb+srv://owner:owner@nodeapp-oke9f.mongodb.net/HaviAPI`;
const PORT = process.env.Port || 5000;

app.use('/users',apiRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
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