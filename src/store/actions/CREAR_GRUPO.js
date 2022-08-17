/**
 * Crea los equipos del grupo y los partidos entre cada equipo,
 * recibe el nombre del grupo y la lista con nombres de equipos
 */
export default async function ({ state, dispatch }, { nombre, equipos }) {
    let arrIdEquipos = [];
    for (const nombreEquipo of equipos) {
        arrIdEquipos.push(
            (await dispatch("CREAR_EQUIPO", { nombre: nombreEquipo, grupo: nombre }))._id
        );
        if (state.showError) break;
    }

    if (state.showError) return;

    for (let i = 0; i < equipos.length - 1; i++) {
        const idEquipo = arrIdEquipos.splice(0, 1)[0];

        for (const idEquipo2 of arrIdEquipos) {
            await dispatch("CREAR_PARTIDO_GRUPO", { equipo1: idEquipo, equipo2: idEquipo2, nombreGrupo: nombre });
            if (state.showError) break;
        }
        if (state.showError) break;
    }
}