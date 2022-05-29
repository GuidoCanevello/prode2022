import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import GET_DEFAULT_STATE from './getters/GET_DEFAULT_STATE';

const state = GET_DEFAULT_STATE();

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
