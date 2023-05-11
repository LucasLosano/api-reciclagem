const request = require("supertest");
const app = require('../app');
const usuario = require('../entities/usuarioModel')
const mongo = require('mongodb').MongoClient;
var connection = process.env.AZURE_MONGODB;
var database = process.env.AZURE_DATABASE;

beforeEach(async () => {    
    await mongo.connect(connection, { useUnifiedTopology: true })
        .then(conn => global.conn = conn.db(database))
        .catch(err => console.log(err));
});

describe("POST /api/v1/usuarios/registrar", () => {
    it("Deve autenticar um usuário com sucesso", async () => {
        let requestBody = new usuario({username: 'usuarioTeste', password: 'teste1'})
        const res = await request(app).post("/api/v1/usuarios/autenticar").send(requestBody);

        expect(res.statusCode).toBe(200);
        expect(res.body.sucesso).toBe(true);
    })
});