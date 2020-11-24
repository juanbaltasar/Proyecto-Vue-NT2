<template>

  <section class="src-components-navbar">

    <nav class="navbar navbar-expand-lg navbar-dark bg-info">
      
      <router-link to="/productos">
        <a class="navbar-brand" href="#">Productos</a>
      </router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          
          <!-- <li class="nav-item">
            <router-link to="/login">
              <a class="nav-link" href="#">Ingreso de gastos</a>
            </router-link>
          </li> -->

        </ul>
      </div>
    </nav>

  </section>

</template>

<script>

  export default  {
    name: 'src-components-navbar',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-navbar {

  }
</style>
