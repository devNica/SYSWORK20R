let {cnc} = require('../database/connection');
let config = require('../database/config');
let query = require('../management/querys/persons');
let mysql = require('mysql2/promise');

const Person = (data)=>{
    this.idperson = data.idperson;
    this.dni = data.dni;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.address = data.address;
    this.phone = data.phone;
    this.fk_degree = data.fk_degree;
    this.is_customer = data.is_customer;
    this.is_staff = data.is_staff;
    this.is_active = data.is_active;
}

Person.create = (req, res)=>{

    cnc(mysql, config.db, query.create_person_record(req.body.data))
    .then(result => res.status(201).json({flag: true, msg: `The record was created successfully`}))
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}

Person.findAll = (req, res)=>{
    cnc(mysql, config.db, query.view_persons_records({filter: 1}))
    .then(result=>{ res.status(200).json({flag: true, persons: result.rows}) })
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}

Person.findById = (req, res)=>{
    let idPerson = req.body.data.id
    cnc(mysql, config.db, query.get_person(idPerson))
    .then(result=>{ res.status(200).json({flag: true, person: result.rows}) })
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}

Person.update = (req, res)=>{
    cnc(mysql, config.db, query.edit_person_record(req.body.data))
    .then(result => res.status(201).json({flag: true, msg: `The record was created successfully`}))
    .catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
}

module.exports = Person;