import axios from "axios";

export default async function ({ state, commit, dispatch }) {
    if (state.hasInitialData) return;

    commit('SET_IS_LOADING_FUTBOL_DATA', true);

    try {
        //* Usuario
        const usuario = await dispatch('DISPATCH_AXIOS_REQUEST', {
            axiosRequest: async () =>
                await axios.get(`usuarios/${localStorage.getItem('prodeLoggedUserId')}`)
        });

        //* Partidos
        const partidos = await dispatch('DISPATCH_AXIOS_REQUEST', { axiosRequest: async () => await axios.get('partidos') });

        //* Equipos
        const equipos = await dispatch('DISPATCH_AXIOS_REQUEST', { axiosRequest: async () => await axios.get('equipos') });

        //* Jugadores
        const jugadores = await dispatch('DISPATCH_AXIOS_REQUEST', { axiosRequest: async () => await axios.get('jugadores') });

        //* Guardar Data
        commit('SET_USUARIO_ID', usuario._id);
        commit('SET_USUARIO_NOMBRE_CUENTA', usuario.nombreCuenta);
        commit('SET_USUARIO_NOMBRE_JUGADOR', usuario.nombreJugador);
        commit('SET_USUARIO_IMAGEN_SRC', usuario.imagenSrc);
        commit('SET_USUARIO_PUNTOS', usuario.puntos);
        commit('SET_PREDICCION_MEJOR_JUGADOR', usuario.prediccionMejorJugador);
        commit('SET_PREDICCION_MEJOR_ARQUERO', usuario.prediccionMejorArquero);
        commit('SET_PREDICCION_MEJOR_GOLEADOR', usuario.prediccionMejorGoleador);

        commit('SET_PREDICCIONES', usuario.predicciones);

        commit('SET_PARTIDOS', partidos);
        commit('SET_EQUIPOS', equipos);
        commit('SET_JUGADORES', jugadores);
        commit('SET_HAS_INITIAL_DATA', true);
    } catch (error) {
        dispatch('ABRIR_ERROR', error.response.data.message);
    } finally {
        commit('SET_IS_LOADING_FUTBOL_DATA', false);
    }
}