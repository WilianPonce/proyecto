const MongoClient = require("mongodb").MongoClient;

const URL = "mongodb://localhost:27017";
const dbName = "ecommerce";


/**
 * El problema era asincrónico, el callback que se le pasa a MongoClient.connect()
 * no se resolvía al tiempo correcto en cuanto a asincronismo, por eso en esta función tuve que implementar
 * el tradicional new Promise.
 * 
 * En el archivo crudMongo las funciones asincronas funcionan correctamente sin new Promise, 
 * el problema se presenta solo aquí
 * 
 */
const Mongo = async () =>
  new Promise((resolve, reject) => {
    MongoClient.connect(URL, {
      useNewUrlParser:true,
      useUnifiedTopology: true
    }, (error, client) => {
      if (error) reject(error);
      else resolve(client.db(dbName));
    });
  });

module.exports = Mongo;
