<template>
  <div class=" card-child card-report elevation-5">
    <div class="d-flex">
      <div
        class=" text-data text-primary d-flex align-center justify-space-between"
      >
        <img :src="iconSrc" class="img-icon icon-report mx-4" />
        <h4>{{ title }}</h4>
      </div>
      <v-spacer></v-spacer>
    </div>

    <div class=" card-icontitle mt-3 text-center" v-if="condition == true">
      <div class="card-detail margin success--text" v-if="value > 0">
        +{{ value }} บาท
      </div>
      <div class="card-detail margin red--text" v-if="value < 0">
        {{ value }} บาท
      </div>
    </div>
    <div class="card-icontitle mt-3 text-center" v-else>
      <div class="card-detail margin " :class="titleclass">{{ value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleclass: "",
    condition: {
      type: Boolean,
      default: false
    },
    title: { type: String, default: "" },
    value: { type: [Number, String], default: "" },
    iconSrc: { type: String, default: "" }
  }
};
</script>

<style></style>
