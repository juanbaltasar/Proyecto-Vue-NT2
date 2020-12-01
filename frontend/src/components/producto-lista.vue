<template>
    <div class="columns is-centered is-multiline">
      <div :class="[getSpinnerClass()]">
        <div class="loader is-loading"></div>
      </div>
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
import { buscarPorTitulo } from '../filters';

export default {
  name: 'ProductosLista',
  components: {
    ProductoSolo
  },
  data () {
    return {
      loading: false,
      noProductLabel: "No hay productos para mostrar",
      productosFiltrados: []
    }
  },
  computed: {
    productos () {
       if (this.$store.state.userInfo.hasSearched) {
        return this.getProductoPorTitulo();
      } else {
        return this.$store.state.productos;
      }
    }
  },
  created () {
    this.loading = true
    this.$store.dispatch('productosAxios')
      .then(() => { this.loading = false })
  },
  methods: {
    getProductoPorTitulo () {
      let listOfProducts = this.$store.state.productos,
          titleSearched = this.$store.state.userInfo.productTitleSearched;
      
      return this.productsFiltered = buscarPorTitulo(listOfProducts, titleSearched);
    },
    getSpinnerClass(){
      let baseClass = "loader-wrapper "

      if(this.loading){
        return baseClass.concat("is-active");
      } else {
        return baseClass;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
* {

    font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  }
  .card {
    margin: 10px;
    display: flex;
    flex-direction: column;
  }

  .loader-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #fff;
    opacity: 0;
    z-index: -1;
    transition: opacity .3s;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;

        .loader {
            height: 80px;
            width: 80px;
        }

    &.is-active {
        opacity: 1;
        z-index: 1;
    }
}
  

</style>