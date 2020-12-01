import { createStore } from 'vuex'
import shop from '../api/shop'
import axios from 'axios'

const url = "https://lit-depths-95105.herokuapp.com/"

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
        productTitleSearched: '',
        token: ''
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
      return state.productos.filter(producto => producto.cantidad > 0)
    },
    getCarritoProductos (state) {
      return state.carrito.map(cartItem => {
        const producto = state.productos.find(producto => producto._id === cartItem._id)
        return {
          _id: producto._id,
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
      return state.productos.find(product => product._id == id);
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
    async productosAxios({commit}) {
      try {
          let res = await axios(url + "productos")
          commit('setProductos', res.data)
      }
      catch(error) {
          console.log('HTTP GET ERROR', error)
      }
    },
    async getTokenUserAxios({commit}, user) {
      return new Promise((resolve, reject) => {
        axios.post(url + "users/auth", user, {'content-type':'application/json'})
            .then(res => {
                let usuario = res.data
                  commit('setTokenUsuario',usuario)
                  resolve("OK")
            })
            .catch(error => { 
              reject(error.response.data.errors)
            })
        })
    },
    async registrarUserAxios({commit}, user) {
      let datosUser = {
        _id: user.email,
        username: user.nombre + ' ' + user.apellido,
        password : user.password,
        esAdministrador: true
      }

      return new Promise((resolve, reject) => {
        axios.put(url + "users/newUser", datosUser, {'content-type':'application/json'})
            .then(() => {
              commit('isUserSignedUp', true)
              resolve("OK")
            })
            .catch(error => { 
              if(!error.response.data.success)
                if(error.response.data.message == "Duplicated id!")
                  reject("El usuario ya se encuentra registrado! Ingrese un email distinto o logueese en la aplicación")
              
              reject("Ocurrió un error al procesar su solicitud. Intente nuevamente en unos minutos")
            })
        })
    },
    anadirAlCarrito (context, productoId) {
      var producto = context.state.productos.find(item => item._id === productoId)
      if (producto.cantidad > 0) {
        const itemDelCarrito = context.state.carrito.find(item => item._id === producto._id)
        if (!itemDelCarrito) {
          context.commit('pushearAlCarrito', producto._id)
        } else {
          context.commit('incrementarCantidadDeItem', itemDelCarrito)
        }
        context.commit('decrementarStock', producto)
      }
    },
    quitarDelCarrito (context, productoId) {
      context.commit('removerDelCarrito', productoId)
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
    setTokenUsuario(state, usuario){
      state.userInfo.name = usuario.name;
      state.userInfo.token = usuario.token;
      state.userInfo.isLoggedIn = true;
    },
    pushearAlCarrito (state, productoID) {
      state.carrito.push({
        _id: productoID,
        cantidad: 1
      })
    },
    removerDelCarrito (state, productoID) {
      state.carrito.splice(
        state.carrito.findIndex(function(i){ 
          return i._id === productoID;
        }),
      1); 
    },
    incrementarCantidadDeItem (state, cartItem) {
      cartItem.cantidad++
    },
    decrementarStock (state, producto) {
      producto.cantidad--
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
        if (data._id === el._id) {
          el.quantity = data.quantity;
        }
      });
    },
    SET_USER(state, authUser) {
      state.authUser = authUser
    }
  }
})
