let {cnc} = require('../database/connection');
let config = require('../database/config');
let query = require('../management/querys/administration');
let mysql = require('mysql2/promise');

const Degree = (data)=>{
    this.iddegree = data.iddegree;
    this.degree = data.degree;
}

Degree.findAll = (req, res)=>{
    cnc(mysql, config.db, query.degrees.list_degrees)
    .then(result => { res.status(200).json({msg: true, degrees: result.rows})})
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}

module.exports = Degree;