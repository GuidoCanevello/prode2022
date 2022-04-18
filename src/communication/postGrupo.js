import postEquipo from "./postEquipo";
import postPartidoGrupo from "./postPartidoGrupo";

/**
 * Crea los equipos del grupo y los partidos entre cada equipo
 * 
 * @param {String} nombre Nombre del grupo
 * @param {String[]} equipos Nombres de los equipos del grupo
 */
export default async function (nombre, equipos) {
    if (equipos.length == 4) {
        let arrIdEquipos = [];

        for (const nombreEquipo of equipos) {
            const newEquipo = await postEquipo(nombreEquipo, nombre);
            arrIdEquipos.push(newEquipo._id);
        }

        for (let i = 0; i < equipos.length - 1; i++) {
            const idEquipo = arrIdEquipos.splice(0, 1)[0];

            for (const idEquipo2 of arrIdEquipos) {
                await postPartidoGrupo(idEquipo, idEquipo2, nombre);
            }
        }
    } else {
        throw {
            content: "Incorrecta cantidad de equipos",
        }
    }
}