<template>
  <div>
    <div>
      <h2>LineNotify</h2>
    </div>
    <div>
      <!-- v-if="notify_setting.feature_status" -->
      <div class="container-fluid">
        <v-card class="pa-4">
          <v-form>
            <v-switch
              label="สถานะการใช้งาน"
              v-model="notify_setting.status"
              name="wdautoAll"
              switch
              :disabled="!$store.state.auth.isAdmin"
              @change="updatesetting"
            >
              <span v-if="notify_setting.status"
                ><b style="color: green">เปิด</b></span
              >
              <span v-else><b style="color: grey">ปิด</b></span>
            </v-switch>

            <div v-if="notify_setting.status">
              <div class="mt-3">ใส่ Token สำหรับ รับแจ้งเตือนการฝาก</div>
              <v-text-field
                outlined
                dense
                hide-details="auto"
                name="companyurl"
                type="text"
                :disabled="!$store.state.auth.isAdmin"
                v-model="notify_setting.deposit_token"
                >{{ notify_setting.deposit_token }}</v-text-field
              >

              <div for="companyurl" class="mt-3">
                ใส่ Token สำหรับ รับแจ้งเตือนการถอน
              </div>
              <div v-if="$store.state.auth.isAdmin">
                <v-text-field
                  outlined
                  dense
                  hide-details="auto"
                  name="companykey"
                  type="text"
                  :disabled="!$store.state.auth.isAdmin"
                  v-model="notify_setting.withdraw_token"
                  >{{ notify_setting.withdraw_token }}</v-text-field
                >
              </div>

              <div for="companyurl" class="mt-3">
                ใส่ Token สำหรับ รับแจ้งเตือนการสมัครสมาชิก
              </div>
              <v-text-field
                outlined
                dense
                hide-details="auto"
                name="companyname"
                type="text"
                :disabled="!$store.state.auth.isAdmin"
                v-model="notify_setting.register_token"
                >{{ notify_setting.register_token }}</v-text-field
              >

              <div class="mt-2">
                <v-btn
                  @click="updatesetting"
                  type="submit"
                  color="success"
                  v-if="$store.state.auth.isAdmin"
                  >บันทึก</v-btn
                >
              </div>
            </div>
          </v-form>
        </v-card>
      </div>
    </div>
    <div>
      <!-- v-else -->
      <!-- Feature ยังไม่เปิดใช้งานสำหรับ AGENT นี ติดต่อไลน์ Support
      เพื่อขอข้อมูลเพิ่มเติม -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      file: null,
      filename: null,
      filecheck: null,
      url: null,
      changepicIsClick: false,
      loading: false,
      daylimit: false,
      message: {
        header: null,
        topic: null,
        img: null,
        description: null,
        operator: null,
      },
      system: {
        turnNobonus: null,
        wdautoAll: null,
        wdlimitTime: null,
        wdlimit: null,
        wdlimitcredit: null,
        wdwhenoutstanding: null,
        companyname: null,
        companyurl: null,
        companylineurl: null,
        companykey: null,
        least_wd_credits: null,
        wd_auto_amount: null,
        register_link: null,
        login_link: null,
      },
      notify_setting: {},
    };
  },
  async mounted() {
    this.loading = true;
    try {
      var settingdata = (
        await this.$axios.get(
          `${process.env.ALL_LINE_NOTIFY}/api/Notify/${this.$store.state.auth.hash}`
        )
      ).data;
      console.log(settingdata);
      if (settingdata.feature_status) {
        this.notify_setting = settingdata;
      } else {
        this.notify_setting.status = false;
      }
      // this.system = settingdata.data;
      // this.message = settingdata.message;
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  },
  methods: {
    async statusChange(value) {
      this.loading = true;
      var currentvalue = { value: value };
      try {
        await this.$axios.post(`api/ToggleMessage`, currentvalue);
        this.showSuccessAlert("บันทึกสำเร็จ");
        this.loading = false;
      } catch (error) {
        this.showErrorAlert(error.response.message);
        this.loading = false;
      }
    },

    async updatesetting() {
      this.loading = true;
      this.notify_setting.update_by = this.$store.state.auth.user;
      try {
        var settingupdate = await this.$axios.patch(
          `${process.env.ALL_LINE_NOTIFY}/api/Notify/${this.$store.state.auth.hash}`,
          this.notify_setting,
          {
            headers: {
              key: "ramidasky",
            },
          }
        );
        // console.log(settingupdate.data.data)

        this.loading = false;
        this.showSuccessAlert("บันทึกสำเร็จค่ะ");
      } catch (error) {
        this.loading = false;
        this.showErrorAlert(
          error.response.data.message + " code " + error.response.status
        );
      }
    },
    showSuccessAlert(message) {
      // Use sweetalret2

      this.$swal.fire("สำเร็จ", message, "success", "OK");
    },
    showErrorAlert(message) {
      // Use sweetalret2
      this.$swal.fire("ERROR!", message, "error", "OK");
    },
    showInfoAlert(message) {
      // Use sweetalret2
      this.$swal.fire("ระวัง!", message, "warning", "OK");
    },
    showInfoAlert2(message) {
      // Use sweetalret2
      this.$swal.fire("โปรดทราบ", message, "info", "OK", "CANCLE");
    },
  },
};
</script>
<style>
.buttonmy {
  justify-content: center;
}
</style>
