let router = require('express').Router();
let administration = require('../management/administration/administration');


router.get('/administration/list_degrees', (req, res)=>{
    administration.list_degrees().then(result=>{
        res.status(200).json({flag: true, degrees: result.rows})
    }).catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
})

router.post('/administration/create_person_record', (req, res)=>{

    administration.create_person_record(req.body.data).then(result=>{
        res.status(201).json({flag: true, msg: `The record was created successfully`})
    }).catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
})

router.post('/administration/view_persons_records', (req, res)=>{
    let filter = req.body.data
    administration.list_persons_records(filter).then(result=>{
        res.status(200).json({flag: true, persons: result.rows})
    }).catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
})

router.post('/administration/get_person', (req, res)=>{
    console.log('estoy solicitabdo esta ruta')
    let idperson = req.body.data.id
    administration.get_person_by_idperson(idperson).then(result=>{
        res.status(200).json({flag: true, person: result.rows})
    }).catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
})

router.post('/administration/edit_person_record', (req, res)=>{
    let data=req.body.data;
    administration.edit_person_record(data).then(result=>{
        res.status(200).json({flag: true, msg: 'The record was edited successfully'})
    }).catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))

})

router.post('/administration/jobs_list', (req, res)=>{
    let filter = req.body.data;
    administration.get_jobs_list(filter).then(result=>{
        res.status(200).json({flag: true, positions: result.rows})
    }).catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
})

router.post('/administration/locations_list', (req, res)=>{
    let filter = req.body.data;
    administration.get_list_locations(filter).then(result=>{
        res.status(200).json({flag: true, locations: result.rows})
    }).catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
})


router.get('/administration/get_employee_number', (req, res)=>{
    administration.suggest_employee_number().then(result=>{
        res.status(200).json({flag: true, data: result.rows[0]})
    }).catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
})

router.post('/administration/create_employee_record', (req, res)=>{
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

    administration.create_employee_record(data).then(result=>{
        res.status(200).json({flag: true, msg: 'The record was created successfully'})
    }).catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
  
})

module.exports = router;