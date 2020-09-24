let router = require('express').Router();
let administration = require('../management/administration');
const employee = require('../models/employee.model');
const person = require('../models/person.model');
const position = require('../models/position.model');
const location = require('../models/location.model');
const degree = require('../models/degree.model');


router.get('/administration/view/degrees', degree.findAll);

router.post('/administration/create/person', person.create);

router.post('/administration/view/persons', person.findAll);

router.post('/administration/search/person', person.findById);

router.post('/administration/update/person', person.update);

router.post('/administration/view/positions', position.findAll);

router.post('/administration/view/locations', location.findAll);

router.get('/administration/fetch/employee-number', employee.fetchEmployeeNumber);

router.post('/administration/create/employee', employee.create);

router.post('/administration/view/employees', employee.findAll);

router.post('/administration/search/employee', employee.findById);

module.exports = router;