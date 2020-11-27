<template>
  <div>
      <main id="app" class="container-fluid mt-3">
        <Header />
        <router-view />
        <CarritoCompras/>
        <FormularioCrearUser/>
        <Footer/>
      </main>
  </div>
</template>

<script>
import Header from '@/components/Header'
import CarritoCompras from './components/carrito-compras'
import FormularioCrearUser from './components/FormularioCrearUser'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    CarritoCompras,
    FormularioCrearUser,
    Footer
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgb(225, 225, 225);
  padding: 0%;
}

.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
