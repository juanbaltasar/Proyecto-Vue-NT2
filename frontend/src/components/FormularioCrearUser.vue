<template>
  <div :class="[ openModal ? 'is-active' : '', 'modal' ]">
    <div class="modal-background"></div>
      <div class="modal-card">
        <div class="jumbotron">
         <h2>Registro de usuario</h2>
         <hr />
                   

      <form novalidate autocomplete="off" @submit.prevent="enviar()">
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
      </form>
      

      <button type="button" class="button is-info" @click="closeModal">Cancelar</button>

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
          url: ''
          // TODO modificar url para el sendDatos
      }
    },
    methods: {

        delay : ms => new Promise(resolve => setTimeout(resolve, ms)),

        /* Envio de datos del formularioVue al backend */
        async sendDatosFormAxios(datos) {
            try {
              let res = await this.axios.post(this.url, datos, {'content-type': 'application/json'})
              await this.delay(500)
              console.log(res.data)
            }
            catch(error) {
              console.log('HTTP POST ERROR', error)
            }
        },

        /* Submit del form */
        async enviar() {
            this.v.$touch()
            if(!this.v.$invalid) {
              let form = this.formUser
              console.log(form)
              await this.sendDatosFormAxios(form)
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
        },
    },
    computed: {
      openModal () {
        console.log("Modal: ", this.$store.getters.isSignUpModalOpen);
        if (this.$store.getters.isSignUpModalOpen) {
          return true;
        } else {
          return false;
        }
      }
    }
}


</script>

<style scoped lang="css">
  .src-components-formularioVue {

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

</style>
