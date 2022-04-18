import dataFaseGrupos from './getters/dataFaseGrupos';
import dataListado from './getters/dataListado';

export default {
    isLoading: (state) => state.isLoading,
    usuarioName: (state) => state.usuarioName,
    dataFaseGrupos,
    dataListado,
}