<template>
  <v-card>
    <v-container grid-list-xs>
      <v-data-table
        :headers="headers"
        :items="DATA_LISTADO"
        item-key="id"
        :items-per-page="15"
        :search="busqueda"
        :custom-filter="filtrarEquipo"
        :loading="IS_LOADING_FUTBOL_DATA"
        loading-text="Cargando Partidos..."
        dense
        class="table-partidos"
        :item-class="fondoItem"
      >
        <template v-slot:top>
          <v-text-field
            v-model="busqueda"
            label="Buscar por Equipo"
            class="mx-4"
          ></v-text-field>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <!-- REALIZAR PREDICCION -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                class="mr-2"
                @click="handlePredecir(item)"
                v-bind="attrs"
                v-on="on"
              >
                mdi-head-snowflake
              </v-icon>
            </template>
            <span>Realizar Predicción</span>
          </v-tooltip>

          <!-- VER PREDICCION -->
          <v-tooltip v-if="item.tienePrediccion" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                class="mr-2"
                @click="handleView(item)"
                v-bind="attrs"
                v-on="on"
              >
                mdi-card-search
              </v-icon>
            </template>
            <span>Ver Predicción</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ListadoPartidos",
  data: () => ({
    busqueda: "",

    headers: [
      {
        text: "Partidos",
        align: "start",
        sortable: false,
        value: "descripcionPartido",
      },
      {
        text: "Predicción",
        sortable: false,
        filterable: false,
        value: "descripcionPrediccion",
      },
      { text: "Grupo", value: "grupo", filterable: false },
      { text: "Fecha y Hora", value: "fecha", align: "end", filterable: false },
      {
        text: "Acciones",
        sortable: false,
        filterable: false,
        align: "end",
        value: "actions",
      },
    ],
  }),

  computed: mapGetters(["IS_LOADING_FUTBOL_DATA", "DATA_LISTADO"]),

  methods: {
    fondoItem(item) {
      return item.tienePrediccion ? "fila-con-prediccion" : "";
    },
    filtrarEquipo(value, busqueda, item) {
      let equipos = value ? value.toString().toLocaleUpperCase() : "";
      let busquedaAux = busqueda ? busqueda.toLocaleUpperCase() : "";
      return (
        equipos != "" && busqueda != "" && equipos.indexOf(busquedaAux) !== -1
      );
    },
    handlePredecir(item) {
      // TODO reemplazar por uso de vuex actions
      this.$emit("realizar-prediccion", item.partidoId);
    },

    handleView(item) {
      this.$emit("ver-prediccion", item.partidoId);
    },
  },
};
</script>

<style>
.fila-con-prediccion {
  background-color: #e1f5fe;
}

.table-partidos .fila-con-prediccion:hover {
  background-color: #b3e5fc !important;
}
</style>
