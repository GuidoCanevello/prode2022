<template>
  <v-card>
    <v-card-title primary-title>
      Datos del Usuario - {{ USUARIO_NOMBRE_CUENTA }}
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="initialPlayerName"
        label="Nombre del Jugador"
        outlined
        hide-details="auto"
        class="mb-5"
      />

      <v-row>
        <v-col sm="4" style="text-align: center">
          <v-row>
            <v-container> Imagen de Perfil </v-container>
          </v-row>
          <v-row>
            <v-container>
              <v-avatar v-if="initialImagenSrc" size="100">
                <img :src="initialImagenSrc" alt="perfil" />
              </v-avatar>

              <v-avatar v-else color="blue lighten-1" size="100">
                <span class="text-h4">
                  {{ initialPlayerName.substring(0, 1) }}
                </span>
              </v-avatar>
            </v-container>
          </v-row>
        </v-col>

        <v-col style="text-align: center">
          <v-responsive class="overflow-y-auto" min-height="100%">
            <v-row>
              <v-container> Seleccione una imagen nueva</v-container>
            </v-row>
            <v-row class="ma-0">
              <template v-for="imagen in imagenesPerfil">
                <v-col class="pa-1" v-bind:key="imagen.nombre">
                  <v-avatar v-if="imagen.src != ''" @click="handleChangePerfil">
                    <img :src="imagen.src" />
                  </v-avatar>

                  <v-avatar
                    v-else
                    color="blue lighten-1"
                    @click="handleChangePerfil"
                  >
                    {{ initialPlayerName.substring(0, 1) }}
                  </v-avatar>
                </v-col>
              </template>
            </v-row>
          </v-responsive>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="success"
        text
        @click="handleGuardar"
        :loading="isLoadingChanges"
      >
        Guardar
      </v-btn>
      <v-btn
        color="error"
        text
        @click="handleCerrar"
        :loading="isLoadingChanges"
      >
        Cerrar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DialogoUserData",

  data() {
    return {
      initialPlayerName: "",
      initialImagenSrc: "",
      isLoadingChanges: false,

      imagenesPerfil: [
        {
          src: "",
          nombre: "Vacio",
        },
        {
          src: "https://yt3.ggpht.com/ytc/AKedOLQuCYL7K6Bg4d1dkz6pbMsQF0eanQF4KRX25urwOg=s900-c-k-c0x00ffffff-no-rj",
          nombre: "Messi",
        },
        {
          src: "https://gcdn.emol.cl/futbol-argentino/files/2020/11/maradona-napoli1.jpg",
          nombre: "Maradona Festejando",
        },
        {
          src: "https://contents101.com/wp-content/uploads/2020/11/img_1402.jpg",
          nombre: "Maradona",
        },
        {
          src: "https://elcomercio.pe/resizer/4CZlkvO4f_wLlKAUfG6kjisngqE=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/2KPXHTID6FGEJDBJZCHEUOLXCU.jpg",
          nombre: "Copa Mundial",
        },
        {
          src: "https://media.tycsports.com/files/2022/03/31/409274/al-rihla_w416.jpg",
          nombre: "Pelota Mundial",
        },
        {
          src: "https://pbs.twimg.com/media/E5bJaYnX0AUZ89v?format=jpg&name=medium",
          nombre: "Messi de Frente",
        },
        {
          src: "https://sumapolitica.com.ar/wp-content/uploads/2020/11/123.jpg",
          nombre: "Maradona de Espalda",
        },
        {
          src: "https://tntsports.com.ar/__export/1584110648398/sites/tntsports/img/2020/03/13/gabriel-batistuta-seleccion-argentina-mundial-98.jpg_554688468.jpg",
          nombre: "Batistuta",
        },
        {
          src: "https://s.hs-data.com/picmon/61/jKc_60dZm_l.jpg",
          nombre: "Riquelme",
        },
        {
          src: "https://scontent.faep9-3.fna.fbcdn.net/v/t39.30808-6/217553133_10159854068220763_925148547274782417_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeF2a8vyx7XmzZKwO0Tt9hnAUQ4kqpcpkElRDiSqlymQSatDWVl0bj4i4BKHhvKmNVg&_nc_ohc=Vg3DvAx8pQoAX8VI-Xw&_nc_ht=scontent.faep9-3.fna&oh=00_AfByPkiVMWggIG7qnOPrFqe78n7k_Uq3Qu_Ax45pln41Jw&oe=637CBEE0",
          nombre: "Messi y Maradona",
        },
        {
          src: "https://scontent.faep9-2.fna.fbcdn.net/v/t1.6435-9/96012965_3856760657698473_8479364700528705536_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeERg6bdJ6kpifvoFIEIoRB8MRrM5kiTEH4xGszmSJMQfqxOLA2lwO_RHMKqI5wikTg&_nc_ohc=ZnJiAxWon9oAX-ZgR29&_nc_ht=scontent.faep9-2.fna&oh=00_AfBuwTG2cWZYsbXFWM3d2V8YUFnRp32AIZVpEohpBNCG0Q&oe=639F2747",
          nombre: "Messi y Maradona 2",
        },
      ],
    };
  },

  methods: {
    ...mapActions(["MODIFICAR_USUARIO", "DISPATCH_GET_ALL_USERS"]),
    handleCerrar() {
      this.$emit("cerrar");
    },
    handleGuardar() {
      if (
        this.initialPlayerName != this.USUARIO_NOMBRE_JUGADOR ||
        this.initialImagenSrc != this.USUARIO_IMAGEN_SRC
      ) {
        this.isLoadingChanges = true;
        this.MODIFICAR_USUARIO({
          nombreJugador: this.initialPlayerName,
          imagenSrc: this.initialImagenSrc,
        })
        .then(() => {
          this.DISPATCH_GET_ALL_USERS();
        })
        .finally(() => {
          this.isLoadingChanges = false;
          this.$emit("cerrar");
        });
      } else {
        this.$emit("cerrar");
      }
    },
    handleChangePerfil(a) {
      this.initialImagenSrc = a.target.src ? a.target.src : "";
    },
  },

  computed: mapGetters([
    "USUARIO_NOMBRE_CUENTA",
    "USUARIO_NOMBRE_JUGADOR",
    "USUARIO_IMAGEN_SRC",
  ]),

  created() {
    this.initialPlayerName = this.USUARIO_NOMBRE_JUGADOR;
    this.initialImagenSrc = this.USUARIO_IMAGEN_SRC;
  },
};
</script>
