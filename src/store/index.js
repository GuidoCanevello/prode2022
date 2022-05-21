import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// const state = {
//   usuarios: [],
// };

const state = {
  usuarioId: "",
  usuarioName: "",
  usuarioPuntos: 0,
  predicciones: [],
  equipos: [],
  partidos: [],
  usuarios: [
    {
      id: "4",
      nombre: "Rock Lee",
      puntos: 3,
    }, {
      id: "5",
      nombre: "Naruto",
      puntos: 2,
    }, {
      id: "6",
      nombre: "Sakura",
      puntos: 7,
    }, {
      id: "1",
      nombre: "ADMIN",
      puntos: 8,
    }
  ],

  isLoadingFurbolData: false,
  isLoadingLogin: false,
  
  showError: false,
  msjError: "",

  isLogged: false,
  hasInitialData: false,
};

import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
