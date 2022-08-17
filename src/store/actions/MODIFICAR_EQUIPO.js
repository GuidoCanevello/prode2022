import axios from "axios";

/**
 * Modifica un Equipo
 * 
 * @param {String} id El id del Equipo
 * @param {*} data La data del equipo (incluye nombre, puntos y grupo)
 */
export default async function ({ commit, dispatch }, { id, data }) {
    try {
        const updEquipo = await dispatch('DISPATCH_AXIOS_REQUEST', {
            axiosRequest: async () => await axios.put(`equipos/${id}`, data)
        });

        commit('UPDATE_EQUIPO', updEquipo);
        return updEquipo;
    } catch (error) {
        dispatch('ABRIR_ERROR', error.response.data.message);
    }
}