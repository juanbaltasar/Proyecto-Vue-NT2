const fs = require('fs').promises;
const connection = require('./connectionMongo');
var mongo = require('mongodb');

async function getAllProductos(){
    const connectionMongo = await connection.getConnection();

    const productos = await connectionMongo.db('Ecommerce')
                        .collection('productos')
                        .find()
                        .toArray();
    return productos;
}

async function getProducto(id){
    const connectionMongo = await connection.getConnection();
    var o_id = new mongo.ObjectID(id);
    const producto = await connectionMongo.db('Ecommerce')
                        .collection('productos')
                        .findOne({_id: o_id });
    return producto;
}

async function pushProducto(producto){
    const connectionMongo = await connection.getConnection();
    const result = await connectionMongo.db('Ecommerce')
                        .collection('productos')
                        .insertOne(producto);
    return result;
}

async function updateProducto(producto){
    const connectionMongo = await connection.getConnection();
    var o_id = new mongo.ObjectID(producto._id);
    const query = {_id: o_id}
    const newvalues = {
        $set: {
            nombre: producto.nombre, 
            cantidad: producto.cantidad, 
            precio: producto.precio,
            descripcion: producto.descripcion, 
            imagen: producto.imagen
        }
    }
    const result = await connectionMongo.db('Ecommerce')
                        .collection('productos')
                        .updateOne(query, newvalues);
    return result;
}

async function deleteProducto(id){
    var producto = await getProducto(id);
    producto.cantidad = 0;

    const result = await updateProducto(producto);
    
    return result;
}

module.exports = {getAllProductos, getProducto, pushProducto, updateProducto, deleteProducto}