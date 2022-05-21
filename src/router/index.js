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
    path: '/predicciones',
    name: 'Predicciones',
    component: () => import(/* webpackChunkName: "about" */ '../views/Predicciones.view'),
    children: [
      {
        path: 'listado',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../views/predicciones/Listado.view'),
      },
      {
        path: 'fase-grupos',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../views/predicciones/FaseGrupos.view'),
      },
      {
        path: 'fase-final',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../views/predicciones/FaseFinal.view'),
      }
    ]
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
  mode: 'history',
  routes
})

export default router
