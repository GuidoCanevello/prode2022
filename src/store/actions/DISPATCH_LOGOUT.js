import axios from "axios";

export default async function ({ commit, dispatch }) {
    commit('SET_IS_LOADING_LOGIN', true);

    try {
        await axios.delete("logout", { token: localStorage.getItem('prodeRefreshToken') });
    } catch (error) {
        dispatch('ABRIR_ERROR', error.response.data.message);
    }

    localStorage.removeItem('prodeAccessToken');
    axios.defaults.headers.common['Authorization'] = "";

    localStorage.removeItem('prodeRefreshToken');
    
    dispatch('RESET_STATE');
}