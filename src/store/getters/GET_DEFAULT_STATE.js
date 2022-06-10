export default () => {
    return {
        usuarioId: "",
        usuarioNombreCuenta: "",
        usuarioNombreJugador: "",
        usuarioImagenSrc: "",
        usuarioPuntos: 0,

        predicciones: [],
        equipos: [],
        partidos: [],
        usuarios: [],

        isLoadingFutbolData: false,
        isLoadingUserData: false,
        isLoadingLogin: false,
        isCheckingLogin: false,

        showError: false,
        msjError: "",

        isLogged: false,
        hasInitialData: false,
        hasUserData: false,
    }
} 