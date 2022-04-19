<template>
  <img :src="imgSrc" width="16" height="12" alt="⚽" />
</template>

<script>
export default {
  name: "Bandera",
  props: ["code"],
  data() {
    return {};
  },
  computed: {
    imgSrc() {
      return `https://flagcdn.com/16x12/${this.code}.png`;
    },
  },
};
</script>