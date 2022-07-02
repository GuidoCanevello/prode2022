<template>
  <v-container grid-list-xs>
    <v-tabs vertical>
      <v-tab> Modificar </v-tab>
      <v-tab-item>
        <modificar-partido />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import ModificarPartido from './ModificarPartido.vue';

export default {
  name: "abmPartidos",
  components: { ModificarPartido },

  data: () => ({}),
};
</script>