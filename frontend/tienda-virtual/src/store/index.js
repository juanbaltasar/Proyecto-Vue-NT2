import Vuex from 'vuex'
import Vue from 'vue'
import shop from '../api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productos: [],
    carrito: [],
    statusCompra: null
  },
  getters: {
    productosDisponibles (state) {
      return state.productos.filter(producto => producto.stock > 0)
    },
    getCarritoProductos (state) {
      return state.carrito.map(cartItem => {
        const producto = state.productos.find(producto => producto.id === cartItem.id)
        return {
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: cartItem.cantidad
        }
      })
    },
    getPrecioTotalCarrito (state, getters) {
      let total = 0
      getters.getCarritoProductos.forEach(producto => {
        total += producto.precio * producto.cantidad
      })
      return total
    }
  },
  actions: {
    traerProductos ({commit}) {
      return new Promise((resolve, reject) => {
        shop.getProducts(productos => {
          commit('setProductos', productos)
          resolve()
        })
      })
    },
    anadirAlCarrito (context, productoId) {
      var producto = context.state.productos.find(item => item.id === productoId)
      if (producto.stock > 0) {
        const itemDelCarrito = context.state.carrito.find(item => item.id === producto.id)
        if (!itemDelCarrito) {
          context.commit('pushearAlCarrito', producto.id)
        } else {
          context.commit('incrementarCantidadDeItem', itemDelCarrito)
        }
        context.commit('decrementarStock', producto)
      }
    },
    comprarProductos (context) {
      shop.buyProducts(
        context.state.carrito,
        () => {
          context.commit('vaciarCarrito')
          context.commit('setStatusCompra', 'Compra Exitosa')
        },
        () => {
          context.commit('setStatusCompra', 'Error al comprar. intente de vuelta')
        }
      )
    }
  },
  mutations: {
    setProductos (state, productos) {
      state.productos = productos
    },
    pushearAlCarrito (state, productoID) {
      state.carrito.push({
        id: productoID,
        cantidad: 1
      })
    },
    incrementarCantidadDeItem (state, cartItem) {
      cartItem.cantidad++
    },
    decrementarStock (state, producto) {
      producto.stock--
    },
    setStatusCompra (state, status) {
      state.statusCompra = status
    },
    vaciarCarrito (state) {
      state.carrito = []
    }
  }
})
