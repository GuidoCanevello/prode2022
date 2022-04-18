import DATA_FASE_GRUPOS from './getters/DATA_FASE_GRUPOS';
import DATA_LISTADO from './getters/DATA_LISTADO';

export default {    
    IS_LOADING_FUTBOL_DATA: (state) => state.isLoadingFurbolData,

    USUARIO_NAME: (state) => state.usuarioName,
    EQUIPOS: (state) => state.equipos,
    PARTIDOS: (state) => state.partidos,
    DATA_FASE_GRUPOS,
    DATA_LISTADO,

    SHOW_ERROR: (state) => state.showError,
    MSJ_ERROR: (state) => state.msjError,
}