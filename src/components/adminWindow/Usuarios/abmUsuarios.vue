<template>
  <v-container grid-list-xs> 
    <agregar-usuario />
  </v-container>
</template>

<script>
import AgregarUsuario from './AgregarUsuario.vue';
export default {
  name: "abmUsuarios",
  components: { AgregarUsuario },

  data: () => ({}),
};
</script>