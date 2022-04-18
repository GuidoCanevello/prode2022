/**
 * Modifica un Equipo
 * 
 * @param {String} id El id del Equipo
 * @param {*} data La data del equipo (incluye nombre, puntos y grupo)
 */
export default async function postEquipo({ commit }, { id, data }) {
    console.log("modifica Equipo", id, data);
}