export default function (state) {
    let dataListado = [];

    const dataEquipos = state.equipos;
    const dataPartidos = state.partidos;
    const dataPredicciones = state.predicciones;

    dataPartidos.forEach(partido => {
        if (!partido.esEliminatoria) dataListado.push(formatPartidoGrupo(dataEquipos, partido, dataPredicciones));
        else dataListado.push(formatPartidoFinal(dataEquipos, partido, dataPredicciones, dataPartidos.filter(p => p.esEliminatoria)));
    });

    return dataListado;
}

function formatPartidoGrupo(dataEquipos, partido, dataPredicciones) {
    const objEquipo1 = dataEquipos.find(e => e._id == partido.equipo1);
    const objEquipo2 = dataEquipos.find(e => e._id == partido.equipo2);

    if (objEquipo1 === undefined || objEquipo2 === undefined) {
        throw {
            content: "Error con los datos del Servidor",
        };
    }

    const fecha = new Date(partido.fecha);

    let newPartido = {
        partidoId: partido._id,
        equipo1: objEquipo1.nombre,
        equipo2: objEquipo2.nombre,
        grupo: partido.grupo,
        fecha,
        tienePrediccion: false,
        golesEquipo1: partido.golesEquipo1,
        golesEquipo2: partido.golesEquipo2,
        descripcionPartido: `${objEquipo1.nombre} vs. ${objEquipo2.nombre}`,
        descripcionPrediccion: "Sin Pronostico",
    };

    const prediccion = dataPredicciones.find(prediccion => prediccion.partidoId == partido._id);
    if (prediccion != undefined) {
        newPartido.tienePrediccion = true;
        newPartido.prediccion = {
            golesEquipo1: prediccion.golesEquipo1,
            golesEquipo2: prediccion.golesEquipo2,
        };
        newPartido.descripcionPrediccion = `${prediccion.golesEquipo1} - ${prediccion.golesEquipo2}`;
    }

    return newPartido;
}

function formatPartidoFinal(dataEquipos, partido, dataPredicciones, dataPartidos) {
    const objEquipo1 = dataEquipos.find(e => e._id == partido.equipo1);
    const objEquipo2 = dataEquipos.find(e => e._id == partido.equipo2);

    const fecha = new Date(partido.fecha);

    const equipo1 = objEquipo1 ?
        objEquipo1.nombre :
        (partido.tipoEliminatoria == "Tercero" ? "Perdedor" : "Ganador")
        + " de " +
        (partido.tipoEliminatoria == "Octavos" ?
            "-" :
            dataPartidos.find(p => p._id == partido.partidoEquipo1).identificadorEliminatorias),
        equipo2 = objEquipo2 ?
            objEquipo2.nombre :
            (partido.tipoEliminatoria == "Tercero" ? "Perdedor" : "Ganador")
            + " de " +
            (partido.tipoEliminatoria == "Octavos" ?
                "-" :
                dataPartidos.find(p => p._id == partido.partidoEquipo2).identificadorEliminatorias);

    let newPartido = {
        partidoId: partido._id,
        equipo1,
        equipo2,
        grupo: "-",
        fecha,
        tienePrediccion: false,
        golesEquipo1: partido.golesEquipo1 + (partido.penalesEquipo1 != undefined ? ` (${partido.penalesEquipo1})` : ""),
        golesEquipo2: partido.golesEquipo2 + (partido.penalesEquipo1 != undefined ? ` (${partido.penalesEquipo2})` : ""),
        descripcionPartido: `${equipo1} vs. ${equipo2}`,
        descripcionPrediccion: "Sin Pronostico",
    };

    const prediccion = dataPredicciones.find(prediccion => prediccion.partidoId == partido._id);
    if (prediccion != undefined) {
        newPartido.tienePrediccion = true;
        newPartido.prediccion = {
            golesEquipo1: prediccion.golesEquipo1,
            golesEquipo2: prediccion.golesEquipo2,
        };
        newPartido.descripcionPrediccion = `${prediccion.golesEquipo1} - ${prediccion.golesEquipo2}`;
    }

    return newPartido;
}
