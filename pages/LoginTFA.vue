<template>
  <v-container
    class="fill-height"
    fluid
    style="align-items :center;height:100vh;justify-content: center;"
  >
    <div style="align-items :center;" v-if="$store.state.auth.verify">
      <v-card class="form-signin mt-3 pa-3  elevetion-2" max-width="800">
        <v-form style="text-align: center;padding:30px;">
          <img
            class="mb-4"
            src="data:image/jpeg;base64,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"
            alt=""
            width="200"
          />
          <h1 class="h3 mb-3 fw-normal">
            โปรดกรอกรหัส 6 หลัก จาก google autenticator
          </h1>

          <div class="pa-3">
            <h1 class="h3 mb-3 fw-normal">
              เมื่อสแกนเสร็จแล้ว กรอก รหัส 6 หลัก
            </h1>

            <div
              style="justify-content: center; text-align: center;display:flex; align-items:baseline;"
            >
              <div class="col-6">
                <v-text-field
                  type="text"
                  dense
                  outlined
                  hide-details="auto"
                  v-model="tfa_input.code"
                />
              </div>

              <v-btn
                @click="postCodeToAllrico()"
                class="w-100 btn btn-lg btn-primary"
              >
                ยืนยัน
              </v-btn>
            </div>
            <small class="font-weight-bold">**กรอกรหัส 6 หลัก **</small>
          </div>
        </v-form>
      </v-card>
    </div>
    <div v-else class="text-center">
      <v-card class="elevation-2 rounded-lg pa-3" max-width="800">
        <v-form style="text-align: center;">
          <img
            class="mb-4"
            src="data:image/jpeg;base64,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"
            alt=""
            width="200"
          />
          <h3 class=" mb-3 fw-normal">
            สแกน QR CODE ด้วยแอพ Google Autenticator เพื่อลงทะเบียน ยืนยันตัวตน
            2 ชั้น
          </h3>
          <div v-if="$store.state.auth.tfa_credential">
            <img class="mb-4" :src="generateQrcode()" alt="" width="200" />
          </div>
          <div class=" pa-3">
            <h1 class="h3 mb-3 fw-normal">
              เมื่อสแกนเสร็จแล้ว กรอก รหัส 6 หลัก
            </h1>

            <div
              style="justify-content: center; text-align: center;display:flex; align-items:baseline;"
            >
              <div class="col-6">
                <v-text-field
                  type="text"
                  dense
                  label="รหัส 6 หลัก"
                  outlined
                  hide-details="auto"
                  v-model="tfa_input.code"
                />
              </div>

              <v-btn
                @click="postCodeToAllrico"
                class="w-100 btn btn-lg btn-primary"
              >
                ยืนยัน
              </v-btn>
            </div>
            <small class="font-weight-bold">**กรอกรหัส 6 หลัก **</small>
          </div>
        </v-form>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import QRCode from "qrcode";
export default {
  layout: "blank",
  data() {
    return {
      img: "",
      verified: false,
      loading: false,

      tfa_input: {
        id: "",
        code: ""
      }
    };
  },
  created() {
    if (!this.$store.state.auth.tfa_data) {
      this.$router.push({ path: "login" });
    }
    if (this.$store.state.auth.tfa_credential.secret) {
      this.tfa_input.id = this.$store.state.auth.tfa_credential.id;
      this.tfa_input.secret = this.$store.state.auth.tfa_credential.secret;
    } else {
      this.tfa_input.id = this.$store.state.auth.tfa_credential.id;
    }
  },
  methods: {
    ...mapActions("auth", ["twofactor"]),
    ...mapMutations("auth", ["set_login","set_data_secret"]),
    async postCodeToAllrico() {
      this.loading = true;
      try {
        const res = await this.twofactor(this.tfa_input);
        // console.log(this.tfa_input, "res");
        this.loading = false;
        if (res.token) {
          await this.set_login(res);
          // await this.set_data_secret(res);
          if (!res.menu_permission) {
            this.$router.push("/test");
          } else {
            this.$router.push("/redirect");
          }
        }
        // this.$router.push({ path: "Dashboard" });
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    generateQrcode() {
      if (this.$store.state.auth.tfa_credential.otpauth_url) {
        QRCode.toDataURL(
          this.$store.state.auth.tfa_credential.otpauth_url,
          (err, data) => {
            this.img = data;
          }
        );
        return this.img;
      }
      return "";
    }
  }
};
</script>

<style></style>
