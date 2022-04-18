/**
 * Crea un equipo con el nombre dado
 * 
 * @param {String} nombre Nombre del equipo
 * @param {String} grupo Nombre del grupo donde esta el equipo
 */
export default async function ({ commit }, { nombre, grupo }) {
    console.log("crea Equipo", nombre, grupo);
    return {
        _id: nombre.length,
        nombre,
        grupo
    }
}