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
            <div
              class="title_card"
              :class="{ active_card: item.status == true }"
            >
              <div class="text-right">
                <v-tooltip bottom color="success" v-if="item.status == true">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="item.status = !item.status"
                      v-bind="attrs"
                      v-on="on"
                      color="green darken-4"
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
                      @click="item.status = !item.status"
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
                      @click="editPromotion(item)"
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
                      @click="deletePromotion(item)"
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
                      <v-col class="col-6 col-md-6 col-lg-4"
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
        <v-card class="pa-5"
          ><add-promotion></add-promotion
          ><v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="btn_sty">บันทึก</v-btn>
            <v-btn color="error" dark>Reset</v-btn>
            <v-btn color="error" outlined @click="addPromotion = false"
              >ยกเลิก</v-btn
            >
          </v-card-actions></v-card
        >
      </v-dialog>
      <v-dialog v-model="EditPromotion" max-width="1000px" persistent>
        <v-card class="pa-5">
          <EditPromotion
            :renderdata="itemedit"
            @close="closeEditpromotion()"
            @save="saveEdit()"
            :Panel="openedPanel"
          />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="btn_sty">บันทึก</v-btn>
            <v-btn color="error" outlined @click="closeEditpromotion"
              >ยกเลิก</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
import Swal from "sweetalert2";
import AddPromotion from "../../components/AddPromotion.vue";
export default {
  components: { AddPromotion },
  data() {
    return {
      itemedit: [],
      EditPromotion: false,
      addPromotion: false,
      openedPanel: [],
      itempromotion: []
    };
  },
  async fetch() {
    let response = await this.getPromotion();
    this.itempromotion = response.data;
  },
  computed: {
    panalCheck(val) {
      if (val) {
        return this.openedPanel;
      }
    }
  },
  methods: {
    ...mapActions("promotion", ["getPromotion"]),
    deletePromotion() {
      Swal.fire({
        title: "ลบโปรโมชั่นนี้หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก"
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: "success",
            confirmButtonColor: "red",
            title: "ลบเสร็จสิ้น",
            confirmButtonText: "ปิด"
          });
        }
      });
    },
    async selectionedit(data) {
      let item = data.detail;
      for (let i = 0; i <= item.length; i++) {
        if (item[i] != null) {
          if (item[i].typestatus == true) {
            this.openedPanel.push(i);
          } else if (item[i].typestatus == false) {
            this.openedPanel.splice(i, 1);
          }
        }
      }
    },
    async editPromotion(promotion) {
      this.EditPromotion = true;
      this.itemedit = promotion;
      await this.selectionedit(promotion);
    },
    async closeEditpromotion() {
      this.openedPanel = [];
      this.EditPromotion = false;
    },
    async saveEdit() {}
  }
};
</script>

<style></style>
