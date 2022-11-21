<template>
  <v-container grid-list-xs>
    <modificar-partido />
  </v-container>
</template>

<script>
import ModificarPartido from "./ModificarPartido.vue";

export default {
  name: "abmPartidos",
  components: { ModificarPartido },

  data: () => ({}),
};
</script>