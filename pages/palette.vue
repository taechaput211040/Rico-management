<template>
  <div>
    <h2 class="text-center">Palette Management</h2>
    <div class="row justify-center pa-5">
      <div
        class="card-show-section col-lg-4 col-md-4 col-12 rounded justify-center pa-sm-3 pa-1 ma-5"
      >
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
      <div
        class="card-show-section ma-2 rounded justify-center row pa-0 pa-sm-3"
      >
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
            :textWithIcon="mainitem.menu.textColor_withIcon.value"
            :bgColorIner="mainitem.menu.bgColorIner.value"
            v-if="index === 'menu'"
            class="col-lg-8 col-xl-6 col-md-8 col-sm-12 col-12"
          ></navbar-detail>
          <table-detail
            :bgHeader="mainitem.table.colorTable.value"
            :textColor="mainitem.table.colorTextTable.value"
            class="pa-0 col-xl-6 col-md-8 col-sm-12 col-12"
            v-if="index === 'table'"
          ></table-detail>
          <!-- :bgColorIner="mainitem.table.bgColorIner.value" -->
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
    GradientInput,
  },
  data() {
    return {
      image: "",
      renderItem: {},
      mainitem: {},
      dataExample: {},
      theme: true,
      imageUpload: {},
      isLoading: false,
    };
  },
  async beforeMount() {
    try {
      await this.$store.dispatch("account/getPalletePreset");
      this.mainitem = this.webPalette.palette;
      this.image = this.webPalette.logo;
      sessionStorage.setItem("current_palette", JSON.stringify(this.mainitem));
    } catch (error) {
      console.log(error);
    }
  },
  async mounted() {
    // await this.selectData();
  },
  computed: {
    ...mapState("account", ["webPalette"]),
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
    async inputImage(value) {
      if (value) this.image = URL.createObjectURL(value);
      let formData = new FormData();
      formData.append("file", value);
      this.imageUpload = formData;
    },
    async saveLogo() {
      this.$swal({
        title: "Are you sure you want to Change Logo ?",
        icon: "warning",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          await this.handleUploadImage(this.imageUpload)
            .then(async (logo) => {
              if (logo) {
                try {
                  let { data } = await this.$axios.patch(
                    `https://static-template-api-ehhif4jpyq-as.a.run.app/css/profile/rico/${this.webPalette.web_id}`,
                    {
                      logo: logo,
                    }
                  );
                  this.image = data.logo;
                  this.isLoading = false;
                  this.$swal({
                    icon: "success",
                    title: "Update Logo Success",
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    timer: 1500,
                  }).then(async (result) => {
                    if (result) {
                      this.isLoading = false;
                      await location.reload();
                      //refreshandredirect/
                    }
                  });
                } catch (error) {
                  this.$swal({
                    icon: "error",
                    title: `${error.response.data.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  this.isLoading = false;
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
      this.isLoading = false;
    },
    async handleUploadImage(image) {
      try {
        let { data } = await this.$axios.post(
          `https://static-template-api-ehhif4jpyq-as.a.run.app/image/file/image/smart`,
          image
        );
        console.log(data.image, "response");
        return data.image;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },

    async savePallette() {
      const body = {
        web_id: this.webPalette.web_id,
        presetId: this.webPalette.presetId,
        detail: this.mainitem,
      };
      try {
        this.$swal({
          title: "Are you sure you want to Update Pallete ?",
          icon: "warning",
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // console.log(this.formCreate)
            try {
              let { data } = await this.$store.dispatch(
                "account/updatePalette",
                body
              );
              console.log(data);
              sessionStorage.setItem(
                "current_palette",
                JSON.stringify(data.palette)
              );
              this.$swal({
                icon: "success",
                title: "Update Pallete Success",
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 1500,
              }).then(async (result) => {
                if (result) {
                  await location.reload();
                  //refreshandredirect/
                }
              });
            } catch (error) {
              this.$swal({
                icon: "error",
                title: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    refresh() {
      this.mainitem = JSON.parse(sessionStorage.getItem("current_palette"));
    },
    async backtobeginer() {
      const body = {
        web_id: this.webPalette.web_id,
        presetId: this.webPalette.presetId,
        detail: this.$store.state.webPalette.palette,
      };
      console.log(body, "bodetyyy");
      try {
        this.$swal({
          title: "Are you sure you want to Restore Pallete ?",
          icon: "warning",
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // console.log(this.formCreate)
            try {
              let { data } = await this.$store.dispatch(
                "account/updatePalette",
                body
              );
              console.log(data);
              sessionStorage.setItem(
                "current_palette",
                JSON.stringify(data.palette)
              );
              this.$swal({
                icon: "success",
                title: "Restore Pallete Success",
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 1500,
              }).then(async (result) => {
                if (result) {
                  await location.reload();
                  //refreshandredirect/
                }
              });
            } catch (error) {
              this.$swal({
                icon: "error",
                title: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  async destroyed() {
    console.log("refresh");
  },
};
</script>

<style></style>
