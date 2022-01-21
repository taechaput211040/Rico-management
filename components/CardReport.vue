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
    <div class="card-icontitle mt-3 text-center">
      <div class="card-detail margin">{{ value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    value: { type: [Number, String], default: "" },
    iconSrc: { type: String, default: "" }
  }
};
</script>

<style></style>
