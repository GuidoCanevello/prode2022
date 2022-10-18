<template>
  <v-card>
    <v-card-title primary-title>
      <v-row>
        <v-col lg="auto" cols="12"> ¿No sabes por donde empezar? </v-col>
        <v-col style="text-align: right">
          <v-btn color="success" @click="handleVerReglamento" text>
            Ver Reglamento
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "CartaDondeEmpezar",

  data() {
    return {
        titleLabel: "¿No sabes por donde empezar?",
        btnLabel: "Ver Reglamento"
    }
  },

  methods: {
    handleVerReglamento() {
      this.$router.push("/reglamento");
    },
  },
};
</script>