import axios from "axios";

export default async function ({ commit, dispatch }) {
    commit('SET_IS_LOADING_USERS_DATA', true);

    try {
        //* Usuario
        const usuarios = await dispatch('DISPATCH_AXIOS_REQUEST', {
            axiosRequest: async () =>
                await axios.get(`usuarios`)
        });

        commit('SET_USUARIOS', usuarios);
    } catch (error) {
        dispatch('ABRIR_ERROR', error.response.data.message);
    } finally {
        commit('SET_IS_LOADING_USERS_DATA', false);
    }
}