<template>
  <div :class="[ openModal ? 'is-active' : '', 'modal' ]">
    <div class="modal-background"></div>
    <div class="modal-card">

      <header class="modal-card-head">
          <p v-if="!isUserLoggedIn" class="modal-card-title">{{ modalTitle }}</p>
          <p v-if="isUserLoggedIn" class="modal-card-title">{{ modalTitleLoggedIn }}</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      

      <form @submit="checkForm">
        <section class="modal-card-body">

        <div :class="[getSpinnerClass()]">
          <div class="loader is-loading"></div>
        </div>
        
        <div v-if="mostrarError" class="notification is-danger">
              <button class="delete" @click="mostrarError = !mostrarError"></button>
                  {{mensajeError}}
        </div>
      
          <div v-if="!isUserLoggedIn">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                  <input
                    :class="[highlightEmailWithError ? 'input is-danger' : 'input']"
                    type="email"
                    :placeholder="emailPlaceholder"
                    name="emailName"
                    v-model="form.email"
                  >
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                  <span v-if="highlightEmailWithError !== null" class="icon is-small is-right">
                    <i :class="[highlightEmailWithError ? 'fa fa-exclamation-circle' : 'fa fa-check']"></i>
                  </span>
                </p>
                <p v-if="highlightEmailWithError" class="help is-danger">{{ emailRequiredLabel }}</p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input 
                  :class="[highlightPasswordWithError ? 'input is-danger' : 'input']"
                  type="password"
                  placeholder="Contraseña"
                  name="passwordName"
                  v-model="form.password"
                >
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
                <span v-if="highlightPasswordWithError !== null" class="icon is-small is-right">
                  <i :class="[highlightPasswordWithError ? 'fa fa-exclamation-circle' : 'fa fa-check']"></i>
                </span>
              </p>
              <p v-if="highlightPasswordWithError" class="help is-danger">{{ passwordRequiredLabel }}</p>
            </div>
          </div>
          <div v-if="isUserLoggedIn" class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="title">Bienvenido!</p>
                <p class="heading">Ahora te encuentras logueado!</p>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button v-if="!isUserLoggedIn" type="submit" class="button is-info">{{ primaryBtnLabel }}</button>
          <button v-if="isUserLoggedIn" type="button" class="button is-info" @click="closeModal">{{ btnLoggedInLabel }}</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',

  data () {
    return {
      modalTitle: 'Ingrese su usuario y contraseña',
      modalTitleLoggedIn: 'Bienvenide!',
      primaryBtnLabel: 'Ingresar',
      emailRequiredLabel: 'Email requerido',
      passwordRequiredLabel: 'Contraseña requerida',
      highlightEmailWithError: '',
      highlightPasswordWithError: '',
      btnLoggedInLabel: 'Cerrar',
      emailPlaceholder: 'Email',

      mensajeError: '',
      mostrarError: false,

      loading: false,

    form: {
      email: '',
      password: ''
    }
    };
  },

  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn;
    },
    openModal () {
      if (this.$store.getters.isLoginModalOpen) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {
    closeModal () {
      this.$store.commit('showLoginModal', false);
      this.resetForm();
    },

    resetForm() {
        this.form.email = ''
        this.form.password = '',
        this.highlightEmailWithError = '',
        this.highlightPasswordWithError = ''
    },

    checkForm (e) {

      if (this.form.email && this.form.password) {
        this.highlightEmailWithError = false;
        this.highlightPasswordWithError = false;

        this.logIn()
      }

      if (!this.form.email) {
        this.highlightEmailWithError = true;
      } else {
        this.highlightEmailWithError = false;
      }

      if (!this.form.password) {
        this.highlightPasswordWithError = true;
      } else {
        this.highlightPasswordWithError = false;
      }

      e.preventDefault();
    },
    logIn(){
      this.loading = true;

       let data = {
          "username": this.form.email,
          "password": this.form.password
        }

        this.$store.dispatch('getTokenUserAxios', data)
          .catch(() => { 
            this.mensajeError = "Usuario/Contraseña inválido!",
            this.mostrarError = true
            this.loading = false;
          }).then(() => {this.loading = false})
    },
    getSpinnerClass(){
      let baseClass = "loader-wrapper "

      if(this.loading){
        return baseClass.concat("is-active");
      } else {
        return baseClass;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .fa-exclamation-circle {
    color: red;
  }
  .fa-check {
    color: green;
  }
  .loader-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #fff;
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


