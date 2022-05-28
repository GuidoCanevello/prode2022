import axios from "axios";

/**
 * Crea una prediccion para el partido recibido
 * 
 * @param {String} partidoId Id del partido
 * @param {String} golesEquipo1 Goles para el equipo 1
 * @param {String} golesEquipo2 Goles para el equipo 2
 */
export default async function ({ state, commit, dispatch }, { partidoId, golesEquipo1, golesEquipo2 }) {
    try {
        const newPrediccion = await dispatch('DISPATCH_AXIOS_REQUEST', {
            axiosRequest: async () => await axios.post(`usuarios/${state.usuarioId}/prediccion`,
                {
                    partidoId,
                    golesEquipo1,
                    golesEquipo2,
                }
            )
        });

        commit('ADD_EQUIPOS', newPrediccion);
        return newPrediccion;
    } catch (error) {
        dispatch('ABRIR_ERROR', error.response.data.message);
    }
}