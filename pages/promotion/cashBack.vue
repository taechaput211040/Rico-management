<template>
  <v-flex>
    <loading-page v-if="isLoading"></loading-page>
    <v-container>
      <h2 class="mb-2">ตั้งค่าเครดิตเงินคืน (Cashback)</h2>
      <v-card
        class="col-md-3 col-12 elevation-4 mt-5 pa-4 rounded-lg text-center"
      >
        <span class="font-weight-bold">สถานะการใช้งาน</span>
        <v-switch
          hide-details="auto"
          class="mx-5 mt-2"
          color="success"
          :true-value="true"
          :false-value="false"
          :disabled="canwrite"
          :label="`สถานะ`"
          v-model="cashback.status"
          @change="switchstatus"
        ></v-switch>
      </v-card>

      <v-card
        width="100%"
        class="elevation-4 mt-5 pa-4 rounded-lg font-weight-bold"
        v-if="cashback.status == 1"
      >
        <v-row
          ><v-col cols="12" sm="6" class="ma-auto text-center">
            <span class="font-weight-bold"
              >รูปโปรโมท(ขนาด 1040x1040 ไม่เกิน 1MB)</span
            >
            <div class="pa-4">
              <img
                :src="cashback.pictureUrl"
                alt=""
                class="img_promotion pa-md-3"
              />
              <v-file-input
                v-model="inputPicture"
                color="deep-purple accent-4"
                @change="selectFile"
                counter
                dense
                :disabled="canwrite"
                hide-details="auto"
                label="เปลี่ยนรูปโปรโมชั่น"
                placeholder="รูปโปรโมชัน"
                prepend-icon="mdi-camera"
                outlined
                :show-size="1000"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip
                    v-if="index < 2"
                    color="deep-purple accent-4"
                    dark
                    label
                    small
                  >
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
              <v-btn
                class="mx-auto btn_sty"
                color="success"
                prepend-icon="mdi-camera"
                label="upload"
                @click="uploadImage"
              >
                <v-icon>mdi-upload</v-icon> Upload
              </v-btn>
            </div>
          </v-col>
          <v-col cols="6" sm="6">
            <v-row class="pa-md-3 my-auto">
              <v-col cols="12" v-if="company !='al'">
                <v-switch 
                  hide-details="auto"
                  class="mx-5 mt-2"
                  color="success"
                  
                  :true-value="true"
                  :false-value="false"
                  :disabled="canwrite"
                  :label="`โหมดการทำงาน`"
                  v-model="cashback.cashback_type"
                  @change="switchstatus"
                ></v-switch>
                <div
                  class="elevation-4 pa-md-3 my-auto"
                  v-if="cashback.cashback_type"
                >
                  <div>ตัดรอบรายวัน / รายสัปดาห์ / รายเดือน</div>
                  <p>
                    คิดยอดเสียให้ตามรอบการรับที่ตั้งไว้ เช่น รายวัน ตัดรอบการคิด
                    00.00 - 23.59 ของเมื่อวาน คิดวันต่อวัน / สัปดาห์ ต่อสัปดาห์
                    เดือน / เดือน
                  </p>
                </div>
                <div
                  class="elevation-4 pa-md-3 my-auto"
                  v-if="!cashback.cashback_type"
                >
                  <div>สะสม ยอดเสีย</div>
                  <p>
                    คิดยอดเสียให้คำนวนจาก (ฝาก - ถอน) ตั้งแต่ การฝากครั้งแรก
                    หรือ การกดรับแคชแบคครั้งล่าสุด
                  </p>
                </div>
              </v-col>
              <v-col cols="12" v-if="company =='al'">
            โหมดการทำงาน  (Legacy)
               
                <div
                  class="elevation-4 pa-md-3 my-auto"
                 
                >
                  <div>สะสม ยอดเสีย</div>
                  <p>
                    คิดยอดเสียให้คำนวนจาก ยอดฝากที่ไม่ได้มีการถอน ตั้งแต่ การฝากครั้งแรก
                    หรือ การกดรับแคชแบคครั้งล่าสุด เช่น ฝาก 100 ไม่ได้ถอน ก็จะนำยอด 100 ไปคิด แคชแบค
                    แต่หาก ฝาก 10000 แล้วถอน 200 
                    ยอด 10000 จะไม่ถูกคิดแคชแบค
                  </p>
                  
                </div>
              </v-col>
              <v-col sm="4" cols="12">
                เลือกการรับรายได้
                <v-select
                  :items="itemstype"
                  :item-text="itemstype.text"
                  :item-value="itemstype.value"
                  v-model="cashback.collect_type"
                  outlined
                  hide-details="auto"
                  dense
                ></v-select
              ></v-col>
              <v-col sm="4" cols="12">
                จำนวนเครดิตเงินคืน(%)
                <v-text-field
                  type="number"
                  v-model="cashback.rate"
                  dense
                  outlined
                  hide-details="auto"
                ></v-text-field
              ></v-col>
              <v-col sm="4" cols="12">
                เงินคืนสูงสุด ( 0 คือไม่จำกัด)
                <v-text-field
                  type="number"
                  v-model="cashback.max_amount"
                  dense
                  hide-details="auto"
                  outlined
                ></v-text-field
              ></v-col>
              <v-col cols="12">
                จำนวนอั้นถอน เมื่อกดรับเงินคืน (เป็นจำนวนเท่า ของเงิน cashback
                ที่กด รับ หากไม่อั้นถอนให้ใส่ 1000000 )
                <v-text-field
                  type="number"
                  v-model="cashback.wdlimit_multiply"
                  dense
                  hide-details="auto"
                  outlined
                ></v-text-field
              ></v-col>
            </v-row>
            <div class="px-md-4">
              <v-card-text class="font-weight-bold">
                ตั้งค่าเทิร์น
              </v-card-text>
              <v-row class="mb-4">
                <v-col cols="6" sm="4">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="SLOT"
                    v-model="cashback.SL"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="4">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    v-model="cashback.SB"
                    label="Sportbook"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="4">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="ESPORT"
                    v-model="cashback.ES"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="4">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="HorseRacing"
                    v-model="cashback.OT"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="4">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="casino"
                    v-model="cashback.LC"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="4"
                  ><v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    v-model="cashback.LT"
                    label="lotto"
                  ></v-text-field
                ></v-col> </v-row
              ><v-card-actions>
                <v-btn
                  class="mx-auto btn_sty"
                  :disabled="canwrite"
                  color="success"
                  @click.prevent="submitCashback"
                  >บันทึก</v-btn
                >
              </v-card-actions>
            </div></v-col
          >
        </v-row>
      </v-card>
      <h2 class="mt-4 mb-2">ตรวจสอบ CASHBACK</h2>
      <v-card  width="100%"
      class="elevation-4 mt-5 pa-4 rounded-lg font-weight-bold">
      <div v-if="cashback.cashback_type">
        <div class="mt-4 mb-2" v-if="cashback.collect_type == 'DAY'"> คำนวนรายได้ของเมื่อวาน</div>
        <div class="mt-4 mb-2" v-if="cashback.collect_type == 'WEEK'"> คำนวนรายได้ของ วันจันทร์ ที่แล้ว ถึง วันอาทิตย์ กดรับได้วันจันทร์</div>
        <div class="mt-4 mb-2" v-if="cashback.collect_type == 'MOUNTH'"> คำนวนรายได้ของ เดือนปัจจุบัน กดรับได้วันที่ 1 เดือนถัดไป</div>

      </div>
      <div v-if="!cashback.cashback_type && company!='al'">
        <div class="mt-4 mb-2" v-if="cashback.collect_type == 'DAY'"> คำนวนรายได้ ตั้งแต่กดรับแคชแบคล่าสุด </div>

      </div>
      <div v-if="company == 'al'">
        <div class="mt-4 mb-2" v-if="cashback.collect_type == 'DAY'"> คำนวนรายได้ ตามยอดฝากที่ไม่มีการถอน </div>

      </div>
        <div class="container-fluid">
          <div class="card shadow p-3">
            <div mt-3>
              <v-row>
                <v-col cols="6" sm="4">
                  <div>
                    <label>กรุณากรอก username เพื่อตรวจสอบ </label>
                    <div class="d-flex">
                      <v-text-field
                        type="text"
                        v-model="username_cashback"
                        dense
                        outlined
                        hide-details="auto"
                      ></v-text-field>
                      <v-btn   class="mx-auto btn_sty" @click="searchCashback(username_cashback)"
                      color="success"
                   
                      >ค้นหา</v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="6" sm="4">
                  <div>
                    <label>เวลารับ แคชแบค ล่าสุด </label>
                    <div class="d-flex">
                      <v-text-field
                        type="text"
                        disabled
                        v-model="cashback_info.start_caltime"
                        dense
                        outlined
                        hide-details="auto"
                      ></v-text-field>
                    </div>
                  </div>
                </v-col>
                <v-col cols="6" sm="4">
                  <label>แคชแบคที่สามารถรับได้ </label>
                  <div class="d-flex">
                    <v-text-field
                      type="text"
                      disabled
                      v-model="cashback_info.cashback"
                      dense
                      outlined
                      hide-details="auto"
                    ></v-text-field>
                  </div>
                </v-col>
              
              </v-row>

              <v-row>
                <v-col cols="6" sm="4">
                  <div>
                    <label
                      >ยอดฝากรวม ตั้งแต่กดรับแคชแบคล่าสุดจนถึงปัจจุบัน
                    </label>
                    <div class="d-flex">
                      <v-text-field
                        type="text"
                        disabled
                        v-model="cashback_info.deposit"
                        dense
                        outlined
                        hide-details="auto"
                      ></v-text-field>
                    </div>
                  </div>
                </v-col>
                <v-col cols="6" sm="4">
                  <div>
                    <label
                      >ยอดถอนรวม ตั้งแต่กดรับแคชแบคล่าสุดจนถึงปัจจุบัน
                    </label>
                    <div class="d-flex">
                      <v-text-field
                        type="text"
                        disabled
                        v-model="cashback_info.withdraw"
                        dense
                        outlined
                        hide-details="auto"
                      ></v-text-field>
                    </div>
                  </div>
                </v-col>
                <v-col cols="6" sm="4">
                  <label>winlose </label>
                  <div class="d-flex">
                    <v-text-field
                      type="text"
                      disabled
                      v-model="cashback_info.winlose"
                      dense
                      outlined
                      hide-details="auto"
                    ></v-text-field>
                  </div>
                </v-col>
            
              </v-row>

             
            </div>
          </div>
        </div>
      </v-card>
    </v-container>
  </v-flex>
</template>

<script>
import dayjs from "dayjs";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      cashback_info:{
        cashback: 0,
          deposit: 0,
          withdraw: 0,
          winlose: 0,
          start_caltime: '',
      },
      username_cashback:null,
      isLoading: true,
      inputPicture: undefined,
      cashback: { status: false },
      typeselect: "รับได้รายวัน",
      itemstype: [
        { value: "DAY", text: "รับได้รายวัน" },
        { value: "WEEK", text: "รับได้รายสัปดาห์" },
        { value: "MOUNTH", text: "รับได้รายเดือน" },
      ],
    };
  },
  async fetch() {
    try {
      let response = await this.getCashback();
      this.cashback = response;
      this.isLoading = false;
    } catch (error) {}
  },
  computed: {
    ...mapState("auth", ["menu","company"]),
    canwrite() {
      if (this.menu) {
        if (!this.menu.includes("promotion_write")) return true;
        else return false;
      }
    },
  },
  methods: {
    ...mapActions("promotion", ["getCashback", "saveCashback"]),
    ...mapActions("member", ["checkCashback"]),
    async searchCashback(){
      if(!this.username_cashback){
        this.$swal({
        title: `กรุณากรอก username`,
        icon: "info",
        allowOutsideClick: true,
        confirmButtonColor: "green",
        confirmButtonText: "ok",
      });
      return
      }
       this.isLoading=true
       const temp_data = await this.checkCashback(this.username_cashback)
      this.cashback_info  = temp_data
      this.cashback_info.start_caltime = dayjs(this.cashback_info.start_caltime).format("YYYY-MM-DD HH:mm:ss")
       this.isLoading=false
    },
    async submitCashback() {
      this.isLoading = true;
      await this.saveCashback(this.cashback);
      this.isLoading = false;
      this.$swal({
        title: `ทำรายการสำเร็จ`,
        icon: "success",
        allowOutsideClick: true,
        confirmButtonColor: "green",
        confirmButtonText: "ok",
      });
    },
    switchstatus() {
      this.submitCashback();
    },
    selectFile(value) {
      if (value) {
        this.cashback.pictureUrl = URL.createObjectURL(this.inputPicture);
      } else {
        this.url = "";
      }
    },
    async uploadImage() {
      this.loading = true;
      if (!this.inputPicture?.name) {
        this.$swal({
          icon: "warning",
          title: "กรุณาเลือกรูปที่ต้องการ",
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      const data = new FormData();
      data.append("file", this.inputPicture);
      data.append("filename", this.inputPicture.name);
      try {
        let response = await this.$axios.post(
          "https://admin-static-api-ehhif4jpyq-as.a.run.app/api/Update/file/Dynamic/test/secret123",
          data
        );
        //   "https://all-member-gateway-ehhif4jpyq-as.a.run.app/api/Gateway/Provider/145c4b748540ca78664b32853e4031b5" );
        this.cashback.pictureUrl = response.data.image;
        this.$swal({
          icon: "success",
          title:
            "อัพโหลดสำเร็จ อย่าลืมกดบันทึก ด้านล่างสุดเพื่อบันทึกผลการเปลี่ยนแปลง",
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 1500,
        });

        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
