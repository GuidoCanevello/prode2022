<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-container>
            <h1>Fase de Torneo</h1>
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
import SitioBajoConstruccion from '@/components/SitioBajoConstruccion.vue';
export default {
  name: "FaseFinal",
  components: { SitioBajoConstruccion },

  data: () => ({}),
};
</script>