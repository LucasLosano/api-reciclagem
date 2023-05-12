var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var expressJwt = require('express-jwt');
var departamentos = require('./routes/departamentosController');
var pesagens = require ('./routes/pesagensController');
var recompensas = require('./routes/recompensasController');
var usuarios = require('./routes/usuariosController');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors({
    origin: '*'
}));
app.use('/api/v1', expressJwt({ secret: process.env.SECRET,  algorithms: ['HS256']}).unless({ path: ['/api/v1/usuarios/registrar','/api/v1/usuarios/autenticar'] }));

app.use('/api/v1/departamentos', departamentos);
app.use('/api/v1/pesagens', pesagens);
app.use('/api/v1/recompensas', recompensas);
app.use('/api/v1/usuarios', usuarios);

module.exports = app;
