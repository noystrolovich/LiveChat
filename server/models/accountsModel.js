const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name : String,
    lastName : String,
    username : String,
    password : String,
    email : String
},{versionKey: false});

const account = mongoose.model("account",accountSchema,"accounts");

module.exports = account;