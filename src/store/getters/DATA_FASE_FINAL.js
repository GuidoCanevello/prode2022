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


        let newPartido = {
            partidoId: partido._id,
            idEquipo1: partido.equipo1,
            nombreEquipo1,
            idEquipo2: partido.equipo1,
            nombreEquipo2,
        };

        dataFinal.push(newPartido);
    });

    return dataFinal;
}