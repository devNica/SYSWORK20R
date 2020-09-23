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