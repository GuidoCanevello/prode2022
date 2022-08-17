/**
 * Executes the received axiosRequest, and refreshes the token if it has expired
 * 
 * @returns the contents of response.data
 */
export default async function ({ dispatch }, { axiosRequest }) {
    let response;

    try {
        response = await axiosRequest();
        return response.data;
    } catch (error) {
        switch (error.response.status) {
            case 401:
            case 403:
                await dispatch('DISPATCH_REFRESH_TOKEN');

                response = await axiosRequest();
                return response.data;
            default:
                throw error;
        }
    }
}