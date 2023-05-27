var connection = process.env.AZURE_MONGODB;
var database = process.env.AZURE_DATABASE;
const mongo = require('mongodb').MongoClient;

async function setConnection(){
    await mongo.connect(connection, { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db(database))
    .catch(err => console.log(err));
}
service = setConnection;
module.exports = service;