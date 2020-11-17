<template>
    <div id="contenedorLista">
      <div id="contenedorProd" v-for="pr in productos" :key="pr.id">
        <ProductoSolo v-bind="pr"/>
      </div>
    </div>
</template>

<script>
import ProductoSolo from '../components/producto-solo.vue'
import ListaProductos from '../listaProductos.js'
export default {
    name: 'ProductosLista',
    components: {
        ProductoSolo
    },
    data(){
        return {
            productos:ListaProductos
        }
    }
}
</script>

<style>
    #contenedorProd{
        display: inline-block;
        padding: 10px;
        width: 20%;
        height: 100%;
        vertical-align:top;
    }
    #contenedorProd :hover{
        background: rgb(210, 210, 210);
    }
    #contenedorLista{
        display: inline;
    }
</style>