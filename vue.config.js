module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  // TODO ver path para que funcione bien, si entro a un subpath se rompe todo
  publicPath: process.env.NODE_ENV === "production" ? "/prode2022_frontend/" : "/",
}
