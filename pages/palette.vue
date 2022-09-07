<template>
  <div>
    <h2 class="text-center">Palette Management</h2>
    <div class="row justify-center">
      <div
        class="col-lg-4 col-md-4 col-12 text-center elevation-4 my-5 rounded"
      >
        <h2 class="text-center text-decoration-underline font-italic my-2">
          ภาพ LOGO
        </h2>
        <img :src="image" alt="" class="img_logo" />

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
export default {
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
  computed: {},
  // watch: {
  //   '$vuetify.theme.isDark': {
  //     handler: function (val) {
  //       t
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
  async mounted() {},
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
