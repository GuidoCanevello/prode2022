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

        // const predicciones = [
        //     {
        //         _id: 1,
        //         golesEquipo1: 2,
        //         golesEquipo2: 0,
        //         idPartido: 1,
        //     }, {
        //         _id: 2,
        //         golesEquipo1: 1,
        //         golesEquipo2: 1,
        //         idPartido: 3,
        //     }, {
        //         _id: 3,
        //         golesEquipo1: 1,
        //         golesEquipo2: 3,
        //         idPartido: 5,
        //     }, {
        //         _id: 4,
        //         golesEquipo1: 2,
        //         golesEquipo2: 0,
        //         idPartido: 8,
        //     }, {
        //         _id: 5,
        //         golesEquipo1: 1,
        //         golesEquipo2: 7,
        //         idPartido: 9,
        //     }
        // ];

        //* Partidos
        const partidos = await dispatch('DISPATCH_AXIOS_REQUEST', { axiosRequest: async () => await axios.get('partidos') });

        //* Equipos
        const equipos = await dispatch('DISPATCH_AXIOS_REQUEST', { axiosRequest: async () => await axios.get('equipos') });

        //* Guardar Data
        commit('SET_USUARIO_NOMBRE_CUENTA', usuario.nombreCuenta);
        commit('SET_USUARIO_NOMBRE_JUGADOR', usuario.nombreJugador);
        commit('SET_USUARIO_PUNTOS', usuario.puntos);

        commit('SET_PREDICCIONES', usuario.predicciones);

        commit('SET_PARTIDOS', partidos);
        commit('SET_EQUIPOS', equipos);
        commit('SET_HAS_INITIAL_DATA', true);
    } catch (error) {
        dispatch('ABRIR_ERROR', error.response.data.message);
    } finally {
        commit('SET_IS_LOADING_FUTBOL_DATA', false);
    }
}