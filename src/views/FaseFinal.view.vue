<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-container fluid>
            <h1>Fase Final</h1>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col>
        <sitio-bajo-construccion />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SitioBajoConstruccion from '../components/utilitarios/SitioBajoConstruccion.vue';
export default {
  name: "FaseFinal",
  components: { SitioBajoConstruccion },

  data: () => ({}),
};
</script>