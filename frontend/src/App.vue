<template>
    <div>
      <h1> Lista de Productos </h1>
      <ProductoLista /> 
    </div>
</template>

<script>
import ProductoLista from './components/producto-lista.vue'

export default {
  name: 'App',
  components: {
    ProductoLista
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgb(225, 225, 225);
  padding: 0%;
}
</style>
