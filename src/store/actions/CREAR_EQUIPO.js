import axios from "axios";

/**
 * Crea un equipo con el nombre dado
 * 
 * @param {String} nombre Nombre del equipo
 * @param {String} grupo Nombre del grupo donde esta el equipo
 */
export default async function ({ commit, dispatch }, { nombre, grupo }) {
    try {
        const res = (await axios.post('equipos',
            {
                nombre,
                grupo
            }
        ));
        const newEquipo = res.data;

        commit('ADD_EQUIPOS', newEquipo);
        return newEquipo;
    } catch (e) {
        dispatch('ABRIR_ERROR', e.response.data.message);
    }
}