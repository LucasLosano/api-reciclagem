var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var departamentos = require('./routes/departamentos');
var pesagens = require ('./routes/pesagens');
var recompensas = require('./routes/recompensas');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/departamentos', departamentos);
app.use('/api/v1/pesagens', pesagens);
app.use('/api/v1/recompensas', recompensas);
console.log(process.env.AZURE_MONGODB)
console.log(process.env.AZURE_DATABASE)

module.exports = app;
