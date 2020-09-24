var mysql = require('mysql2/promise');
var { cnc } = require('../database/connection');
var config = require('../database/config');
var currency = require('./querys/accounting');

let configuration = {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true,
    timezone: "+06:00"
}

const accountingModelController = {

    list_currencies: data =>{
       return cnc(mysql, configuration, currency.getListCurrencies(data))
    },

   
}

module.exports = accountingModelController;