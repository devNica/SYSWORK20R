var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");

var app = express();
var port = process.env.PORT || 4800;

//MIDDLEWARES
app.use(bodyparser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


//ENRUTADORES
let userRouter = require('./routes/users');
let administrationRouter = require('./routes/administration');

//ENDPOINTS
app.use('/api', userRouter);
app.use('/api', administrationRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));





