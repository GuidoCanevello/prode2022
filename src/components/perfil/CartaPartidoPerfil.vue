<template>
  <v-card
    :class="obtenerClase"
    elevation="0"
    outlined
    :color="esInvisible ? 'transparent' : ''"
  >
    <v-row v-if="partido != undefined && !esInvisible">
      <v-col style="text-align: center">
        <v-container
          :class="
            partido.tienePrediccion && partido.prediccionGanaEquipo1
              ? 'equipo-gana pb-1'
              : 'pb-1'
          "
        >
          {{ partido.nombreEquipo1 }}
        </v-container>

        <v-container class="py-1"> vs. </v-container>

        <v-container
          :class="
            partido.tienePrediccion && !partido.prediccionGanaEquipo1
              ? 'equipo-gana pt-1'
              : 'pt-1'
          "
        >
          {{ partido.nombreEquipo2 }}
        </v-container>
      </v-col>
    </v-row>

    <v-row v-if="esInvisible">
      <v-col style="text-align: center">
        <v-container class="letra-invis pb-1"> - </v-container>

        <v-container class="letra-invis py-1"> - </v-container>

        <v-container class="letra-invis pt-1"> - </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "CartaPartidoPerfil",
  props: ["esInvisible", "partido"],
  computed: {
    obtenerClase() {
      if (
        this.esInvisible ||
        !this.partido.tienePrediccion ||
        !this.partido.prediccionEsValida ||
        new Date(this.partido.fecha) > new Date()
      )
        return "";
      else if (
        this.partido.prediccionGanaEquipo1 &&
        this.partido.partidoGanoEquipo1
      )
        return "prediccion-correcta";
      else return "prediccion-errada";
    },
  },
};
</script>

<style scoped>
.equipo-gana {
  background-color: #b3e5fc;
}

.prediccion-correcta {
  background-color: #81c784;
}

.prediccion-errada {
  background-color: #ef9a9a;
}

.letra-invis {
  color: transparent;
}
</style>