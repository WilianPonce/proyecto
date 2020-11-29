const Mongo = require("../lib/mongodb");
var ObjectId = require('mongodb').ObjectID;

//product
const list_product = async (data) => {
  let db = await Mongo();
  let result = await db.collection("products").find().toArray();
  return result;
};
const create_product = async (data) => {
  let db = await Mongo();
  let result = await db.collection("products").insertOne(data);
  return result;
};
const edit_product = async (data) => {
  let db = await Mongo();
  let result = await db.collection("products").updateOne( 
    {"_id":ObjectId(data.id)},  
    {$set : data} 
  );
  console.log(result);
  return result;
};
const elim_product = async (data) => {
  let db = await Mongo();
  let result = await db.collection("products").deleteOne( {"_id":ObjectId(data)} );
  return result;
};

//user
const login = async (data) => {
  let db = await Mongo();
  let result = await db.collection("users").findOne({$and: [{email:data.email},{password:data.password}]});
  return result;
};
const register = async (data) => {
  let db = await Mongo();
  let result = await db.collection("users").insertOne(data);
  return result;
};


const update = async () => {};

const deleteDoc = async () => {};

const get = async () => {};

const getAll = async () => {};

module.exports = {
  create_product,
  edit_product,
  list_product,
  elim_product,
  login,
  register
}
