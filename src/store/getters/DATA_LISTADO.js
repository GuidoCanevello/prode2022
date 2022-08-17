export default function (state) {
    let dataListado = [];

    const dataEquipos = state.equipos;
    const dataPartidos = state.partidos;
    const dataPredicciones = state.predicciones;

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
            equipo2: objEquipo2.nombre,
            grupo: partido.grupo,
            fecha,
            tienePrediccion: false,
            descripcionPartido: `${objEquipo1.nombre} vs. ${objEquipo2.nombre}`,
            descripcionPrediccion: "Sin Predicción",
        }

        const prediccion = dataPredicciones.find(prediccion => prediccion.partidoId == partido._id);
        if (prediccion != undefined) {
            newPartido.tienePrediccion = true;
            newPartido.prediccion = {
                golesEquipo1: prediccion.golesEquipo1,
                golesEquipo2: prediccion.golesEquipo2,
            }
            newPartido.descripcionPrediccion = `${prediccion.golesEquipo1} - ${prediccion.golesEquipo2}`;
        }

        dataListado.push(newPartido);
    });

    return dataListado;
}