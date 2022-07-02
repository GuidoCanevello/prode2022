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

    const usuarios = state.usuarios;

    usuarios.forEach(user => {
        addSorted(dataRanking, {
            posicion: 0,
            iconoJugador: user.imagenSrc === undefined ? '' : user.imagenSrc,
            nombreJugador: user.nombreJugador,
            puntos: user.puntos,
        });
    });

    let pos = 0;
    // REVIEW ver si puntaje no puede ser mayor a esto
    let previousScore = 10000; 
    dataRanking.forEach(e => {
        if(e.puntos < previousScore) {
            pos++;
            previousScore = e.puntos;
        }
        e.posicion = pos;
    })

    return dataRanking;
}