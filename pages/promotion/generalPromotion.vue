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
          ><add-promotion
            @close-dialog="addPromotion = false"
            :closeDialogMethod="closeDialog"
            @data-sent="data = $event"
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
          {{ planalcheck }}
          <div>
            <h3 class="mb-4">แก้ไขโปรโมชัน</h3>
            <v-row class="pa-3">
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  outlined
                  dense
                  filled
                  :value="itemedit.promotionname"
                  hide-details="auto"
                  label="ใส่ชื่อโปรโมชัน"
                ></v-text-field
              ></v-col>
              <v-col cols="12" sm="6" md="6">
                <v-file-input
                  required
                  @change="selectFile"
                  accept="image/png, image/jpeg,image/jpg,image/webp"
                  color="deep-purple accent-4"
                  counter
                  dense
                  hide-details="auto"
                  label="อัพโหลดไฟล์รูปโปรโมชัน"
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
                </v-file-input></v-col
              >
              <div class="text-center">
                {{ itemedit.promotionpic }}
                <img :src="imageUpdated" alt="" class="img_promotion" />
              </div>
              <v-col cols="12">
                <v-textarea
                  outlined
                  v-model="itemedit.promotiondescription"
                  hide-details="auto"
                  label="กติกา อธิบายโปรโมชัน(ลูกค้าส่วนนี้)"
                  auto-grow
                ></v-textarea>
              </v-col>
              <div>
                <!-- expand -->
                <v-expansion-panels
                  v-model="planalcheck"
                  accordion
                  style="width: 100%"
                  multiple
                >
                  <!-- /*ตั้งค่าโบนัสสมาชิกใหม่*/ -->

                  <v-expansion-panel
                    v-for="(item, index) in itemedit.promotion_details"
                    :key="index"
                  >
                    <div class="ma-2" v-if="item">
                      <v-expansion-panel-header
                        color="grey lighten-2"
                        v-if="item"
                        @click="settingform(item, index)"
                      >
                        <div primary-title class="font-weight-bold">
                          ตั้งค่า {{ item.promotiontypename }}
                          <v-btn
                            small
                            color="error"
                            v-if="item.typestatus == false"
                            ><v-icon left>mdi-cog-outline</v-icon> ปิด</v-btn
                          >
                          <v-btn small color="success" v-else
                            ><v-icon left>mdi-cog-outline</v-icon>เปิด</v-btn
                          >
                        </div>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-card-text class="font-weight-bold">
                          ตั้งค่าโบนัส
                        </v-card-text>
                        <v-row v-if="item.promotiontypename == 'ฝากต่อเนื่อง'">
                          <v-col cols="6" sm="3">
                            <v-text-field
                              outlined
                              dense
                              hide-details="auto"
                              label="ยอดฝากต่อวัน"
                              v-model="item.deposit"
                            ></v-text-field
                          ></v-col>
                          <v-col cols="6" sm="3">
                            <v-text-field
                              outlined
                              v-model="item.bonuscount"
                              dense
                              hide-details="auto"
                              label="โบนัสที่ได้"
                            ></v-text-field
                          ></v-col>
                          <v-col cols="6" sm="3">
                            <v-select
                              hide-details="auto"
                              outlined
                              dense
                              v-model="item.days"
                              label="จำนวนวันที่ฝากต่อเนื่อง"
                            ></v-select
                          ></v-col>
                          <v-col cols="6" sm="3">
                            <v-text-field
                              outlined
                              dense
                              v-model="item.wdlimit"
                              hide-details="auto"
                              label="อั้นถอน(เท่า)"
                            ></v-text-field
                          ></v-col>
                        </v-row>
                        <v-row v-if="item.promotiontypename !== 'ฝากต่อเนื่อง'">
                          <v-col cols="6" sm="2">
                            <v-text-field
                              outlined
                              v-model="item.mindp"
                              dense
                              hide-details="auto"
                              label="ฝากขั้นต่ำ"
                            ></v-text-field
                          ></v-col>
                          <v-col cols="6" sm="2">
                            <v-text-field
                              outlined
                              dense
                              v-model="item.maxdp"
                              hide-details="auto"
                              label="ฝากสูงสุด"
                            ></v-text-field
                          ></v-col>
                          <v-col cols="6" sm="2">
                            <v-select
                              hide-details="auto"
                              outlined
                              dense
                              :items="itemtypebonus"
                              v-model="item.bonustype"
                              label="โบนัส(%/ค่าคงที่)"
                            ></v-select
                          ></v-col>
                          <v-col cols="6" sm="2">
                            <v-text-field
                              outlined
                              dense
                              v-model="item.bonusvalue"
                              hide-details="auto"
                              label="จำนวนโบนัส"
                            ></v-text-field
                          ></v-col>
                          <v-col cols="6" sm="2">
                            <v-text-field
                              outlined
                              dense
                              v-model="item.maxbonusvalue"
                              hide-details="auto"
                              label="โบนัสสูงสุด"
                            ></v-text-field
                          ></v-col>
                          <v-col cols="6" sm="2"
                            ><v-text-field
                              outlined
                              v-model="item.wdlimit"
                              dense
                              hide-details="auto"
                              label="อั้นถอน"
                            ></v-text-field
                          ></v-col>
                          <v-col
                            cols="12"
                            v-if="item.promotiontypename == 'ฝากทั้งวัน'"
                          >
                            <v-switch
                              hide-details="auto"
                              class="mx-5"
                              color="success"
                              v-model="item.durationstatus"
                              :label="` ระยะเวลาให้โบนัส :  ${item.durationstatus.toString()}`"
                            ></v-switch>
                            <div
                              class="col-md-5 col-12 row"
                              v-if="item.durationstatus == true"
                            >
                              <v-col cols="6">
                                <el-time-picker
                                  class="full-width"
                                  format="HH:mm"
                                  arrow-control
                                  v-model="item.bonusdurationFrom"
                                  placeholder="เวลาเริ่ม"
                                  style="width: 100%"
                                >
                                </el-time-picker>
                              </v-col>
                              <v-col cols="6">
                                <el-time-picker
                                  class="full-width"
                                  format="HH:mm"
                                  arrow-control
                                  v-model="item.bonusdurationTo"
                                  placeholder="เวลาสิ้นสุด"
                                  style="width: 100%"
                                >
                                </el-time-picker>
                              </v-col>
                            </div>
                          </v-col>
                        </v-row>
                        <div>
                          <v-card-text class="font-weight-bold">
                            ตั้งค่าเทิร์น
                          </v-card-text>
                          <v-row class="mb-4">
                            <v-col cols="6" sm="2">
                              <v-text-field
                                outlined
                                dense
                                hide-details="auto"
                                label="SLOT"
                                v-model="item.SL"
                              ></v-text-field
                            ></v-col>
                            <v-col cols="6" sm="2"
                              ><v-text-field
                                outlined
                                dense
                                hide-details="auto"
                                v-model="item.FH"
                                label="Fishing"
                              ></v-text-field
                            ></v-col>
                            <v-col cols="6" sm="2">
                              <v-text-field
                                outlined
                                dense
                                hide-details="auto"
                                v-model="item.SB"
                                label="Sportbook"
                              ></v-text-field
                            ></v-col>
                            <v-col cols="6" sm="2">
                              <v-text-field
                                outlined
                                dense
                                hide-details="auto"
                                label="ESPORT"
                                v-model="item.ES"
                              ></v-text-field
                            ></v-col>
                            <v-col cols="6" sm="2">
                              <v-text-field
                                outlined
                                dense
                                hide-details="auto"
                                label="HorseRacing"
                                v-model="item.OT"
                              ></v-text-field
                            ></v-col>
                            <v-col cols="6" sm="2">
                              <v-text-field
                                outlined
                                dense
                                hide-details="auto"
                                label="casino"
                                v-model="item.LC"
                              ></v-text-field
                            ></v-col>
                            <v-col cols="6" sm="2"
                              ><v-text-field
                                outlined
                                dense
                                hide-details="auto"
                                v-model="item.LT"
                                label="lotto"
                              ></v-text-field
                            ></v-col>
                          </v-row>
                        </div>

                        <div
                          class="d-flex align-baseline my-5"
                          v-if="
                            item?.newmemberRule ||
                            item?.firstdepositRule ||
                            item?.alldayRule
                          "
                        >
                          <v-switch
                            hide-details="auto"
                            class="mx-5"
                            color="success"
                            v-model="item.rulestatus"
                            :label="` ตั้งค่าโบนัสขั้นบันได :  ${item.rulestatus.toString()}`"
                          ></v-switch>
                        </div>
                        <div v-show="item.rulestatus == true">
                          <v-card v-if="item.newmemberRule">
                            <v-data-table
                              :headers="headernewmember"
                              :items="item.newmemberRule"
                              hide-default-footer
                              class="elevation-1"
                            >
                              <template #[`item.mindp`]="{ item }">
                                <div class="pa-2">
                                  <v-text-field
                                    outlined
                                    dense
                                    hide-details="auto"
                                    label="ฝากต่ำสุด"
                                    v-model="item.mindp"
                                    type="number"
                                  />
                                </div>
                              </template>
                              <template #[`item.maxdp`]="{ item }">
                                <div class="pa-2">
                                  <v-text-field
                                    outlined
                                    dense
                                    hide-details="auto"
                                    label="ฝากสูงสุด"
                                    v-model="item.maxdp"
                                    type="number"
                                  />
                                </div>
                              </template>
                              <template #[`item.bonusvalue`]="{ item }">
                                <div class="pa-2">
                                  <v-text-field
                                    outlined
                                    dense
                                    hide-details="auto"
                                    label="โบนัสที่ได้(% / ค่างที่)"
                                    v-model="item.bonusvalue"
                                    type="number"
                                  />
                                </div>
                              </template>
                            </v-data-table>
                            <v-card-actions>
                              <v-btn
                                small
                                @click="addField(item.newmemberRule)"
                                color="success"
                                rounded
                                ><v-icon>mdi-plus</v-icon>เพิ่ม
                              </v-btn>
                              <v-btn
                                small
                                v-show="item.newmemberRule.length > 1"
                                @click="removeField(item.newmemberRule)"
                                color="error"
                                rounded
                                ><v-icon>mdi-delete</v-icon>ลบ
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                          <v-card v-if="item.firstdepositRule">
                            <v-data-table
                              :headers="headernewmember"
                              :items="item.firstdepositRule"
                              hide-default-footer
                              class="elevation-1"
                            >
                              <template #[`item.mindp`]="{ item }">
                                <div class="pa-2">
                                  <v-text-field
                                    outlined
                                    dense
                                    hide-details="auto"
                                    label="ฝากต่ำสุด"
                                    v-model="item.mindp"
                                    type="number"
                                  />
                                </div>
                              </template>
                              <template #[`item.maxdp`]="{ item }">
                                <div class="pa-2">
                                  <v-text-field
                                    outlined
                                    dense
                                    hide-details="auto"
                                    label="ฝากสูงสุด"
                                    v-model="item.maxdp"
                                    type="number"
                                  />
                                </div>
                              </template>
                              <template #[`item.bonusvalue`]="{ item }">
                                <div class="pa-2">
                                  <v-text-field
                                    outlined
                                    dense
                                    hide-details="auto"
                                    label="โบนัสที่ได้(% / ค่างที่)"
                                    v-model="item.bonusvalue"
                                    type="number"
                                  />
                                </div>
                              </template>
                            </v-data-table>
                            <v-card-actions>
                              <v-btn
                                small
                                @click="addField(item.firstdepositRule)"
                                color="success"
                                rounded
                                ><v-icon>mdi-plus</v-icon>เพิ่ม
                              </v-btn>
                              <v-btn
                                small
                                v-show="item.firstdepositRule.length > 1"
                                @click="removeField(item.firstdepositRule)"
                                color="error"
                                rounded
                                ><v-icon>mdi-delete</v-icon>ลบ
                              </v-btn>
                            </v-card-actions>
                          </v-card>

                          <v-card v-if="item.alldayRule">
                            <v-data-table
                              :headers="headernewmember"
                              :items="item.alldayRule"
                              hide-default-footer
                              class="elevation-1"
                            >
                              <template #[`item.mindp`]="{ item }">
                                <div class="pa-2">
                                  <v-text-field
                                    outlined
                                    dense
                                    hide-details="auto"
                                    label="ฝากต่ำสุด"
                                    v-model="item.mindp"
                                    type="number"
                                  />
                                </div>
                              </template>
                              <template #[`item.maxdp`]="{ item }">
                                <div class="pa-2">
                                  <v-text-field
                                    outlined
                                    dense
                                    hide-details="auto"
                                    label="ฝากสูงสุด"
                                    v-model="item.maxdp"
                                    type="number"
                                  />
                                </div>
                              </template>
                              <template #[`item.bonusvalue`]="{ item }">
                                <div class="pa-2">
                                  <v-text-field
                                    outlined
                                    dense
                                    hide-details="auto"
                                    label="โบนัสที่ได้(% / ค่างที่)"
                                    v-model="item.bonusvalue"
                                    type="number"
                                  />
                                </div>
                              </template>
                            </v-data-table>
                            <v-card-actions>
                              <v-btn
                                small
                                @click="addField(item.alldayRule)"
                                color="success"
                                rounded
                                ><v-icon>mdi-plus</v-icon>เพิ่ม
                              </v-btn>
                              <v-btn
                                small
                                v-show="item.alldayRule.length > 1"
                                @click="removeField(item.alldayRule)"
                                color="error"
                                rounded
                                ><v-icon>mdi-delete</v-icon>ลบ
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </div>
                      </v-expansion-panel-content>
                    </div>
                  </v-expansion-panel>

                  <!-- /*ตั้งค่าโบนัสสมาชิกใหม่*/ -->
                </v-expansion-panels>
                <!-- expand -->
              </div>
            </v-row>
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
export default {
  components: { AddPromotion },
  data() {
    return {
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
    // panalCheck(val) {
    //   if (val) {
    //     return this.openedPanel;
    //   }

    // },
  },
  methods: {
    ...mapMutations("promotion", ["set_promotion"]),
    ...mapActions("promotion", [
      "getPromotion",
      "updatedPromotion",
      "deletedPromotion",
    ]),
    deletePromotion(id) {
      Swal.fire({
        title: "ลบโปรโมชั่นนี้หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deletedPromotion(id);
          Swal.fire({
            icon: "success",
            confirmButtonColor: "red",
            title: "ลบเสร็จสิ้น",
            confirmButtonText: "ปิด",
          });
        }
      });
    },
    selectFile(event) {
      if (event) {
        this.imageUpdated = URL.createObjectURL(event);
        this.itemedit.promotionpic = this.imageUpdated;
      }
    },
    async selectionedit(data) {
      let item = data.promotion_details;
      for (let i = 0; i <= item.length; i++) {
        if (item[i] != null) {
          console.log(i);
          if (item[i].typestatus == true) {
            this.openedPanel.push(i);
          } else if (item[i].typestatus == false) {
            this.openedPanel = this.openedPanel.splice(i, 1);
          }
        }
      }
    },
    async editPromotion(promotion) {
      console.log(promotion, "data");
      this.imageUpdated = promotion.promotionpic;
      this.editPromotionData = true;
      this.itemedit = JSON.parse(JSON.stringify(promotion));
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
        await this.updatedPromotion(this.itemedit);
        this.editPromotionData = false;
      } catch (error) {
        this.editPromotionData = false;
      }
      await this.$fetch();
    },
    closeDialog(data) {
      console.log("test_data");
      console.log(this.data);
      // this.addPromotion = false
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
