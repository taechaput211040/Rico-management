<template>
  <div>
    <loading-page v-if="loading"></loading-page>
    <div v-if="feature_status">
      <div class="container">
        <h2>ตั้งค่าโบนัส affiliate</h2>

        <v-btn
          color="primary"
          rounded
          @click="createAff(dataCreate, true)"
          :disabled="!$store.state.auth.isAdmin && canwrite"
        >
          <v-icon left>mdi-plus</v-icon>
          สร้างการตั้งค่า
        </v-btn>
        <v-card class="mt-2">
          <v-data-table
            :headers="headerReportmain"
            :items="settingList"
            hide-default-footer
          >
            <template #[`item.no`]="{ index }">
              <span class="font-weight-bold">
                {{ index + 1 }}
              </span>
            </template>
            <template #[`item.dp_bonus`]="{ item }">
              <span> {{ item.dp_bonus }} % </span>
            </template>
            <template #[`item.dp_bonus_type`]="{ item }">
              <span v-if="item.dp_bonus_type">ครั้งแรก </span>
              <span v-else> ทุกยอดฝาก </span>
            </template>
            <template #[`item.created_at`]="{ item }">
              <span> {{ item.created_at | dateFormat }} </span>
            </template>
            <template #[`item.winlose_bonus`]="{ item }">
              <span> {{ item.winlose_bonus }} % </span>
            </template>
            <template #[`item.commision_bonus`]="{ item }">
              <span v-if="!item.commision_mode">
                <v-chip x-small color="success">ทุกประเภท</v-chip> <br />{{
                  item.commision_bonus
                }}
                %
              </span>
              <span v-if="item.commision_mode">
                <v-chip x-small color="primary">แยกประเภท</v-chip> <br />
                SLOT:{{ item.commision_bonus_all.SL }}% CASINO:{{
                  item.commision_bonus_all.LC
                }}% SPORT:{{ item.commision_bonus_all.SB }}% <br />ESPORT:{{
                  item.commision_bonus_all.ES
                }}% HORSERACING:{{ item.commision_bonus_all.OT }}%
              </span>
            </template>
            <template #[`item.recieve_mode`]="{ item }">
              <span>
                {{
                  type_recieve.find((x) => x.value === item.recieve_mode).text
                }}
              </span>
            </template>
            <template #[`item.enable`]="{ item }">
              <v-chip outlined small color="error" v-if="item.enable == false">
                <v-icon x-small left>mdi-circle</v-icon> ปิดใช้งาน
              </v-chip>
              <v-chip
                small
                color="success"
                class="px-2"
                outlined 
                v-if="item.enable == true"
              >
                <v-icon x-small left>mdi-circle</v-icon> เปิดใช้งาน
              </v-chip>
            </template>
            <template #[`item.action`]="{ item }">
              <v-btn
                class="btn-sm btn-warning btn mx-1"
                small
                color="warning"
                @click="createAff(item, false)"
                :disabled="!$store.state.auth.isAdmin && canwrite"
              >
                แก้ไข</v-btn
              ><v-btn
                v-if="item.config_name != 'default'"
                class="btn-sm btn-danger btn"
                small
                color="error"
                @click="delete_setting(item.id)"
                :disabled="!$store.state.auth.isAdmin && canwrite"
              >
                ลบ
              </v-btn>
            </template>
          </v-data-table>
        </v-card>

        <h2 class="mt-5">กรอก username เพื่อดูการตั้งค่าปัจจุบันของ ลูกค้า</h2>
        <div class="d-flex align-baseline">
          <div class="col-8 col-md-3 pa-2">
            <v-text-field
              v-model.trim="username"
              outlined
              dense
              solo
              hide-details="auto"
              placeholder="กรอก Username"
            />
          </div>
          <v-btn color="primary" @click="search"
            ><v-icon left>mdi-magnify</v-icon> ค้นหา</v-btn
          >
        </div>

        <v-card class="mt-2">
          <v-data-table
            :headers="headerReportchild"
            :items="dataRender"
            hide-default-footer
          >
            <template #[`item.no`]="{ index }">
              <span class="font-weight-bold">
                {{ index + 1 }}
              </span>
            </template>

            <template #[`item.config_name`]="{ item }">
              <div class="pa-3">
                {{ item.config_name }}
                <v-btn
                  outlined
                  small
                  rounded
                  color="primary"
                  @click.prevent="openDlupdateCinfig('main')"
                  :disabled="!$store.state.auth.isAdmin && canwrite"
                >
                  เปลี่ยนการตั้งค่า
                </v-btn>
              </div>
            </template>
            <template #[`item.child_setting_name`]="{ item }">
              <div class="pa-3">
                {{ item.config_name }}
                <v-btn
                  outlined
                  small
                  rounded
                  color="primary"
                  @click.prevent="openDlupdateCinfig('child')"
                  :disabled="!$store.state.auth.isAdmin && canwrite"
                >
                  เปลี่ยนการตั้งค่า
                </v-btn>
              </div>
            </template>
            <template #[`item.dp_bonus_type`]="{ item }">
              {{ item.dp_bonus }} %
              <span v-if="item.dp_bonus_type">(ครั้งแรก) </span>
              <span v-else> (ทุกยอดฝาก) </span>
            </template>
            <template #[`item.winlose_bonus`]="{ item }">
              {{ item.winlose_bonus }} %
              <span v-if="item.winlose_bonus_mode == false"> (ติดลบได้) </span>
            </template>

            <template #[`item.commision_mode`]="{ item }">
              <span v-if="!item.commision_mode">
                <v-chip x-small color="success">ทุกประเภท</v-chip> <br />{{
                  item.commision_bonus
                }}
                %
              </span>
              <span v-if="item.commision_mode">
                <v-chip x-small color="primary">แยกประเภท</v-chip> <br />
                SLOT:{{ item.commision_bonus_all.SL }}% CASINO:{{
                  item.commision_bonus_all.LC
                }}% SPORT:{{ item.commision_bonus_all.SB }}% <br />ESPORT:{{
                  item.commision_bonus_all.ES
                }}% HORSERACING:{{ item.commision_bonus_all.OT }}%
              </span>
            </template>

            <template #[`item.created_at`]="{ item }">
              <span> {{ item.created_at | dateFormat }} </span>
            </template>
            <template #[`item.recieve_mode`]="{ item }">
              <span>
                {{
                  type_recieve.find((x) => x.value === item.recieve_mode).text
                }}
              </span>
            </template>
            <template #[`item.enable`]="{ item }">
              <v-chip outlined small color="error" v-if="item.enable == false">
                <v-icon x-small left>mdi-circle</v-icon> ปิดใช้งาน
              </v-chip>
              <v-chip
                small
                color="success"
                class="px-2"
                outlined
                v-if="item.enable == true"
              >
                <v-icon x-small left>mdi-circle</v-icon> เปิดใช้งาน
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
        <v-dialog v-model="dlcreate" max-width="600px" height="auto">
          <v-card class="pa-5">
            <v-card-title class="font-weight-blod primary--text">
              <h3 class="mx-auto">
                {{ formCreate ? "สร้างการตั้งค่า" : "เเก้ไขการตั้งค่า" }}
              </h3>
            </v-card-title>

            <form ref="createSetting">
              <div class="card_config">
                <div class="input_form">
                  <span class="px-2 text_modal">สายงาน : </span>
                  <div class="col-6 col-md-4">
                    <v-text-field
                      type="text"
                      hide-details="auto"
                      dense
                      outlined
                      v-model="dataCreate.config_name"
                    />
                  </div>
                </div>
                <div class="elevation-2 rounded-lg mt-2">
                  <div class="input_form">
                    <span class="px-2 text_modal">
                      bonusจากยอดฝากของเพื่อน(%) :
                    </span>
                    <div class="col-6 col-md-4">
                      <v-text-field
                        hide-details="auto"
                        dense
                        outlined
                        type="number"
                        v-model="dataCreate.dp_bonus"
                      />
                    </div>
                  </div>
                  <div class="input_form">
                    <span class="px-2 text_modal">ประเภท : </span>
                    <div class="col-6 col-md-4">
                      <v-select
                        hide-details="auto"
                        dense
                        outlined
                        :items="type_obtion"
                        v-model="dataCreate.dp_bonus_type"
                      />
                    </div>
                  </div>
                </div>
                <div class="elevation-2 rounded-lg mt-2">
                  <div class="input_form">
                    <span class="px-2 text_modal"
                      >bonusจากยอดเสียของเพื่อน(%) :
                    </span>
                    <div class="col-6 col-md-4 py-0">
                      <v-text-field
                        outlined
                        dense
                        type="number"
                        hide-details="auto"
                        v-model="dataCreate.winlose_bonus"
                      />
                    </div>
                  </div>
                  <div class="px-3 pt-0 pb-3">
                    <v-switch
                      hide-details="auto"
                      dense
                      :label="`${
                        !dataCreate.winlose_bonus_mode
                          ? 'ติดลบ ตามกำไรของ downline'
                          : 'ยอดที่ติดลบจะเป็น 0 '
                      }`"
                      v-model="dataCreate.winlose_bonus_mode"
                    ></v-switch>
                  </div>
                  <small class="red--text font-weight-bold text-center pa-3">
                    ตัวอย่าง : ตั้งโบนัสยอดเสียของเพื่อนไว้ 10% downline
                    เล่นได้กำไร 100 บาท โบนัสยอดเสีย =
                    {{ !dataCreate.winlose_bonus_mode ? "-10" : "0" }}
                  </small>
                </div>
                <div class="elevation-2 rounded-lg mt-2">
                  <div class="px-3 mt-2">
                    <div class="my-2 primary--text font-weight-bold">
                      ประเภทคอมมิชชั่น
                    </div>
                    <v-switch
                      hide-details="auto"
                      dense
                      label="รวมทุกประเภท"
                      v-model="dataCreate.commision_mode"
                    ></v-switch>
                  </div>

                  <div class="input_form" v-if="!dataCreate.commision_mode">
                    <span class="px-2 text_modal"
                      >bonusจากturnoverของเพื่อน(%) :
                    </span>
                    <div class="col-6 col-md-4 py-0">
                      <v-text-field
                        hide-details="auto"
                        dense
                        outlined
                        type="number"
                        v-model="dataCreate.commision_bonus"
                      />
                    </div>
                  </div>
                  <div class="pa-2" v-else>
                    bonusจากturnoverของเพื่อน(%)
                    <div class="input_form">
                      <span class="px-2 text_modal">SLOT(%) : </span>
                      <div class="col-6 col-md-4 py-0">
                        <v-text-field
                          hide-details="auto"
                          dense
                          outlined
                          type="number"
                          v-model="dataCreate.commision_bonus_all.ES"
                        />
                      </div>
                    </div>
                    <div class="input_form">
                      <span class="px-2 text_modal">CASINO(%) : </span>
                      <div class="col-6 col-md-4 py-0">
                        <v-text-field
                          hide-details="auto"
                          dense
                          outlined
                          type="number"
                          v-model="dataCreate.commision_bonus_all.LC"
                        />
                      </div>
                    </div>
                    <div class="input_form">
                      <span class="px-2 text_modal">SPORTBOOK(%) : </span>
                      <div class="col-6 col-md-4 py-0">
                        <v-text-field
                          hide-details="auto"
                          dense
                          outlined
                          type="number"
                          v-model="dataCreate.commision_bonus_all.OT"
                        />
                      </div>
                    </div>
                    <div class="input_form">
                      <span class="px-2 text_modal">ESPORT(%) : </span>
                      <div class="col-6 col-md-4 py-0">
                        <v-text-field
                          hide-details="auto"
                          dense
                          outlined
                          type="number"
                          v-model="dataCreate.commision_bonus_all.SB"
                        />
                      </div>
                    </div>
                    <div class="input_form">
                      <span class="px-2 text_modal">HORSERACING(%) : </span>
                      <div class="col-6 col-md-4 py-0">
                        <v-text-field
                          hide-details="auto"
                          dense
                          outlined
                          type="number"
                          v-model="dataCreate.commision_bonus_all.SL"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="input_form">
                  <span class="px-2 text_modal">การรับรายได้ : </span>
                  <div class="col-6 col-md-4">
                    <v-select
                      hide-details="auto"
                      outlined
                      dense
                      :items="type_recieve"
                      v-model="dataCreate.recieve_mode"
                    />
                  </div>
                </div>
              </div>
              <v-card-actions>
                <div class="mx-auto mt-5">
                  <v-btn
                    color="primary"
                    dark
                    small
                    @click="createconfig()"
                    :disabled="!$store.state.auth.isAdmin && canwrite"
                  >
                    {{ formCreate ? "สร้าง" : "เเก้ไข" }}
                  </v-btn>
                  <v-btn color="error" dark small @click="closeConfig()">
                    ยกเลิก
                  </v-btn>
                </div>
              </v-card-actions>
            </form>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dlupdateChild"
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card class="pa-3">
            <v-card-title class="justify-center" primary-title>
              เลือกสายงาน
            </v-card-title>
            <v-form ref="formConfig">
              <v-select
                dense
                solo
                outlined
                hide-details="auto"
                :items="selector_option"
                v-model="selector_value"
              />

              <v-card-actions class="justify-center">
                <v-btn
                  color="success"
                  @click="updateChild(selector_value, type_selectConfig)"
                  >เปลี่ยน</v-btn
                ><v-btn color="error" @click="closeUpdateChild()">ยกเลิก</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <div v-else>
      <label class="custom-control-label"
        >สถานะ FEATURE นี้ ของ AGENT
        {{ $store.state.auth.company ? $store.state.auth.company : "" }}
        ยังไม่เปิดใช้งาน .. ติดต่อ Up-line หรือผู้ดูแลระบบ เพื่อทำการเปิดใช้งาน
        Feature นี้</label
      >
    </div>
  </div>
  <!-- v-if="feature_status" -->
</template>
<script>
import { mapActions, mapState } from "vuex";
import LoadingPage from "../../components/LoadingPage.vue";
export default {
  components: { LoadingPage },
  data() {
    return {
      type_selectConfig: null,
      selector_value: null,
      dlupdateChild: false,
      feature_status: true,
      formCreate: true,
      dlcreate: false,
      headerReportchild: [
        {
          text: "No.",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "สายงาน",
          value: "config_name",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "	สายงาน downline	",
          value: "child_setting_name",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "bonus ยอดฝาก",
          value: "dp_bonus_type",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "bonusจากยอดเสีย",
          value: "winlose_bonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "bonusจากturnover(commission)",
          value: "commision_mode",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "การรับรายได้",
          value: "recieve_mode",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "สถานะ",
          value: "enable",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "วันที่สร้าง",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "สร้างโดย",
          value: "create_by",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
      ],
      headerReportmain: [
        {
          text: "No.",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "สายงาน",
          value: "config_name",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "	bonusจากยอดฝาก	",
          value: "dp_bonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "	ประเภท	",
          value: "dp_bonus_type",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "bonusจากยอดเสีย",
          value: "winlose_bonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "bonusจากturnover(commission)",
          value: "commision_bonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "การรับรายได้",
          value: "recieve_mode",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "สถานะ",
          value: "enable",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "วันที่สร้าง",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "สร้างโดย",
          value: "create_by",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "ดำเนินการ",
          value: "action",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
      ],
      modal_edit: false,
      companyname: "membertest",
      agent: "membertest",
      hash: "membertest",
      username: "",
      type_recieve: [
        { value: 1, text: "รายวัน" },
        { value: 2, text: "รายเดือน" },
        { value: 3, text: "รายสัปดาห์" },
      ],
      type_line: ["A", "B"],
      type_obtion: [
        { value: true, text: "ครั้งแรก" },
        { value: false, text: "ทุกยอดฝาก" },
      ],
      selector_option: [],
      dataRender: [],
      dataModal: [],
      dataCreate: {},
      settingList: [
        {
          id: "9d5e10da-db7a-4c06-b235-622553f0b520",
          created_at: "2022-08-18T23:00:57.705Z",
          updated_at: "2022-08-18T23:00:57.705Z",
          deletedAt: null,
          hash: "77ac44a668a54094249f7f4b550ac6d7",
          enable: true,
          config_name: "default",
          dp_bonus: 5,
          dp_bonus_type: true,
          commision_bonus: 0,
          winlose_bonus: 3,
          recieve_mode: 2,
          winlose_bonus_mode: true,
          commision_mode: false,
          commision_bonus_all: {
            ES: 0,
            LC: 0,
            OT: 0,
            SB: 0,
            SL: 0,
          },
          create_by: "surasak.bank",
          update_by: null,
          delete_by: null,
        },
      ],
    };
  },
  async fetch() {
    await this.getDataAffiliate();
  },
  computed: {
    ...mapState("auth", ["menu"]),
    canwrite() {
      if (this.menu) {
        if (!this.menu.includes("affiliate_write")) return true;
        else return false;
      }
    },
  },
  methods: {
    openDlupdateCinfig(type) {
      this.type_selectConfig = type;
      this.dlupdateChild = true;
    },
    closeUpdateChild() {
      this.dlupdateChild = false;
      this.$refs.formConfig.reset();
    },
    closeConfig() {
      // this.$refs.createSetting.reset();
      this.dlcreate = false;
    },
    async getDataAffiliate() {
      this.loading = true;
      try {
        let { data } = await this.$axios.get(
          `${process.env.AFF_SETTING}/api/MainSetting/${this.$store.state.auth.hash}`
        );
        this.feature_status = data.feature_status;
        this.settingList = data.config;
        this.selector_option = data.config.map((item) => {
          return { value: item.id, text: item.config_name };
        });
      } catch (error) {}
      this.loading = false;
    },
    async createconfig() {
      this.loading = true;
      if (this.formCreate) {
        try {
          await this.$axios.post(
            `${process.env.AFF_SETTING}/api/Aff/Setting/${this.$store.state.auth.hash}`,
            this.dataCreate
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.$axios.put(
            `${process.env.AFF_SETTING}/api/MainSetting/Setting`,
            this.dataCreate
          );

          this.$swal({
          title: "บันทึกสำเร็จ",
         
      
        })
        this.dlcreate=false
        } catch (error) {
          console.log(error);
        }
      }
      this.loading = false;
    },
    async updateChild(config_id, type) {
      if (!config_id) {
        this.$swal({
          icon: "warning",
          title: "โปรดเลือกสายงาน",
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        if (type === "child") {
          try {
            await this.$axios.put(
              `${process.env.AFF_SETTING}/api/Aff/Member/child/${config_id}/${this.username}`
            );
            this.closeUpdateChild();
          } catch (error) {
            console.log(error);
          }
        } else if (type === "main") {
          try {
            await this.$axios.put(
              `${process.env.AFF_SETTING}/api/Aff/Member/${config_id}/${this.username}`
            );
          } catch (error) {
            console.log(error);
          }
          this.closeUpdateChild();
        }
      }
    },
    createAff(item, create) {
      this.formCreate = create;
      if (!create) {
        this.dataCreate = Object.assign({}, item);
      } else {
        this.dataCreate = {
          enable: true,
          config_name: "",
          dp_bonus: 0,
          dp_bonus_type: false,
          commision_bonus: 0,
          winlose_bonus: 0,
          recieve_mode: 1,
          winlose_bonus_mode: false,
          commision_mode: false,
          commision_bonus_all: {
            ES: 0,
            LC: 0,
            OT: 0,
            SB: 0,
            SL: 0,
          },
        };
      }
      this.dlcreate = true;
    },
    async search() {
      this.loading = true;
      try {
        let res = await this.$axios.get(
          `${
            process.env.AFF_SETTING
          }/api/Aff/Member/Service/${this.username.toLowerCase()}/${
            this.$store.state.auth.agent
          }`
        );

        // await this.getFeatureStatus();
        console.log(res.data);

        this.dataRender = [res.data];
      } catch (err) {
        console.log(err);
      }
      this.loading = false;
    },
    edit_setting(data) {},
    async delete_setting(id) {
      try {
        this.$swal({
          title: "ต้องการลบ config หรือไม่ ?",
          icon: "question",
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // console.log(this.formCreate)
            await this.$axios.delete(
              `${process.env.AFF_SETTING}/api/MainSetting/${id}`
            );
            this.$swal({
              icon: "success",
              title: "ลบแล้ว",
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 1500,
            }).then(async (result) => {
              if (result) {
                await this.$fetch();
              }
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.title_header {
  text-align: center;
  font-weight: bold;
}
.card-show {
  padding: 10px;
  border-radius: 10px;
  position: relative;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  font-size: small;
  box-shadow: 0px 5px 8px 0px rgb(179 176 176 / 75%);
}
</style>
