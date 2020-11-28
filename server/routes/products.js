const router = require("express").Router();

const MongoService = require("../services/crudMongo");

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
    file.mv(`C:\\Users\\AORUS GAMING EC\\Desktop\\archivos\\proyecto\\server\\upload\\`+file.name,(error) => {
        console.log(error);
      }
  );
    response(res, 200, result, "Producto Creado");
  })
  .put("/update", (req, res) => {})
  .delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    let result = await MongoService.elim_product(id);
    response(res, 200, result, "Producto Eliminado");
  });

module.exports = router;