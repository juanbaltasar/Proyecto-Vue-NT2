<template>
  <div id="contenedorProducto">
    <img id="imagenProd" :src="imagen">
    <div id="nombreProd"> {{nombre}} </div>
    <div id="precioProd"> {{precio  | currency}} </div>
    <div id="descripcionProd"> {{descripcion}} </div>
    <div id="stock"> {{stock}} disponibles </div>
    <div id="boton">
      <button @click="anadirAlCarrito(id)">
        <img src="../assets/shopping-cart-icon.png" width="20px" class="icon">
      </button>
    </div>
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
    },

    stock: {
      type: Number,
      default: 0
    }
  },
  methods: {
    anadirAlCarrito (id) {
      this.$store.dispatch('anadirAlCarrito', id)
    }
  }
}
</script>

<style>
  #imagenProd{
    width: 80%;
    padding-top: 20px;
    max-height: 200px;
  }
  #nombreProd{
    font-size:large;
  }
  #precioProd{
    font-size:x-large;
    color:green;
  }
  #descripcionProd{
    font-size: small;
    width: 90%;
    margin: auto;
  }
  #contenedorProducto{
    background: whitesmoke;
    height: 400px;
    padding: 0;
    border: 30px;
    position: relative
  }
  .icon{
    border:none;
    margin:0%;
    padding:0%;
  }
  #boton{
    width: 100%;
    position: absolute;
    bottom: 5%;
  }
  #boton button{
    width: 50%;
  }
</style>