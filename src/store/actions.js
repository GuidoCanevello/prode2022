import DISPATCH_GET_INITIAL_DATA from './actions/DISPATCH_GET_INITIAL_DATA';
import DISPATCH_GET_ALL_USERS from './actions/DISPATCH_GET_ALL_USERS';
import MODIFICAR_PREDICCION from './actions/MODIFICAR_PREDICCION';
import MODIFICAR_USUARIO from './actions/MODIFICAR_USUARIO';
import CREAR_GRUPO from './actions/CREAR_GRUPO';
import CREAR_EQUIPO from './actions/CREAR_EQUIPO';
import CREAR_USUARIO from './actions/CREAR_USUARIO';
import MODIFICAR_EQUIPO from './actions/MODIFICAR_EQUIPO';
import MODIFICAR_PARTIDO from './actions/MODIFICAR_PARTIDO';
import ACTUALIZAR_RESULTADO from './actions/ACTUALIZAR_RESULTADO';
import ACTUALIZAR_RESULTADO_FINAL from './actions/ACTUALIZAR_RESULTADO_FINAL';
import ACTUALIZAR_PREDICCION_JUGADORES from './actions/ACTUALIZAR_PREDICCION_JUGADORES';
import CREAR_PARTIDO_GRUPO from './actions/CREAR_PARTIDO_GRUPO';
import DISPATCH_LOGIN from './actions/DISPATCH_LOGIN';
import DISPATCH_LOGOUT from './actions/DISPATCH_LOGOUT';
import DISPATCH_AXIOS_REQUEST from './actions/DISPATCH_AXIOS_REQUEST';
import DISPATCH_REFRESH_TOKEN from './actions/DISPATCH_REFRESH_TOKEN';

export default {
  RESET_STATE: ({ commit }) => commit('RESET_STATE'),

  DISPATCH_GET_INITIAL_DATA,
  DISPATCH_GET_ALL_USERS,
  CREAR_GRUPO,
  CREAR_EQUIPO,
  CREAR_USUARIO,

  MODIFICAR_PREDICCION,
  MODIFICAR_USUARIO,
  MODIFICAR_EQUIPO,
  MODIFICAR_PARTIDO,
  ACTUALIZAR_RESULTADO,
  ACTUALIZAR_RESULTADO_FINAL,
  ACTUALIZAR_PREDICCION_JUGADORES,

  CREAR_PARTIDO_GRUPO,

  DISPATCH_LOGIN,
  DISPATCH_LOGOUT,
  DISPATCH_AXIOS_REQUEST,
  DISPATCH_REFRESH_TOKEN,

  ABRIR_ERROR: ({ commit }, mensaje) => {
    commit('SET_SHOW_ERROR', true);
    commit('SET_MSJ_ERROR', mensaje);
  },
  CERRAR_ERROR: ({ commit }) => (commit('SET_SHOW_ERROR', false)),

  CHECK_LOGIN_STATUS: async ({ state, commit, dispatch }) => {
    let response = true;

    if (!state.isLogged) {
      let refreshToken = localStorage.getItem('prodeRefreshToken');
      if (refreshToken) {
        try {
          commit('SET_IS_LOADING_LOGIN', true);

          await dispatch('DISPATCH_REFRESH_TOKEN');
        } catch (error) {
          dispatch('ABRIR_ERROR', error.response.data.message);
        } finally {
          commit('SET_IS_LOADING_LOGIN', false);
        }
      } else {
        response = false;
      }
    }

    return response;
  },
}