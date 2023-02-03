<template>
  <div>
    <div v-if="canwrite">
      <h2>กรุณาติดต่อ admin เพื่อทำการเปิดใช้งานการแก้ไขหน้า Landing</h2>
    </div>
    <div v-else>
      <h2>Landingpage Menagement</h2>
      <iframe
        class="mt-3"
        frameborder="none"
        width="100%"
        height="100vh"
        style="min-height: 100vh"
        :src="`https://admin-static.smart-ai-api.com/#/?token=${$store.state.auth.tokenMember}`"
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
        if (!this.menu.includes("landingpage_write")) return true;
        else return false;
      }
    },
  },

  methods() {},
};
</script>
