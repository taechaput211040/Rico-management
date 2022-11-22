<template> </template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  middleware: "auth",
  layout: "blank",
  async beforeMount() {
    // await this.getUser();
    await this.$router.push("/");
  },
  mounted() {},
  methods: {
    ...mapActions("auth", ["getUser", "getFeature"])
  }
};
</script>

<style></style>
