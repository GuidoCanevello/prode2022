<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col>
          Partido:
          {{
            partido.identificadorEliminatorias
              ? partido.identificadorEliminatorias
              : partido.tipoEliminatoria
          }}
        </v-col>

        <v-col style="text-align: end">
          {{ partido.nombreEquipo1 }} vs. {{ partido.nombreEquipo2 }}
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <template v-if="partido.tipoEliminatoria != 'Octavos'">
        <h2>Tu Pronostico:</h2>
        ({{
          partido.tienePrediccionEquipo1
            ? partido.prediccionNombreEquipo1
            : "Sin Prediccion"
        }}) vs. ({{
          partido.tienePrediccionEquipo2
            ? partido.prediccionNombreEquipo2
            : "Sin Prediccion"
        }})
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DialogoPartido",
  props: ["partido"],
};
</script>