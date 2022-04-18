import axios from "axios";

/**
 * Crea un equipo con el nombre dado
 * 
 * @param {String} nombre Nombre del equipo
 * @param {String} grupo Nombre del grupo donde esta el equipo
 */
export default async function ({ commit, state }, { nombre, grupo }) {
    try {
        const newEquipo = await axios.post('equipos', { nombre, grupo });

        commit('ADD_EQUIPOS', newEquipo)

        return newEquipo;
    } catch (e) {
        if (e.response.status === 400) {
            throw {
                msg: BAD_REQUEST
            }
        } else {
            // ...
        }
    }
}