<template>
    <div class="columns is-centered is-multiline">
      <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif">
      <div class="card column is-one-third" v-for="pr in productos" :key="pr._id">
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
    this.$store.dispatch('productosAxios')
      .then(() => { this.loading = false })
  }
}
</script>

<style>
* {

    font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  }
  .card {
    margin: 10px;
    display: flex;
    flex-direction: column;
  }
  

</style>