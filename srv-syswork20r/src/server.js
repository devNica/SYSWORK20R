let express = require("express");
let bodyparser = require("body-parser");
let cors = require("cors");
let fileupload = require('express-fileupload');
let config = require('./database/config');
let session = require('express-session');
let MysqlStore = require('express-mysql-session')(session)


let app = express();
let port = process.env.PORT || 4800;
let conn = {
    host : config.db.host,
    port: 3306,
    user : config.db.user,
    password : config.db.password,
    database : config.db.database,
    
}

let sessionStore = new MysqlStore(conn)

//MIDDLEWARES
app.use(fileupload());
app.use(bodyparser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(session({
	key: '5y5w0Rk20r',
	secret: 'ssk-27022017868451',
	store: sessionStore,
	resave: false,
	saveUninitialized: true
}));

//ENRUTADORES
let userRouter = require('./routes/users.routes');
let administrationRouter = require('./routes/administration.routes');
let accountingRouter = require('./routes/accounting.routes');
let useraccountsRouter = require('./routes/accounts.routes');

//ENDPOINTS
app.use('/api', userRouter);
app.use('/api', administrationRouter);
app.use('/api', accountingRouter);
app.use('/api', useraccountsRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
