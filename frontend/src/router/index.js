import { createWebHistory, createRouter } from 'vue-router'

import Inicio from '../components/producto-lista.vue'
import DetalleProducto from '../components/producto-detalle.vue'
import Carrito from '../components/carrito-compras.vue'

const routes = [
    { path: '/', name: 'Productos', component: Inicio },
    { path: '/detalleProducto/:id', name: 'DetalleProducto', component: DetalleProducto, props:true },
    { path: '/carrito', name: 'Carrito', component: Carrito}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
