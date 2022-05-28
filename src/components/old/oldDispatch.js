export default async function ({ commit }) {
    // const response = await axios.get(
    //   'https://jsonplaceholder.typicode.com/todos'
    // );

    // commit('setTodos', response.data);

    commit('SET_IS_LOADING_FUTBOL_DATA', true);

    //* Partidos
    let partidos = [];
    let globalId = 1;
    let arrIdEquipos = [1, 2, 3, 4]

    for (let i = 0; i < 4; i++) {
        const idEquipo1 = arrIdEquipos.splice(0, 1)[0];

        for (const idEquipo2 of arrIdEquipos) {
            partidos.push({
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
            partidos.push({
                _id: globalId,
                equipo1: idEquipo1,
                equipo2: idEquipo2,
                grupo: "F",
                fecha: new Date(),
            })

            globalId++;
        }
    }

    //* Predicciones
    const predicciones = [
        {
            _id: 1,
            golesEquipo1: 2,
            golesEquipo2: 0,
            idPartido: 1,
        }, {
            _id: 2,
            golesEquipo1: 1,
            golesEquipo2: 1,
            idPartido: 3,
        }, {
            _id: 3,
            golesEquipo1: 1,
            golesEquipo2: 3,
            idPartido: 5,
        }, {
            _id: 4,
            golesEquipo1: 2,
            golesEquipo2: 0,
            idPartido: 8,
        }, {
            _id: 5,
            golesEquipo1: 1,
            golesEquipo2: 7,
            idPartido: 9,
        }
    ];

    //* Equipos
    const equipos = [
        {
            _id: 1,
            nombre: "Argentina",
            puntos: 3,
            grupo: "C",
        }, {
            _id: 2,
            nombre: "Arabia Saudi",
            puntos: 0,
            grupo: "C",
        }, {
            _id: 3,
            nombre: "Mexico",
            puntos: 1,
            grupo: "C",
        }, {
            _id: 4,
            nombre: "Polonia",
            puntos: 1,
            grupo: "C",
        }, {
            _id: 5,
            nombre: "Belgica",
            puntos: 3,
            grupo: "F",
        }, {
            _id: 6,
            nombre: "Canada",
            puntos: 0,
            grupo: "F",
        }, {
            _id: 7,
            nombre: "Marruecos",
            puntos: 1,
            grupo: "F",
        }, {
            _id: 8,
            nombre: "Croacia",
            puntos: 1,
            grupo: "F",
        }
    ];

    commit('SET_PARTIDOS', partidos);
    commit('SET_PREDICCIONES', predicciones);
    commit('SET_EQUIPOS', equipos);
    commit('SET_IS_LOADING_FUTBOL_DATA', false);
}