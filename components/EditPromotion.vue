<template>
  <div>
    <h3 class="mb-4">แก้ไขโปรโมชัน</h3>
    <v-row class="pa-3">
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          outlined
          dense
          hide-details="auto"
          label="ใส่ชื่อโปรโมชัน"
          v-model="mock_pro.promotionname"
        ></v-text-field
      ></v-col>
      <v-col cols="12" sm="6" md="6">
        <img
          :src="mock_pro.promotionpic"
          alt=""
          class="img_promotion pa-md-3"
        />
        <v-file-input
          v-model="inputPicture"
          color="deep-purple accent-4"
          counter
          dense
          hide-details="auto"
          @change="selectFile"
          :disabled="canwrite"
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
        </v-file-input>

        <v-btn
          v-if="inputPicture"
          class="mx-auto btn_sty"
          color="success"
          prepend-icon="mdi-camera"
          label="upload"
          @click="uploadImage"
        >
          <v-icon>mdi-upload</v-icon> Upload
        </v-btn></v-col
      >
      <v-col cols="12">
        <v-textarea
          v-model="mock_pro.promotiondescription"
          outlined
          hide-details="auto"
          label="กติกา อธิบายโปรโมชัน(ลูกค้าส่วนนี้)"
          auto-grow
        ></v-textarea>
      </v-col>

      <v-expansion-panels accordion multiple :value="planel">
        <!-- /*ตั้งค่าโบนัสสมาชิกใหม่*/ -->
        <v-expansion-panel class="ma-3 elevation-2">
          <v-expansion-panel-header
            @click="settingform('newmember')"
            color="grey lighten-2"
          >
            <div primary-title class="font-weight-bold">
              {{ mock_pro.promotion_details[0].promotiontypename }}
              <v-btn
                small
                color="error"
                v-if="mock_pro.promotion_details[0].typestatus == false"
                ><v-icon left>mdi-cog-outline</v-icon> ปิด</v-btn
              >
              <v-btn small color="success" v-else
                ><v-icon left>mdi-cog-outline</v-icon>เปิด</v-btn
              >
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div>
              <v-card-text class="font-weight-bold"> ตั้งค่าโบนัส </v-card-text>
              <v-row>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[0].mindp"
                    outlined
                    dense
                    hide-details="auto"
                    label="ฝากขั้นต่ำ"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[0].maxdp"
                    outlined
                    dense
                    hide-details="auto"
                    label="ฝากสูงสุด"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-select
                    :items="typeBonus"
                    v-model="mock_pro.promotion_details[0].bonustype"
                    hide-details="auto"
                    outlined
                    dense
                    label="โบนัส(%/ค่าคงที่)"
                  ></v-select
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[0].bonusvalue"
                    outlined
                    dense
                    hide-details="auto"
                    label="จำนวนโบนัส"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[0].maxbonusvalue"
                    outlined
                    dense
                    hide-details="auto"
                    label="โบนัสสูงสุด"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[0].wdlimit"
                    outlined
                    dense
                    hide-details="auto"
                    label="อั้นถอน"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <div>
              <v-card-text class="font-weight-bold">
                ตั้งค่าเทิร์น
              </v-card-text>
              <v-row class="mb-4">
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[0].SL"
                    outlined
                    dense
                    hide-details="auto"
                    label="SLOT"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[0].SB"
                    outlined
                    dense
                    hide-details="auto"
                    label="Sportbook"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[0].ES"
                    outlined
                    dense
                    hide-details="auto"
                    label="ESPORT"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[0].OT"
                    outlined
                    dense
                    hide-details="auto"
                    label="HorseRacing"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[0].LC"
                    outlined
                    dense
                    hide-details="auto"
                    label="casino"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[0].OT"
                    outlined
                    dense
                    hide-details="auto"
                    label="lotto"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[0].FH"
                    outlined
                    dense
                    hide-details="auto"
                    label="fishing"
                  ></v-text-field
                ></v-col>
              </v-row>
            </div>

            <div class="d-flex align-baseline my-5">
              <v-switch
                hide-details="auto"
                class="mx-5"
                :true-value="true"
                :false-value="false"
                color="success"
                v-model="mock_pro.promotion_details[0].rulestatus"
                :label="` ตั้งค่าโบนัสขั้นบันได :  ${mock_pro.promotion_details[0].rulestatus}`"
              ></v-switch>
            </div>
            <div v-show="mock_pro.promotion_details[0].rulestatus == true">
              <v-card>
                <v-data-table
                  :headers="headernewmember"
                  :items="mock_pro.promotion_details[0].promotion_rules"
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
              </v-card>
              <v-card-actions>
                <v-btn
                  small
                  @click="
                    addField(mock_pro.promotion_details[0].promotion_rules)
                  "
                  color="success"
                  rounded
                  ><v-icon>mdi-plus</v-icon>เพิ่ม
                </v-btn>
                <v-btn
                  small
                  v-show="
                    mock_pro.promotion_details[0].promotion_rules.length > 1
                  "
                  @click="
                    removeField(mock_pro.promotion_details[0].promotion_rules)
                  "
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
              {{ mock_pro.promotion_details[1].promotiontypename }}
              <v-btn
                small
                color="error"
                v-if="mock_pro.promotion_details[1].typestatus == false"
                ><v-icon left>mdi-cog-outline</v-icon> ปิด</v-btn
              >
              <v-btn small color="success" v-else
                ><v-icon left>mdi-cog-outline</v-icon>เปิด</v-btn
              >
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div>
              <v-card-text class="font-weight-bold"> ตั้งค่าโบนัส </v-card-text>
              <v-row>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[1].mindp"
                    outlined
                    dense
                    hide-details="auto"
                    label="ฝากขั้นต่ำ"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[1].maxdp"
                    outlined
                    dense
                    hide-details="auto"
                    label="ฝากสูงสุด"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-select
                    :items="typeBonus"
                    v-model="mock_pro.promotion_details[1].bonustype"
                    hide-details="auto"
                    outlined
                    dense
                    label="โบนัส(%/ค่าคงที่)"
                  ></v-select
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[1].bonusvalue"
                    outlined
                    dense
                    hide-details="auto"
                    label="จำนวนโบนัส"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[1].maxbonusvalue"
                    outlined
                    dense
                    hide-details="auto"
                    label="โบนัสสูงสุด"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[1].wdlimit"
                    outlined
                    dense
                    hide-details="auto"
                    label="อั้นถอน"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <div>
              <v-card-text class="font-weight-bold">
                ตั้งค่าเทิร์น
              </v-card-text>
              <v-row class="mb-4">
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[1].SL"
                    outlined
                    dense
                    hide-details="auto"
                    label="SLOT"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[1].SB"
                    outlined
                    dense
                    hide-details="auto"
                    label="Sportbook"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[1].ES"
                    outlined
                    dense
                    hide-details="auto"
                    label="ESPORT"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[1].OT"
                    outlined
                    dense
                    hide-details="auto"
                    label="HorseRacing"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[1].LC"
                    outlined
                    dense
                    hide-details="auto"
                    label="casino"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[1].LT"
                    outlined
                    dense
                    hide-details="auto"
                    label="lotto"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[1].FH"
                    outlined
                    dense
                    hide-details="auto"
                    label="fishing"
                  ></v-text-field
                ></v-col>
              </v-row>
            </div>
            <div class="d-flex align-baseline my-5">
              <v-switch
                hide-details="auto"
                class="mx-5"
                :true-value="true"
                :false-value="false"
                color="success"
                v-model="mock_pro.promotion_details[1].rulestatus"
                :label="` ตั้งค่าโบนัสขั้นบันได :  ${mock_pro.promotion_details[1].rulestatus}`"
              ></v-switch>
            </div>
            <div v-show="mock_pro.promotion_details[1].rulestatus == true">
              <v-card>
                <v-data-table
                  :headers="headernewmember"
                  :items="mock_pro.promotion_details[1].promotion_rules"
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
              </v-card>
              <v-card-actions>
                <v-btn
                  small
                  @click="
                    addField(mock_pro.promotion_details[1].promotion_rules)
                  "
                  color="success"
                  rounded
                  ><v-icon>mdi-plus</v-icon>เพิ่ม
                </v-btn>
                <v-btn
                  small
                  v-show="
                    mock_pro.promotion_details[1].promotion_rules.length > 1
                  "
                  @click="
                    removeField(mock_pro.promotion_details[1].promotion_rules)
                  "
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
              {{ mock_pro.promotion_details[2].promotiontypename }}
              <v-btn
                small
                color="error"
                v-if="mock_pro.promotion_details[2].typestatus == false"
                ><v-icon left>mdi-cog-outline</v-icon> ปิด</v-btn
              >
              <v-btn small color="success" v-else
                ><v-icon left>mdi-cog-outline</v-icon>เปิด</v-btn
              >
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div>
              <v-card-text class="font-weight-bold"> ตั้งค่าโบนัส </v-card-text>
              <v-row>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[2].mindp"
                    outlined
                    dense
                    hide-details="auto"
                    label="ฝากขั้นต่ำ"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[2].maxdp"
                    outlined
                    dense
                    hide-details="auto"
                    label="ฝากสูงสุด"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-select
                    :items="typeBonus"
                    v-model="mock_pro.promotion_details[2].bonustype"
                    hide-details="auto"
                    outlined
                    dense
                    label="โบนัส(%/ค่าคงที่)"
                  ></v-select
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[2].bonusvalue"
                    outlined
                    dense
                    hide-details="auto"
                    label="จำนวนโบนัส"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[2].maxbonusvalue"
                    outlined
                    dense
                    hide-details="auto"
                    label="โบนัสสูงสุด"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[2].wdlimit"
                    outlined
                    dense
                    hide-details="auto"
                    label="อั้นถอน"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <div>
              <v-row class="mt-4">
                <v-col cols="6" sm="4">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="จำนวนครั้งที่รับได้(0 คือรับได้ไม่จำกัด)"
                    v-model.number="mock_pro.promotion_details[2].bonuscount"
                  ></v-text-field
                ></v-col>
                <v-col cols="12">
                  <v-switch
                    hide-details
                    class="mx-5"
                    color="success"
                    v-model="mock_pro.promotion_details[2].durationstatus"
                    :label="` ระยะเวลาให้โบนัส :  ${mock_pro.promotion_details[2].durationstatus.toString()}`"
                  ></v-switch>
                </v-col>
                <div
                  class="col-md-5 col-12 row"
                  v-if="mock_pro.promotion_details[2].durationstatus == true"
                >
                  <v-col cols="6">
                    <el-time-picker
                      v-model="mock_pro.promotion_details[2].bonusdurationFrom"
                      class="full-width"
                      format="HH:mm"
                      arrow-control
                      placeholder="เวลาเริ่ม"
                      style="width: 100%"
                    >
                    </el-time-picker>
                  </v-col>
                  <v-col cols="6">
                    <el-time-picker
                      v-model="mock_pro.promotion_details[2].bonusdurationTo"
                      class="full-width"
                      format="HH:mm"
                      arrow-control
                      placeholder="เวลาสิ้นสุด"
                      style="width: 100%"
                    >
                    </el-time-picker>
                  </v-col>
                </div>
              </v-row>
            </div>
            <div>
              <v-card-text class="font-weight-bold">
                ตั้งค่าเทิร์น
              </v-card-text>
              <v-row class="mb-4">
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model="mock_pro.promotion_details[2].SL"
                    outlined
                    dense
                    hide-details="auto"
                    label="SLOT"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model="mock_pro.promotion_details[2].SB"
                    outlined
                    dense
                    hide-details="auto"
                    label="Sportbook"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model="mock_pro.promotion_details[2].ES"
                    outlined
                    dense
                    hide-details="auto"
                    label="ESPORT"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model="mock_pro.promotion_details[2].OT"
                    outlined
                    dense
                    hide-details="auto"
                    label="HorseRacing"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model="mock_pro.promotion_details[2].LC"
                    outlined
                    dense
                    hide-details="auto"
                    label="casino"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model="mock_pro.promotion_details[2].LT"
                    outlined
                    dense
                    hide-details="auto"
                    label="lotto"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[2].FH"
                    outlined
                    dense
                    hide-details="auto"
                    label="fishing"
                  ></v-text-field
                ></v-col>
              </v-row>
            </div>

            <div class="d-flex align-baseline my-5">
              <v-switch
                hide-details="auto"
                class="mx-5"
                :true-value="true"
                :false-value="false"
                color="success"
                v-model="mock_pro.promotion_details[2].rulestatus"
                :label="` ตั้งค่าโบนัสขั้นบันได :  ${mock_pro.promotion_details[2].rulestatus}`"
              ></v-switch>
            </div>
            <div v-show="mock_pro.promotion_details[2].rulestatus == true">
              <v-card>
                <v-data-table
                  :headers="headernewmember"
                  :items="mock_pro.promotion_details[2].promotion_rules"
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
              </v-card>
              <v-card-actions>
                <v-btn
                  small
                  @click="
                    addField(mock_pro.promotion_details[2].promotion_rules)
                  "
                  color="success"
                  rounded
                  ><v-icon>mdi-plus</v-icon>เพิ่ม
                </v-btn>
                <v-btn
                  small
                  v-show="
                    mock_pro.promotion_details[2].promotion_rules.length > 1
                  "
                  @click="
                    removeField(mock_pro.promotion_details[2].promotion_rules)
                  "
                  color="error"
                  rounded
                  ><v-icon>mdi-delete</v-icon>ลบ
                </v-btn>
              </v-card-actions>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- ตั้ง่คาโบนัสฝากทั้งวัน -->
        <!-- ตั้งค่าโบนัสฝากต่อเนื่อง -->
        <v-expansion-panel class="ma-3 elevation-2">
          <v-expansion-panel-header
            @click="settingform('bonusdeposit7day')"
            color="grey lighten-2"
          >
            <div primary-title class="font-weight-bold">
              {{ mock_pro.promotion_details[3].promotiontypename }}
              <v-btn
                small
                color="error"
                v-if="mock_pro.promotion_details[3].typestatus == false"
                ><v-icon left>mdi-cog-outline</v-icon> ปิด</v-btn
              >
              <v-btn small color="success" v-else
                ><v-icon left>mdi-cog-outline</v-icon>เปิด</v-btn
              >
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div>
              <v-card-text class="font-weight-bold"> ตั้งค่าโบนัส </v-card-text>
              <v-row>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model="mock_pro.promotion_details[3].deposit"
                    outlined
                    dense
                    hide-details="auto"
                    label="ฝากขั้นต่ำ"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model="mock_pro.promotion_details[3].bonus"
                    outlined
                    dense
                    hide-details="auto"
                    label="โบนัสที่ได้รับหลังจากฝากครบ"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-select
                    :items="typeDay"
                    v-model="mock_pro.promotion_details[3].days"
                    hide-details="auto"
                    outlined
                    dense
                    label="โบนัส(%/ค่าคงที่)"
                  ></v-select
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model="mock_pro.promotion_details[3].wdlimit"
                    outlined
                    dense
                    hide-details="auto"
                    label="อั้นถอน"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <div>
              <v-card-text class="font-weight-bold">
                ตั้งค่าเทิร์น
              </v-card-text>
              <v-row class="mb-4">
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model="mock_pro.promotion_details[3].SL"
                    outlined
                    dense
                    hide-details="auto"
                    label="SLOT"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model="mock_pro.promotion_details[3].SB"
                    outlined
                    dense
                    hide-details="auto"
                    label="Sportbook"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model="mock_pro.promotion_details[3].ES"
                    outlined
                    dense
                    hide-details="auto"
                    label="ESPORT"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model="mock_pro.promotion_details[3].OT"
                    outlined
                    dense
                    hide-details="auto"
                    label="HorseRacing"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[3].LC"
                    outlined
                    dense
                    hide-details="auto"
                    label="casino"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[3].LT"
                    outlined
                    dense
                    hide-details="auto"
                    label="lotto"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="2">
                  <v-text-field
                    v-model.number="mock_pro.promotion_details[3].FH"
                    outlined
                    dense
                    hide-details="auto"
                    label="fishing"
                  ></v-text-field
                ></v-col>
              </v-row>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- ตั้งค่าโบนัสฝากต่อเนื่อง -->
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      typeBonus: [
        { text: "%", value: "%" },
        { text: "ค่าคงที่", value: "ค่าคงที่" },
      ],
      typeDay: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      inputPicture: null,
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
            typestatus: true,
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
                mindp: 0,
                maxdp: 0,
                bonusvalue: 0,
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

      image: [],
    };
  },
  computed: {
    ...mapState("auth", ["menu"]),
    canwrite() {
      if (this.menu) {
        if (!this.menu.includes("promotion_write")) return true;
        else return false;
      }
    },
  },
  props: {
    planel: [Array, Object],
    mock_pro: Object,
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
  methods: {
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
          "https://admin-static-api-qlws7pv5wa-as.a.run.app/api/Update/file/Dynamic/test/secret123",
          data
        );
        //   "https://all-member-gateway-qlws7pv5wa-as.a.run.app/api/Gateway/Provider/145c4b748540ca78664b32853e4031b5" );
        this.mock_pro.promotionpic = response.data.image;
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
    selectFile(value) {
      if (value) {
        this.mock_pro.promotionpic = URL.createObjectURL(this.inputPicture);
      } else {
        this.url = "";
      }
    },
    addField(form) {
      form.push({
        mindp: 0,
        maxdp: 0,
        dpbonus: 0,
      });
    },
    removeField(fieldType) {
      fieldType.splice(-1);
    },
    settingform(promotion) {
      if (promotion === "newmember") {
        this.mock_pro.promotion_details[0].typestatus =
          !this.mock_pro.promotion_details[0].typestatus;
      } else if (promotion === "firstdeposit") {
        this.mock_pro.promotion_details[1].typestatus =
          !this.mock_pro.promotion_details[1].typestatus;
      } else if (promotion === "bonusoneday") {
        this.mock_pro.promotion_details[2].typestatus =
          !this.mock_pro.promotion_details[2].typestatus;
      } else if (promotion === "bonusdeposit7day") {
        this.mock_pro.promotion_details[3].typestatus =
          !this.mock_pro.promotion_details[3].typestatus;
      }
    },
  },
};
</script>

<style></style>
