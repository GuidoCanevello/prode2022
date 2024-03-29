import axios from "axios";

export default async function ({ commit, dispatch }, { username, password }) {
    commit('SET_IS_LOADING_LOGIN', true);

    let oldRefreshToken = localStorage.getItem('prodeRefreshToken');
    if (oldRefreshToken) await axios.delete("logout", { data: { token: localStorage.getItem('prodeRefreshToken') } });

    try {
        const response = await axios.post("login", { username, password });

        localStorage.setItem('prodeAccessToken', response.data.accessToken);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('prodeAccessToken');

        localStorage.setItem('prodeRefreshToken', response.data.refreshToken);
        localStorage.setItem('prodeLoggedUserId', response.data.userId);

        commit('SET_IS_LOGGED', true);
    } catch (error) {
        switch (error.response.status) {
            case 404:
                throw { nombreError: true }
            case 401:
                throw { passwordError: true }
            default:
                dispatch('ABRIR_ERROR', error.response.data.message);
                break;
        }
    } finally {
        commit('SET_IS_LOADING_LOGIN', false);
    }
}