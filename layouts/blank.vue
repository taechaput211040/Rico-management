<template>
  <div class="position-relative">
    <Nuxt />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  async beforeMount() {
    await this.CheckOrganize();
  },
  methods: {
    ...mapActions("account", [
      "getPalletePreset",
      "CreateOrganizePalette",
      "CreatePreset"
    ]),
    async CheckOrganize() {
      try {
        await this.getPalletePreset();
      } catch (error) {
        console.log(error);
        await this.setNewAccount();
      }
    },
    async setNewAccount() {
      try {
        let body = {
          domain: window.location.origin,
          status: true
        };
        let { data } = await this.CreateOrganizePalette(body);
        if (data) {
          let payout = { id: data.id, detail: this.$store.state.webPalette.palette };
          await this.CreatePreset(payout);
          this.$swal({
            icon: "success",
            title: "Set Defult Palette Success",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500
          }).then(async result => {
            if (result) {
              await location.reload();
              //refreshandredirect/
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.show {
  height: 100vh;
  overflow: hidden;
}
</style>
