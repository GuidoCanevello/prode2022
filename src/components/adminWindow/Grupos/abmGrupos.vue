<template>
  <v-container grid-list-xs>
    <agregar-grupo />
    <!-- <v-tabs vertical>
      <v-tab> Agregar </v-tab>
      <v-tab-item>
        <agregar-grupo />
      </v-tab-item>

      <v-tab> Modificar </v-tab>
      <v-tab-item>
        <modificar-grupo />
      </v-tab-item>

      <v-tab> Eliminar </v-tab>
      <v-tab-item>
        <eliminar-grupo />
      </v-tab-item>
    </v-tabs> -->
  </v-container>
</template>

<script>
import AgregarGrupo from "./AgregarGrupo.vue";
import EliminarGrupo from "./EliminarGrupo.vue";
import ModificarGrupo from "./ModificarGrupo.vue";

export default {
  name: "abmGrupos",
  components: { AgregarGrupo, ModificarGrupo, EliminarGrupo },
  data: () => ({}),
};
</script>