<template>
    <div id="contenedorLista">
      <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif">
      <div id="contenedorProd" v-for="pr in productos" :key="pr.id">
        <ProductoSolo v-bind="pr"/>
      </div>
    </div>
</template>

<script>
import ProductoSolo from '../components/producto-solo.vue'

export default {
  name: 'ProductosLista',
  components: {
    ProductoSolo
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    productos () {
      return this.$store.state.productos
    }
  },
  created () {
    this.loading = true
    this.$store.dispatch('traerProductos')
      .then(() => { this.loading = false })
  }
}
</script>

<style>
    #contenedorProd{
        display: inline-block;
        padding: 10px;
        width: 20%;
        height: 100%;
        vertical-align:top;
    }
    #contenedorProd :hover{
        background: rgb(210, 210, 210);
    }
    #contenedorLista{
        display: inline;
    }
</style>