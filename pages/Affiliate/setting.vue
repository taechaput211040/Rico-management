<template>
  <div class="container">
    <h2>ตั้งค่าโบนัส affiliate</h2>

    <v-btn color="primary" rounded @click="dlcreate = true">
      <v-icon left>mdi-plus</v-icon>
      สร้างการตั้งค่า
    </v-btn>
    <v-card class=" mt-2">
      <v-data-table
        :headers="headerReportmain"
        :items="settingList"
        hide-default-footer
      >
        <template #[`item.no`]="{index}">
          <span class="font-weight-bold">
            {{ index + 1 }}
          </span>
        </template>
        <template #[`item.dp_bonus`]="{item}">
          <span> {{ item.dp_bonus }} % </span>
        </template>
        <template #[`item.dp_bonus_type`]="{item}">
          <span> {{ item.dp_bonus_type }} % </span>
        </template>
        <template #[`item.winlos_rate`]="{item}">
          <span> {{ item.winlos_rate }} % </span>
        </template>
        <template #[`item.commission_rate`]="{item}">
          <span> {{ item.commission_rate }} % </span>
        </template>
        <template #[`item.recieve_mode`]="{item}">
          <span> {{ item.recieve_mode_text }} </span>
        </template>
        <template #[`item.status`]="{item}">
          <v-chip outlined small color="error" v-if="item.status == 0">
            <v-icon x-small left>mdi-circle</v-icon> ปิดใช้งาน
          </v-chip>
          <v-chip
            small
            color="success"
            class="px-2"
            outlined
            v-if="item.status == 1"
          >
            <v-icon x-small left>mdi-circle</v-icon> เปิดใช้งาน
          </v-chip>
        </template>
        <template #[`item.action`]="{item}">
          <v-btn
            class="btn-sm btn-warning btn mx-1"
            small
            color="warning"
            @click="edit_setting(item)"
          >
            แก้ไข</v-btn
          ><v-btn
            class="btn-sm btn-danger btn"
            small
            color="error"
            @click="delete_setting(item)"
          >
            ลบ
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="modal_edit" max-width="600px" height="auto"
      ><v-card class="pa-5">
        <v-card-title class="font-weight-blod primary--text ">
          <h3 class="mx-auto">แก้ไขConfig</h3>
        </v-card-title>
        <form>
          <div class="card_config">
            <div class="sectioninput">
              <span class="px-2 text_modal">สายงาน : </span>
              <v-text-field
                class="col-6 col-md-4"
                type="text"
                hide-details="auto"
                dense
                v-model="dataModal.configName"
              />
            </div>
            <div class="sectioninput">
              <span class="px-2 text_modal">
                bonusจากยอดฝากของเพื่อน(%) :
              </span>
              <div>
                <v-text-field
                  hide-details="auto"
                  dense
                  type="number"
                  v-model="dataModal.dp_bonus"
                />
              </div>
            </div>
            <div class="sectioninput">
              <span class="px-2 ">ประเภท : </span>
              <v-select
                hide-details="auto"
                dense
                class="col-6 col-md-4"
                :items="type_obtion"
                v-model="dataModal.dp_bonus_type"
              />
            </div>
            <div class="sectioninput">
              <span class="px-2 ">bonusจากยอดเสียของเพื่อน(%) : </span>
              <v-text-field
                class="col-6 col-md-4"
                type="number"
                hide-details="auto"
                dense
                v-model="dataModal.winlos_rate"
              />
            </div>

            <div class="sectioninput">
              <span class="px-2 ">bonusจากturnoverของเพื่อน(%) : </span>
              <div>
                <v-text-field
                  hide-details="auto"
                  dense
                  type="number"
                  v-model="dataModal.commission_rate"
                />
              </div>
            </div>
            <div class="sectioninput px-2">
              การรับรายได้ :
              <v-select
                hide-details="auto"
                dense
                class="col-6 col-md-4"
                :items="type_recieve"
                v-model="dataModal.recieve_mode"
              />
            </div>

            <div class="sectioninput">
              <span class="px-2 ">สถานะ : {{ dataModal.status }} </span>
            </div>

            <div class="sectioninput">
              <span class="px-2 "
                >วันที่สร้าง:
                {{ new Date(dataModal.created_at).toLocaleString() }}</span
              >
            </div>
          </div>
          <v-card-actions>
            <div class="mx-auto mt-5">
              <v-btn color="primary" dark small @click="editconfig()">
                เเก้ไข
              </v-btn>
              <v-btn color="error" dark small @click="modal_edit = false">
                ยกเลิก
              </v-btn>
            </div>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
    <div class="mt-5 d-flex align-baseline">
      <v-text-field
        v-model="username"
        outlined
        dense
        solo
        hide-details="auto"
        placeholder="กรอก Username"
        class="col-8 col-md-3 pa-2"
      /><v-btn color="primary" @click="search"
        ><v-icon left>mdi-magnify</v-icon> ค้นหา</v-btn
      >
    </div>

    <v-card class=" mt-2">
      <v-data-table
        :headers="headerReportmain"
        :items="dataRender"
        hide-default-footer
      >
        <template #[`item.no`]="{index}">
          <span class="font-weight-bold">
            {{ index + 1 }}
          </span>
        </template>

        <template #[`item.dp_bonus`]="{item}">
          <span> {{ item.dp_bonus }} % </span>
        </template>
        <template #[`item.dp_bonus_type`]="{item}">
          <span> {{ item.dp_bonus_type }} % </span>
        </template>
        <template #[`item.winlos_rate`]="{item}">
          <span> {{ item.winlos_rate }} % </span>
        </template>
        <template #[`item.commission_rate`]="{item}">
          <span> {{ item.commission_rate }} % </span>
        </template>
        <template #[`item.recieve_mode`]="{item}">
          <span> {{ item.recieve_mode_text }} </span>
        </template>
        <template #[`item.status`]="{item}">
          <v-chip outlined small color="error" v-if="item.status == 0">
            <v-icon x-small left>mdi-circle</v-icon> ปิดใช้งาน
          </v-chip>
          <v-chip
            small
            color="success"
            class="px-2"
            outlined
            v-if="item.status == 1"
          >
            <v-icon x-small left>mdi-circle</v-icon> เปิดใช้งาน
          </v-chip>
        </template>
        <template #[`item.action`]="{item}">
          <v-btn
            class="btn-sm btn-warning btn mx-1"
            small
            color="warning"
            @click="edit_setting(item)"
          >
            แก้ไข</v-btn
          ><v-btn
            class="btn-sm btn-danger btn"
            small
            color="error"
            @click="delete_setting(item)"
          >
            ลบ
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dlcreate" max-width="600px" height="auto">
      <v-card class="pa-5">
        <v-card-title class="font-weight-blod primary--text ">
          <h3 class="mx-auto">สร้างการตั้งค่า</h3>
        </v-card-title>
        <form>
          <div class="card_config">
            <div class="input_form">
              <span class="px-2 text_modal">สายงาน : </span>
              <v-text-field
                type="text"
                class="col-6 col-md-4"
                hide-details="auto"
                dense
                v-model="dataCreate.line"
              />
            </div>
            <div class="input_form">
              <span class="px-2 text_modal">
                bonusจากยอดฝากของเพื่อน(%) :
              </span>
              <div>
                <v-text-field
                  hide-details="auto"
                  dense
                  type="number"
                  v-model="dataCreate.bonusFriend"
                />
              </div>
            </div>
            <div class="input_form">
              <span class="px-2 text_modal">ประเภท : </span>
              <v-select
                hide-details="auto"
                dense
                class="col-6 col-md-4"
                :items="type_obtion"
                v-model="dataCreate.datatype"
              />
            </div>
            <div class="input_form">
              <span class="px-2 text_modal"
                >bonusจากยอดเสียของเพื่อน(%) :
              </span>
              <div>
                <v-text-field
                  class="col-6 col-md-4"
                  type="number"
                  hide-details="auto"
                  v-model="dataCreate.bonusloss"
                />
              </div>
            </div>

            <div class="input_form">
              <span class="px-2 text_modal"
                >bonusจากturnoverของเพื่อน(%) :
              </span>
              <div>
                <v-text-field
                  hide-details="auto"
                  dense
                  type="number"
                  v-model="dataCreate.bonusCommission"
                />
              </div>
            </div>
            <div class="input_form">
              <span class="px-2 text_modal">การรับรายได้ : </span>
              <v-select
                hide-details="auto"
                dense
                class="col-6 col-md-4"
                :items="type_recieve"
                v-model="dataCreate.type_recieve"
              />
            </div>
          </div>
          <v-card-actions>
            <div class="mx-auto mt-5">
              <v-btn color="primary" dark small @click="createconfig()">
                เเก้ไข
              </v-btn>
              <v-btn color="error" dark small @click="dlcreate = false">
                ยกเลิก
              </v-btn>
            </div>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dlcreate: false,
      headerReportmain: [
        {
          text: "No.",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "สายงาน",
          value: "configName",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "	bonusจากยอดฝากของเพื่อน	",
          value: "dp_bonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "	ประเภท	",
          value: "dp_bonus_type",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "bonusจากยอดเสียของเพื่อน",
          value: "winlos_rate",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "bonusจากturnoverของเพื่อน(commission)",
          value: "commission_rate",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "การรับรายได้",
          value: "recieve_mode",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "สถานะ",
          value: "status",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "วันที่สร้าง",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "สร้างโดย",
          value: "created_by",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "ดำเนินการ",
          value: "action",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        }
      ],
      modal_edit: false,
      companyname: "membertest",
      agent: "membertest",
      hash: "membertest",
      username: "bk2619016",
      type_recieve: [
        { value: 1, text: "รายวัน" },
        { value: 2, text: "รายเดือน" },
        { value: 3, text: "รายสัปดาห์" }
      ],
      type_line: ["A", "B"],
      type_obtion: [
        { value: 0, text: "ครั้งแรก" },
        { value: 1, text: "ทุกยอดฝาก" }
      ],
      dataRender: [
        {
          Id: "1a232401-e3c9-40c6-a129-84b362d1d231",
          agent: "membertest",
          commission_rate: 3,
          companyname: "membertest",
          configName: "config_mock_4",
          created_at: "2021-11-24T21:49:44.805Z",
          created_by: "admin",
          deletedAt: null,
          dp_bonus: 2,
          dp_bonus_type: 1,
          enable: true,
          hash: "membertest",
          recieve_mode: 1,
          recieve_mode_text: "รายวัน",
          status: "1",
          updated_at: "2021-11-24T21:49:44.805Z",
          winlos_rate: 8
        }
      ],
      dataModal: [],
      dataCreate: {
        line: "",
        bonusFriend: 0,
        datatype: 1,
        bonusloss: 0,
        bonusCommission: 0,
        type_recieve: 1,
        status: 1,
        datstart: new Date(),
        create_by: ""
      },
      settingList: [
        {
          Id: "1358c0f0-06b6-4b76-be61-2ea5b0bcdd26",
          companyname: "membertest",
          agent: "membertest",
          hash: "membertest",
          status: 0,
          configName: "config_mock_17",
          dp_bonus: 2,
          dp_bonus_type: 0,
          commission_rate: 10,
          winlos_rate: 4,
          recieve_mode: 3,
          recieve_mode_text: "รายเดือน",
          enable: true,
          created_at: "2021-11-24T21:49:44.956Z",
          created_by: "ADMIN"
        }
      ]
    };
  },
  methods: {
    search() {
      fetch(
        `http://localhost:3001/api/aff/member/setting/${this.hash}/${this.username}`
      )
        .then(stream => stream.json())
        .then(data => (this.dataRender = [data.settings]))
        .catch(error => console.error(error));
    },
    edit_setting(data) {
      console.log(data);
      this.dataModal = data;
      this.modal_edit = true;
    },
    async editconfig(item) {
      item.dp_bonus = parseInt(item.dp_bonus);
      item.dp_bonus_type = parseInt(item.dp_bonus_type);
      item.commission_rate = parseInt(item.commission_rate);
      item.winlos_rate = parseInt(item.winlos_rate);
      item.recieve_mode = parseInt(item.recieve_mode);
      await this.$axios
        .patch(`http://localhost:3001/api/aff/admin/setting/${item.Id}`, item)
        .then(async res => {
          await this.getByHash(this.hash);
          this.$bvModal.hide("modal-edit");
        })
        .catch(function(error) {
          console.log(error);
        });
    }, // ปุ่ม ส่ง request
    async createconfig() {
      await this.$axios
        .post(`http://localhost:3001/api/aff/admin/setting`, {
          companyname: this.companyname,
          agent: this.agent,
          hash: this.hash,
          status: 1,
          configName: this.dataCreate.line,
          dp_bonus: parseInt(this.dataCreate.bonusFriend),
          dp_bonus_type: this.dataCreate.datatype,
          commission_rate: parseInt(this.dataCreate.bonusCommission),
          winlos_rate: parseInt(this.dataCreate.bonusloss),
          recieve_mode: parseInt(this.dataCreate.type_recieve),
          enable: true,
          created_by: this.username
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async getddlDepositBonusType() {
      fetch(`http://localhost:3001/api/aff/admin/setting/depositBonus_Type`)
        .then(stream => stream.json())
        .then(data => (this.type_obtion = data))
        .catch(error => console.error(error));
    },
    async getddlRecieve_mode() {
      fetch(`http://localhost:3001/api/aff/admin/setting/recieve_mode`)
        .then(stream => stream.json())
        .then(data => (this.type_recieve = data))
        .catch(error => console.error(error));
    },
    async getByHash(hash) {
      fetch(`http://localhost:3001/api/aff/admin/setting/all/${hash}`)
        .then(stream => stream.json())
        .then(data => (this.settingList = data))
        .catch(error => console.error(error));
    },
    async delete_setting(setting) {
      await this.$axios
        .delete(`http://localhost:3001/api/aff/admin/setting/${setting.Id}`)
        .then(async response => {
          await this.getByHash(this.hash);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted: async function() {
    await this.getddlRecieve_mode();
    await this.getddlDepositBonusType();
    await this.getByHash(this.hash);
  }
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
