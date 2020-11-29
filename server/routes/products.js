const router = require("express").Router();

const MongoService = require("../services/crudMongo");
const path = require('path');

const response = require("../utils/response");

router
  .get("/list", async (req, res) => {
    let result = await MongoService.list_product();
    response(res, 200, result, "Lista Productos");
  })
  .post("/upload", async (req, res) => {
    let data = req.body;
    let file = req.files.imagenProducto
    data.imagenProducto = file.name;
    let result = await MongoService.create_product(data);
    let ub = path.join(__dirname, '../upload')+"\\";
    file.mv(ub+file.name,(error) => {
        console.log(error);
      }
    );
    response(res, 200, result, "Producto Creado");
  })
  .post("/edit", async (req, res) => {
    let data = req.body;
    let file = null;
    if(req.files){
      file = req.files.imagenProducto
      data.imagenProducto = file.name;
    }
    let result = await MongoService.edit_product(data);
    if(req.files){
      let ub = path.join(__dirname, '../upload')+"\\";
      file.mv(ub+file.name,(error) => {
          console.log(error);
        }
      );
    }
    response(res, 200, result, "Producto Editado");
  })
  .put("/update", (req, res) => {})
  .delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    let result = await MongoService.elim_product(id);
    response(res, 200, result, "Producto Eliminado");
  });

module.exports = router;