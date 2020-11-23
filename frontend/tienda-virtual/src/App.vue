<template>
  <div id="app">
    <ListaProductos/>
    <hr>
    <CarritoCompras/>
  </div>
</template>

<script>
import ListaProductos from './components/producto-lista'
import CarritoCompras from './components/carrito-compras'

export default {
  name: 'app',
  components: {
    ListaProductos,
    CarritoCompras
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
