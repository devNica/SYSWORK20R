let {cnc} = require('../database/connection');
let config = require('../database/config');
let query = require('../management/querys/users');
let mysql = require('mysql2/promise');

const userAccounts = (data)=>{
    this.profile = data.profile;
    this.modules = data.modules;
    this.permissions = data.permissions
}

userAccounts.findModuleByUserID = (req, res)=>{
    
    cnc(mysql, config.db, query.account.info({filter: `USR.iduser = 1`}))
    .then(result => { 
        let permissions = result.rows[0].permissions.split(',')
        let modules = result.rows[0].modules.split(',')
        let userAccountInfo = {
            permissions,
            modules,
            profile: [result.rows[0].profile]
        }
        res.status(200).json({msg: true, userAccountInfo})
    })
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}

module.exports = userAccounts;