const request = require("supertest");
const app = require('../app');
const usuario = require('../entities/usuarioModel')
const mongo = require('mongodb').MongoClient;
var connection = process.env.AZURE_MONGODB;
var database = process.env.AZURE_DATABASE;
var token;

beforeEach(async () => {
    let requestBody = new usuario({username: 'usuarioTeste', password: 'teste1'})
    await mongo.connect(connection, { useUnifiedTopology: true })
        .then(conn => global.conn = conn.db(database))
        .catch(err => console.log(err));

    this.token = (await request(app).post("/api/v1/usuarios/autenticar").send(requestBody)).body.retorno.token;
});

describe("GET /api/v1/departamentos", () => {
    it("Deve retornar não autorizado", async () => {
        const res = await request(app).get("/api/v1/departamentos");

        expect(res.statusCode).toBe(401);
    })
});

describe("GET /api/v1/departamentos", () => {
    it("Deve retornar os departamentos", async () => {
        const res = await request(app).get("/api/v1/departamentos").set('Authorization', 'Bearer ' + this.token);

        expect(res.statusCode).toBe(200);
        expect(res.body.sucesso).toBe(true);
    })
});