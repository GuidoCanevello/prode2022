<template>
  <v-card>
    <v-card-title primary-title> Realizar Predicción </v-card-title>

    <v-card-text>
      <v-row class="row-prediccion">
        <v-col>
          <v-container>
            {{ partido.equipo1 }}
          </v-container>
        </v-col>

        <v-col style="text-align: center">
          <v-container> vs. </v-container>
        </v-col>

        <v-col style="text-align: end">
          <v-container>
            {{ partido.equipo2 }}
          </v-container>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-select
            v-model="golesEquipo1"
            :items="dropdownGoles"
            :label="'Goles de ' + partido.equipo1"
            :error="mostrarError"
            outlined
            dense
            hide-details="auto"
            @change="
              () => {
                mostrarError = false;
              }
            "
          />
        </v-col>

        <v-col>
          <v-select
            v-model="golesEquipo2"
            :items="dropdownGoles"
            :label="'Goles de ' + partido.equipo2"
            :error="mostrarError"
            outlined
            dense
            reverse
            hide-details="auto"
            @change="
              () => {
                mostrarError = false;
              }
            "
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn color="success" text @click="handleConfirmar"> Confirmar </v-btn>
      <v-btn color="info" text @click="handleCancelar"> Cancelar </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "DialogoRealizarPrediccion",
  props: ["partido"],

  data: () => ({
    golesEquipo1: null,
    golesEquipo2: null,

    mostrarError: false,
    mensajeError: "Test",

    dropdownGoles: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  }),

  methods: {
    handleConfirmar() {
      this.$emit(
        "confirmar",
        this.partido.partidoId,
        this.golesEquipo1,
        this.golesEquipo2
      );
    },
    handleCancelar() {
      this.$emit("cancelar");
    },
  },

  beforeMount() {
    if (this.partido.tienePrediccion) {
      this.golesEquipo1 = isNaN(this.partido.prediccion.golesEquipo1)
        ? null
        : parseInt(this.partido.prediccion.golesEquipo1);
      this.golesEquipo2 = isNaN(this.partido.prediccion.golesEquipo2)
        ? null
        : parseInt(this.partido.prediccion.golesEquipo2);
    }
  },
};
</script>

<style scoped>
.row-prediccion .container {
  padding-block: 0%;
  padding-inline: 2px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
