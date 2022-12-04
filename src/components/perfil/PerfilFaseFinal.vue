<template>
  <v-container>
    <v-row>
      <v-col>
        <v-container fluid>
          <h4>Octavos de Final</h4>
        </v-container>
      </v-col>

      <v-col>
        <v-container fluid>
          <h4>Cuartos de Final</h4>
        </v-container>
      </v-col>

      <v-col>
        <v-container fluid>
          <h4>Semifinal</h4>
        </v-container>
      </v-col>

      <v-col>
        <v-container fluid>
          <h4>Finales</h4>
        </v-container>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-container
          v-for="partido in partidosOctavos"
          v-bind:key="'octavos' + partido.id"
          fluid
        >
          <carta-partido-perfil :partido="partido" />
        </v-container>
      </v-col>

      <v-col align-self="center">
        <template v-for="partido in partidosCuartos">
          <v-container v-bind:key="'cuartos' + partido.id" fluid>
            <carta-partido-perfil :partido="partido" />
          </v-container>

          <v-container
            v-if="partido.identificadorEliminatorias < 'D'"
            v-bind:key="'cuartosInvis' + partido.id"
            fluid
          >
            <carta-partido-perfil :esInvisible="true" />
          </v-container>
        </template>
      </v-col>

      <v-col align-self="center" v-if="partidosSemifinales.length == 2">
        <v-container fluid>
          <carta-partido-perfil :partido="partidosSemifinales[0]" />
        </v-container>

        <v-container fluid>
          <carta-partido-perfil :esInvisible="true" />
        </v-container>

        <v-container fluid>
          <carta-partido-perfil :esInvisible="true" />
        </v-container>

        <v-container fluid>
          <carta-partido-perfil :esInvisible="true" />
        </v-container>

        <v-container fluid>
          <carta-partido-perfil :partido="partidosSemifinales[1]" />
        </v-container>
      </v-col>

      <v-col align-self="center" v-if="partidosFinales.length == 2">
        <v-container fluid>
          <h4>Primer y Segundo Puesto</h4>
        </v-container>
        <v-container fluid>
          <carta-partido-perfil :partido="partidosFinales[0]" />
        </v-container>

        <v-container fluid>
          <h4>Tercer y Cuarto Puesto</h4>
        </v-container>
        <v-container fluid>
          <carta-partido-perfil :partido="partidosFinales[1]" />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import CartaPartidoPerfil from "./CartaPartidoPerfil.vue";
import generarArreglosPartidos from "@/utils/generarArreglosPartidos";

export default {
  components: { CartaPartidoPerfil },
  name: "PerfilFaseFinal",
  props: ["predicciones"],
  data() {
    return {
      partidosOctavos: [],
      partidosCuartos: [],
      partidosSemifinales: [],
      partidosFinales: [],
    };
  },

  computed: mapGetters(["PARTIDOS", "EQUIPOS"]),

  mounted() {
    [
      this.partidosOctavos,
      this.partidosCuartos,
      this.partidosSemifinales,
      this.partidosFinales,
    ] = generarArreglosPartidos(this.PARTIDOS, this.EQUIPOS, this.predicciones);
  },
};
</script>