<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card rounded elevation="0" outlined>
          <v-container>
            <v-tabs vertical v-model="selectedTab" grow>
              <v-tab v-for="item in items" :key="item.tab">
                {{ item.tab }}
              </v-tab>
            </v-tabs>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-if="selectedTab == 0">
        <v-container
          v-for="partido in partidosOctavos"
          v-bind:key="'octavos' + partido.id"
          fluid
        >
          <carta-partido-perfil :partido="partido" />
        </v-container>
      </v-col>

      <v-col v-if="selectedTab == 1">
        <v-container
          v-for="partido in partidosCuartos"
          v-bind:key="'cuartos' + partido.id"
          fluid
        >
          <carta-partido-perfil :partido="partido" />
        </v-container>
      </v-col>

      <v-col v-if="selectedTab == 2">
        <v-container
          v-for="partido in partidosSemifinales"
          v-bind:key="'semifinales' + partido.id"
          fluid
        >
          <carta-partido-perfil :partido="partido" />
        </v-container>
      </v-col>

      <v-col v-if="selectedTab == 3 && partidosFinales.length == 2">
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
      selectedTab: null,
      items: [
        { tab: "Octavos de Final" },
        { tab: "Cuartos de Final" },
        { tab: "Semifnal" },
        { tab: "Final" },
      ],

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