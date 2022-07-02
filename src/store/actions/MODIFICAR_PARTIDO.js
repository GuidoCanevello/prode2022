import axios from "axios";

/**
 * Crea o actualiza una prediccion para el partido recibido
 * 
 * @param {String} id Id del Partido
 * @param {*} data La Data del Partido
 */
export default async function ({ commit, dispatch }, { id, data }) {
    try {
        const updPartido = await dispatch('DISPATCH_AXIOS_REQUEST', {
            axiosRequest: async () => await axios.put(`partidos/${id}`, data)
        });

        commit('UPDATE_PARTIDO', updPartido);
        return updPartido;
    } catch (error) {
        dispatch('ABRIR_ERROR', error.response.data.message);
    }
}