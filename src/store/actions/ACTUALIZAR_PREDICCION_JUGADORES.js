import axios from "axios";

/**
 * Crea o actualiza una prediccion para los mejores jugadores
 * 
 * @param {String} id Id del Partido
 * @param {*} data La Data del Partido
 */
export default async function ({ commit, dispatch }, { prediccionMejorJugador, prediccionMejorArquero, prediccionMejorGoleador }) {
    try {
        await dispatch('DISPATCH_AXIOS_REQUEST', {
            axiosRequest: async () => await axios.put(`usuarios-jugador/${localStorage.getItem('prodeLoggedUserId')}`, {
                prediccionMejorJugador, prediccionMejorArquero, prediccionMejorGoleador
            })
        });

        commit('SET_PREDICCION_MEJOR_JUGADOR', prediccionMejorJugador);
        commit('SET_PREDICCION_MEJOR_ARQUERO', prediccionMejorArquero);
        commit('SET_PREDICCION_MEJOR_GOLEADOR', prediccionMejorGoleador);
    } catch (error) {
        dispatch('ABRIR_ERROR', error.response.data.message);
    }
}