<template>
  <div>
    <h2>Memberpage Menagement</h2>
    <iframe
      class="mt-3"
      frameborder="none"
      width="100%"
      height="100vh"
      style="min-height: 100vh"
      :src="
        `https://admin-static.smart-ai-api.com/#/member/?token=${$store.state.auth.tokenMember}`
      "
    />
  </div>
</template>

<script>
export default {
  // name: 'PageName',
  computed: {},
  async created() {},
  methods() {}
};
</script>
