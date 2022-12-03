<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-partidos">
        <v-card outlined rounded style="text-align: center">
          <v-card-text> <h2>Octavos de Final</h2> </v-card-text>
        </v-card>
      </v-col>

      <v-col class="col-partidos">
        <v-card outlined rounded style="text-align: center">
          <v-card-text>
            <h2>Cuartos de Final</h2>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="col-partidos">
        <v-card outlined rounded style="text-align: center">
          <v-card-text> <h2>Semifinal</h2> </v-card-text>
        </v-card>
      </v-col>

      <v-col class="col-partidos">
        <v-card outlined rounded style="text-align: center">
          <v-card-text> <h2>Final</h2> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="DATA_FASE_FINAL.length > 0">
      <octavos
        :partidos="
          DATA_FASE_FINAL.filter((p) => p.tipoEliminatoria == 'Octavos')
        "
      />

      <cuartos
        :partidos="
          DATA_FASE_FINAL.filter((p) => p.tipoEliminatoria == 'Cuartos')
        "
      />

      <semifinales
        :partidos="
          DATA_FASE_FINAL.filter((p) => p.tipoEliminatoria == 'Semifinales')
        "
      />

      <final
        :partidos="
          DATA_FASE_FINAL.filter((p) => p.tipoEliminatoria == 'Final' || p.tipoEliminatoria == 'Tercero')
        "
      />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import CartaInvisible from "./CartaInvisible.vue";
import CartaPartidoIndiv from "./CartaPartidoIndiv.vue";
import Cuartos from "./estructura/medium/Cuartos.vue";
import Final from "./estructura/medium/Final.vue";
import Octavos from "./estructura/medium/Octavos.vue";
import Semifinales from "./estructura/medium/Semifinales.vue";

export default {
  name: "CartaCompleta",
  components: {
    CartaPartidoIndiv,
    CartaInvisible,
    Octavos,
    Cuartos,
    Semifinales,
    Final,
  },

  data() {
    return {};
  },

  computed: mapGetters(["DATA_FASE_FINAL"]),
};
</script>

<style>
.col-partidos {
  height: 100%;
  padding-inline: 4px;
}

.col-partidos > .container {
  padding-inline: 0%;
}
</style>