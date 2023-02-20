<template>
  <div class="rounded-lg elevation-2 my-1 cardView mt-3">
    <div class="row">
      <div class="col-4 text-center d-flex">
        <div class="ma-auto">
          <img :src="iconSrc" class="img-icon icon-show" />
        </div>
      </div>
      <div class="col pa-0 ma-auto">
        <div class="card-icontitle" v-if="condition == true">
          <h1 v-if="value > 0" class="success--text">+{{ value }}</h1>
          <h1 v-if="value < 0" class="red--text">{{ value }}</h1>
        </div>
        <div class="card-icontitle" v-else>
          <h1>{{ value }}</h1>
        </div>

        <div
          class="text-start text-data d-flex align-center justify-space-between"
        >
          <h5 :class="titleclass">{{ title }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleclass: "",
    condition: {
      type: Boolean,
      default: false,
    },
    title: { type: String, default: "" },
    value: { type: [Number, String], default: "" },
    iconSrc: { type: String, default: "" },
  },
};
</script>

<style></style>
