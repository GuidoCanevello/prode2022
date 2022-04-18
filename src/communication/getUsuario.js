export default async function (idUsuario) {
    // TODO ver como guardar data para usuario con id
    let dataUsuario = {};

    let predicciones = [];

    predicciones.push({
        _id: 1,
        golesEquipo1: 2,
        golesEquipo2: 0,
        idPartido: 1,
    });

    predicciones.push({
        _id: 2,
        golesEquipo1: 1,
        golesEquipo2: 1,
        idPartido: 3,
    });

    predicciones.push({
        _id: 3,
        golesEquipo1: 1,
        golesEquipo2: 3,
        idPartido: 5,
    });


    predicciones.push({
        _id: 4,
        golesEquipo1: 2,
        golesEquipo2: 0,
        idPartido: 8,
    });

    predicciones.push({
        _id: 5,
        golesEquipo1: 1,
        golesEquipo2: 7,
        idPartido: 9,
    });

    dataUsuario = {
        _id: 1,
        nombre: "ADMIN",
        puntos: 0,
        predicciones
    };

    return dataUsuario;
}