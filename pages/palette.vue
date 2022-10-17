<template>
  <div>
    <h2 class="text-center">Palette Management</h2>
    <div class="row justify-center pa-5">
      <div class="card-show-section col-lg-4 col-md-4 col-12 rounded justify-center pa-sm-3  pa-1 ma-5">
        <h2 class="text-center text-decoration-underline font-italic my-2">
          ภาพ LOGO
        </h2>
        <div class="pa-5 text-center">
          <img :src="image" alt="" class="img_logo" />
        </div>
        <v-file-input
          label="File input"
          outlined
          dense
          accept="image/png, image/jpeg, image/jpg , image/webp"
          @change="inputImage"
        ></v-file-input>
        <v-btn color="success" @click="saveLogo()">Save Logo</v-btn>
      </div>
    </div>

    <div v-for="(item, index) in mainitem" :key="index">
      <div class="card-show-section ma-2 rounded justify-center row pa-0 pa-sm-3">
        <h1
          class="text-center text-decoration-underline my-2 font-italic"
          v-if="index === 'menu'"
        >
          GENERAL SETTING
        </h1>
        <h1
          class="text-center text-decoration-underline my-2 font-italic"
          v-else
        >
          {{ index.toUpperCase() }} SETTING
        </h1>

        <div class="col-12 row justify-center">
          <card-detail
            v-if="index === 'card'"
            :cardColor="mainitem.card.cardBgColor.value"
            :textColor="mainitem.card.cardTextColor.value"
            class="col-lg-3 col-xl-2 col-md-4 col-sm-5"
          ></card-detail>
          <navbar-detail
            :bgSidebarColor="mainitem.menu.sidebarColor.value"
            :Color="mainitem.menu.navberColor.value"
            :bgMainColor="mainitem.menu.bgColor.value"
            :text_color="mainitem.menu.textColor.value"
            :activeMenu="mainitem.menu.activeMenuColor.value"
            v-if="index === 'menu'"
            class="col-lg-8 col-xl-6 col-md-8 col-sm-12 col-12"
          ></navbar-detail>
          <table-detail
            :bgHeader="mainitem.table.colorTable.value"
            :bgBody="mainitem.table.colorBodyTable.value"
            :textColor="mainitem.table.colorTextTable.value"
            :bgTable="mainitem.table.bgTable.value"
            class="pa-0 col-lg-3 col-xl-6 col-md-8 col-sm-12 col-12"
            v-if="index === 'table'"
          ></table-detail>
        </div>
        <div class="col-12 row justify-center pa-0">
          <div
            v-for="(itemChild, j) in item"
            :key="j"
            class="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-12 d-flex pa-0"
          >
            <check-type class="mx-2" :items="itemChild"> </check-type>
          </div>

          <!-- @input="(value) => handleEmiteData(value, j)" -->

          <!-- {{ item }} -->
        </div>
      </div>
    </div>

    <div>
      <div class="text-center">
        <v-btn color="success" @click="savePallette()">save</v-btn>
        <v-btn color="primary" @click="refresh()">refresh</v-btn>
        <v-btn color="black" dark @click="backtobeginer()">restore</v-btn>
      </div>
    </div>
    <!-- <color-input></color-input>
    <gradient-input></gradient-input> -->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import CheckType from "../components/palette/CheckType.vue";
import CardDetail from "../components/palette/example/CardDetail.vue";
import NavbarDetail from "../components/palette/example/NavbarDetail.vue";
import TableDetail from "../components/palette/example/TableDetail.vue";
import GradientInput from "../components/palette/GradientInput.vue";
export default {
  components: {
    CardDetail,
    NavbarDetail,
    TableDetail,
    CheckType,
    GradientInput
  },
  data() {
    return {
      image: "",
      renderItem: {},
      mainitem: {},
      dataExample: {},
      theme: true,
      imageUpload: {},
      isLoading: false
    };
  },
  async mounted() {
    let current_palette = JSON.parse(sessionStorage.getItem("current_palette"));
    if (current_palette) {
      this.mainitem = JSON.parse(sessionStorage.getItem("current_palette"));
    } else {
      this.mainitem = this.webPalette.palette;
      sessionStorage.setItem("current_palette", JSON.stringify(this.mainitem));
    }
    this.image = this.webPalette.logo;
    // await this.selectData();
  },
  computed: {
    ...mapState("account", ["webPalette"])
  },
  // watch: {
  //   '$vuetify.theme.isDark': {
  //     handler: function (val) {
  //       t
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },

  methods: {
    async saveLogo() {},
    async inputImage(value) {
      if (value) this.image = URL.createObjectURL(value);
      let formData = new FormData();
      formData.append("file", value);
      this.imageUpload = formData;
    },

    // async handleUploadImage(image) {
    //   try {
    //     let { data } = await this.$axios.post(
    //       `http://localhost:3000/image/file/image/smart`,
    //       image
    //     );
    //     console.log(data.image, "response");
    //     return data.image;
    //   } catch (error) {
    //     console.log(error);
    //     this.isLoading = false;
    //   }
    // },

    async savePallette() {},
    refresh() {},
    async backtobeginer() {}
  },
  async destroyed() {
    console.log("refresh");
  }
};
</script>

<style></style>
