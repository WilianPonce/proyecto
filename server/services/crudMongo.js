const Mongo = require("../lib/mongodb");
var ObjectId = require('mongodb').ObjectID;

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
const elim_product = async (data) => {
  let db = await Mongo();
  let result = await db.collection("products").deleteOne( {"_id":ObjectId(data)} );
  return result;
};

const update = async () => {};

const deleteDoc = async () => {};

const get = async () => {};

const getAll = async () => {};

module.exports = {
  create_product,
  list_product,
  elim_product
}
