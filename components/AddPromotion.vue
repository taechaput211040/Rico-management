<template>
  <v-card class="pa-5"
    ><h3 class="mb-4">สร้างโปรโมชัน</h3>
    <v-row class="pa-3">
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          outlined
          dense
          hide-details="auto"
          label="ใส่ชื่อโปรโมชัน"
        ></v-text-field
      ></v-col>
      <v-col cols="12" sm="6" md="6">
        <v-file-input
          v-model="image"
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
      <v-col cols="12">
        <v-textarea
          outlined
          hide-details="auto"
          label="กติกา อธิบายโปรโมชัน(ลูกค้าส่วนนี้)"
          auto-grow
        ></v-textarea>
      </v-col>

      <v-expansion-panels accordion multiple>
        <!-- /*ตั้งค่าโบนัสสมาชิกใหม่*/ -->
        <v-expansion-panel class="ma-3 elevation-2">
          <v-expansion-panel-header
            @click="settingform('newmember')"
            color="grey lighten-2"
          >
            <div primary-title class="font-weight-bold">
              โบนัสสำหรับสมาชิกใหม่ :
              <v-btn
                small
                color="error"
                v-if="formbonusnewmember.statustype == false"
                ><v-icon left>mdi-cog-outline</v-icon> ปิด</v-btn
              >
              <v-btn small color="success" v-else
                ><v-icon left>mdi-cog-outline</v-icon>เปิด</v-btn
              >
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div>
              <v-card-text class="font-weight-bold ">
                ตั้งค่าโบนัส
              </v-card-text>
              <v-row>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="ฝากขั้นต่ำ"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="ฝากสูงสุด"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-select
                    hide-details="auto"
                    outlined
                    dense
                    label="โบนัส(%/ค่าคงที่)"
                  ></v-select
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="จำนวนโบนัส"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="โบนัสสูงสุด"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2"
                  ><v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="อั้นถอน"
                  ></v-text-field
                ></v-col>
              </v-row>
            </div>
            <div>
              <v-card-text class="font-weight-bold ">
                ตั้งค่าเทิร์น
              </v-card-text>
              <v-row class="mb-4">
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="SLOT"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="Sportbook"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="ESPORT"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="HorseRacing"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="casino"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2"
                  ><v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="lotto"
                  ></v-text-field
                ></v-col>
              </v-row>
            </div>

            <div class="d-flex align-baseline my-5">
              <v-switch
                hide-details="auto"
                class="mx-5"
                true-value="on"
                false-value="off"
                color="success"
                v-model="formbonusnewmember.stepbonus"
                :label="
                  ` ตั้งค่าโบนัสขั้นบันได :  ${formbonusnewmember.stepbonus.toString()}`
                "
              ></v-switch>
            </div>
            <div v-show="formbonusnewmember.stepbonus == 'on'">
              <v-card>
                <v-data-table
                  :headers="headernewmember"
                  :items="formbonusnewmember.multi_player"
                  hide-default-footer
                  class="elevation-1"
                >
                  <template #[`item.dpmin`]="{item}">
                    <div class="pa-2">
                      <v-text-field
                        outlined
                        dense
                        hide-details="auto"
                        label="ฝากต่ำสุด"
                        v-model="item.dpmin"
                        type="number"
                      />
                    </div>
                  </template>
                  <template #[`item.dpmax`]="{item}">
                    <div class="pa-2">
                      <v-text-field
                        outlined
                        dense
                        hide-details="auto"
                        label="ฝากสูงสุด"
                        v-model="item.dpmax"
                        type="number"
                      />
                    </div>
                  </template>
                  <template #[`item.dpbonus`]="{item}">
                    <div class="pa-2">
                      <v-text-field
                        outlined
                        dense
                        hide-details="auto"
                        label="โบนัสที่ได้(% / ค่างที่)"
                        v-model="item.dpbonus"
                        type="number"
                      />
                    </div>
                  </template>
                </v-data-table>
              </v-card>
              <v-card-actions>
                <v-btn
                  small
                  @click="addField(formbonusnewmember.multi_player)"
                  color="success"
                  rounded
                  ><v-icon>mdi-plus</v-icon>เพิ่ม
                </v-btn>
                <v-btn
                  small
                  v-show="formbonusnewmember.multi_player.length > 1"
                  @click="removeField(formbonusnewmember.multi_player)"
                  color="error"
                  rounded
                  ><v-icon>mdi-delete</v-icon>ลบ
                </v-btn>
              </v-card-actions>
            </div>
          </v-expansion-panel-content> </v-expansion-panel
        ><!-- /*ตั้งค่าโบนัสสมาชิกใหม่*/ -->
        <!-- /*ตั้งค่าฝากครั้งเเรกของวัน*/ -->
        <v-expansion-panel class="ma-3 elevation-2">
          <v-expansion-panel-header
            @click="settingform('firstdeposit')"
            color="grey lighten-2"
          >
            <div primary-title class="font-weight-bold">
              ตั้งค่าฝากครั้งเเรกของวัน :
              <v-btn
                small
                color="error"
                v-if="formfirstdeposit.statustype == false"
                ><v-icon left>mdi-cog-outline</v-icon> ปิด</v-btn
              >
              <v-btn small color="success" v-else
                ><v-icon left>mdi-cog-outline</v-icon>เปิด</v-btn
              >
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div>
              <v-card-text class="font-weight-bold ">
                ตั้งค่าโบนัส
              </v-card-text>
              <v-row>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="ฝากขั้นต่ำ"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="ฝากสูงสุด"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-select
                    hide-details="auto"
                    outlined
                    dense
                    label="โบนัส(%/ค่าคงที่)"
                  ></v-select
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="จำนวนโบนัส"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="โบนัสสูงสุด"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2"
                  ><v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="อั้นถอน"
                  ></v-text-field
                ></v-col>
              </v-row>
            </div>
            <div>
              <v-card-text class="font-weight-bold ">
                ตั้งค่าเทิร์น
              </v-card-text>
              <v-row class="mb-4">
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="SLOT"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="Sportbook"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="ESPORT"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="HorseRacing"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="casino"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2"
                  ><v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="lotto"
                  ></v-text-field
                ></v-col>
              </v-row>
            </div>

            <div class="d-flex align-baseline my-5">
              <v-switch
                hide-details="auto"
                class="mx-5"
                true-value="on"
                false-value="off"
                color="success"
                v-model="formfirstdeposit.stepbonus"
                :label="
                  ` ตั้งค่าโบนัสขั้นบันได :  ${formfirstdeposit.stepbonus.toString()}`
                "
              ></v-switch>
            </div>
            <div v-show="formfirstdeposit.stepbonus == 'on'">
              <v-card>
                <v-data-table
                  :headers="headernewmember"
                  :items="formfirstdeposit.multi_player"
                  hide-default-footer
                  class="elevation-1"
                >
                  <template #[`item.dpmin`]="{item}">
                    <div class="pa-2">
                      <v-text-field
                        outlined
                        dense
                        hide-details="auto"
                        label="ฝากต่ำสุด"
                        v-model="item.dpmin"
                        type="number"
                      />
                    </div>
                  </template>
                  <template #[`item.dpmax`]="{item}">
                    <div class="pa-2">
                      <v-text-field
                        outlined
                        dense
                        hide-details="auto"
                        label="ฝากสูงสุด"
                        v-model="item.dpmax"
                        type="number"
                      />
                    </div>
                  </template>
                  <template #[`item.dpbonus`]="{item}">
                    <div class="pa-2">
                      <v-text-field
                        outlined
                        dense
                        hide-details="auto"
                        label="โบนัสที่ได้(% / ค่างที่)"
                        v-model="item.dpbonus"
                        type="number"
                      />
                    </div>
                  </template>
                </v-data-table>
              </v-card>
              <v-card-actions>
                <v-btn
                  small
                  @click="addField(formfirstdeposit.multi_player)"
                  color="success"
                  rounded
                  ><v-icon>mdi-plus</v-icon>เพิ่ม
                </v-btn>
                <v-btn
                  small
                  v-show="formfirstdeposit.multi_player.length > 1"
                  @click="removeField(formfirstdeposit.multi_player)"
                  color="error"
                  rounded
                  ><v-icon>mdi-delete</v-icon>ลบ
                </v-btn>
              </v-card-actions>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- /*ตั้งค่าฝากครั้งเเรกของวัน*/ -->
        <!-- ตั้ง่คาโบนัสฝากทั้งวัน -->
        <v-expansion-panel class="ma-3 elevation-2">
          <v-expansion-panel-header
            @click="settingform('bonusoneday')"
            color="grey lighten-2"
          >
            <div primary-title class="font-weight-bold">
              ตั้ง่คาโบนัสฝากทั้งวัน :
              <v-btn
                small
                color="error"
                v-if="formbonusdponeday.statustype == false"
                ><v-icon left>mdi-cog-outline</v-icon> ปิด</v-btn
              >
              <v-btn small color="success" v-else
                ><v-icon left>mdi-cog-outline</v-icon>เปิด</v-btn
              >
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div>
              <v-card-text class="font-weight-bold ">
                ตั้งค่าโบนัส
              </v-card-text>
              <v-row>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="ฝากขั้นต่ำ"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="ฝากสูงสุด"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-select
                    hide-details="auto"
                    outlined
                    dense
                    label="โบนัส(%/ค่าคงที่)"
                  ></v-select
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="จำนวนโบนัส"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="โบนัสสูงสุด"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2"
                  ><v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="อั้นถอน"
                  ></v-text-field
                ></v-col>
              </v-row>
            </div>
            <div>
              <v-card-text class="font-weight-bold ">
                ตั้งค่าเทิร์น
              </v-card-text>
              <v-row class="mb-4">
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="SLOT"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="Sportbook"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="ESPORT"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="HorseRacing"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="casino"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2"
                  ><v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="lotto"
                  ></v-text-field
                ></v-col>
              </v-row>
            </div>

            <div class="d-flex align-baseline my-5">
              <v-switch
                hide-details="auto"
                class="mx-5"
                true-value="on"
                false-value="off"
                color="success"
                v-model="formbonusdponeday.stepbonus"
                :label="
                  ` ตั้งค่าโบนัสขั้นบันได :  ${formbonusdponeday.stepbonus.toString()}`
                "
              ></v-switch>
            </div>
            <div v-show="formbonusdponeday.stepbonus == 'on'">
              <v-card>
                <v-data-table
                  :headers="headernewmember"
                  :items="formbonusdponeday.multi_player"
                  hide-default-footer
                  class="elevation-1"
                >
                  <template #[`item.dpmin`]="{item}">
                    <div class="pa-2">
                      <v-text-field
                        outlined
                        dense
                        hide-details="auto"
                        label="ฝากต่ำสุด"
                        v-model="item.dpmin"
                        type="number"
                      />
                    </div>
                  </template>
                  <template #[`item.dpmax`]="{item}">
                    <div class="pa-2">
                      <v-text-field
                        outlined
                        dense
                        hide-details="auto"
                        label="ฝากสูงสุด"
                        v-model="item.dpmax"
                        type="number"
                      />
                    </div>
                  </template>
                  <template #[`item.dpbonus`]="{item}">
                    <div class="pa-2">
                      <v-text-field
                        outlined
                        dense
                        hide-details="auto"
                        label="โบนัสที่ได้(% / ค่างที่)"
                        v-model="item.dpbonus"
                        type="number"
                      />
                    </div>
                  </template>
                </v-data-table>
              </v-card>
              <v-card-actions>
                <v-btn
                  small
                  @click="addField(formbonusdponeday.multi_player)"
                  color="success"
                  rounded
                  ><v-icon>mdi-plus</v-icon>เพิ่ม
                </v-btn>
                <v-btn
                  small
                  v-show="formbonusdponeday.multi_player.length > 1"
                  @click="removeField(formbonusdponeday.multi_player)"
                  color="error"
                  rounded
                  ><v-icon>mdi-delete</v-icon>ลบ
                </v-btn>
              </v-card-actions>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- ตั้ง่คาโบนัสฝากทั้งวัน -->
      </v-expansion-panels>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      headernewmember: [
        {
          text: "ฝากต่ำสุด",
          value: "dpmin",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text"
        },
        {
          text: "ฝากสูงสุด",
          value: "dpmax",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text"
        },
        {
          text: "โบนัสที่ได้(%/ค่าคงที่)",
          value: "dpbonus",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text"
        }
      ],
      formfirstdeposit: {
        statustype: false,
        stepbonus: "off",
        multi_player: [{ dpmin: "", dpmax: "", dpbonus: "" }]
      },
      formbonusnewmember: {
        statustype: false,
        stepbonus: "off",
        multi_player: [{ dpmin: "", dpmax: "", dpbonus: "" }]
      },
      formbonusdponeday: {
        statustype: false,
        stepbonus: "off",
        multi_player: [{ dpmin: "", dpmax: "", dpbonus: "" }]
      },

      image: []
    };
  },
  methods: {
    addField(form) {
      form.push({
        dpmin: "",
        dpmax: "",
        dpbonus: ""
      });
    },
    removeField(fieldType) {
      fieldType.splice(-1);
    },
    settingform(promotion) {
      if (promotion === "newmember") {
        this.formbonusnewmember.statustype = !this.formbonusnewmember
          .statustype;
        console.log(this.formbonusnewmember.statustype);
      } else if (promotion === "firstdeposit") {
        this.formfirstdeposit.statustype = !this.formfirstdeposit.statustype;
        console.log(this.formfirstdeposit.statustype);
      } else if (promotion === "bonusoneday") {
        this.formbonusdponeday.statustype = !this.formbonusdponeday.statustype;
        console.log(this.formbonusdponeday.statustype);
      }
    }
  }
};
</script>

<style></style>
