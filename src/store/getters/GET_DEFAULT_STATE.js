export default () => {
    return {
        usuarioId: "",
        usuarioNombreCuenta: "",
        usuarioNombreJugador: "",
        usuarioImagenSrc: "",
        usuarioPuntos: 0,
        prediccionMejorJugador: null,
        prediccionMejorArquero: null,
        prediccionMejorGoleador: null,

        predicciones: [],
        equipos: [],
        partidos: [],
        usuarios: [],
        jugadores: [],

        isLoadingFutbolData: false,
        isLoadingUserData: false,
        isLoadingLogin: false,
        isCheckingLogin: false,

        showError: false,
        msjError: "",

        isLogged: false,
        hasInitialData: false,
    }
} 