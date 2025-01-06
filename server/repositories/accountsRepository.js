const account = require('../models/accountsModel');
const mongoose = require('mongoose');

const getAllAccounts = () => {
    return account.find();
}

const getAccountById = (id) => {
    try {
        const objectId = mongoose.Types.ObjectId(id);
        return account.findById(objectId);
    } catch (error) {
        console.log("Error converting to ObjectId");
    }
};

const getAccountByUsername = (username) => {
    return account.findOne({ username: username });
};

const newAccount = (obj) => {
    const newAccount = new account(obj);
    console.log(newAccount);    
    return newAccount.save();
}

const updateAccount = (id,obj) => {
    return account.findByIdAndUpdate(id,obj);
}

const deleteAccount = (id) => {
    return account.findByIdAndDelete(id);
}

module.exports = {
    getAllAccounts,
    getAccountById,
    getAccountByUsername,
    newAccount,
    updateAccount,
    deleteAccount
}