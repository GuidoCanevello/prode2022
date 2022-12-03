<template>
  <v-container grid-list-xs>
    <modificar-equipo />
  </v-container>
</template>

<script>
import AgregarEquipo from "./AgregarEquipo.vue";
import EliminarEquipo from "./EliminarEquipo.vue";
import ModificarEquipo from "./ModificarEquipo.vue";

export default {
  name: "abmEquipos",
  components: { AgregarEquipo, ModificarEquipo, EliminarEquipo },
  data: () => ({}),
};
</script>