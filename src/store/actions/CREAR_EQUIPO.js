import axios from "axios";

/**
 * Crea un equipo con el nombre dado
 * 
 * @param {String} nombre Nombre del equipo
 * @param {String} grupo Nombre del grupo donde esta el equipo
 */
export default async function ({ commit, dispatch }, { nombre, grupo }) {
    try {
        const newEquipo = await dispatch('DISPATCH_AXIOS_REQUEST', {
            axiosRequest: async () => await axios.post('equipos',
                {
                    nombre,
                    grupo
                }
            )
        });

        commit('ADD_EQUIPOS', newEquipo);
        return newEquipo;
    } catch (error) {
        dispatch('ABRIR_ERROR', error.response.data.message);
    }
}