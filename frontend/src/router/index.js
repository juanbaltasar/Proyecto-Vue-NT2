import { createWebHistory, createRouter } from 'vue-router'

import Inicio from '../components/inicio.vue'
import DetalleProducto from '../components/producto-detalle.vue'
import Carrito from '../components/carrito-compras.vue'
import DefaultPage from '../components/default-page'

const routes = [
    { path: '/', name: 'inicio', component: Inicio },
    { path: '/detalleProducto/:id', name: 'DetalleProducto', component: DetalleProducto, props:true },
    { path: '/carrito', name: 'Carrito', component: Carrito },
    { path: '/:catchAll(.*)', name: 'Nofound', component: DefaultPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
