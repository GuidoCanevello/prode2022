<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col>
          Partido:
          {{
            partido.identificadorEliminatorias
              ? partido.identificadorEliminatorias
              : partido.tipoEliminatoria
          }}
        </v-col>

        <v-col style="text-align: end">
          {{ partido.nombreEquipo1 }} vs. {{ partido.nombreEquipo2 }}
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-subtitle> {{ formatFecha(partido.fecha) }} </v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col>
          <template v-if="partido.tipoEliminatoria != 'Octavos'">
            <h2>Tu Pronostico:</h2>
            ({{
              partido.tienePrediccionEquipo1
                ? partido.prediccionNombreEquipo1
                : "Sin Prediccion"
            }}) vs. ({{
              partido.tienePrediccionEquipo2
                ? partido.prediccionNombreEquipo2
                : "Sin Prediccion"
            }})
          </template>
        </v-col>
      </v-row>

      <v-row
        v-if="
          partido.tipoEliminatoria != 'Octavos'
            ? partido.tienePrediccionEquipo1 && partido.tienePrediccionEquipo2
            : true
        "
      >
        <v-col align-self="center" style="text-align: center">
          <h2>Votar</h2>
        </v-col>
      </v-row>

      <v-row
        v-if="
          partido.tipoEliminatoria != 'Octavos'
            ? partido.tienePrediccionEquipo1 && partido.tienePrediccionEquipo2
            : true
        "
      >
        <v-col md="6" cols="12">
          <v-btn
            color="success"
            block
            :disabled="isLoading"
            :loading="isLoading"
            @click="handlePrediccion(true)"
          >
            Victoria para {{ partido.nombreEquipo1 }}
          </v-btn>
        </v-col>

        <v-col md="6" cols="12">
          <v-btn
            color="success"
            block
            :disabled="isLoading"
            :loading="isLoading"
            @click="handlePrediccion(false)"
          >
            Victoria para {{ partido.nombreEquipo2 }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import obtenerNombreDia from "@/utils/obtenerNombreDia";
import addCero from "@/utils/addCero";
import { mapActions } from 'vuex';

export default {
  name: "DialogoPartido",
  props: ["partido"],
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(["MODIFICAR_PREDICCION"]),
    
    formatFecha(fecha) {
      const nombreDia = obtenerNombreDia(fecha.getDay()),
        dia = addCero(fecha.getDate()),
        mes = addCero(fecha.getMonth() + 1),
        hora = addCero(fecha.getHours()),
        minutos = addCero(fecha.getMinutes());

      return `${nombreDia} ${dia}/${mes} - ${hora}:${minutos}`;
    },

    async handlePrediccion(isPrediccionEquipo1) {
      this.isLoading = true;

      await this.MODIFICAR_PREDICCION({
        partidoId: this.partido.partidoId,
        golesEquipo1: isPrediccionEquipo1 ? 1 : 0,
        golesEquipo2: !isPrediccionEquipo1 ? 1 : 0,
      });

      this.isLoading = false;
    },
  },
};
</script>