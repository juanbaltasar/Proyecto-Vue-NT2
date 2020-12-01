<template>
    <div class="section">     
        <div class="card">
            <div class="columns">
                <div class="column is-4">
                    <div class="card-img">
                        <figure class="image is-480x480" alt="Placeholder image">
                            <img :src="producto.imagen">
                        </figure>
                    </div>
                </div>
                <div id="detail">
                    <div class="column is-offset-6">
                        <div class="card-content">
                            <div class="card-content__title">
                                <h2 class="title">{{ producto.nombre }}</h2>
                            </div>
                            <br/>
                            <div class="card-content__text">
                                <p>{{producto.descripcion}}</p>
                            </div>
                            <br/> 
                            <br/> 
                            <div class="card-content__price">
                                <span class="title"><strong>{{getCurrency(producto.precio)}}</strong></span>
                            </div>
                            <div class="card-content__btn is-pulled-right">
                                <button class="button is-primary" @click="anadirAlCarrito(producto._id)">{{ addToCartLabel }}</button>
                            </div>
                            <div v-if="modalConfirmar" class="notification is-info">
                                <button class="delete" @click="modalConfirmar = !modalConfirmar"></button>
                                     {{confirmAddLabel}}
                            </div>
                            <br/> 
                            <br/>
                            <br/>

                            <hr>
                            <img class="banner" src="../assets/electro.jpg" alt="Electro" width="1000" height="1000">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import {currency} from '../currency'

export default {
  name: 'DetalleProducto',
  data() {
      return {
        producto: this.$store.getters.getProductById(this.$route.params.id),
        addToCartLabel: 'Agregar al carrito',
        confirmAddLabel: 'Producto agregado exitosamente!',
        modalConfirmar: false
    } 
  },
   props: {
    id: {
        type: String,
        required: true
    }
  },
  methods: {
    anadirAlCarrito (_id) {
        this.$store.dispatch('anadirAlCarrito', _id)
        this.modalConfirmar = true
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
  created () {
      window.scrollTo(0, 0);
  },
  mixins: [currency]
}
</script>

<style lang="scss" scoped>
* {

    font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
    text-align: left;
  }
  
   figure img {
      max-height: 500px;
      max-width: 400px;
  }
  
  #detail{

    text-align: left;
}

.banner {
    padding-top: 50px;
}
.card-content {
    padding: -150px 15px 15px 0px;
    margin-top: -400px;
    margin-left: -200px;

    &__text {
      margin: 16px 0;
    }

  }

</style>