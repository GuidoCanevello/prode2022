<template>
  <div>
    <template v-if="isLoading">
      <v-row>
        <v-col>
          <loading-bar />
        </v-col>
      </v-row>
    </template>

    <template v-else v-for="grupo in dataFaseGrupos">
      <fila-grupo
        v-bind:key="grupo.nombre"
        v-bind:grupo="grupo"
        @actualizar-prediccion="handleActualizar"
      />
    </template>
  </div>
</template>

<script>
import FilaGrupo from "../../components/faseGrupos/FilaGrupo.vue";
import LoadingBar from "../../components/LoadingBar.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { LoadingBar, FilaGrupo },
  name: "FaseGrupos",

  data: () => ({}),

  methods: {
    ...mapActions([]),
    handleActualizar(idPartido, golesEquipo1, golesEquipo2) {
      console.log("hola", idPartido, golesEquipo1, golesEquipo2);
    },
  },

  computed: mapGetters(["isLoading", "dataFaseGrupos"]),

  // created() {
  //   this.isLoading = true;

  //   setTimeout(() => {
  //     this.grupos = getDataFaseGrupos()
  //       .then((res) => {
  //         this.grupos = res;
  //         this.isLoading = false;
  //       })
  //       .catch((e) => console.log(e));
  //   }, 200);
  // },
  // created() {
  //   this.isLoading = true;

  //   setTimeout(() => {
  //     this.grupos = getDataFaseGrupos()
  //       .then((res) => {
  //         this.grupos = res;
  //         this.isLoading = false;
  //       })
  //       .catch((e) => console.log(e));
  //   }, 200);
  // },
};
</script>