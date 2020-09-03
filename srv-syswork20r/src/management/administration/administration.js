var mysql = require('mysql2/promise');
var { cnc } = require('../../database/connection');
var config = require('../../database/config');
var {degrees, person} = require('../querys/administration');

let configuration = {
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true,
    timezone: "+06:00"
}

const administrationModelController = {

    list_degrees: ()=>{
       return cnc(mysql, configuration, degrees.list_degrees)
    },

    list_persons_records: () => {
        return cnc(mysql, configuration, person.view_persons_records)
    },

    get_person_by_idperson: idperson =>{
        return cnc(mysql, configuration, person.get_person(idperson))
    },

    create_person_record: (data)=>{
        return cnc(mysql, configuration, person.create_person_record(data))
    }
   
}

module.exports = administrationModelController;