import axios from "axios";

/**
 * Crea o actualiza una prediccion para el partido recibido
 * 
 * @param {String} id Id del Partido
 * @param {*} data La Data del Partido
 */
export default async function ({ commit, dispatch }, { id, data }) {
    try {
        await dispatch('DISPATCH_AXIOS_REQUEST', {
            axiosRequest: async () => await axios.put(`partidos/${id}/update_score_final`, data)
        });

        commit('UPDATE_PARTIDO_RESULTADO', { ...data, _id: id });
    } catch (error) {
        dispatch('ABRIR_ERROR', error.response.data.message);
    }
}