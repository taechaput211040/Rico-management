<template>
  <v-flex>
    <div v-if="isLoading">
      <loading-page></loading-page>
    </div>
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
      <v-row class="mt-5" v-if="check">
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
                      :disabled="canwrite"
                      @click="tougleStatus(item)"
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
                      :disabled="canwrite"
                      @click="tougleStatus(item)"
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
                      :disabled="canwrite"
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
                      :disabled="canwrite"
                      @click="deletePromotion(item.id)"
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

              <div
                v-for="(detail, index) in item.promotion_details"
                :key="index"
              >
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
                    v-if="detail.typestatus == true && detail.promotiontypename != 'ฝากต่อเนื่อง'"
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
                  <v-card
                  class="elevatoin-3 pa-3 rounded-lg"
                  v-if="detail.typestatus == true && detail.promotiontypename == 'ฝากต่อเนื่อง'"
                >
                  <v-row class="row" no-gutters>
                    <v-col class="col-6 col-md-6 col-lg-4">
                      <span class="font-weight-bold">ฝากขั้นต่ำ:</span>
                      {{ detail.deposit }}</v-col
                    >
                    <v-col class="col-6 col-md-6 col-lg-4"
                      ><span class="font-weight-bold">โบนัสที่ได้รับ:</span>
                      {{ detail.bonus }}</v-col
                    >
                    <v-col class="col-6 col-md-6 col-lg-4"
                      ><span class="font-weight-bold">จำนวนวัน:</span>
                      {{ detail.days }}</v-col
                    >
                
                    <v-col class="col-6 col-md-6 col-lg-4"
                      ><span class="font-weight-bold">เทิร์น:</span>
                      {{ detail.SL }}</v-col
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
          ><add-promotion
            @close-dialog="addPromotion = false"
            :closeDialogMethod="closeDialog"
            :mock_pro="mock_add_promotion"
          ></add-promotion
          ><v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="btn_sty" @click="closeDialog"
              >บันทึก</v-btn
            >
            <v-btn color="error" dark>Reset</v-btn>
            <v-btn color="error" outlined @click="addPromotion = false"
              >ยกเลิก</v-btn
            >
          </v-card-actions></v-card
        >
      </v-dialog>

      <v-dialog v-model="editPromotionData" max-width="1000px">
        <v-card class="pa-5">
          <!-- <editPromotions
            :itemedit="itemedit"
            @close="closeeditPromotions()"
            @save="saveEdit()"
            :Panel="openedPanel"
          /> -->
          <div>
            <h3 class="mb-4">แก้ไขโปรโมชัน</h3>
            <edit-promotion
              :planel="planalcheck"
              :mock_pro="itemedit"
            ></edit-promotion>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="btn_sty" @click.stop="saveEdit"
              >บันทึก</v-btn
            >
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
import { mapActions, mapMutations, mapState } from "vuex";
import Swal from "sweetalert2";
import AddPromotion from "../../components/AddPromotion.vue";
import EditPromotion from "../../components/EditPromotion.vue";
import dayjs from "dayjs";
export default {
  components: { AddPromotion, EditPromotion },
  data() {
    return {
      check: true,
      file: null,
      url: null,
      tempFile: null,
      itemedit: [],
      EditPromotion: false,
      editPromotionData: false,
      addPromotion: false,
      openedPanel: [],
      isLoading: false,
      imageUpdated: "",
      planalcheck: [],
      itemtypebonus: ["%", "ค่าคงที่"],
      headernewmember: [
        {
          text: "ฝากต่ำสุด",
          value: "mindp",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text",
        },
        {
          text: "ฝากสูงสุด",
          value: "maxdp",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text",
        },
        {
          text: "โบนัสที่ได้(%/ค่าคงที่)",
          value: "bonusvalue",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text",
        },
      ],
      data: "",
      mock_add_promotion: {
        agent: "",
        company: "",
        hash: "",
        promotionname: "",
        promotionpic: "",
        promotiondescription: "",
        status: true,
        create_by: "system",
        updated_by: "system",
        promotion_details: [
          {
            promotiontypename: "สมัครสมาชิกใหม่",
            typestatus: false,
            rulestatus: false,
            mindp: 100,
            maxdp: 100,
            bonustype: "%",
            bonusvalue: 0,
            maxbonusvalue: 5000,
            wdlimit: 0,
            bonuscount: 0,
            bonusdurationFrom: "00:00:00",
            bonusdurationTo: "23:59:00",
            durationstatus: false,
            SL: 1,
            LC: 1,
            SB: 1,
            ES: 1,
            OT: 1,
            LT: 1,
            FH: 1,
            days: 7,
            deposit: 300,
            bonus: 300,
            promotion_rules: [
              {
                mindp: 0,
                maxdp: 0,
                bonusvalue: 0,
              },
            ],
          },
          {
            promotiontypename: "ฝากครั้งแรกของวัน",
            typestatus: false,
            rulestatus: false,
            mindp: 0,
            maxdp: 100000,
            bonustype: "%",
            bonusvalue: 0,
            maxbonusvalue: 5000,
            wdlimit: 0,
            bonuscount: 0,
            bonusdurationFrom: "00:00:00",
            bonusdurationTo: "23:59:00",
            durationstatus: false,
            SL: 1,
            LC: 1,
            SB: 1,
            ES: 1,
            OT: 1,
            LT: 1,
            FH: 1,
            days: 7,
            deposit: 300,
            bonus: 300,
            promotion_rules: [
              {
                mindp: 0,
                maxdp: 0,
                bonusvalue: 0,
              },
            ],
          },
          {
            promotiontypename: "ฝากทั้งวัน",
            typestatus: false,
            rulestatus: false,
            mindp: 0,
            maxdp: 100000,
            bonustype: "%",
            bonusvalue: 0,
            maxbonusvalue: 5000,
            wdlimit: 0,
            bonuscount: 0,
            bonusdurationFrom: "00:00:00",
            bonusdurationTo: "23:59:00",
            durationstatus: false,
            SL: 1,
            LC: 1,
            SB: 1,
            ES: 1,
            OT: 1,
            LT: 1,
            FH: 1,
            days: 7,
            deposit: 300,
            bonus: 300,
            promotion_rules: [
              {
                mindp: "0",
                maxdp: "0",
                bonusvalue: "0",
              },
            ],
          },
          {
            promotiontypename: "ฝากต่อเนื่อง",
            typestatus: false,
            rulestatus: false,
            mindp: 0,
            maxdp: 0,
            bonustype: "%",
            bonusvalue: 0,
            maxbonusvalue: 0,
            wdlimit: 0,
            bonuscount: 0,
            bonusdurationFrom: "00:00:00",
            bonusdurationTo: "23:59:59",
            durationstatus: false,
            SL: 1,
            LC: 1,
            SB: 1,
            ES: 1,
            OT: 1,
            LT: 1,
            FH: 1,
            days: 7,
            deposit: 300,
            bonus: 300,
            deletedAt: null,
            promotion_rules: [
              {
                mindp: 0,
                maxdp: 0,
                bonusvalue: 0,
              },
            ],
          },
        ],
      },
    };
  },
  async fetch() {
    try {
      console.log(this.loading);
      this.isLoading = true;
      await this.getPromotion();

      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
    }
  },
  computed: {
    ...mapState("promotion", ["itempromotion"]),
    ...mapState("auth", ["menu"]),
    canwrite() {
      if (this.menu) {
        if (!this.menu.includes("promotion_write")) return true;
        else return false;
      }
    },
    // panalCheck(val) {
    //   if (val) {
    //     return this.openedPanel;
    //   }

    // },
  },
  watch: {
    check: {
      async handler() {
        await this.getPromotion();
      },
    },
  },
  methods: {
    ...mapMutations("promotion", [
      "set_promotion",
      "updatePromotionAfterDelete",
    ]),
    ...mapActions("promotion", [
      "getPromotion",
      "updatedPromotion",
      "deletedPromotion",
      "addNewPromotion",
    ]),
    async deletePromotion(id) {
      Swal.fire({
        title: "ลบโปรโมชั่นนี้หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก",
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.deletedPromotion(id);
            await this.updatePromotionAfterDelete(id);
            Swal.fire({
              icon: "success",
              confirmButtonColor: "red",
              title: "ลบเสร็จสิ้น",
              confirmButtonText: "ปิด",
            });
          }
        })
        .then(async (success) => {
          this.isLoading = true;
          console.log("ooooooooo");
          this.check = false;
          await this.getPromotion();
          this.check = true;
          console.log("ssssssssssss");
          this.isLoading = false;
        });
    },
    selectFile(event) {
      if (event) {
        this.file = event;
        this.itemedit.promotionpic = URL.createObjectURL(this.file);
      }
    },
    async saveImage() {
      if (this.file) {
        const data = new FormData();
        data.append("file", this.file);
        try {
          this.loading = true;
          let imageupdate = await this.$axios.post(
            `https://admin-static-api-qlws7pv5wa-as.a.run.app/api/Update/file/Dynamic/test/secret123`,
            data
          );
          this.itemedit.promotionpic = imageupdate.data.image;
          this.loading = false;
        } catch (error) {
          this.loading = false;
          console.log(error);
        }
      }
      this.file = null;
    },
    async editPromotion(promotion) {
      this.imageUpdated = promotion.promotionpic;
      this.editPromotionData = true;
      let temp_detail = [];
      promotion.promotion_details.map((x) => {
        if (x.promotiontypename == "สมัครสมาชิกใหม่") {
          temp_detail[0] = x;
        }
        if (x.promotiontypename == "ฝากครั้งแรกของวัน") {
          temp_detail[1] = x;
        }
        if (x.promotiontypename == "ฝากทั้งวัน") {
          temp_detail[2] = x;
        }
        if (x.promotiontypename == "ฝากต่อเนื่อง") {
          temp_detail[3] = x;
        }
        return x;
      });
      promotion.promotion_details = temp_detail;
      this.itemedit = promotion;
      this.itemedit.promotion_details.map(x=>{
        x.bonusdurationFrom = new Date('2023-03-04T' + x.bonusdurationFrom)
        x.bonusdurationTo = new Date('2023-03-04T' +x.bonusdurationTo)
        return x
      })
      this.planalcheck = promotion.promotion_details.map((element, index) => {
        if (element.typestatus) {
          return index;
        }
      });
      console.log(this.planalcheck, "check");
    },
    async closeEditpromotion() {
      this.editPromotionData = false;
    },
    async saveEdit() {
      try {
        console.log(this.itemedit);
        await this.saveImage();
        await this.updatedPromotion(this.itemedit);
        this.editPromotionData = false;
        this.$swal({
          icon: "success",
          title: "แก้ไขสำเร็จ",
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        this.editPromotionData = false;
      }
      await this.$fetch();
    },
    async closeDialog(data) {
      this.isLoading = true;
      if (!this.mock_add_promotion.promotionpic) {
        this.$swal({
          title: "กรุณาเพิ่มรูปโปรโมชั่น !",
          text: "กรุณาตั้งชื่อ ไฟล์ เป็นภาษาอังกฤษ ไม่เว้นวรรค ขนาดไม่เกิน 250KB",
          icon: "error",
          showCancelButton: true,
          allowOutsideClick: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
          cancelButtonText: "ยกเลิก",
        });
        this.isLoading = false;
        return;
      }
      // this.addPromotion = false
      await this.addNewPromotion(this.mock_add_promotion);
      await this.getPromotion();
      this.isLoading = false;
      this.addPromotion = false;
      this.$swal({
        title: "สร้างโปรโมชั่นสำเร็จ",
        icon: "success",
        allowOutsideClick: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    },
    tougleStatus(item) {
      item.status = !item.status;
      this.$swal({
        title: item.status ? "เปิด" : "ปิด" + "ใช้งานโปรโมชั่นนี้",
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: item.status ? "เปิด" : "ปิด",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        console.log(result, "result");
        if (result.isConfirmed) {
          try {
            await this.updatedPromotion(item);
            this.$swal({
              icon: "success",
              title: "แก้ไขสำเร็จ",
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 1500,
            }).then(async (result) => {
              this.dlupdate = false;
              if (result) {
                await this.$fetch();
              }
            });
          } catch (error) {
            console.log(error);
          }
        } else if (!result.isConfirmed) {
          item.status = !item.status;
        }
      });
    },
    addField(form) {
      console.log("chacek 13");
      form.push({
        mindp: "",
        maxdp: "",
        bonusvalue: "",
      });
    },
    removeField(fieldType) {
      console.log("chacek 12");
      fieldType.splice(-1);
    },
    settingform(item) {
      //
      // console.log('chacek 11',item)
      item.typestatus = !item.typestatus;
      // this.itemedit.push(item)
      // this.Panel.push(item)
    },
    returnToParent() {
      // this.emit('childData', this.renderdata);
    },
  },
};
</script>

<style></style>
