<template>
  <v-container class="pa-0" fluid>
    <v-row>
      <v-col>
        <v-card rounded>
          <v-container>
            <v-tabs vertical v-model="selectedTab" grow>
              <v-tab v-for="item in items" :key="item.tab">{{
                item.tab
              }}</v-tab>
            </v-tabs>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <octavos-small
        v-if="selectedTab == 0"
        :partidos="
          DATA_FASE_FINAL.filter((p) => p.tipoEliminatoria == 'Octavos')
        "
      />
      <cuartos-small
        v-if="selectedTab == 1"
        :partidos="
          DATA_FASE_FINAL.filter((p) => p.tipoEliminatoria == 'Cuartos')
        "
      />
      <semifinales-small
        v-if="selectedTab == 2"
        :partidos="
          DATA_FASE_FINAL.filter((p) => p.tipoEliminatoria == 'Semifinales')
        "
      />
      <final-small
        v-if="selectedTab == 3"
        :partidos="
          DATA_FASE_FINAL.filter(
            (p) =>
              p.tipoEliminatoria == 'Final' || p.tipoEliminatoria == 'Tercero'
          )
        "
      />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import CartaInvisible from "./CartaInvisible.vue";
import CartaPartidoIndiv from "./CartaPartidoIndiv.vue";
import CuartosSmall from "./estructura/small/Cuartos.small.vue";
import FinalSmall from "./estructura/small/Final.small.vue";
import OctavosSmall from "./estructura/small/Octavos.small.vue";
import SemifinalesSmall from "./estructura/small/Semifinales.small.vue";

export default {
  name: "CartaCompletaSmall",
  components: {
    CartaPartidoIndiv,
    CartaInvisible,
    OctavosSmall,
    CuartosSmall,
    SemifinalesSmall,
    FinalSmall,
  },
  data() {
    return {
      selectedTab: null,
      items: [
        { tab: "Octavos de Final" },
        { tab: "Cuartos de Final" },
        { tab: "Semifnal" },
        { tab: "Final" },
      ],
    };
  },

  computed: mapGetters(["DATA_FASE_FINAL"]),
};
</script>