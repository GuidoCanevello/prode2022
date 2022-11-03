<template>
  <v-card>
    <v-container>
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

        <template v-slot:[`item.fecha`]="{ item }">
          <span>{{ formatFecha(item.fecha) }}</span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
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
            <span>Ver Pronostico</span>
          </v-tooltip>

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
            <span>Actualizar Pronostico</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import obtenerNombreDia from '@/utils/obtenerNombreDia';
import addCero from '@/utils/addCero';

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
        text: "Pronostico",
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
    formatFecha(fecha) {
      const nombreDia = obtenerNombreDia(fecha.getDay()),
        dia = addCero(fecha.getDate()),
        mes = addCero(fecha.getMonth() + 1),
        hora = addCero(fecha.getHours()),
        minutos = addCero(fecha.getMinutes());

      return `${nombreDia} ${dia}/${mes} - ${hora}:${minutos}`;
    },

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
