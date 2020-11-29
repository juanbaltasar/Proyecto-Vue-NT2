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
                <p class="title">Welcome back!</p>
                <p class="heading">Now you are logged in</p>
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
    
    // TODO modificar url para el sendDatos
      url: '',

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
        //this.$store.commit('isUserLoggedIn', true);
        this.enviar();
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

    /* Submit del form */
    async enviar() {
        let form = this.form;
        console.log(form);
        await this.sendDatosFormAxios(form);
        this.resetForm();
    },

    //delay : ms => new Promise(resolve => setTimeout(resolve, ms)),

    /* Envio de datos del formularioVue al backend */
        async sendDatosFormAxios(datos) {
            try {
              let res = await this.axios.post(this.url, datos, {'content-type': 'application/json'})
              //await this.delay(100)
              console.log(res.data)
            }
            catch(error) {
              console.log('HTTP POST ERROR', error)
            }
        }
  }
};
</script>

<style lang="scss">
.fa-exclamation-circle {
  color: red;
}
.fa-check {
  color: green;
}
</style>


