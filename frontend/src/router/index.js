import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',

    component: () => import( '../views/About.vue')
  }
  ,
  {
    path: '/login',
    name: 'Login',

    component: () => import( '../views/Login.vue')
  }
  ,
  {
    path: '/categoria',
    name: 'Categoria',

    component: () => import( '../views/Categorias.vue')
  }
  ,
  {
    path: '/articulo',
    name: 'Articulos',
    component: () => import( '../views/Articulos.vue')
  },
  {
    path: '/compra',
    name: 'Ingresos',
    component: () => import( '../views/Ingresos.vue')
  },
  {
    path: '/usuario',
    name: 'Usuarios',
    component: () => import( '../views/Usuarios.vue')
  },
  {
    path: '/ventas',
    name: 'Ventas',
    component: () => import( '../views/Ventas.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if( ! store.state.token && to.path != '/login'){
    next({name:'Login'})
  }else{
    next();
  }
})

export default router
