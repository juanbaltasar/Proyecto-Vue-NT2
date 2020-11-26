<template>
  <div class="section">
    <div class="card is-clearfix columns">
      <figure class="card-image is-480x480 column">
        <router-link :to="{ name: 'DetalleProducto', params: { id: id}}">
          <img :src="imagen" alt="Placeholder image">
        </router-link>
      </figure>

      <div class="card-content column ">
        <div class="card-content__title">
            <h2 class="title is-4">{{ nombre }}</h2>
        </div>
          
        <div class="card-content__text">
          <p id="descripcionProd">{{descripcion}}</p>
        </div>
        <div class="column">
        <div class="card-content__text is-pulled-left has-text-centered">
            <span class="title is-5"><strong>{{precioConFormato}}</strong></span>
        </div>
        <div class="card-content__btn is-pulled-right">
            <button class="button is-primary" @click="anadirAlCarrito(id)">{{ addToCartLabel }}</button>
        </div>
        </div>
      </div>
    </div>
    <div v-if="modalConfirmar" class="notification is-info">
      <button class="delete" @click="modalConfirmar = !modalConfirmar"></button>
      {{confirmAddLabel}}
    </div>
  </div>


</template>

<script>
export default {
  name: 'ProductoSolo',
  data () {
    return {
      addToCartLabel: 'Agregar al carrito',
      confirmAddLabel: 'Producto agregado exitosamente!',
      modalConfirmar: false
    }
  },
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
  },
  computed: {
    precioConFormato () {
      var prec = this.precio.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      return prec
    }
  },
  methods: {
    anadirAlCarrito (id) {
      this.$store.dispatch('anadirAlCarrito', id)
      this.modalConfirmar = true
    }
  }
}
</script>

<style lang="scss" scoped>

 .card-content {
    padding: 15px 10px 15px 0;

    &__text {
      margin: 15px 0;
    }
    &__reviews {
      display: inline-block;
      width: 100%;
      margin-bottom: 10px;
    }
  }
</style>