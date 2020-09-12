let router = require('express').Router();
let userModelController = require('../management/users/users')
let adminModelController = require('../management/administration/administration')
let bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
let fs = require("fs");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const SECURITY_KEY = process.env.SECURITY_KEY;

router.post('/user/signin', (req, res) => {

    let data = {
        username: req.body.credentials.username,
        password: req.body.credentials.password
    }

    userModelController.user_signin(data)
    .then(user=>{

        if(user.rows[0]) {
            if (bcrypt.compareSync(data.password, user.rows[0].password)) {
                
                let token = jwt.sign({ data: `${user.rows[0].username}`}, SECURITY_KEY, { expiresIn: 1800 });
                let permissions = user.rows[0].permissions.split(',')
                let modules = user.rows[0].modules.split(',')
                user.rows[0].permissions = permissions;
                user.rows[0].modules =modules;

                res.status(200).json({ msg: 'Usuario encontrado', flag: true, user: user.rows[0], token });
            }
            else {
                res.status(200).json({ msg: 'La contraseña es incorrecta', flag: false });
            }
        } else {
            res.status(200).json({ msg: 'El usuario no esta registrado', flag: false });
        }
    })
    .catch(err=>{
        res.status(200).json({error: err})
    })

})


router.post('/user/upload_image', upload.single('image'), (req, res) => {
    var imageData = fs.readFileSync(req.file.path);
    
    //console.log('esta es la imagen que recibo', imageData);
    //console.log('id que recibo', req.body.idPerson)
    let data={
        idemployee: req.body.data.idemployee,
        photo: imageData
    }

    adminModelController.change_profile_picture(data).then(result=>{
        res.status(200).json({flag: true, msg: `The image has been successfully changed`})
    }).catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))

})

router.post('/user/download_image', (req, res) => {
   adminModelController.get_profile_picture().then(result=>{
    res.status(200).json({flag: true, msg: `The image has been successfully changed`})
    }).catch(error => res.status(200).json({flag: false, msg: `the query could not be processed`, error: error}))

})

router.post('/user/verify_permission', (req, res)=>{
    let user = req.body.data.user
    res.status(200).json({msg: 'permissions verified correctly', flag: true})
})

module.exports = router;

