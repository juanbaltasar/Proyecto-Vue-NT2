import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VuelidatePlugin } from '@vuelidate/core'
import axios from 'axios'
import VueAxios from 'vue-axios'

import store from './store/store'

import './plugins/bootstrap'
import 'bulma/css/bulma.css'

import { FontAwesomeIcon } from "@/plugins/font-awesome";

createApp(App)
.use(router)
.use(VuelidatePlugin)
.use(VueAxios,axios)
.use(store)
.component('fa', FontAwesomeIcon)
.mount('#app')