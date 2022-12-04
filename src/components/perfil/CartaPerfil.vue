<template>
  <v-card>
    <v-card-title primary-title> Usuario: {{ nombreJugador }} </v-card-title>

    <v-card-subtitle>
      {{ nombreCuenta }}
    </v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col>
          <h3>Puntos: {{ puntos }}</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h3>Pronosticos:</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-tabs
            v-if="
              !IS_LOADING_USERS_DATA &&
              !IS_LOADING_FUTBOL_DATA &&
              PARTIDOS.length > 0
            "
          >
            <v-tab>Fase de Grupos </v-tab>
            <v-tab-item>
              <perfil-fase-grupos :predicciones="prediccionesFaseGrupos" />
            </v-tab-item>

            <v-tab>Mejores Jugadores </v-tab>
            <v-tab-item>
              <perfil-mejores-jugadores
                :mejorJugadorId="mejorJugadorId"
                :mejorArqueroId="mejorArqueroId"
                :mejorGoleadorId="mejorGoleadorId"
              />
            </v-tab-item>

            <v-tab>Fase Final </v-tab>
            <v-tab-item>
              <perfil-fase-final
                v-if="IS_SCREEN_BEYOND_MEDIUM"
                :predicciones="prediccionesFaseFinal"
              />
              <perfil-fase-final-small
                v-else
                :predicciones="prediccionesFaseFinal"
              />
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import PerfilFaseFinalSmall from "./PerfilFaseFinal.small.vue";
import PerfilFaseFinal from "./PerfilFaseFinal.vue";
import PerfilFaseGrupos from "./PerfilFaseGrupos.vue";
import PerfilMejoresJugadores from "./PerfilMejoresJugadores.vue";

export default {
  components: {
    PerfilFaseGrupos,
    PerfilMejoresJugadores,
    PerfilFaseFinal,
    PerfilFaseFinalSmall,
  },
  name: "CartaPerfil",
  props: ["nombreCuenta"],
  data() {
    return {
      isMounted: false,
      oldNombreCuenta: null,

      nombreJugador: null,
      puntos: 0,
      prediccionesFaseGrupos: [],
      prediccionesFaseFinal: [],
      mejorJugadorId: null,
      mejorArqueroId: null,
      mejorGoleadorId: null,
    };
  },
  computed: mapGetters([
    "USER_BY_NOMBRE_CUENTA",
    "PARTIDOS",
    "IS_LOADING_USERS_DATA",
    "IS_LOADING_FUTBOL_DATA",
    "IS_SCREEN_BEYOND_MEDIUM",
  ]),
  async updated() {
    if (this.nombreCuenta && this.oldNombreCuenta != this.nombreCuenta)
      this.updateUserData();
    else if (this.nombreCuenta === null) this.oldNombreCuenta = null;
  },
  mounted() {
    this.updateUserData();
  },

  methods: {
    async updateUserData() {
      this.oldNombreCuenta = this.nombreCuenta;
      const user = await this.USER_BY_NOMBRE_CUENTA(this.nombreCuenta);
      if (user) {
        this.nombreJugador = user.nombreJugador;
        this.puntos = user.puntos;
        if (this.PARTIDOS.length > 0) {
          this.prediccionesFaseGrupos = user.predicciones.filter(
            (prediccion) =>
              !this.PARTIDOS.find(
                (partido) => partido._id == prediccion.partidoId
              ).esEliminatoria
          );
          this.prediccionesFaseFinal = user.predicciones.filter(
            (prediccion) =>
              this.PARTIDOS.find(
                (partido) => partido._id == prediccion.partidoId
              ).esEliminatoria
          );
        }
        this.mejorJugadorId = user.prediccionMejorJugador;
        this.mejorArqueroId = user.prediccionMejorArquero;
        this.mejorGoleadorId = user.prediccionMejorGoleador;
      }
    },
  },
};
</script>