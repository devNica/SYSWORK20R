var mysql = require('mysql2/promise');
var { cnc } = require('../../database/connection');
var config = require('../../database/config');
var {user} = require('../querys/users');

let configuration = {
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true,
    timezone: "+06:00"
}

const userModelController = {

    user_signin: (data)=>{
       return cnc(mysql, configuration, user.signin(data))
    },
   
}

module.exports = userModelController;