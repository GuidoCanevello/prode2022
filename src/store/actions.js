import DISPATCH_GET_INITIAL_DATA from './actions/DISPATCH_GET_INITIAL_DATA';
import CREAR_GRUPO from './actions/CREAR_GRUPO';
import CREAR_EQUIPO from './actions/CREAR_EQUIPO';
import MODIFICAR_EQUIPO from './actions/MODIFICAR_EQUIPO';
import CREAR_PARTIDO_GRUPO from './actions/CREAR_PARTIDO_GRUPO';
import DISPATCH_LOGIN from './actions/DISPATCH_LOGIN';
import DISPATCH_AXIOS_REQUEST from './actions/DISPATCH_AXIOS_REQUEST';
import DISPATCH_REFRESH_TOKEN from './actions/DISPATCH_REFRESH_TOKEN';
import axios from 'axios';

export default {
  DISPATCH_GET_INITIAL_DATA,
  CREAR_GRUPO,
  CREAR_EQUIPO,
  MODIFICAR_EQUIPO,
  CREAR_PARTIDO_GRUPO,

  DISPATCH_LOGIN,
  DISPATCH_AXIOS_REQUEST,
  DISPATCH_REFRESH_TOKEN,

  ABRIR_ERROR: ({ commit }, mensaje) => {
    commit('SET_SHOW_ERROR', true);
    commit('SET_MSJ_ERROR', mensaje);
  },
  CERRAR_ERROR: ({ commit }) => (commit('SET_SHOW_ERROR', false)),

  CHECK_LOGIN_STATUS: ({ state, commit }) => {
    let response = true;

    if (!state.isLogged) {
      let refreshToken = localStorage.getItem('prodeRefreshToken');
      if (refreshToken) {
        commit('SET_IS_LOGGED', true);
      } else {
        response = false;
      }
    }

    return response;
  },

  // TODO remove
  DISPATCH_TEST: async ({ dispatch }) => {
    await dispatch('DISPATCH_AXIOS_REQUEST', { axiosRequest: async () => await axios.get('test') });
    console.log("test realizado")
  }
}