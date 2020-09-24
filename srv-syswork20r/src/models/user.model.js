let {cnc} = require('../database/connection');
let config = require('../database/config');
let query = require('../management/querys/users');
let mysql = require('mysql2/promise');

let bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const SECURITY_KEY = process.env.SECURITY_KEY;

var knex = require('knex')({
    client: 'mysql',
    version: '7.4.8',
    connection: {
      host : config.db.host,
      user : config.db.user,
      password : config.db.password,
      database : config.db.database
    }
});

const User = (data)=>{
    this.iduser = data.iduser;
    this.username = data.username;
    this.password = data.password;
    this.token = data.token;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.is_active = data.is_active;
    this.fk_employee = data.fk_employee;
}

User.findOne = (req, res)=>{
    let data = {
        username: req.body.credentials.username,
        password: req.body.credentials.password
    }
    cnc(mysql, config.db, query.user.signin(data))
    .then(user=>{

        if(user.rows[0]) {
            if (bcrypt.compareSync(data.password, user.rows[0].password)) {
                
                req.session.isLogged = true
                req.session.username = user.rows[0].username

                console.log(req.session)

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
}


User.uplodadImage = async (req, res)=>{
    const {name, data} = req.files.img;
    await knex('employee').update({photo: data}).where({idemployee: req.body.fk_employee});
    res.status(200).json({flag: true, msg: 'The image has been successfully changed'});
}

module.exports = User;