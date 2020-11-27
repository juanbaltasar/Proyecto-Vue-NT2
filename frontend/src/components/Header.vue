<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div>
        <router-link to="/">
          <!--<a class="navbar-brand title" href="#">Ecommerce</a>-->
          <img src="../assets/logo_bar.png" alt="Ecommerce" width="200" height="100">
        </router-link> 

        <a role="button" class="navbar-burger burger" @click="isMenuOpen = !isMenuOpen" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu is-active">
        <!-- <div class="navbar-start">
          <div class="navbar-item field">
            <VmSearch></VmSearch>
          </div>
        </div> -->
        
        <div class="navbar-end">
          <div class="nav-item">
            <router-link to="/carrito" @click="showCheckoutModal">
              <a class="nav-link" href="#"><img src="../assets/shopping-cart-icon.png" width="20px" class="icon"></a>
            </router-link>
          </div>
          <!-- <div class="navbar-item shopping-cart" @click="showCheckoutModal">
            <span class="icon">
              <i class="fa fa-shopping-cart"></i>
            </span>
            <span :class="[numProductsAdded > 0 ? 'tag is-info' : '']">{{ numProductsAdded }}</span>
          </div> -->
        </div>
      </div>

      <div class="navbar-end is-hidden-mobile">
        <Menu></Menu>
      </div>
    </nav>
  </div>
</template>

<script>
  import Menu from './Menu';
  // import VmSearch from '../search/Search';

  export default {
    name: 'Header',

    data () {
      return {
        // linkedinTooltip: 'Follow us on Linkedin',
        // facebookTooltip: 'Follow us on Facebook',
        // twitterTooltip: 'Follow us on Twitter',
        // instagramTooltip: 'Follow us on Instagram',
        isCheckoutActive: false,
        isMenuOpen: false
      }
    },

    components: {
      // VmSearch,
      Menu
    },

    computed: {
      // numProductsAdded () {
      //   return this.$store.getters.productsAdded.length;
      // }
    },

    methods: {
       showCheckoutModal () {
         this.$store.commit('showCheckoutModal', true);
       }
    }
  };
</script>

<style lang="css" scoped>
  * {

    font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  }
  .title {
    color: black;
    font-size: 28px;
  }
  .shopping-cart {
    cursor: pointer;
  }
  a {
    color: grey;
  }
  .navbar{
    background-color: rgb(0, 210, 190);
  }
</style>
