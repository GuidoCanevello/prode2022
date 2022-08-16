<template>
  <div>
    <v-row class="mt-0">
      <v-col>
        <v-card>
          <v-container grid-list-xs> Fase Final </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col>
        <sitio-bajo-construccion />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SitioBajoConstruccion from '../../components/SitioBajoConstruccion.vue';
export default {
  name: "FaseFinal",
  components: { SitioBajoConstruccion },

  data: () => ({}),
};
</script>