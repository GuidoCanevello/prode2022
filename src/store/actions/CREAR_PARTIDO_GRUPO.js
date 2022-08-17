import axios from "axios";

/**
 * Crea un partido dentro del grupo recibido entre los dos equipos
 */
export default async function ({ commit, dispatch }, { equipo1, equipo2, nombreGrupo }) {
    try {
        const newPartido = await dispatch('DISPATCH_AXIOS_REQUEST', {
            axiosRequest: async () => await axios.post('partidos',
                {
                    equipo1,
                    equipo2,
                    grupo: nombreGrupo,
                }
            )
        });

        commit('ADD_PARTIDOS', newPartido);
        return newPartido;
    } catch (error) {
        dispatch('ABRIR_ERROR', error.response.data.message);
    }
}