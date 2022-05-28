import axios from "axios";

export default async function ({ commit }) {
    try {
        const response = await axios.post("token", { token: localStorage.getItem('prodeRefreshToken') });

        localStorage.setItem('prodeAccessToken', response.data.accessToken);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('prodeAccessToken');

        commit('SET_IS_LOGGED', true);
    } catch (error) {
        switch (error.response.status) {
            case 403:
            case 401:
                commit('SET_IS_LOGGED', false);
                break;
            default:
                throw error;
        }
    }
}