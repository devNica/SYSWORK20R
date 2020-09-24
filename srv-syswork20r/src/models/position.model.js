let {cnc} = require('../database/connection');
let config = require('../database/config');
let query = require('../management/querys/administration');
let mysql = require('mysql2/promise');

const Position = (data)=>{
    this.idposition = data.idposition;
    this.position = data.position;
    this.is_active = data.is_active;
}

Position.findAll = (req, res)=>{
    let filter = req.body.data
    cnc(mysql, config.db, query.position.jobs_list(filter))
    .then(result => { res.status(200).json({msg: true, positions: result.rows})})
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}

module.exports = Position;