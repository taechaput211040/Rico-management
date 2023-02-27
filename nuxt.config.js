export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "AUTO",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  // proxy: {
  //   "/api/": {
  //     // target: "http://192.168.1.123:5000",
  //     // target: "http://localhost:5000",
  //     target: "https://agent.bet-kub.com",
  //     changeOrigin: true
  //   }
  // },
  server: {
    port: 3000, // default: 3000
  },
  mode: "spa",
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/axios", "~/plugins/formatter", "~/plugins/socket.io"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "nuxt-element-ui",
    "@nuxtjs/dayjs",
    "vue-sweetalert2/nuxt",
    "nuxt-socket-io",
  ],
  // io: {
  //   sockets: [
  //     {
  //       path: "/",
  //       transports: ["websocket"],
  //       url: "http://35.240.216.181:4000/",
  //       default: true
  //     }
  //   ]
  // },
  dayjs: {
    locales: ["en", "ja"],
    defaultLocale: "en",
    defaultTimeZone: "Asia/Tokyo",
    plugins: [
      "utc", // import 'dayjs/plugin/utc'
      "timezone", // import 'dayjs/plugin/timezone'
    ], // Your Day.js plugin
  },
  axios: {
    proxy: true,
    // baseURL: "https://agent.bet-kub.com",
    crossDomain: true,
    proxyHeaders: false,
    credentials: true,
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // loaders: {
    //   vue: {
    //     transformAssetUrls: {
    //       audio: 'src'
    //     }
    //   }
    // },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          esModule: false,
        },
      });
    },
  },
  router: {
    mode: "history",
    // base: "/storage/dev-backoffice/"
    // base: "/storage/testRico/"
  },
  env: {
    ALL_RICO_USER: process.env.ALL_RICO_USER,
    MICROSERVICE_KEY: process.env.MICROSERVICE_KEY,
    AUTH_SECRET: process.env.AUTH_SECRET,
    ALL_SETTING: process.env.ALL_SETTING,
    AFF_MEMBER: process.env.AFF_MEMBER,
    ALL_DEPOSIT: process.env.ALL_DEPOSIT,
    REAL_TIME_REPORT_URL_SEAMLESS: process.env.REAL_TIME_REPORT_URL_SEAMLESS,
    ALL_MEMBER: process.env.ALL_MEMBER,
    ALL_SUPPORT: process.env.ALL_SUPPORT,
    AFF_SETTING: process.env.AFF_SETTING,
    AGENT_DOMAIN: process.env.AGENT_DOMAIN,
    ALL_CASHBACK: process.env.ALL_CASHBACK,
    ALL_CHECKIN: process.env.ALL_CHECKIN,
    ALL_COMPANY_BANK: process.env.ALL_COMPANY_BANK,
    ALL_CRIMINAL: process.env.ALL_CRIMINAL,
    ALL_MESSAGE_WEB: process.env.ALL_MESSAGE_WEB,
    ALL_RICO_REPORT: process.env.ALL_RICO_REPORT,
    ALL_PROMOTION: process.env.ALL_PROMOTION,
    ALL_JSON_STATIC: process.env.ALL_JSON_STATIC,
    ALL_PROMOTION: process.env.ALL_PROMOTION,
    API_SCB_CORE: process.env.API_SCB_CORE,
    ALL_LINE_NOTIFY: process.env.ALL_LINE_NOTIFY,
    ALL_NOTIFICATE: process.env.ALL_NOTIFICATE,
    ALL_EDITCREDIT: process.env.ALL_EDITCREDIT,
    ALL_WHEEL: process.env.ALL_WHEEL,
    BASIC_AUTH_USERNAME: process.env.BASIC_AUTH_USERNAME,
    BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD,
    VERSION_APP: process.env.VERSION_APP,
    ALL_INCOMING:process.env.ALL_INCOMING
  },
};
