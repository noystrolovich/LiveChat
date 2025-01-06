const express = require('express');
const accountsServices = require('../services/accountsServices');

const router = express.Router();

router.get('/',async (req,res)=>{
    const accounts = await accountsServices.getAllAccounts()
    res.json(accounts);
});


router.get('/:id',async (req,res)=>{
    const {id} = req.params
    const account = await accountsServices.getAccountById(id);
    res.json(account);
});

router.post('/',async (req,res)=>{
    const obj = req.body
    console.log(`In Controller" ${obj}`);
    console.log(req);
    
    const result = await accountsServices.newAccount(obj);
    res.json(result);
});

router.post('/checkUsername',async (req,res)=>{
    const obj = req.body
    console.log(obj);
    const userValidation = await accountsServices.checkUsername(obj)
    res.json(userValidation);
});

router.post('/login',async (req,res)=>{
    const obj = req.body
    console.log(obj);
    const userValidation = await accountsServices.getUserValidation(obj)
    res.json(userValidation);
});

router.put('/:id',async (req,res)=>{
    const obj = req.body
    const {id} = req.params
    const result = await accountsServices.updateAccount(id,obj);
    res.json(result);
});

router.delete('/:id',async (req,res)=>{
    const {id} = req.params
    const result = await accountsServices.deleteAccount(id);
    res.json(result);
});

module.exports = router;