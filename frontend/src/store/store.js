import { createStore } from 'vuex'
import shop from '../api/shop'

export default createStore({
  state() {
    return {
      productos: [],
      carrito: [],
      statusCompra: null,
      userInfo: {
        isLoggedIn: false,
        isSignedUp: false,
        hasSearched: false,
        name: '',
        productTitleSearched: ''
      },
      systemInfo: {
        openLoginModal: false,
        openSignupModal: false,
        openCheckoutModal: false
      }
    }
  },
  getters: {
    productosDisponibles (state) {
      return state.productos.filter(producto => producto.stock > 0)
    },
    getCarritoProductos (state) {
      return state.carrito.map(cartItem => {
        const producto = state.productos.find(producto => producto.id === cartItem.id)
        return {
          id: producto.id,
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
    },
    productsAdded: state => {
      return state.productos.filter(el => {
        return el.isAddedToCart;
      });
    },
    getCarritoLength: state => {
      return state.carrito.length;
    },
    getProductById: state => id => {
      return state.productos.find(product => product.id == id);
    },
    isUserLoggedIn: state => {
      return state.userInfo.isLoggedIn;
    },
    isUserSignedUp: state => {
      return state.userInfo.isSignedUp;
    },
    getUserName: state => {
      return state.userInfo.name;
    },
    isLoginModalOpen: state => {
      return state.systemInfo.openLoginModal;
    },
    isSignUpModalOpen: state => {
      return state.systemInfo.openSignupModal;
    },
    isCheckoutModalOpen: state => {
      return state.systemInfo.openCheckoutModal;
    },
    quantity: state => {
      return state.productos.cantidad;
    }
  },
  actions: {
    traerProductos ({commit}) {
      return new Promise((resolve) => {
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
    },
    isUserLoggedIn: (state, isUserLoggedIn) => {
      state.userInfo.isLoggedIn = isUserLoggedIn;
    },
    isUserSignedUp: (state, isSignedUp) => {
      state.userInfo.isSignedUp = isSignedUp;
    },
    setHasUserSearched: (state, hasSearched) => {
      state.userInfo.hasSearched = hasSearched;
    },
    setUserName: (state, name) => {
      state.userInfo.name = name;
    },
    setProductTitleSearched: (state, titleSearched) => {
      state.userInfo.productTitleSearched = titleSearched;
    },
    showLoginModal: (state, show) => {
      state.systemInfo.openLoginModal = show;
    },
    showSignupModal: (state, show) => {
      state.systemInfo.openSignupModal = show;
    },
    showCheckoutModal: (state, show) => {
      state.systemInfo.openCheckoutModal = show;
    },
    quantity: (state, data) => {
      state.productos.forEach(el => {
        if (data.id === el.id) {
          el.quantity = data.quantity;
        }
      });
    },
    SET_USER(state, authUser) {
      state.authUser = authUser
    }
  }
})
