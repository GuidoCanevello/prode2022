<template>
  <v-container>
    <v-card>
      <v-container grid-list-xs>
        <v-carousel>
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          />
        </v-carousel>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      items: [
        {
          src: "https://media.tycsports.com/files/2021/06/29/300518/maradona_1440x810_wmk.jpg?v=1",
        },
        {
          src: "https://phantom-marca.unidadeditorial.es/4a48d118c4427fc01575ac7e16d4b4a0/crop/0x70/1022x644/resize/1320/f/jpg/assets/multimedia/imagenes/2021/07/11/16259717481572.jpg",
        },
        {
          src: "https://elcomercio.pe/resizer/LRyuQnyOf4viNHPiDAICx50ckko=/980x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/4QTAUM7LWJBRXDICU7RNLX66QI.jpg",
        },
      ],
    };
  },
};
</script>
