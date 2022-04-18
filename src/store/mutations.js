export default {
    SET_IS_LOADING_FUTBOL_DATA: (state, value) => (state.isLoadingFurbolData = value),
    SET_USUARIO_ID: (state, id) => (state.usuarioId = id),
    SET_USUARIO_NAME: (state, nombre) => (state.usuarioName = nombre),
    SET_PREDICCIONES: (state, predicciones) => (state.predicciones = predicciones),
    
    SET_EQUIPOS: (state, equipos) => (state.equipos = equipos),
    ADD_EQUIPOS: (state, newEquipo) => (state.equipos.push(newEquipo)),

    SET_PARTIDOS: (state, partidos) => (state.partidos = partidos),
    ADD_PARTIDOS: (state, newPartido) => (state.partidos.push(newPartido)),

    SET_USUARIOS: (state, usuarios) => (state.usuarios = usuarios),

    UPDATE_PREDICCION: (state, updPrediccion) => {
        const index = state.predicciones.findIndex(prediccion => prediccion._id === updPrediccion._id);
        if (index !== -1) {
            state.predicciones.splice(index, 1, updPrediccion);
        }
    },
}