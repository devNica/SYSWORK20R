let {cnc} = require('../database/connection');
let config = require('../database/config');
let query = require('../management/querys/employees');
let mysql = require('mysql2/promise');

const Employee = (data)=>{
    this.idemployee = data.idemployee;
    this.emp_number = data.emp_number;
    this.salary = data.salary;
    this.fk_currency = data.fk_currency;
    this.fk_person = data.fk_person;
    this.fk_position = data.fk_position;
    this.fk_location = data.fk_location;
    this.is_active = data.is_active;
    this.is_user = data.is_user;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.photo = data.photo;
}

let configuration = {
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true,
    timezone: "+06:00"
}

Employee.create = (req, res)=>{
    
    let data = {
        emp_number: req.body.emp_number,
        salary: req.body.salary,
        currency: req.body.currency,
        fk_person: req.body.fk_person,
        fk_position: req.body.fk_position,
        fk_location: req.body.fk_location,
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }

    cnc(mysql, configuration, query.create_employee_record(data))
    .then(result => {
        res.status(200).json({flag: true, msg: 'The record was created successfully'})
    })
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}

Employee.findAll = (req, res)=>{
    cnc(mysql, configuration, query.list_employees_records({filter: 1}))
    .then(result=>{
        res.status(200).json({flag: true, employees: result.rows})
    })
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}

Employee.findById = (req, res) =>{
    cnc(mysql, configuration, query.list_employees_records(req.body.data))
    .then(result=>{
        res.status(200).json({flag: true, employee: result.rows})
    })
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}

Employee.fetchEmployeeNumber = (req, res)=>{
    cnc(mysql, configuration, query.sf_suggest_employee_number)
    .then(result=>{
        res.status(200).json({flag: true, data: result.rows[0]})
    })
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}


module.exports = Employee;