<template>
  <v-flex>
    <v-container>
      <h2 class="mb-2">โปรโมชั่นทั่วไป</h2>

      <div class="justify-end">
        <v-btn
          color="info"
          class="font-weight-bold"
          rounded
          dark
          @click="addPromotion = true"
          ><v-icon>mdi-plus</v-icon> เพิ่มโปรโมชัน</v-btn
        >
      </div>
      <v-row class="mt-5">
        <v-col
          cols="12"
          sm="6"
          md="6"
          lg="4"
          v-for="(item, i) in itempromotion"
          :key="i"
        >
          <div class="card_promotion">
            <div class=" title_card">
              <div class="text-right ">
                <v-tooltip bottom color="success" v-if="item.status == true">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      color="success"
                      x-small
                      outlined
                      icon
                      fab
                      ><v-icon>mdi-power-standby</v-icon>
                    </v-btn></template
                  >
                  <span>กดเพื่อปิดใช้งาน</span>
                </v-tooltip>
                <v-tooltip bottom color="red" v-else>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      color="red"
                      x-small
                      outlined
                      icon
                      fab
                      ><v-icon>mdi-power-standby</v-icon>
                    </v-btn></template
                  >

                  <span>กดเพื่อเปิดใช้งาน</span>
                </v-tooltip>
                <v-tooltip bottom color="warning">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      color="warning"
                      x-small
                      outlined
                      icon
                      fab
                      ><v-icon>mdi-pencil</v-icon></v-btn
                    ></template
                  >
                  <span>แก้ไขโปรโมชัน</span>
                </v-tooltip>
                <v-tooltip bottom color="error">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="error"
                      v-bind="attrs"
                      v-on="on"
                      x-small
                      outlined
                      class="mx-1"
                      icon
                      fab
                      ><v-icon>mdi-delete</v-icon></v-btn
                    ></template
                  >
                  <span>ลบโปรโมชัน</span>
                </v-tooltip>
              </div>

              <div class="mt-4">
                <div class="text-center">ชื่อโปรโมชัน</div>
                <div class="text-center">
                  <v-chip color="success" label dark v-if="item.status">{{
                    item.promotionname
                  }}</v-chip>
                  <v-chip color="grey" label dark v-else>{{
                    item.promotionname
                  }}</v-chip>
                </div>
              </div>
            </div>

            <div class="pa-3">
              <div class="text-center">
                <img class="img_promotion" :src="item.promotionpic" alt="" />
              </div>

              <div class="font-weight-bold">คำอธิบายที่ลูกค้าเห็น</div>
              <v-card class="elevatoin-3 pa-3 rounded-lg">
                {{ item.promotiondescription }}
              </v-card>

              <div v-for="(detail, index) in item.detail" :key="index">
                <div v-if="detail">
                  <div class="my-2 font-weight-bold">
                    ประเภทโปรโมชัน :
                    <v-chip
                      color="success"
                      label
                      dark
                      v-if="detail.typestatus == true"
                      >{{ detail.promotiontypename }}</v-chip
                    >
                    <v-chip v-else color="grey" label dark>{{
                      detail.promotiontypename
                    }}</v-chip>
                  </div>
                  <v-card
                    class="elevatoin-3 pa-3 rounded-lg"
                    v-if="detail.typestatus == true"
                  >
                    <v-row class="row" no-gutters>
                      <v-col class="col-6 col-md-6 col-lg-4">
                        <span class="font-weight-bold">ฝากขั้นต่ำ:</span>
                        {{ detail.mindp }}</v-col
                      >
                      <v-col class="col-6 col-md-6 col-lg-4"
                        ><span class="font-weight-bold">ฝากสูงสุด:</span>
                        {{ detail.maxdp }}</v-col
                      >
                      <v-col class="col-6 col-md-6 col-lg-4"
                        ><span class="font-weight-bold">ประเภท:</span>
                        {{ detail.bonustype }}</v-col
                      >
                      <v-col class="col-6 col-md-6"
                        ><span class="font-weight-bold">จำนวนโบนัส:</span>
                        {{ detail.bonusvalue }}</v-col
                      >
                      <v-col class="col-6 col-md-6 col-lg-4"
                        ><span class="font-weight-bold">โบนัสสูงสุด:</span>
                        {{ detail.maxbonusvalue }}</v-col
                      >
                      <v-col class="col-6 col-md-6 col-lg-4"
                        ><span class="font-weight-bold">เทิร์น:</span>
                        {{ detail.STEP }}</v-col
                      >
                      <v-col class="col-6 col-md-6 col-lg-4"
                        ><span class="font-weight-bold"> อั้นถอน:</span>
                        {{ detail.wdlimit }}</v-col
                      >
                    </v-row>
                  </v-card>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-dialog v-model="addPromotion" max-width="1000px">
        <add-promotion></add-promotion>
      </v-dialog>
    </v-container>
  </v-flex>
</template>

<script>
import AddPromotion from "../../components/AddPromotion.vue";
export default {
  components: { AddPromotion },
  data() {
    return {
      addPromotion: false,
      itempromotion: [
        {
          id: 3,
          promotiondescription:
            "New member Promotion\nအဖွဲ့ဝင်အသစ်များ မှတ်ပုံတင်ပြီး 100% ဘောနပ်စ်ကို ရယူလိုက်ပါ။ \nအများဆုံး ဘောနပ် 200,000 mmk/Turnover 20x\nအဖွဲ့ဝင်အသစ်များသည် တစ်ဦးလျှင် ဘောနပ်စ်တစ်ကြိမ်သာရရှိမည်။\nငွေသွင်းပမာဏတွင် ဤပရိုမိုးရှင်းမှရရှိသော ဘောနပ်စ်များ ပါဝင်သည်။\nကြိုတင်သတိမပေးပဲ Beggar119 သည်  ဤပရိုမိုးရှင်းကို အချိန်မရွေး ပယ်ဖျက်ပြောင်းလဲပိုင်ခွင့်ရှိသည်။",
          promotionname: "အဖွဲ့ဝင်အသစ်များ ဘောနပ်စ်များ ရရှိပါမည်။  100%",
          promotionpic:
            "https://image-storage-betkub.s3.ap-southeast-1.amazonaws.com/images/Pae0QS3qc2dmeK4IMURNMCwxv0NmLp8nN7Jfydkv.jpg",
          status: true,
          detail: [
            {
              CASINO: 35,
              ESPORT: null,
              FOOTBALL: 20,
              GAME: 20,
              LOTTO: 20,
              M2: null,
              MULTI_PLAYER: null,
              PARLAY: 20,
              STEP: 20,
              bonus: 300,
              bonuscount: null,
              bonusdurationFrom: null,
              bonusdurationTo: null,
              bonustype: "%",
              bonusvalue: 100,
              days: 7,
              deposit: 300,
              durationstatus: false,
              maxbonusvalue: 3000,
              maxdp: 100000,
              mindp: 0,
              promotiontypename: "สมัครสมาชิกใหม่",
              rulestatus: false,
              typestatus: true,
              wdlimit: 0
            },
            {
              CASINO: 2,
              ESPORT: null,
              FOOTBALL: 2,
              GAME: 2,
              LOTTO: 2,
              M2: null,
              MULTI_PLAYER: null,
              PARLAY: 2,
              STEP: 2,
              bonus: 300,
              bonuscount: null,
              bonusdurationFrom: null,
              bonusdurationTo: null,
              bonustype: "%",
              bonusvalue: 0,
              days: 7,
              deposit: 300,
              durationstatus: false,
              maxbonusvalue: 5000,
              maxdp: 100000,
              mindp: 0,
              promotiontypename: "ฝากครั้งแรกของวัน",
              rulestatus: false,
              typestatus: false,
              wdlimit: 0
            },
            {
              CASINO: 2,
              ESPORT: null,
              FOOTBALL: 2,
              GAME: 2,
              LOTTO: 2,
              M2: null,
              MULTI_PLAYER: null,
              PARLAY: 2,
              STEP: 2,
              bonus: 300,
              bonuscount: null,
              bonusdurationFrom: null,
              bonusdurationTo: null,
              bonustype: "%",
              bonusvalue: 0,
              days: 7,
              deposit: 300,
              durationstatus: false,
              maxbonusvalue: 5000,
              maxdp: 100000,
              mindp: 0,
              promotiontypename: "ฝากทั้งวัน",
              rulestatus: false,
              typestatus: false,
              wdlimit: 0
            },
            ,
            {
              CASINO: 2,
              ESPORT: null,
              FOOTBALL: 2,
              GAME: 2,
              LOTTO: 2,
              M2: null,
              MULTI_PLAYER: null,
              PARLAY: 2,
              STEP: 2,
              bonus: 300,
              bonuscount: null,
              bonusdurationFrom: null,
              bonusdurationTo: null,
              bonustype: "%",
              bonusvalue: 0,
              days: 7,
              deposit: 300,
              durationstatus: false,
              maxbonusvalue: 5000,
              maxdp: 100000,
              mindp: 0,
              promotiontypename: "ฝากต่อเนื่อง",
              rulestatus: false,
              typestatus: false,
              wdlimit: 0
            }
          ]
        },
        {
          id: 7,
          promotiondescription:
            "နေ့စဥ်ငွေသွင်း‌ဘောနပ် 50% ရယူချိန်\nနေ့လည် 2 နာရီမှ 4 နာရီ\nturn over 15x အများဆုံးပေးဘောနပ် 33333 mmk ဖြစ်သည်။",
          promotionname: "2-4pm နေ့စဥ်ငွေသွင်း‌ဘောနပ် 50% ရယူချိန်",
          promotionpic:
            "https://image-storage-betkub.s3.ap-southeast-1.amazonaws.com/images/dQswx0LuFsbMT3kbO16XLfMjLwqGgWnOOkZ6hC0R.jpg",
          status: false,
          detail: [
            {
              CASINO: 2,
              ESPORT: null,
              FOOTBALL: 2,
              GAME: 2,
              LOTTO: 2,
              M2: null,
              MULTI_PLAYER: null,
              PARLAY: 2,
              STEP: 2,
              bonus: 300,
              bonuscount: null,
              bonusdurationFrom: null,
              bonusdurationTo: null,
              bonustype: "%",
              bonusvalue: 0,
              days: 7,
              deposit: 300,
              durationstatus: false,
              maxbonusvalue: 5000,
              maxdp: 100000,
              mindp: 0,
              promotiontypename: "สมัครสมาชิกใหม่",
              rulestatus: false,
              typestatus: false,
              wdlimit: 0
            },
            {
              CASINO: 2,
              ESPORT: null,
              FOOTBALL: 2,
              GAME: 2,
              LOTTO: 2,
              M2: null,
              MULTI_PLAYER: null,
              PARLAY: 2,
              STEP: 2,
              bonus: 300,
              bonuscount: null,
              bonusdurationFrom: null,
              bonusdurationTo: null,
              bonustype: "%",
              bonusvalue: 0,
              days: 7,
              deposit: 300,
              durationstatus: false,
              maxbonusvalue: 5000,
              maxdp: 100000,
              mindp: 0,
              promotiontypename: "ฝากครั้งแรกของวัน",
              rulestatus: false,
              typestatus: false,
              wdlimit: 0
            },
            {
              CASINO: 30,
              ESPORT: null,
              FOOTBALL: 15,
              GAME: 15,
              LOTTO: 15,
              M2: null,
              MULTI_PLAYER: null,
              PARLAY: 15,
              STEP: 15,
              bonus: 300,
              bonuscount: 1,
              bonusdurationFrom: "14:30:00",
              bonusdurationTo: "16:30:00",
              bonustype: "%",
              bonusvalue: 50,
              days: 7,
              deposit: 300,
              durationstatus: false,
              maxbonusvalue: 500,
              maxdp: 100000,
              mindp: 0,
              promotiontypename: "ฝากทั้งวัน",
              rulestatus: false,
              typestatus: true,
              wdlimit: 0
            },
            ,
            {
              CASINO: 2,
              ESPORT: null,
              FOOTBALL: 2,
              GAME: 2,
              LOTTO: 2,
              M2: null,
              MULTI_PLAYER: null,
              PARLAY: 2,
              STEP: 2,
              bonus: 300,
              bonuscount: null,
              bonusdurationFrom: null,
              bonusdurationTo: null,
              bonustype: "%",
              bonusvalue: 0,
              days: 7,
              deposit: 300,
              durationstatus: false,
              maxbonusvalue: 5000,
              maxdp: 100000,
              mindp: 0,
              promotiontypename: "ฝากต่อเนื่อง",
              rulestatus: false,
              typestatus: false,
              wdlimit: 0
            }
          ]
        }
      ]
    };
  }
};
</script>

<style></style>
