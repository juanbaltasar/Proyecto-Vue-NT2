<template>
  <div id="contenedorProducto">
    <img id="imagenProd" :src="imagen">
    <div id="nombreProd"> {{nombre}} </div>
    <div id="precioProd"> ${{precio}} </div>
    <div id="descripcionProd"> {{descripcion}} </div>
  </div>
</template>

<script>
export default {
    name: 'ProductoSolo',
    props: {
    id: {
      type: Number,
      required: true
    },

    nombre: {
      type: String,
      default: 'Nombre del producto'
    },

    imagen: {
      type: String,
      default: '#'
    },

    descripcion: {
      type: String,
      default: 'un Producto'
    },

    precio: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style>
  #imagenProd{
    width: 80%;
    padding: 10px;
    max-height: 200px;
  }
  #nombreProd{
    font-size:large;
  }
  #precioProd{
    font-size:x-large;
    color:green;
  }
  #contenedorProducto{
    background: whitesmoke;
    height: 350px;
    padding: 0;
    border: 30px;
  }
  
</style>