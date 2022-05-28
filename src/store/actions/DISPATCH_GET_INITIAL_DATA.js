import axios from "axios";

export default async function ({ state, commit, dispatch }) {
    if (state.hasInitialData) return;

    commit('SET_IS_LOADING_FUTBOL_DATA', true);

    try {

        //* Partidos
        const partidos = await dispatch('DISPATCH_AXIOS_REQUEST', { axiosRequest: async () => await axios.get('partidos') });

        //* Predicciones
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

        //* Equipos
        const equipos = await dispatch('DISPATCH_AXIOS_REQUEST', { axiosRequest: async () => await axios.get('equipos') });

        //* Guardar Data
        commit('SET_PARTIDOS', partidos);
        // commit('SET_PREDICCIONES', predicciones);
        commit('SET_EQUIPOS', equipos);
        commit('SET_HAS_INITIAL_DATA', true);
    } catch (error) {
        dispatch('ABRIR_ERROR', error.response.data.message);
    } finally {
        commit('SET_IS_LOADING_FUTBOL_DATA', false);
    }
}