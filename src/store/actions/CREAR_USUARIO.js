import axios from "axios";

/**
 * Crea un Usuario,
 * recibe el nombre del Usuario y su contraseña
 */
 export default async function ({ dispatch }, { nombreCuenta, password }) {
    try {
        const newUser = await dispatch('DISPATCH_AXIOS_REQUEST', {
            axiosRequest: async () => await axios.post('usuarios',
                {
                    nombreCuenta,
                    password
                }
            )
        });

        return newUser;
    } catch (error) {
        dispatch('ABRIR_ERROR', error.response.data.message);
    }
}