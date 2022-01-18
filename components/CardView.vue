<template>
  <div class=" card-child elevation-5">
    <div class="row">
      <div class="col-4 text-center d-flex">
        <div class="ma-auto">
          <img :src="iconSrc" class="img-icon icon-show" />
        </div>
      </div>
      <div class="col">
        <div class=" card-icontitle ">
          <h1 v-if="value > 0" class="success--text">{{ value }}</h1>
          <h1 v-if="value < 0" class="red--text">{{ value }}</h1>
        </div>
        <v-divider class="my-2"></v-divider>
        <div
          class="text-start text-data text-primary d-flex align-center justify-space-between"
        >
          <h4>{{ title }}</h4>
          <v-btn color="secondary" fab x-small dark>
            <v-icon>mdi-reload</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    value: { type: Number, default: "" },
    iconSrc: { type: String, default: "" }
  }
};
</script>

<style></style>
