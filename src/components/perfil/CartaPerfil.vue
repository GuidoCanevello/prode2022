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
          <v-tabs>
            <v-tab>Fase de Grupos </v-tab>
            <v-tab-item>
                <perfil-fase-grupos :predicciones="predicciones"/>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import PerfilFaseGrupos from './PerfilFaseGrupos.vue';

export default {
  components: { PerfilFaseGrupos },
  name: "CartaPerfil",
  props: ["nombreCuenta"],
  data() {
    return {
      oldNombreCuenta: null,

      nombreJugador: null,
      puntos: 0,
      predicciones: [],
    };
  },
  computed: mapGetters(["USER_BY_NOMBRE_CUENTA"]),
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
        this.predicciones = user.predicciones;
      }
    },
  },
};
</script>