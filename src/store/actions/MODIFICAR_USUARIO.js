import axios from "axios";

/**
 * Crea o actualiza una prediccion para el partido recibido
 * 
 * @param {String} nombreJugador Nombre del Jugador
 * @param {String} puntos Puntos del Jugador
 * @param {String} imagenSrc Direccion de Imagen del Jugador
 */
export default async function ({ state, commit, dispatch }, { nombreJugador, puntos, imagenSrc }) {
    nombreJugador = nombreJugador === undefined || nombreJugador === "" ? state.usuarioNombreJugador : nombreJugador;
    puntos = puntos === undefined ? state.usuarioPuntos : puntos;
    imagenSrc = imagenSrc === undefined ? state.usuarioImagenSrc : imagenSrc;

    try {
        const updUsuario = await dispatch('DISPATCH_AXIOS_REQUEST', {
            axiosRequest: async () => await axios.put(`usuarios/${localStorage.getItem('prodeLoggedUserId')}`, {
                nombreJugador, puntos, imagenSrc
            })
        });

        commit('SET_USUARIO_NOMBRE_JUGADOR', updUsuario.nombreJugador);
        commit('SET_USUARIO_IMAGEN_SRC', updUsuario.imagenSrc);
        commit('SET_USUARIO_PUNTOS', updUsuario.puntos);
        return updUsuario;
    } catch (error) {
        dispatch('ABRIR_ERROR', error.response.data.message);
    }
}