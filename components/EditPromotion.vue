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
        {{ openedPanel }}
        <v-expansion-panels
          v-model="openedPanel"
          accordion
          style="width: 100%"
          multiple
        >
          <!-- /*ตั้งค่าโบนัสสมาชิกใหม่*/ -->
          <v-expansion-panel
            v-for="(item, index) in renderdata.detail"
            :key="index"
          >
            <div class="ma-2">
              <v-expansion-panel-header color="grey lighten-2" v-if="item">
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
                {{ item }}
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
  props: {
    renderdata: {
      type: [Array, Object],
      default: null,
      required: true,
    },
  },
  data() {
    return {
      openedPanel: [],
      headernewmember: [
        {
          text: "ฝากต่ำสุด",
          value: "dpmin",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text",
        },
        {
          text: "ฝากสูงสุด",
          value: "dpmax",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text",
        },
        {
          text: "โบนัสที่ได้(%/ค่าคงที่)",
          value: "dpbonus",
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
  methods: {
    addField(form) {
      form.push({
        dpmin: "",
        dpmax: "",
        dpbonus: "",
      });
    },
    removeField(fieldType) {
      fieldType.splice(-1);
    },
    settingform(promotion) {
      if (promotion === "newmember") {
        this.formbonusnewmember.statustype =
          !this.formbonusnewmember.statustype;
      } else if (promotion === "firstdeposit") {
        this.formfirstdeposit.statustype = !this.formfirstdeposit.statustype;
      } else if (promotion === "bonusoneday") {
        this.formbonusdponeday.statustype = !this.formbonusdponeday.statustype;
      } else if (promotion === "bonusdeposit7day") {
        this.formdeposit7day.statustype = !this.formdeposit7day.statustype;
      }
    },
  },
};
</script>

<style></style>
