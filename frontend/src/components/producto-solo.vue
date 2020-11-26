<template>
  <router-link :to="{ name: 'DetalleProducto', params: { id: id}}">
    <div>
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="imagen" alt="Placeholder image">
        </figure>
      </div>

      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-5" id="nombreProd">{{nombre}}</p>
          </div>
        </div>
        
        <div class="content is-clearfix">
          <p id="descripcionProd">{{descripcion}}</p>
          <div id="boton">
            <button @click="anadirAlCarrito(id)">
              <img src="../assets/shopping-cart-icon.png" width="20px" class="icon">
            </button>
          </div>
          <p class="is-pulled-right" id="precioProd">
            <span class="title is-6"><strong>${{precioConFormato}}</strong></span>
          </p>
        </div>
      </div>
    </div>
  </router-link>

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
    }
  }
}
</script>

<style lang="css">
.details {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
 }
 .details:hover {
      border: 1px solid #51bafc;
    }
    
 .button,
 .select {
   z-index: 2;
 }
 .select {
   position: absolute;
   right: 15px;
   bottom: 35px;
 }
 .card-content {
   padding: 0;
 }
 .buttons {
   margin: 0;
 }  
</style>
