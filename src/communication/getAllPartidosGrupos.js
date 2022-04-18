export default async function () {
    let dataPartidos = [];
    let globalId = 1;
    let arrIdEquipos = [1, 2, 3, 4]

    for (let i = 0; i < 4; i++) {
        const idEquipo1 = arrIdEquipos.splice(0, 1)[0];

        for (const idEquipo2 of arrIdEquipos) {
            dataPartidos.push({
                _id: globalId,
                equipo1: idEquipo1,
                equipo2: idEquipo2,
                grupo: "C",
                fecha: new Date(),
            })

            globalId++;
        }
    }

    arrIdEquipos = [5, 6, 7, 8]

    for (let i = 0; i < 4; i++) {
        const idEquipo1 = arrIdEquipos.splice(0, 1)[0];

        for (const idEquipo2 of arrIdEquipos) {
            dataPartidos.push({
                _id: globalId,
                equipo1: idEquipo1,
                equipo2: idEquipo2,
                grupo: "F",
                fecha: new Date(),
            })

            globalId++;
        }
    }

    return dataPartidos;
}