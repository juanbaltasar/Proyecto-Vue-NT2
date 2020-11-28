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
                <div class="column is-offset-6">
                    <div class="card-content">
                        <div class="card-content__title">
                            <h2 class="title">{{ producto.nombre }}</h2>
                        </div>
                        <div class="card-content__text">
                            <p>{{producto.descripcion}}</p>
                        </div>
                            
                        <div class="card-content__price">
                            <span class="title"><strong>$ {{ producto.precio }}</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
  name: 'DetalleProducto',
  props: {
    id: {
        type: String,
        required: true
    }
  },
  data() {
      return {
        // producto: {
        //     id: '1',
        //     nombre: 'Prueba',
        //     imagen: 'https://media.staticontent.com/media/pictures/9845587c-21d7-4822-be21-bc30fcc47836',
        //     descripcion:'Prueba de descripcion',
        //     precio: '200000'
        // }
         producto: this.$store.getters.getProductById(this.$route.params.id)
    } 
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
* {

    font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  }
.card-content {
    padding: 15px 10px 15px 0;

    &__title {
      margin-top: 0;
      
    }
    &__text {
      margin: 15px 0;
    }
  }
</style>