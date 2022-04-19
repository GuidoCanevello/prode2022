import axios from "axios";

/**
 * Crea un partido dentro del grupo recibido entre los dos equipos
 */
export default async function ({ commit, dispatch }, { equipo1, equipo2, nombreGrupo }) {
    try {
        const res = (await axios.post('partidos',
            {
                equipo1,
                equipo2,
                grupo: nombreGrupo,
            }
        ));
        const newPartido = res.data;

        commit('ADD_PARTIDOS', newPartido);
        return newPartido;
    } catch (e) {
        dispatch('ABRIR_ERROR', e.response.data.message);
    }
}