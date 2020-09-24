let {cnc} = require('../database/connection');
let config = require('../database/config');
let query = require('../management/querys/administration');
let mysql = require('mysql2/promise');

const Location = (data)=>{
    this.idlocation = data.idlocation;
    this.location = data.location;
    this.depends_on = data.depends_on;
    this.is_active = data.is_active;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
}   

Location.findAll = (req, res)=>{
    let filter = req.body.data
    cnc(mysql, config.db, query.location.locations_list(filter))
    .then(result => { res.status(200).json({msg: true, locations: result.rows})})
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}

module.exports = Location;