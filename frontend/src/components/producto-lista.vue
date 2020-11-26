<template>
    <div class="columns is-centered is-multiline">
      <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif">
      <div class="card column is-one-quarter" v-for="pr in productos" :key="pr.id">
        <ProductoSolo v-bind="pr"/>
      </div>
      <div class="section" v-if="productos.length === 0">
        <p>{{ noProductLabel }}</p>
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
      loading: false,
      noProductLabel: "No hay productos para mostrar"
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
  .card {
    margin: 10px;
  }
</style>