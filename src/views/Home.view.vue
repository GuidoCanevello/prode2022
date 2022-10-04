<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-container>
            <h1>Prediccion Deportiva - Qatar 2022</h1>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col sm="7">
        <v-row>
          <v-container>
            <v-card>
              <v-container grid-list-xs> Partido Proximo </v-container>
            </v-card>
          </v-container>
        </v-row>

        <v-row class="mt-0">
          <v-container>
            <v-card>
              <v-container grid-list-xs>
                <listado-partidos />
              </v-container>
            </v-card>
          </v-container>
        </v-row>
      </v-col>

      <v-col sm="5">
        <v-row>
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
        </v-row>

        <v-row class="mt-0">
          <v-container>
            <v-card>
              <v-container grid-list-xs> Ranking </v-container>
            </v-card>
          </v-container>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListadoPartidos from "../components/funcional/ListadoPartidos.vue";

export default {
  name: "Home",
  components: { ListadoPartidos },
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
