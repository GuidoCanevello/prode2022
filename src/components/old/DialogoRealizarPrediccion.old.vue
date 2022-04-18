<template>
  <v-card>
    <v-card-title primary-title>
      Predecir {{ partido.equipo1 }} vs. {{ partido.equipo2 }}
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col>
          <v-btn
            :disabled="seleccionaEquipo1"
            depressed
            block
            color="info"
            @click="handleVotarEquipo1"
          >
            Victoria para {{ partido.equipo1 }}
          </v-btn>
        </v-col>

        <v-col>
          <v-btn
            :disabled="seleccionaEquipo2"
            depressed
            block
            color="info"
            @click="handleVotarEquipo2"
          >
            Victoria para {{ partido.equipo2 }}
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn
            :disabled="seleccionaEmpate"
            depressed
            block
            color="info"
            @click="handleVotarEmpate"
          >
            Empate
          </v-btn>
        </v-col>
      </v-row>

      <template
        v-if="seleccionaEquipo1 || seleccionaEmpate || seleccionaEquipo2"
      >
        <v-row>
          <v-divider />
        </v-row>

        <v-row>
          <v-col style="text-align: center"> <h3>Agregar Resultado</h3> </v-col>
        </v-row>

        <v-row
          class="row-prediccion"
          v-if="seleccionaEquipo1 || seleccionaEmpate || seleccionaEquipo2"
        >
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

        <v-row>
          <v-divider />
        </v-row>
      </template>

      <template v-if="mostrarError">
        <v-row>
          <v-col>
            <v-alert dense type="error" class="mb-0">
              {{ mensajeError }}
            </v-alert>
          </v-col>
        </v-row>
      </template>
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
    seleccionaEquipo1: false,
    seleccionaEquipo2: false,
    seleccionaEmpate: false,

    golesEquipo1: 0,
    golesEquipo2: 0,

    mostrarError: false,
    mensajeError: "Test",

    dropdownGoles: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  }),

  methods: {
    handleVotarEquipo1() {
      this.seleccionaEquipo1 = true;
      this.seleccionaEmpate = false;
      this.seleccionaEquipo2 = false;
      this.mostrarError = false;
    },
    handleVotarEmpate() {
      this.seleccionaEquipo1 = false;
      this.seleccionaEmpate = true;
      this.seleccionaEquipo2 = false;
      this.mostrarError = false;
    },
    handleVotarEquipo2() {
      this.seleccionaEquipo1 = false;
      this.seleccionaEmpate = false;
      this.seleccionaEquipo2 = true;
      this.mostrarError = false;
    },
    handleConfirmar() {
      if (this.seleccionaEquipo1 && this.golesEquipo1 <= this.golesEquipo2) {
        //* Si selecciona Victoria para Equipo 1 y el resultado es imposible
        this.mostrarError = true;
        this.mensajeError = `${this.partido.equipo1} debe tener mas goles que ${this.partido.equipo2}`;
      } else if (
        this.seleccionaEquipo2 &&
        this.golesEquipo2 <= this.golesEquipo1
      ) {
        //* Si selecciona Victoria para Equipo 2 y el resultado es imposible
        this.mostrarError = true;
        this.mensajeError = `${this.partido.equipo2} debe tener mas goles que ${this.partido.equipo1}`;
      } else if (
        this.seleccionaEmpate &&
        this.golesEquipo2 != this.golesEquipo1
      ) {
        //* Si selecciona Empate y el resultado es imposible
        this.mostrarError = true;
        this.mensajeError = `Los goles de ambos equipos deben ser iguales`;
      } else {
        this.mostrarError = false;
        this.$emit(
          "confirmar",
          this.seleccionaEquipo1,
          this.seleccionaEquipo2,
          this.seleccionaEmpate,
          this.golesEquipo1,
          this.golesEquipo2
        );
      }
    },
    handleCancelar() {
      this.$emit("cancelar");
    },
  },

  beforeMount() {
    if (this.partido.tienePrediccion) {
      this.seleccionaEquipo1 = this.partido.prediccion.esVictoria1
        ? true
        : false;
      this.seleccionaEquipo2 = this.partido.prediccion.esVictoria2
        ? true
        : false;
      this.seleccionaEmpate = this.partido.prediccion.esEmpate ? true : false;

      this.golesEquipo1 = this.partido.prediccion.golesEquipo1
        ? this.partido.prediccion.golesEquipo1
        : 0;
      this.golesEquipo2 = this.partido.prediccion.golesEquipo2
        ? this.partido.prediccion.golesEquipo2
        : 0;
    }
  },
};
</script>

<style scoped>
.row-prediccion .container {
  padding-block: 0%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
