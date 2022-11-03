// TODO agregar admin y guidoTest 2
const NOMBRES_USUARIOS_ESPECIALES = []

function addSorted(list, element) {
    const elementIndex = list.findIndex(e => e.puntos < element.puntos);

    if (elementIndex === -1) {
        list.push(element);
    } else {
        list.splice(elementIndex, 0, element);
    }
}

export default function (state) {
    let dataRanking = [];
    let ignoredUsers = ["ADMIN", "GuidoTest"]; // Nombre de Cuenta de los Usuarios

    const usuarios = state.usuarios.filter(user => !ignoredUsers.includes(user.nombreCuenta));

    usuarios.forEach(user => {
        addSorted(dataRanking, {
            posicion: 0,
            iconoJugador: user.imagenSrc === undefined ? '' : user.imagenSrc,
            nombreJugador: user.nombreJugador,
            puntos: user.puntos,
        });
    });

    let pos = 0;
    let previousScore = 100000;
    dataRanking.forEach(e => {
        if (e.puntos < previousScore) {
            pos++;
            previousScore = e.puntos;
        }
        e.posicion = pos;
    })

    return dataRanking;
}