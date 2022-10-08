<template>
  <v-card>
    <v-card-title primary-title> Proximo Partido </v-card-title>

    <v-card-text>
      <template v-if="!DATA_PROX_PARTIDO"> Cargando </template>

      <template v-else>
        <v-row>
          <v-col sm="3">
            <v-row class="mt-0">
              <v-col class="pt-0"> Fecha: {{ fechaFormateada }} </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col class="pt-0"> Hora: {{ horaFormateada }} </v-col>
            </v-row>
          </v-col>

          <v-col align-self="center">
            <v-row>
              <v-col style="text-align: right" sm="1">
                <bandera :code="DATA_PROX_PARTIDO.code1" />
              </v-col>
              <v-col style="text-align: left">
                <h2>{{ DATA_PROX_PARTIDO.equipo1 }}</h2>
              </v-col>
              <v-col style="text-align: center" sm="2">
                <h3>vs.</h3>
              </v-col>
              <v-col style="text-align: right">
                <h2>{{ DATA_PROX_PARTIDO.equipo2 }}</h2>
              </v-col>
              <v-col style="text-align: left" sm="1">
                <bandera :code="DATA_PROX_PARTIDO.code2" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <template v-if="DATA_PROX_PARTIDO.prediccion">
          <v-row>
            <v-col class="pt-0" style="text-align: left" sm="3">
              <h3>Tu Prediccion:</h3>
            </v-col>
            <v-col class="pt-0" style="text-align: right">
              <h3>{{ DATA_PROX_PARTIDO.prediccion.golesEquipo1 }}</h3>
            </v-col>
            <v-col class="pt-0" style="text-align: center" sm="2">
              <h3>-</h3>
            </v-col>
            <v-col class="pt-0" style="text-align: left">
              <h3>{{ DATA_PROX_PARTIDO.prediccion.golesEquipo2 }}</h3>
            </v-col>
          </v-row>
        </template>

        <v-row v-else>
          <v-col class="pt-0" style="text-align: center">
            <h3>Sin Prediccion</h3>
          </v-col>
        </v-row>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Bandera from "../utilitarios/Bandera.vue";
import obtenerNombreDia from "@/utils/obtenerNombreDia";
import addCero from "@/utils/addCero";

export default {
  components: { Bandera },
  name: "PartidoProximo",
  data: () => ({}),

  computed: {
    ...mapGetters(["DATA_PROX_PARTIDO"]),

    fechaFormateada() {
      const fecha = this.DATA_PROX_PARTIDO.fecha;
      const nombreDia = obtenerNombreDia(fecha.getDay()),
        dia = addCero(fecha.getDate()),
        mes = addCero(fecha.getMonth() + 1);

      return `${nombreDia} ${dia}/${mes}`;
    },

    horaFormateada() {
      const fecha = this.DATA_PROX_PARTIDO.fecha;
      const hora = addCero(fecha.getHours()),
        minutos = addCero(fecha.getMinutes());

      return `${hora}:${minutos}`;
    },
  },

  methods: {},
};
</script>
