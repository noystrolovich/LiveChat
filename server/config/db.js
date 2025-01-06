const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect('mongodb://localhost:27017/accountDB')
    .then(() => console.log('Connected to accountDB'))
    .catch((error) => console.log(error));
};

module.exports = connectDB;