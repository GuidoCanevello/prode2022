<template>
  <v-card>
    <v-card-title primary-title> Pronostico Realizado </v-card-title>

    <v-card-subtitle>
      <v-row>
        <v-col>
          {{ partido.equipo1 }} vs.
          {{ partido.equipo2 }}
        </v-col>

        <v-col style="text-align: end"> Grupo {{ partido.grupo }} </v-col>
      </v-row>
    </v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col style="text-align: center">
          <template v-if="golesEquipo1Aux == golesEquipo2Aux">
            <h2>El partido resulta en Empate</h2>
          </template>

          <template v-else>
            <h2>
              El partido resulta en Victoria para
              {{
                golesEquipo1Aux > golesEquipo2Aux
                  ? partido.equipo1
                  : partido.equipo2
              }}
            </h2>
          </template>
        </v-col>
      </v-row>

      <v-row>
        <v-col sm="1" style="text-align: start; padding-right: 0%">
          <v-icon v-if="golesEquipo1Aux > golesEquipo2Aux"
            >mdi-crown-circle</v-icon
          >
        </v-col>

        <v-col style="text-align: start">
          <h3>
            {{ partido.equipo1 }}
          </h3>
        </v-col>

        <v-col sm="1" style="text-align: center">
          {{ golesEquipo1Aux }}
        </v-col>

        <v-col sm="2" style="text-align: center">
          <h3>-</h3>
        </v-col>

        <v-col sm="1" style="text-align: center">
          {{ golesEquipo2Aux }}
        </v-col>

        <v-col style="text-align: end">
          <h3>
            {{ partido.equipo2 }}
          </h3>
        </v-col>

        <v-col sm="1" style="text-align: end; padding-left: 0%">
          <v-icon v-if="golesEquipo1Aux < golesEquipo2Aux"
            >mdi-crown-circle</v-icon
          >
        </v-col>
      </v-row>

      <template v-if="golesEquipo1Aux === '-'">
        <v-row> 
            <v-col>
                *No se establecio un resultado
            </v-col>
        </v-row>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DialogoVerPrediccion",
  props: ["partido"],

  data: () => ({
    golesEquipo1Aux: "-",
    golesEquipo2Aux: "-",
  }),

  methods: {
    handleSalir() {
      this.$emit("salir");
    },
  },

  beforeMount() {
    this.golesEquipo1Aux =
      typeof this.partido.prediccion.golesEquipo1 != "undefined"
        ? this.partido.prediccion.golesEquipo1
        : "-";

    this.golesEquipo2Aux =
      typeof this.partido.prediccion.golesEquipo2 != "undefined"
        ? this.partido.prediccion.golesEquipo2
        : "-";
  },
};
</script>