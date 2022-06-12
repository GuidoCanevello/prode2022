import GET_DEFAULT_STATE from "./getters/GET_DEFAULT_STATE";

export default {
    SET_USUARIO_ID: (state, id) => (state.usuarioId = id),
    SET_USUARIO_NOMBRE_CUENTA: (state, nombre) => (state.usuarioNombreCuenta = nombre),
    SET_USUARIO_NOMBRE_JUGADOR: (state, nombre) => (state.usuarioNombreJugador = nombre),
    SET_USUARIO_IMAGEN_SRC: (state, src) => (state.usuarioImagenSrc = src),
    SET_USUARIO_PUNTOS: (state, puntos) => (state.usuarioPuntos = puntos),

    SET_PREDICCIONES: (state, predicciones) => (state.predicciones = predicciones),

    SET_EQUIPOS: (state, equipos) => (state.equipos = equipos),
    ADD_EQUIPOS: (state, newEquipo) => (state.equipos.push(newEquipo)),
    UPDATE_EQUIPO: (state, updEquipo) => {
        const index = state.equipos.findIndex(equipo => equipo._id === updEquipo._id);
        if (index !== -1) {
            state.equipos.splice(index, 1, updEquipo);
        }
    },

    SET_PARTIDOS: (state, partidos) => (state.partidos = partidos),
    ADD_PARTIDOS: (state, newPartido) => (state.partidos.push(newPartido)),
    UPDATE_PARTIDO: (state, updPartido) => {
        const index = state.partidos.findIndex(partido => partido._id === updPartido._id);
        if (index !== -1) {
            state.partidos.splice(index, 1, updPartido);
        }
    },
    UPDATE_PREDICCION: (state, updPrediccion) => {
        const index = state.predicciones.findIndex(prediccion => prediccion._id === updPrediccion._id);
        if (index !== -1) {
            state.predicciones.splice(index, 1, updPrediccion);
        } else {
            state.predicciones.push(updPrediccion);
        }
    },

    SET_USUARIOS: (state, usuarios) => (state.usuarios = usuarios),

    SET_IS_LOADING_FUTBOL_DATA: (state, value) => (state.isLoadingFutbolData = value),
    SET_IS_LOADING_USERS_DATA: (state, value) => (state.isLoadingUserData = value),
    SET_IS_LOADING_LOGIN: (state, value) => (state.isLoadingLogin = value),
    SET_IS_CHECKING_LOGIN: (state, value) => (state.isCheckingLogin = value),

    SET_SHOW_ERROR: (state, value) => (state.showError = value),
    SET_MSJ_ERROR: (state, mensaje) => (state.msjError = mensaje),

    SET_IS_LOGGED: (state, value) => (state.isLogged = value),
    SET_HAS_INITIAL_DATA: (state, value) => (state.hasInitialData = value),
    SET_HAS_USER_DATA: (state, value) => (state.hasUserData = value),

    RESET_STATE: (state) => {
        Object.assign(state, GET_DEFAULT_STATE())
    },
}