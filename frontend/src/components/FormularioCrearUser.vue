<template>
  <div :class="[ openModal ? 'is-active' : '', 'modal' ]">

    <div :class="[getSpinnerClass()]">
      <div class="loader is-loading"></div>
    </div>

    <div class="modal-background"></div>
      <div class="modal-card">
        <div class="jumbotron">
         <h2 v-if="!isUserSignedUp">Registro de usuario</h2>
         <h2 v-if="isUserSignedUp">Exito</h2>
         <hr />                
      <form novalidate autocomplete="off" @submit.prevent="enviar()">
        <div v-if="!isUserSignedUp">
          <div class="form-group">
                <label for="email">Email</label>
                <input 
                    type="email"
                    id="email"
                    class="form-control"
                    v-model="v.formUser.email.$model"
                >

                <div v-if="v.formUser.email.$error && v.formUser.email.$dirty" class="alert alert-danger mt-1">
                    <div v-if="v.formUser.email.required.$invalid">Este campo es requerido</div>
                    <div v-if="v.formUser.email.$invalid">Debe proveer un email válido</div>
                </div>
          </div>

          <div class="form-group">
                <label for="nombre">Nombre</label>
                <input 
                    type="text"
                    id="nombre"
                    class="form-control"
                    v-model.number="v.formUser.nombre.$model"
                >

                <div v-if="v.formUser.nombre.$error && v.formUser.nombre.$dirty" class="alert alert-danger mt-1">
                    <div v-if="v.formUser.nombre.required.$invalid">Este campo es requerido</div>
                    <div v-if="v.formUser.nombre.alpha.$invalid">Este campo solo admite letras</div>
                </div>
          </div>

          <div class="form-group">
                <label for="apellido">Apellido</label>
                <input 
                    type="text"
                    id="apellido"
                    class="form-control"
                    v-model.number="v.formUser.apellido.$model"
                >

                <div v-if="v.formUser.apellido.$error && v.formUser.apellido.$dirty" class="alert alert-danger mt-1">
                    <div v-if="v.formUser.apellido.required.$invalid">Este campo es requerido</div>
                    <div v-if="v.formUser.apellido.alpha.$invalid">Este campo solo admite letras</div>
                </div>
          </div>

          <div class="form-group">
                <label for="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    class="form-control"
                    v-model="v.formUser.password.$model"
                >

                <div v-if="v.formUser.password.$error && v.formUser.password.$dirty" class="alert alert-danger mt-1">
                    <div v-if="v.formUser.password.required.$invalid">Este campo es requerido</div>
                    <div v-if="v.formUser.password.minLength.$invalid">Este campo debe tener al menos {{v.formUser.password.minLength.$params.min}} caracteres</div>
                    <div v-if="v.formUser.password.maxLength.$invalid">Este campo debe tener máximo {{v.formUser.password.maxLength.$params.max}} caracteres</div>
                    <div v-if="v.formUser.password.conEspacios.$invalid">No se permiten espacios en este campo</div>
                </div>
          </div>
          <div class="form-group">
                <input 
                    type="submit"
                    :disabled="v.$invalid"
                    class="btn btn-success mt-4"
                    value="Crear cuenta"
                >
          </div>
        </div>
          <div v-if="isUserSignedUp" class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Cuenta creada correctamente</p>
              </div>
            </div>
          </div>
      </form>
      
      <button v-if="!isUserSignedUp" type="button" class="button is-info" @click="closeModal">Cancelar</button>
      <button v-if="isUserSignedUp" type="button" class="button is-info" @click="closeModal">Aceptar</button>

      <!-- <pre>{{v}}</pre> -->

    </div>
    </div>
  </div>
</template>

<script>
  import { required, minLength, maxLength, email, alpha } from '@vuelidate/validators'
  import { useVuelidate } from '@vuelidate/core'

  function validarEspacios(value) {
    return !value.includes(' ')
  }

  export default  {
    name: 'src-components-formularioCrearUser',
    props: [],
    created() {
        const rules = {
          formUser: {
            email: { 
              required,
              email
            },
            nombre: { 
              required,
              alpha
            },
            apellido: {
              required,
              alpha
            },
            password: { 
              required,
              minLength: minLength(7),
              maxLength: maxLength(20),
              conEspacios: validarEspacios           
            }
          }
        }

        const formUser = this.formUser
        this.v = useVuelidate(rules, {formUser})
    },
    data () {
      return {
          formUser: {
               email: '',
               nombre : '',
               apellido: '',
               password : ''
          },
          v: null,
          loading: false         
      }
    },
    methods: {

        async enviar() {
          this.v.$touch()
            if(!this.v.$invalid) {
              this.loading = true;
              let form = this.formUser
              this.$store.dispatch('registrarUserAxios', form).then(() => {this.loading = false})
              this.resetForm()
              this.v.$reset()
            }
        },
        
        /* valor inicial de los campos de datos del formulario */
        resetForm() {
            this.v.formUser.email.$model = ''
            this.v.formUser.nombre.$model = ''
            this.v.formUser.apellido.$model = ''
            this.v.formUser.password.$model = ''
        },

        closeModal () {
          this.$store.commit('showSignupModal', false);
          this.$store.commit('isUserSignedUp', false);
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
    computed: {
      openModal () {
        if (this.$store.getters.isSignUpModalOpen) {
          return true;
        } else {
          return false;
        }
      },
      isUserSignedUp () {
        return this.$store.getters.isUserSignedUp;
    },
    }
}


</script>

<style scoped lang="scss">
  .src-components-formularioVue {

  }
  * {
    font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  }

  .jumbotron {
    background-color: rgb(149, 223, 204);
    color: white;
  }

  hr {
    background-color: #ddd;
  }

  pre {
    color: white;
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
