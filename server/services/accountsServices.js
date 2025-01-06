const accountsRepository = require('../repositories/accountsRepository');

const getAllAccounts = async () => {
    return await accountsRepository.getAllAccounts();
}

const getAccountById = async (id) => {
    return await accountsRepository.getAccountById(id);

}

const checkUsername  = async (obj) => {
    const user = await accountsRepository.getAccountByUsername(obj.username);
    if(user == null){
        return 'notExists'
    } else {
        return 'Exists'
    }
}

const getUserValidation = async (obj) => {
    const user = await accountsRepository.getAccountByUsername(obj.username);
    if(user == null){
        return 'notExists'
    }
    if (user.password == obj.password) {
        console.log('valid');
        return 'valid'
    } else {
      console.log('notValid');
      return 'notValid'
    } 
}

const newAccount = async (obj) => {
    const result = await checkUsername(obj)
    if(result == "Exists"){
        return("User Already Exists")
    }else{
        return await accountsRepository.newAccount(obj);
    }
}

const updateAccount = async (id,obj) => {
    return await accountsRepository.updateAccount(id,obj);

}

const deleteAccount = async (id) => {
    return await accountsRepository.deleteAccount(id);

}

module.exports = {
    getAllAccounts,
    getAccountById,
    getUserValidation,
    newAccount,
    checkUsername,
    updateAccount,
    deleteAccount
}