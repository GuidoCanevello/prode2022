import axios from "axios";

/**
 * Modifica un Equipo
 * 
 * @param {String} id El id del Equipo
 * @param {*} data La data del equipo (incluye nombre, puntos y grupo)
 */
export default async function ({ commit, dispatch }, { id, data }) {
    try {
        const res = (await axios.put(`equipos/${id}`, data));
        const updEquipo = res.data;

        commit('UPDATE_EQUIPO', updEquipo);
        return updEquipo;
    } catch (e) {
        dispatch('ABRIR_ERROR', e.response.data.message);
    }
}