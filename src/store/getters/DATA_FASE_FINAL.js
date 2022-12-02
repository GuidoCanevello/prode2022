export default function (state) {
    let dataFinal = [];

    const dataEquipos = state.equipos;
    const dataPartidos = state.partidos.filter(p => p.esEliminatoria);
    const dataPredicciones = state.predicciones;

    dataPartidos.forEach(partido => {
        let objEquipo1, objEquipo2;

        if (partido.equipo1 != undefined) objEquipo1 = dataEquipos.find(e => e._id == partido.equipo1);
        if (partido.equipo2 != undefined) objEquipo2 = dataEquipos.find(e => e._id == partido.equipo2);

        const nombreEquipo1 = objEquipo1 ?
            objEquipo1.nombre :
            (partido.tipoEliminatoria == "Tercero" ? "Perdedor" : "Ganador")
            + " de " +
            (partido.tipoEliminatoria == "Octavos" ?
                "-" :
                dataPartidos.find(p => p._id == partido.partidoEquipo1).identificadorEliminatorias),
            nombreEquipo2 = objEquipo2 ?
                objEquipo2.nombre :
                (partido.tipoEliminatoria == "Tercero" ? "Perdedor" : "Ganador")
                + " de " +
                (partido.tipoEliminatoria == "Octavos" ?
                    "-" :
                    dataPartidos.find(p => p._id == partido.partidoEquipo2).identificadorEliminatorias);

        const fecha = new Date(partido.fecha);

        let newPartido = {
            partidoId: partido._id,
            fecha,

            idEquipo1: partido.equipo1,
            nombreEquipo1,
            codeEquipo1: objEquipo1 ? objEquipo1.code : "",
            golesEquipo1: partido.golesEquipo1,
            penalesEquipo1: partido.penalesEquipo1,
            golesEquipo2: partido.golesEquipo2,
            penalesEquipo2: partido.penalesEquipo2,
            idEquipo2: partido.equipo1,
            nombreEquipo2,
            codeEquipo2: objEquipo2 ? objEquipo2.code : "",

            tipoEliminatoria: partido.tipoEliminatoria,
            identificadorEliminatorias: partido.identificadorEliminatorias,
            partidoEquipo1: partido.partidoEquipo1,
            partidoEquipo2: partido.partidoEquipo2,

            tienePrediccion: false,
        };

        dataFinal.push(newPartido);
    });

    dataFinal.filter(p => p.tipoEliminatoria == "Octavos").forEach(partido => {
        const prediccion = dataPredicciones.find(prediccion => prediccion.partidoId == partido.partidoId);
        if (prediccion != undefined) {
            partido.tienePrediccion = true;
            partido.prediccion = {
                ganaEquipo1: prediccion.golesEquipo1 > prediccion.golesEquipo2
            }
        }
    });

    dataFinal.filter(p => p.tipoEliminatoria == "Cuartos" || p.tipoEliminatoria == "Semifinales" || p.tipoEliminatoria == "Final").forEach(partido => {
        const prediccion = dataPredicciones.find(prediccion => prediccion.partidoId == partido._id);
        if (prediccion != undefined) {
            partido.tienePrediccion = true;
            partido.prediccion = {
                ganaEquipo1: prediccion.golesEquipo1 > prediccion.golesEquipo2
            }
        }

        const objPartidoEquipo1 = dataFinal.find(p => p.partidoId == partido.partidoEquipo1);
        const objPartidoEquipo2 = dataFinal.find(p => p.partidoId == partido.partidoEquipo2);

        partido.tienePrediccionEquipo1 = objPartidoEquipo1.tienePrediccion
        if (partido.tienePrediccionEquipo1) {
            partido.prediccionNombreEquipo1 = objPartidoEquipo1.prediccion.ganaEquipo1 ? objPartidoEquipo1.nombreEquipo1 : objPartidoEquipo1.nombreEquipo2
            partido.prediccionIdEquipo1 = objPartidoEquipo1.prediccion.ganaEquipo1 ? objPartidoEquipo1.idEquipo1 : objPartidoEquipo1.idEquipo2
        }

        partido.tienePrediccionEquipo2 = objPartidoEquipo2.tienePrediccion
        if (partido.tienePrediccionEquipo2) {
            partido.prediccionNombreEquipo2 = objPartidoEquipo2.prediccion.ganaEquipo1 ? objPartidoEquipo2.nombreEquipo1 : objPartidoEquipo2.nombreEquipo2
            partido.prediccionIdEquipo2 = objPartidoEquipo2.prediccion.ganaEquipo1 ? objPartidoEquipo2.idEquipo1 : objPartidoEquipo2.idEquipo2
        }
    });

    dataFinal.filter(p => p.tipoEliminatoria == "Tercero").forEach(partido => {
        const prediccion = dataPredicciones.find(prediccion => prediccion.partidoId == partido._id);
        if (prediccion != undefined) {
            partido.tienePrediccion = true;
            partido.prediccion = {
                ganaEquipo1: prediccion.golesEquipo1 > prediccion.golesEquipo2
            }
        }

        const objPartidoEquipo1 = dataFinal.find(p => p.partidoId == partido.partidoEquipo1);
        const objPartidoEquipo2 = dataFinal.find(p => p.partidoId == partido.partidoEquipo2);

        partido.tienePrediccionEquipo1 = objPartidoEquipo1.tienePrediccion
        if (partido.tienePrediccionEquipo1) {
            partido.prediccionNombreEquipo1 = objPartidoEquipo1.prediccion.ganaEquipo1 ? objPartidoEquipo1.nombreEquipo2 : objPartidoEquipo1.nombreEquipo1
            partido.prediccionIdEquipo1 = objPartidoEquipo1.prediccion.ganaEquipo1 ? objPartidoEquipo1.idEquipo2 : objPartidoEquipo1.idEquipo1
        }

        partido.tienePrediccionEquipo2 = objPartidoEquipo2.tienePrediccion
        if (partido.tienePrediccionEquipo2) {
            partido.prediccionNombreEquipo2 = objPartidoEquipo2.prediccion.ganaEquipo1 ? objPartidoEquipo2.nombreEquipo2 : objPartidoEquipo2.nombreEquipo1
            partido.prediccionIdEquipo2 = objPartidoEquipo2.prediccion.ganaEquipo1 ? objPartidoEquipo2.idEquipo2 : objPartidoEquipo2.idEquipo1
        }
    });

    return dataFinal;
}