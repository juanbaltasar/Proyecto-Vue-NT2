<template>
  <div :class="[ openModal ? 'is-active' : '', 'modal' ]">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">{{ modalTitle }}</p>
				<button class="delete" aria-label="close" @click="closeModal(false)"></button>
			</header>
			<section class="modal-card-body">
				<div v-if="!isCheckoutSection">

					<div :class="[getSpinnerClass()]">
						<div class="loader is-loading"></div>
					</div>

					<div class="box" v-for="product in products" :key="product._id">
						<button class="is-pulled-right button is-info is-inverted" @click="removeFromCart(product._id)">{{ removeLabel }}</button>
						<p>{{ product.nombre }}  {{ product.cantidad > 0 ?  ` - Cantidad: ${product.cantidad}` : ''}}</p>
						<p>{{ getCurrency(product.precio) }} </p>
					</div>
					<div v-if="products.length === 0">
						<p>{{ cartEmptyLabel }}</p>
					</div>
				</div>
				<div v-if="isCheckoutSection">
					<p>Producto comprado exitosamente!</p>
				</div>
			</section>
			<footer class="modal-card-foot">
				<button v-show="products.length > 0 && !isCheckoutSection" class="button is-success" @click="onNextBtn">{{ buyLabel }}</button>
				<button v-if="isCheckoutSection" class="button is-success" @click="closeModal(false)">{{ closeLabel }}</button>
			</footer>
		</div>
	</div>
</template>

<script>
import {currency} from '../currency'
export default {

  data () {
		return {
			modalTitle: 'Carrito',
			removeLabel: 'Remover del carrito',
			cartEmptyLabel: 'Tu carrito está vacío',
			closeLabel: 'Cerrar',
			isCheckoutSection: false,
			loading: false
		}
  },
  computed: {
			products () {
				return this.$store.getters.getCarritoProductos;
			},
			openModal () {
				if (this.$store.getters.isCheckoutModalOpen) {
					return true;
				} else {
					return false;
				}
			},
			buyLabel () {
				let totalProducts = this.products.length,
						productsAdded = this.$store.getters.getCarritoProductos,
						pricesArray = [],
						productLabel = '',
						finalPrice = '',
						quantity = 1;

				productsAdded.forEach(product => {

					if (product.quantity >= 1) {
						quantity = product.cantidad;
					}

					pricesArray.push((product.precio * quantity)); // get the price of every product added and multiply quantity
				});

				finalPrice = pricesArray.reduce((a, b) => a + b, 0); // sum the prices
				
				if (totalProducts > 1) { // set plural or singular
					productLabel = 'productos';
				} else {
					productLabel = 'producto';
				}
				return `Comprar ${totalProducts} ${productLabel} a $${finalPrice}`;
		},
		isUserLoggedIn () {
			return this.$store.getters.isUserLoggedIn;
		}
	},

	methods: {
		closeModal (reloadPage) {
			this.$store.commit('showCheckoutModal', false);

			if (reloadPage) {
				window.location.reload();
			}
		},
		removeFromCart (id) {
			this.$store.dispatch('quitarDelCarrito', id);
		},
		onNextBtn () {
			if (this.isUserLoggedIn) {
				this.loading = true;
				this.isCheckoutSection = true;

				this.$store.dispatch('comprarProductos');

				this.loading = false;

			} else {
				this.$store.commit('showCheckoutModal', false);
				this.$store.commit('showLoginModal', true);
			}
		},
		onPrevBtn () {
			this.isCheckoutSection = false;
		},
		getSpinnerClass(){
          let baseClass = "loader-wrapper "

          if(this.loading){
            return baseClass.concat("is-active");
          } else {
            return baseClass;
          }
        }
  },
  mixins: [currency]
}
</script>

<style scoped lang="scss">
* {

    font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  }
  #carrito{
    text-align: left;
  }
  ul{
    list-style: none
  }

  .loader-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgb(149, 223, 204);
    opacity: 0;
    z-index: -1;
    transition: opacity .3s;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;

        .loader {
            height: 80px;
            width: 80px;
        }

    &.is-active {
        opacity: 1;
        z-index: 1;
    }
  }
  
</style>