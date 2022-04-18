import crearEquipo from "./CREAR_EQUIPO";
import CREAR_PARTIDO_GRUPO from "./CREAR_PARTIDO_GRUPO";

/**
 * Crea los equipos del grupo y los partidos entre cada equipo,
 * recibe el nombre del grupo y la lista con nombres de equipos
 */
export default async function ({ commit, state }, { nombre, equipos }) {
    let arrIdEquipos = [];
    for (const nombreEquipo of equipos) {
        arrIdEquipos.push(
            (await crearEquipo({ commit, state }, { nombre: nombreEquipo, grupo: nombre }))._id
        );
    }

    for (let i = 0; i < equipos.length - 1; i++) {
        const idEquipo = arrIdEquipos.splice(0, 1)[0];

        for (const idEquipo2 of arrIdEquipos) {
            await CREAR_PARTIDO_GRUPO({ commit, state }, { equipo1: idEquipo, equipo2: idEquipo2, nombreGrupo: nombre });
        }
    }
}