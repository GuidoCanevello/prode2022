<template>
  <v-card v-if="DATA_PROX_PARTIDO">
    <v-card-title primary-title> Proximo Partido </v-card-title>

    <v-card-subtitle>
      Fecha: {{ fechaFormateada }} - Hora: {{ horaFormateada }}
    </v-card-subtitle>

    <v-card-text>
      <template v-if="!DATA_PROX_PARTIDO"> Cargando </template>

      <template v-else>
        <v-row>
          <v-spacer v-if="IS_SCREEN_BEYOND_LARGE" />

          <v-col lg="11">
            <v-row>
              <v-col>
                <v-card
                  outlined
                  :class="
                    IS_SCREEN_BEYOND_MEDIUM
                      ? 'team-card-medium'
                      : 'team-card-small'
                  "
                >
                  <v-row>
                    <v-col
                      style="text-align: right"
                      cols="auto"
                      align-self="center"
                    >
                      <bandera :code="DATA_PROX_PARTIDO.code1" />
                    </v-col>
                    <v-col style="text-align: left">
                      <!-- <h2>{{ DATA_PROX_PARTIDO.equipo1 }}</h2> -->
                      <h2>Estados Unidos</h2>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col
                class="px-0"
                style="text-align: center"
                cols="auto"
                align-self="center"
              >
                <h3>vs.</h3>
              </v-col>
              <v-col>
                <v-card
                  outlined
                  :class="
                    IS_SCREEN_BEYOND_MEDIUM
                      ? 'team-card-medium'
                      : 'team-card-small'
                  "
                >
                  <v-row>
                    <v-col style="text-align: right">
                      <h2>{{ DATA_PROX_PARTIDO.equipo2 }}</h2>
                    </v-col>
                    <v-col
                      style="text-align: left"
                      cols="auto"
                      align-self="center"
                    >
                      <bandera :code="DATA_PROX_PARTIDO.code2" />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-spacer v-if="IS_SCREEN_BEYOND_LARGE" />
        </v-row>

        <v-row>
          <v-col class="pt-0" style="text-align: center" cols="12">
            <h3>Tu Pronostico:</h3>
          </v-col>
        </v-row>

        <template v-if="DATA_PROX_PARTIDO.prediccion">
          <v-row>
            <v-col class="pt-0" style="text-align: right">
              <h3>{{ DATA_PROX_PARTIDO.prediccion.golesEquipo1 }}</h3>
            </v-col>
            <v-col class="pt-0" style="text-align: center" cols="auto">
              <h3>-</h3>
            </v-col>
            <v-col class="pt-0" style="text-align: left">
              <h3>{{ DATA_PROX_PARTIDO.prediccion.golesEquipo2 }}</h3>
            </v-col>
          </v-row>
        </template>

        <v-row v-else>
          <v-col class="pt-0" style="text-align: center">
            <h3>Sin Pronostico</h3>
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
    ...mapGetters([
      "DATA_PROX_PARTIDO",
      "IS_SCREEN_BEYOND_MEDIUM",
      "IS_SCREEN_BEYOND_LARGE",
    ]),

    fechaFormateada() {
      if (this.DATA_PROX_PARTIDO) {
        const fecha = this.DATA_PROX_PARTIDO.fecha;
        const nombreDia = obtenerNombreDia(fecha.getDay()),
          dia = addCero(fecha.getDate()),
          mes = addCero(fecha.getMonth() + 1);

        return `${nombreDia} ${dia}/${mes}`;
      } else {
        return "";
      }
    },

    horaFormateada() {
      if (this.DATA_PROX_PARTIDO) {
        const fecha = this.DATA_PROX_PARTIDO.fecha;
        const hora = addCero(fecha.getHours()),
          minutos = addCero(fecha.getMinutes());

        return `${hora}:${minutos}`;
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.team-card-small {
  padding: 4px;
}

.team-card-medium {
  padding: 8px;
}
</style>
