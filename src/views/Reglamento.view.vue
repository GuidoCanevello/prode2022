<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-container grid-list-xs>
            <h1>Reglamento</h1>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col>
        <reglamento-markdown />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ReglamentoMarkdown from "../components/funcional/ReglamentoMarkdown.vue";

export default {
  name: "Reglamento",
  components: { ReglamentoMarkdown },
};
</script>    