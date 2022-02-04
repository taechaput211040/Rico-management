<template>
  <v-flex>
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
          :true-value="1"
          :false-value="0"
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
                v-model="cashback.pictureUrl"
                color="deep-purple accent-4"
                counter
                dense
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
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <v-row class="pa-md-3 my-auto">
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
                    v-model="cashback.step"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="4">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    v-model="cashback.football"
                    label="Sportbook"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="4">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="ESPORT"
                    v-model="cashback.game"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="4">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="HorseRacing"
                    v-model="cashback.parlay"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="4">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="casino"
                    v-model="cashback.casino"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="4"
                  ><v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    v-model="cashback.lotto"
                    label="lotto"
                  ></v-text-field
                ></v-col> </v-row
              ><v-card-actions>
                <v-btn class="mx-auto" color="success">บันทึก</v-btn>
              </v-card-actions>
            </div></v-col
          >
        </v-row>
      </v-card>
    </v-container>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      cashback: {
        casino: 5,
        collect_type: "DAY",
        created_at: "2021-04-26T11:29:02.000000Z",
        esport: 2,
        football: 5,
        game: 5,
        id: 1,
        lotto: 5,
        m2: 2,
        max_amount: 0,
        multi_player: 2,
        parlay: 5,
        pictureUrl:
          "https://image-storage-betkub.s3.ap-southeast-1.amazonaws.com/images/0BOIpDTgDtjz3sLMFjqEzy6BUnJV9fFgASRZT1MM.jpg",
        rate: 5,
        status: 1,
        step: 5,
        update_by: "RICO",
        updated_at: "2022-01-16T05:18:59.000000Z",
        wdlimit_multiply: 1000000
      },
      typeselect: "รับได้รายวัน",
      itemstype: [
        { value: "DAY", text: "รับได้รายวัน" },
        { value: "WEEK", text: "รับได้รายสัปดาห์" },
        { value: "MOUNTH", text: "รับได้รายเดือน" }
      ]
    };
  },
  methods: {
    switchstatus() {
      console.log("ho");
    }
  }
};
</script>

<style></style>
