import axios from "axios";

export default async function ({ commit, dispatch }) {
    commit('SET_IS_LOADING_FUTBOL_DATA', true);

    try {
        //* Partidos    
        const resPartidos = (await axios.get('partidos'));
        const partidos = resPartidos.data;

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
        const resEquipos = (await axios.get('equipos'));
        const equipos = resEquipos.data;

        //* Guardar Data
        commit('SET_PARTIDOS', partidos);
        // commit('SET_PREDICCIONES', predicciones);
        commit('SET_EQUIPOS', equipos);
        commit('SET_IS_LOADING_FUTBOL_DATA', false);
    } catch (e) {
        dispatch('ABRIR_ERROR', e.response.data.message);
    }
}