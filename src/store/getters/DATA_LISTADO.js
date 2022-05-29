function obtenerNombreDia(dia) {
    let nombre;

    switch (dia) {
        case 0:
            nombre = 'Domingo';
            break;
        case 1:
            nombre = 'Lunes';
            break;
        case 2:
            nombre = 'Martes';
            break;
        case 3:
            nombre = 'Miercoles';
            break;
        case 4:
            nombre = 'Jueves';
            break;
        case 5:
            nombre = 'Viernes';
            break;
        case 6:
            nombre = 'Sabado';
            break;
    }

    return nombre
}

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

        let fecha = "";
        if (fecha) {
            const nombreDia = obtenerNombreDia(partido.fecha.getDay()),
                dia = partido.fecha.getDate(),
                mes = partido.fecha.getMonth(),
                hora = partido.fecha.getHours(),
                minutos = partido.fecha.getMinutes();
            fecha = `${nombreDia} ${dia}-${mes} / ${hora}:${minutos}`;
        }

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