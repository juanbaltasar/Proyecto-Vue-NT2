import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VuelidatePlugin } from '@vuelidate/core'
import axios from 'axios'
import VueAxios from 'vue-axios'

//import currency from './currency'

import store from './store/index'

import './bootstrap'
import 'bulma/css/bulma.css'

createApp(App)
.use(router)
.use(VuelidatePlugin)
.use(VueAxios,axios)
.use(store)
//.use(currency)
.mount('#app')