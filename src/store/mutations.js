export default {
    setIsLoading: (state, value) => (state.isLoading = value),
    setUsuarioId: (state, id) => (state.usuarioId = id),
    setUsuarioName: (state, nombre) => (state.usuarioName = nombre),
    setPredicciones: (state, predicciones) => (state.predicciones = predicciones),
    setEquipos: (state, equipos) => (state.equipos = equipos),
    setPartidos: (state, partidos) => (state.partidos = partidos),
    setUsuarios: (state, usuarios) => (state.usuarios = usuarios),

    updatePrediccion: (state, updPrediccion) => {
        const index = state.predicciones.findIndex(prediccion => prediccion._id === updPrediccion._id);
        if (index !== -1) {
            state.predicciones.splice(index, 1, updPrediccion);
        }
    },
}