<template>
  <v-card>
    <v-card-title  primary-title style="word-break: break-word;"> ¿No sabes por donde empezar? </v-card-title>

    <v-card-actions>
      <v-spacer />
      <v-col class="pt-0 pr-0" cols="auto">
        <v-btn color="success" @click="handleVerReglamento" text outlined>
          Ver Reglamento
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CartaDondeEmpezar",

  data() {
    return {
      titleLabel: "¿No sabes por donde empezar?",
      btnLabel: "Ver Reglamento",
    };
  },

  methods: {
    handleVerReglamento() {
      this.$router.push("/reglamento");
    },
  },
};
</script>