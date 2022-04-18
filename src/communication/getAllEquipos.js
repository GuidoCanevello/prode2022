export default async function () {
    let dataEquipos = [];
    
    dataEquipos.push({
        _id: 1,
        nombre: "Argentina",
        puntos: 3,
        grupo: "C",
    })

    dataEquipos.push({
        _id: 2,
        nombre: "Arabia Saudi",
        puntos: 0,
        grupo: "C",
    })

    dataEquipos.push({
        _id: 3,
        nombre: "Mexico",
        puntos: 1,
        grupo: "C",
    })

    dataEquipos.push({
        _id: 4,
        nombre: "Polonia",
        puntos: 1,
        grupo: "C",
    })

    dataEquipos.push({
        _id: 5,
        nombre: "Belgica",
        puntos: 3,
        grupo: "F",
    })

    dataEquipos.push({
        _id: 6,
        nombre: "Canada",
        puntos: 0,
        grupo: "F",
    })

    dataEquipos.push({
        _id: 7,
        nombre: "Marruecos",
        puntos: 1,
        grupo: "F",
    })

    dataEquipos.push({
        _id: 8,
        nombre: "Croacia",
        puntos: 1,
        grupo: "F",
    })

    return dataEquipos;
}