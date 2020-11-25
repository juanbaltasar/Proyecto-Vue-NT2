<template>
  <div id="carrito">
    <h1> Carrito de Compras </h1>
    <div v-for="pr in productos" :key="pr.id">
      {{pr.nombre}} - {{pr.precio | currency}} - {{pr.cantidad}}
    </div>
    <hr>
    <p> Total de compra: {{total}} </p>
    <button @click="$store.dispatch('comprarProductos')"> Comprar </button>
    <p v-if="$store.state.statusCompra"> {{$store.state.statusCompra}} </p>
  </div>
</template>

<script>
export default {
  computed: {
    productos () {
      return this.$store.getters.getCarritoProductos
    },
    total () {
      return this.$store.getters.getPrecioTotalCarrito
    }
  }
}
</script>

<style>
  #carrito{
    text-align: left;
  }
  ul{
    list-style: none
  }
  
</style>