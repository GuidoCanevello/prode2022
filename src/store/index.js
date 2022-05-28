import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = GET_DEFAULT_STATE();

import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import GET_DEFAULT_STATE from './GET_DEFAULT_STATE';

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
