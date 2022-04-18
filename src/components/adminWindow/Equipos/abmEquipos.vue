<template>
  <v-container grid-list-xs>
    <v-tabs vertical>
      <v-tab> Agregar </v-tab>
      <v-tab-item>
        <agregar-equipo />
      </v-tab-item>

      <v-tab> Modificar </v-tab>
      <v-tab-item>
        <modificar-equipo />
      </v-tab-item>

      <v-tab> Eliminar </v-tab>
      <v-tab-item>
        <eliminar-equipo />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import AgregarEquipo from "./AgregarEquipo.vue";
import EliminarEquipo from './EliminarEquipo.vue';
import ModificarEquipo from './ModificarEquipo.vue';

export default {
  name: "abmEquipos",
  components: { AgregarEquipo, ModificarEquipo, EliminarEquipo },
  data: () => ({}),
};
</script>