const express = require('express');
const router = express.Router();
const dataProducto = require('../data/Producto');
const {rutaProtegida} = require('../middleware');

/* Listado de todos los productos */
router.get('/', async function(req, res) {
    const data = await dataProducto.getAllProductos();
    res.json(data);
  });  

/* Un producto especifico */
router.get('/:id', async (req, res) => {
    // res.json el estatus es 200 por defecto
    res.json(await dataProducto.getProducto(req.params.id));
});

// Alta de producto
router.post('/', rutaProtegida, async (req, res) =>{
    const producto = req.body;
    try{
      const result = await dataProducto.pushProducto(producto);
      res.json(result);
    }
    catch (error) {
      res.status(500).send(error);
    }
});

// Modificacion de producto
router.put('/:id', rutaProtegida, async (req, res) =>{
    const producto = req.body;
  
    try {
      producto._id = req.params.id;
      const result = await dataProducto.updateProducto(producto);
      res.json(result);
    } catch (error) {
      res.status(500).send(error);
    }
});
  
// Eliminado de producto
router.delete('/:id', rutaProtegida, async (req, res) =>{
    const producto = req.body;
  
    try {
      producto._id = req.params.id;
      const result = await dataProducto.deleteProducto(producto._id);
      res.json(result);
    } catch (error) {
      res.status(500).send(error);
    }
});

  module.exports = router;