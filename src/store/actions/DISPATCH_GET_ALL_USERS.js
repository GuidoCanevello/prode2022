import axios from "axios";

export default async function ({ state, commit, dispatch }) {
    if (state.hasUserData) return;

    commit('SET_IS_LOADING_USERS_DATA', true);

    try {
        //* Usuario
        const usuarios = await dispatch('DISPATCH_AXIOS_REQUEST', {
            axiosRequest: async () =>
                await axios.get(`usuarios`)
        });

        commit('SET_USUARIOS', usuarios);
        commit('SET_HAS_USER_DATA', true);
    } catch (error) {
        dispatch('ABRIR_ERROR', error.response.data.message);
    } finally {
        commit('SET_IS_LOADING_USERS_DATA', false);
    }
}