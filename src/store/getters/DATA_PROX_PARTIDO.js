export default function (state) {
    let proximoPartido;

    const dataEquipos = state.equipos;
    const dataPredicciones = state.predicciones;
    const dataPartidos = state.partidos;

    let ultimoPartido;
    dataPartidos.forEach(partido => {
        let fechaPartido = new Date(partido.fecha);
        if (new Date() < fechaPartido && (ultimoPartido === undefined || (ultimoPartido.fecha && new Date(ultimoPartido.fecha) > fechaPartido))) {
            ultimoPartido = partido;
        }
    })

    if (ultimoPartido) {
        proximoPartido = {
            partidoId: ultimoPartido._id,
            equipo1: dataEquipos.find(e => e._id == ultimoPartido.equipo1).nombre,
            code1: dataEquipos.find(e => e._id == ultimoPartido.equipo1).code,
            equipo2: dataEquipos.find(e => e._id == ultimoPartido.equipo2).nombre,
            code2: dataEquipos.find(e => e._id == ultimoPartido.equipo2).code,
            grupo: ultimoPartido.grupo,
            fecha: new Date(ultimoPartido.fecha),
            tienePrediccion: false,
        }

        const prediccion = dataPredicciones.find(prediccion => prediccion.partidoId == ultimoPartido._id);
        if (prediccion != undefined) {
            proximoPartido.tienePrediccion = true;
            proximoPartido.prediccion = {
                golesEquipo1: prediccion.golesEquipo1,
                golesEquipo2: prediccion.golesEquipo2,
            }
        }
    }

    return proximoPartido;
}