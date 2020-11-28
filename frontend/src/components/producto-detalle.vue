<template>
    <div class="section">     
        <div class="card">
            <!--<div class="columns">-->
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
                                <span class="title"><strong>$ {{ producto.precio }}</strong></span>
                            </div>
                            <div class="card-content__btn is-pulled-right">
                            <button class="button is-primary" @click="anadirAlCarrito(id)">{{ addToCartLabel }}</button>
                            </div>
                            <br/> 
                            <br/>
                            <img src="../assets/electro.jpg" alt="Electro" width="1000" height="1000">
                        </div>
                    </div>
                </div>
            <!--</div>-->
        </div>
        <div v-if="modalConfirmar" class="notification is-info">
      <button class="delete" @click="modalConfirmar = !modalConfirmar"></button>
      {{confirmAddLabel}}
    </div>
    </div>

</template>

<script>
export default {
  name: 'DetalleProducto',
  data() {
      return {
        // producto: {
        //     id: '1',
        //     nombre: 'Prueba',
        //     imagen: 'https://media.staticontent.com/media/pictures/9845587c-21d7-4822-be21-bc30fcc47836',
        //     descripcion:'Prueba de descripcion',
        //     precio: '200000'
        // }
        producto: this.$store.getters.getProductById(this.$route.params.id),
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
  methods: {
    anadirAlCarrito (id) {
        this.$store.dispatch('anadirAlCarrito', id)
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
  }
}
</script>

<style lang="css" scoped>
* {

    font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
    text-align: left;
  }
  .image img {

      width: 500px;
      height: 200px;
  }
  
  #detail{

    text-align: left;
}
.card-content {
    padding: -150px 15px 15px 0px;
    margin-top: -230px;
    margin-left: -200px;

    &__title {
      
    }
    &__text {
      margin: 16px 0;
    }

  }

</style>