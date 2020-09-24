let router = require('express').Router();
let user = require('../models/user.model');
let employee = require('../models/employee.model');

router.post('/user/signin', user.findOne)

router.post('/user/upload/image', user.uplodadImage)

router.post('/user/download/image', employee.downloadImage)

module.exports = router;

