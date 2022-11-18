<template>
  <v-card>
    <v-container>
      <div class="mt-1" v-html="markdownToHtml" />
    </v-container>
  </v-card>
</template>

<script>
import { marked } from "marked";
import markdownContent from "!raw-loader!@/assets/reglamento.md";

export default {
  name: "ReglamentoMarkdown",

  computed: {
    markdownToHtml() {
      return marked(markdownContent);
    },
  },
};
</script>