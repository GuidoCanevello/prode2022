<template>
  <v-card>
    <v-card-title primary-title>
      <v-row>
        <v-col cols="auto"> Listado de Partidos </v-col>
        <template v-if="IS_SCREEN_BEYOND_MEDIUM">
          <v-spacer />
          <v-col cols="auto" style="text-align: end">
            <v-btn
              text
              color="success"
              @click="handleIrAFaseGrupos"
              outlined
            >
              Fase de Grupos
            </v-btn>
          </v-col>
          <v-col cols="auto" class="pl-0" style="text-align: end">
            <v-btn
              text
              color="success"
              @click="handleIrAFaseFinal"
              outlined
            >
              Fase Final
            </v-btn>
          </v-col>
        </template>
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="DATA_LISTADO"
        item-key="id"
        :items-per-page="IS_SCREEN_BEYOND_MEDIUM ? 15 : 5"
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

    <v-card-subtitle v-if="!IS_SCREEN_BEYOND_MEDIUM">
      <v-row>
        <v-col cols="auto">
          <v-btn text color="success" @click="handleIrAFaseGrupos" outlined>
            Fase de Grupos
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn text color="success" @click="handleIrAFaseFinal" outlined>
            Fase Final
          </v-btn>
        </v-col>
      </v-row>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import obtenerNombreDia from "@/utils/obtenerNombreDia";
import addCero from "@/utils/addCero";
import toResultado from "../../utils/toResultado";

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
      {
        text: "Grupo",
        value: "grupo",
        filterable: false,
        align: " d-none d-md-table-cell",
      },
      { text: "Fecha y Hora", value: "fecha", align: "end", filterable: false },
    ],
  }),

  computed: mapGetters([
    "IS_LOADING_FUTBOL_DATA",
    "DATA_LISTADO",
    "IS_SCREEN_BEYOND_MEDIUM",
    "IS_SCREEN_BEYOND_LARGE",
  ]),

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
      if (item.tienePrediccion) {
        if (new Date(item.fecha) < new Date() && item.golesEquipo1 != undefined && item.golesEquipo2 != undefined) {
          if (
            item.golesEquipo1 == item.prediccion.golesEquipo1 &&
            item.golesEquipo2 == item.prediccion.golesEquipo2
          )
            return "fila-con-prediccion-correcta";
          else if (
            toResultado(item.prediccion.golesEquipo1, item.prediccion.golesEquipo2) ==
            toResultado(item.golesEquipo1, item.golesEquipo2)
          )
            return "fila-con-prediccion-acertada";
          else return "fila-con-prediccion-erronea";
        } else {
          return "fila-con-prediccion";
        }
      } else {
        return "";
      }
    },

    filtrarEquipo(value, busqueda, item) {
      let equipos = value ? value.toString().toLocaleUpperCase() : "";
      let busquedaAux = busqueda ? busqueda.toLocaleUpperCase() : "";
      return (
        equipos != "" && busqueda != "" && equipos.indexOf(busquedaAux) !== -1
      );
    },

    handleIrAFaseGrupos() {
      this.$router.push("/fase-grupos");
    },

    handleIrAFaseFinal() {
      this.$router.push("/fase-final");
    },
  },
};
</script>

<style>
.fila-con-prediccion {
  background-color: #e1f5fe;
}

.fila-con-prediccion-correcta {
  background-color: #a5d6a7;
}

.fila-con-prediccion-acertada {
  background-color: #80cbc4;
}

.fila-con-prediccion-erronea {
  background-color: #ef9a9a;
}

.table-partidos .fila-con-prediccion:hover {
  background-color: #b3e5fc !important;
}

.table-partidos .fila-con-prediccion-correcta:hover {
  background-color: #66bb6a !important;
}

.table-partidos .fila-con-prediccion-acertada:hover {
  background-color: #26a69a !important;
}

.table-partidos .fila-con-prediccion-erronea:hover {
  background-color: #ef5350 !important;
}
</style>
