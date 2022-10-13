<template>
  <v-card>
    <v-card-title primary-title> Listado de Partidos </v-card-title>

    <v-card-text>
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
        sort-by="fecha"
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
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import obtenerNombreDia from "@/utils/obtenerNombreDia";
import addCero from "@/utils/addCero";

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
