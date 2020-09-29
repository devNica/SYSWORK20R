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

    cnc(mysql, config.db, query.create_employee_record(data))
    .then(result => {
        res.status(200).json({flag: true, msg: 'The record was created successfully'})
    })
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}

Employee.findAll = (req, res)=>{
    cnc(mysql, config.db, query.list_employees_records({filter: 1}))
    .then(result=>{
        res.status(200).json({flag: true, employees: result.rows})
    })
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}

Employee.findById = (req, res) =>{
    cnc(mysql, config.db, query.list_employees_records(req.body.data))
    .then(result=>{
        res.status(200).json({flag: true, employee: result.rows})
    })
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}

Employee.fetchEmployeeNumber = (req, res)=>{
    cnc(mysql, config.db, query.sf_suggest_employee_number)
    .then(result=>{
        res.status(200).json({flag: true, data: result.rows[0]})
    })
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}

Employee.downloadImage = (req, res)=>{
    let data={filter: req.body.idemployee}
    cnc(mysql, config.db, query.download_image(data))
    .then(result=>{ res.status(200).json({flag: true, photo: result.rows[0].photo}) })
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}

Employee.update = (req, res) =>{
    let data = {
        idemployee: req.body.idemployee,
        salary: req.body.salary,
        fk_currency: req.body.fk_currency,
        fk_position: req.body.fk_position,
        fk_location: req.body.fk_location,
        is_active: req.body.is_active,
        is_user: req.body.is_user,
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }

    console.log(data)

    cnc(mysql, config.db, query.update(data))
    .then(result => {res.status(201).json({flag: true, msg: `The recorda has been updated`})})
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}


module.exports = Employee;