let router = require('express').Router();
const userAccount = require('../models/userAccounts.model')

router.post('/useraccounts/fetch/account-info', userAccount.findModuleByUserID)

module.exports = router;