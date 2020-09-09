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

module.exports = router;