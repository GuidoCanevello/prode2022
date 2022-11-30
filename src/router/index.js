import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.view')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.view')
  },
  {
    path: '/fase-grupos',
    name: 'Fase de Grupos',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/FaseGrupos.view'),
  },
  {
    path: '/fase-final',
    name: 'Fase Final',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/FaseFinal.view'),
  },
  {
    path: '/mejores-jugadores',
    name: 'Mejores Jugadores',
    component: () => import(/* webpackChunkName: "about" */ '../views/MVP.view'),
  },
  {
    path: '/calendario',
    name: 'Calendario',
    component: () => import(/* webpackChunkName: "about" */ '../views/Calendario.view')
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ranking.view')
  },
  {
    path: '/reglamento',
    name: 'Reglamento',
    component: () => import(/* webpackChunkName: "about" */ '../views/Reglamento.view')
  },
  {
    path: '/backend',
    name: 'Admin Window',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminWindow.view')
  },
]

const router = new VueRouter({
  base: "/prode2022",
  mode: 'hash',
  routes
})

export default router
