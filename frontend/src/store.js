import Vue from 'vue'
import Vuex from 'vuex'
import listaProductos from './listaProductos.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    productos: listaProductos,
    carrito: []
  },
  getters: {
    getCarrito: state => state.carrito,
    getProductos: state => state.productos
  },
  mutations: {
    AGREGAR_CARRITO (state, id) { state.carrito.push(id) },
    QUITAR_CARRITO (state, index) { state.carrito.splice(index, 1) }
  },
  actions: {
    agregarCarrito (context, id) { context.commit('AGREGAR_CARRITO', id) },
    quitarCarrito (context, index) { context.commit('QUITAR_CARRITO', index) }
  }
})

export default store