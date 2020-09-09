let router = require('express').Router();
let accounting = require('../management/accounting/accounting');

router.post('/accounting/list_currencies', (req, res)=>{
    let filter = req.body.data
    accounting.list_currencies(filter).then(result=>{
        res.status(200).json({flag: true, currencies: result.rows})
    }).catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))
})

module.exports = router;