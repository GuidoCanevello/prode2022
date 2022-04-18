import crearEquipo from "./crearEquipo";
import crearPartidoGrupo from "./crearPartidoGrupo";

/**
 * Crea los equipos del grupo y los partidos entre cada equipo
 * 
 * @param {String} nombre Nombre del grupo
 * @param {String[]} equipos Nombres de los equipos del grupo
 */
export default async function ({ commit }, { nombre, equipos }) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            if (equipos.length == 4) {
                let arrIdEquipos = [];

                for (const nombreEquipo of equipos) {
                    const newEquipo = await crearEquipo({ commit }, { nombre: nombreEquipo, grupo: nombre });
                    arrIdEquipos.push(newEquipo._id);
                }

                for (let i = 0; i < equipos.length - 1; i++) {
                    const idEquipo = arrIdEquipos.splice(0, 1)[0];

                    for (const idEquipo2 of arrIdEquipos) {
                        await crearPartidoGrupo({ commit }, { equipo1: idEquipo, equipo2: idEquipo2, nombreGrupo: nombre });
                    }
                }
            } else {
                throw {
                    content: "Incorrecta cantidad de equipos",
                }
            }
            resolve();
        }, 2000);
    })
}