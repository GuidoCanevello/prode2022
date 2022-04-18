
export default async function postEquipo(nombre, grupo) {
    console.log("crea Equipo", nombre, grupo);
    return {
        _id: nombre.length,
        nombre,
        grupo
    }
}