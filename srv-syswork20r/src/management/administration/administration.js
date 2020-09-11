var mysql = require('mysql2/promise');
var { cnc } = require('../../database/connection');
var config = require('../../database/config');
var {degrees, person, employee, position, location} = require('../querys/administration');

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

    list_persons_records: (filter) => {
        return cnc(mysql, configuration, person.view_persons_records(filter))
    },

    get_person_by_idperson: idperson =>{
        return cnc(mysql, configuration, person.get_person(idperson))
    },

    create_person_record: (data)=>{
        return cnc(mysql, configuration, person.create_person_record(data))
    },

    edit_person_record: (data)=>{
        return cnc(mysql, configuration, person.edit_person_record(data))
    },

    get_jobs_list: data => {
        return cnc(mysql, configuration, position.jobs_list(data))
    },

    get_list_locations: data =>{
        return cnc(mysql, configuration, location.locations_list(data))
    },

    suggest_employee_number: ()=>{
        return cnc(mysql, configuration, employee.sf_suggest_employee_number)
    },
   
}

module.exports = administrationModelController;