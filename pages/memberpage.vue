<template>
  <div>
    <div v-if="canwrite">
      <h2>กรุณาติดต่อ admin เพื่อทำการเปิดใช้งานการแก้ไขหน้า Member</h2>
    </div>
    <div v-else>
      <h2>Memberpage Menagement</h2>
      <iframe
        class="mt-3"
        frameborder="none"
        width="100%"
        height="100vh"
        style="min-height: 100vh"
        :src="`https://admin-static.smart-ai-api.com/#/member/?hash=${$store.state.auth.statichash}`"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  // name: 'PageName',
  computed: {
    ...mapState("auth", ["menu"]),

    canwrite() {
      if (this.menu) {
        if (!this.menu.includes("memberpage_write")) return true;
        else return false;
      }
    },
  },
  async fetch() {
    await this.$store.dispatch("auth/getHashStatic");
  },
  methods() {},
};
</script>
