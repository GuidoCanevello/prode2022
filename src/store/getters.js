import DATA_FASE_GRUPOS from './getters/DATA_FASE_GRUPOS';
import DATA_RANKING from './getters/DATA_RANKING';
import DATA_LISTADO from './getters/DATA_LISTADO';

export default {
    USUARIO_NOMBRE_CUENTA: (state) => state.usuarioNombreCuenta,
    USUARIO_NOMBRE_JUGADOR: (state) => state.usuarioNombreJugador,
    USUARIO_IMAGEN_SRC: (state) => state.usuarioImagenSrc,
    USUARIO_PUNTOS: (state) => state.usuarioPuntos,

    EQUIPOS: (state) => state.equipos,
    PARTIDOS: (state) => state.partidos,
    PREDICCIONES: (state) => state.predicciones,
    DATA_FASE_GRUPOS,
    DATA_RANKING,
    DATA_LISTADO,

    IS_LOADING_FUTBOL_DATA: (state) => state.isLoadingFutbolData,
    IS_LOADING_USERS_DATA: (state) => state.isLoadingUserData,
    IS_LOADING_LOGIN: (state) => state.isLoadingLogin,

    SHOW_ERROR: (state) => state.showError,
    MSJ_ERROR: (state) => state.msjError,
    IS_LOGGED: (state) => state.isLogged,
    HAS_INITIAL_DATA: (state) => state.hasInitialData,
}