<template>
  <div>
    <h3 class="mb-4">สร้างโปรโมชัน</h3>
    <v-row class="pa-3">
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          outlined
          dense
          filled
          v-model="renderdata.promotionname"
          hide-details="auto"
          label="ใส่ชื่อโปรโมชัน"
        ></v-text-field
      ></v-col>
      <v-col cols="12" sm="6" md="6">
        <v-file-input
          v-model="renderdata.promotionpic"
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
        <img
          :src="renderdata.promotionpic"
          alt=""
          class="img_promotion"
        />
      </div>
      <v-col cols="12">
        <v-textarea
          outlined
          v-model="renderdata.promotiondescription"
          hide-details="auto"
          label="กติกา อธิบายโปรโมชัน(ลูกค้าส่วนนี้)"
          auto-grow
        ></v-textarea>
      </v-col>
      <div>
        <!-- expand -->
        <v-expansion-panels
          :value="checkpanal"
          accordion
          style="width: 100%"
          multiple
        >
          <!-- /*ตั้งค่าโบนัสสมาชิกใหม่*/ -->
          <v-expansion-panel
            v-for="(item, index) in renderdata.detail"
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
                  <v-btn small color="error" v-if="item.typestatus == false"
                    ><v-icon left>mdi-cog-outline</v-icon> ปิด</v-btn
                  >
                  <v-btn small color="success" v-else
                    ><v-icon left>mdi-cog-outline</v-icon>เปิด</v-btn
                  >
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content v-if="item">
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
                        v-model="item.STEP"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="6" sm="2">
                      <v-text-field
                        outlined
                        dense
                        hide-details="auto"
                        v-model="item.FOOTBALL"
                        label="Sportbook"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="6" sm="2">
                      <v-text-field
                        outlined
                        dense
                        hide-details="auto"
                        label="ESPORT"
                        v-model="item.GAME"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="6" sm="2">
                      <v-text-field
                        outlined
                        dense
                        hide-details="auto"
                        label="HorseRacing"
                        v-model="item.PARLAY"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="6" sm="2">
                      <v-text-field
                        outlined
                        dense
                        hide-details="auto"
                        label="casino"
                        v-model="item.CASINO"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="6" sm="2"
                      ><v-text-field
                        outlined
                        dense
                        hide-details="auto"
                        v-model="item.LOTTO"
                        label="lotto"
                      ></v-text-field
                    ></v-col>
                  </v-row>
                </div>

                <div
                  class="d-flex align-baseline my-5"
                  v-if="
                    item.newmemberRule ||
                    item.firstdepositRule ||
                    item.alldayRule
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
</template>

<script>
export default {
  name: "EditPromotion",
  props: {
    Panel: {
      type: [Array, String],
      default: [],
      required: true,
    },
    renderdata: {
      type: [Array, Object],
      default: null,
      required: true,
    },
  },
  data() {
    return {
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
      formfirstdeposit: {
        statustype: false,
        stepbonus: "off",
        multi_player: [{ dpmin: "", dpmax: "", dpbonus: "" }],
      },
      formbonusnewmember: {
        statustype: false,
        stepbonus: "off",
        multi_player: [{ dpmin: "", dpmax: "", dpbonus: "" }],
      },
      formbonusdponeday: {
        statustype: false,
        timebonusStatus: false,
        stepbonus: "off",
        multi_player: [{ dpmin: "", dpmax: "", dpbonus: "" }],
      },
      formdeposit7day: {
        statustype: false,
        timebonusStatus: false,
        stepbonus: "off",
        multi_player: [{ dpmin: "", dpmax: "", dpbonus: "" }],
      },

      image: [],
    };
  },
  computed: {
    checkpanal(val) {
      if (val) {
        return this.Panel;
      }
    },
  },
  methods: {
    addField(form) {
      form.push({
        mindp: "",
        maxdp: "",
        bonusvalue: "",
      });
    },
    removeField(fieldType) {
      fieldType.splice(-1);
    },
    settingform(item) {
      item.typestatus = !item.typestatus;
    },
  },
};
</script>

<style></style>
