/**
 * Crea un partido dentro del grupo recibido entre los dos equipos
 * 
 * @param {String} equipo1 Nombre equipo 1
 * @param {String} equipo2 Nombre equipo 2
 * @param {String} nombreGrupo Nombre del grupo donde se encuentra el partido
 */
export default async function ({ commit, state }, { equipo1, equipo2, nombreGrupo }) {
    console.log("crea Partido", equipo1 + " vs. " + equipo2, "para", nombreGrupo);

    let newPartido = {
        _id: state.partidos.length + 1,
        equipo1,
        equipo2,
        grupo: nombreGrupo,
        fecha: new Date(),
    }

    commit('ADD_PARTIDOS', newPartido)
    
    return newPartido;
}