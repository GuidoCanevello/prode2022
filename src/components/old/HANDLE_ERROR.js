export default async function ({ commit, dispatch }, { err }) {
    console.log("error", err)
    switch (err.status) {
        case 401:
        case 403:
            dispatch('DISPATCH_REFRESH_TOKEN');
            break;
        default:
            dispatch('ABRIR_ERROR', err.data.message);
            break;
    }
}