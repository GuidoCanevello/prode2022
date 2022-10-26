export default function (state) {
    let dataGrupos = [];

    const dataEquipos = state.equipos;
    const dataPartidos = state.partidos;
    const dataPredicciones = state.predicciones;

    const nombresGrupos = ["A", "B", "C", "D", "E", "F", "G", "H"];
    nombresGrupos.forEach(nombre => {
        dataGrupos.push({ nombre, equipos: [], partidos: [] });
    });

    dataEquipos.forEach(equipo => {
        let newEquipo = {
            id: equipo._id,
            nombre: equipo.nombre,
            puntos: equipo.puntos,
            code: equipo.code,
        }

        const grupoIndex = dataGrupos.findIndex(g => g.nombre === equipo.grupo);
        if (grupoIndex != -1) dataGrupos[grupoIndex].equipos.push(newEquipo);
    });

    dataPartidos.forEach(partido => {
        const objEquipo1 = dataEquipos.find(e => e._id == partido.equipo1);
        const objEquipo2 = dataEquipos.find(e => e._id == partido.equipo2);

        if (objEquipo1 === undefined || objEquipo2 === undefined) {
            throw {
                content: "Error con los datos del Servidor",
            }
        }

        const fecha = new Date(partido.fecha);

        let newPartido = {
            partidoId: partido._id,
            equipo1: objEquipo1.nombre,
            code1: objEquipo1.code,
            equipo2: objEquipo2.nombre,
            code2: objEquipo2.code,
            tienePrediccion: false,
            golesEquipo1: partido.golesEquipo1,
            golesEquipo2: partido.golesEquipo2,
            fecha,
        }

        const prediccion = dataPredicciones.find(prediccion => prediccion.partidoId == partido._id);
        if (prediccion != undefined) {
            newPartido.tienePrediccion = true;
            newPartido.prediccion = {
                golesEquipo1: prediccion.golesEquipo1,
                golesEquipo2: prediccion.golesEquipo2,
            }
        }

        const grupoIndex = dataGrupos.findIndex(g => g.nombre === partido.grupo);
        if (grupoIndex != -1) dataGrupos[grupoIndex].partidos.push(newPartido);
    });

    return dataGrupos;
}