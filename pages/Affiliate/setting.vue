<template>
  <div class="container">
    <div class="title_header pt-2 pt-md-5 pb-md-4">
      <h2>ตั้งค่าโบนัส affiliate</h2>
    </div>
    <div class="add">
      <button class="btn-sm btn-primary" @click="$bvModal.show('modal-create')">
        สร้างการตั้งค่า
      </button>
    </div>

    <div class="col-12 col-md-12 mt-3">
      <div class="card-child">
        <div class="card-show mb-4 p-md-3 shadow">
          <table class="table p-3">
            <thead>
              <tr class="font-weight-bold">
                <th>No.</th>
                <th>สายงาน</th>
                <th>bonusจากยอดฝากของเพื่อน</th>
                <th>ประเภท</th>
                <th>bonusจากยอดเสียของเพื่อน</th>
                <th>bonusจากturnoverของเพื่อน(commission)</th>
                <th>การรับรายได้</th>
                <th>สถานะ</th>
                <th>วันที่สร้าง</th>
                <th>สร้างโดย</th>
                <th class="text-center">action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in settingList" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.configName }}</td>
                <td>{{ item.dp_bonus }} %</td>
                <td>{{ item.dp_bonus_type }}</td>
                <td>{{ item.winlos_rate }} %</td>
                <td>{{ item.commission_rate }} %</td>
                <td>{{ item.recieve_mode }}</td>
                <td>
                  <span v-if="item.status == '1'"
                    ><button class="btn btn-outline-success btn-sm" disabled>
                      ใช้งาน
                    </button>
                  </span>
                  <span v-if="item.status == '0'"
                    ><button class="btn btn-outline-danger btn-sm" disabled>
                      ปิดใช้งาน
                    </button>
                  </span>
                </td>
                <td>{{ new Date(item.created_at).toLocaleString() }}</td>
                <td>{{ item.created_by }}</td>
                <td>
                  <button
                    class="btn-sm btn-warning btn mx-1"
                    @click="edit_setting(item)"
                  >
                    แก้ไข</button
                  ><button
                    class="btn-sm btn-danger btn"
                    @click="delete_setting(item)"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <b-modal
          id="modal-edit"
          centered
          size="md"
          hide-header-close
          title="แก้ไขการตั้งค่า Config"
          hide-footer
          ><form>
            <div class="card_config">
              <div class="input_form">
                <span class="px-2 text_modal">สายงาน : </span>
                <b-input type="text" v-model="dataModal.line" />
                <!-- <b-form-select
                  type="number"
                  :options="type_line"
                  v-model="dataModal.line"
                /> -->
              </div>
              <div class="input_form">
                <span class="px-2 text_modal">
                  bonusจากยอดฝากของเพื่อน(%) :
                </span>
                <div>
                  <b-input type="number" v-model="dataModal.bonusFriend" />
                </div>
              </div>
              <div class="input_form">
                <span class="px-2 text_modal">ประเภท : </span>
                <b-form-select
                  type="number"
                  :options="type_obtion"
                  v-model="dataModal.datatype"
                />
              </div>
              <div class="input_form">
                <span class="px-2 text_modal"
                  >bonusจากยอดเสียของเพื่อน(%) :
                </span>
                <div>
                  <b-input type="number" v-model="dataModal.bonusloss" />
                </div>
              </div>

              <div class="input_form">
                <span class="px-2 text_modal"
                  >bonusจากturnoverของเพื่อน(%) :
                </span>
                <div>
                  <b-input type="number" v-model="dataModal.bonusCommission" />
                </div>
              </div>
              <div class="input_form">
                <span class="px-2 text_modal">การรับรายได้ : </span>
                <b-form-select
                  type="number"
                  :options="type_recieve"
                  v-model="dataModal.type_recieve"
                />
              </div>

              <div class="input_form">
                <span class="px-2 text_modal">สถานะ : </span>
                <div>
                  <span v-if="dataModal.status == '1'"
                    ><button class="btn btn-outline-success btn-sm" disabled>
                      ใช้งาน
                    </button>
                  </span>
                  <span v-if="dataModal.status == '0'"
                    ><button class="btn btn-outline-danger btn-sm" disabled>
                      ปิดใช้งาน
                    </button>
                  </span>
                </div>
              </div>

              <div class="input_form">
                <span class="px-2 text_modal">วันที่สร้าง: </span>
                <div>
                  {{ dataModal.datstart }}
                </div>
              </div>
            </div>
            <div class="text-center">
              <button class="btn btn-primary btn-md" @click="editconfig()">
                เเก้ไข
              </button>
              <button
                class="btn btn-danger btn-md"
                @click="$bvModal.hide('modal-edit')"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </b-modal>
      </div>
    </div>

    <div class="section_search d-flex" style="align-items: baseline">
      <div class="d-flex pb-3" style="align-items: baseline">
        <div class="px-2">Username:</div>
        <div class="px-2">
          <b-form-input
            v-model="username"
            placeholder="กรอก Username"
            style="width: 220px"
          ></b-form-input>
        </div>
        <button class="btn btn-success btn-sm" @click="search">ค้นหา</button>
      </div>
    </div>
    <div class="col-12 col-md-12 mt-3">
      <div class="card-child">
        <div class="card-show mb-4 p-md-3 shadow">
          <table class="table p-3">
            <thead>
              <tr class="font-weight-bold">
                <th>No.</th>
                <th>สายงาน</th>
                <th>bonusจากยอดฝากของเพื่อน</th>
                <th>ประเภท</th>
                <th>bonusจากยอดเสียของเพื่อน</th>
                <th>bonusจากturnoverของเพื่อน(commission)</th>
                <th>การรับรายได้</th>
                <th>สถานะ</th>
                <th>วันที่สร้าง</th>
                <th>สร้างโดย</th>
                <th class="text-center">action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dataRender" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.configName }}</td>
                <td>{{ item.dp_bonus }} %</td>
                <td>{{ item.dp_bonus_type }}</td>
                <td>{{ item.winlos_rate }} %</td>
                <td>{{ item.commission_rate }} %</td>
                <td>{{ item.recieve_mode_text }}</td>
                <td>
                  <span v-if="item.status == '1'"
                    ><button class="btn btn-outline-success btn-sm" disabled>
                      ใช้งาน
                    </button>
                  </span>
                  <span v-if="item.status == '0'"
                    ><button class="btn btn-outline-danger btn-sm" disabled>
                      ปิดใช้งาน
                    </button>
                  </span>
                </td>
                <td>{{ new Date(item.created_at).toLocaleString() }}</td>
                <td>{{ item.created_by }}</td>
                <td>
                  <button
                    class="btn-sm btn-warning btn mx-1"
                    @click="edit_setting(item)"
                  >
                    แก้ไข</button
                  ><button
                    class="btn-sm btn-danger btn"
                    @click="delete_setting(item)"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- edit  -->
        <b-modal
          id="modal-edit"
          centered
          size="md"
          hide-header-close
          title="แก้ไขการตั้งค่า Config"
          hide-footer
          ><form>
            <div class="card_config">
              <div class="input_form">
                <span class="px-2 text_modal">สายงาน : </span>
                <b-input type="text" v-model="dataModal.configName" />
              </div>
              <div class="input_form">
                <span class="px-2 text_modal">
                  bonusจากยอดฝากของเพื่อน(%) :
                </span>
                <div>
                  <b-input type="number" v-model="dataModal.dp_bonus" />
                </div>
              </div>
              <div class="input_form">
                <span class="px-2 text_modal">ประเภท : </span>
                <b-form-select
                  type="number"
                  :options="type_obtion"
                  v-model="dataModal.dp_bonus_type"
                />
              </div>
              <div class="input_form">
                <span class="px-2 text_modal"
                  >bonusจากยอดเสียของเพื่อน(%) :
                </span>
                <div>
                  <b-input type="number" v-model="dataModal.winlos_rate" />
                </div>
              </div>

              <div class="input_form">
                <span class="px-2 text_modal"
                  >bonusจากturnoverของเพื่อน(%) :
                </span>
                <div>
                  <b-input type="number" v-model="dataModal.commission_rate" />
                </div>
              </div>
              <div class="input_form">
                <span class="px-2 text_modal">การรับรายได้ : </span>
                <b-form-select
                  type="number"
                  :options="type_recieve"
                  v-model="dataModal.recieve_mode"
                />
              </div>
              <div class="input_form">
                <span class="px-2 text_modal">สถานะ : </span>
                <div>
                  <span v-if="dataModal.status == '1'"
                    ><button class="btn btn-outline-success btn-sm" disabled>
                      ใช้งาน
                    </button>
                  </span>
                  <span v-if="dataModal.status == '0'"
                    ><button class="btn btn-outline-danger btn-sm" disabled>
                      ปิดใช้งาน
                    </button>
                  </span>
                </div>
              </div>

              <div class="input_form">
                <span class="px-2 text_modal">วันที่สร้าง: </span>
                <div>
                  {{ dataModal.updated_at }}
                </div>
              </div>
            </div>
            <div class="text-center">
              <button
                class="btn btn-primary btn-md"
                @click="editconfig(dataModal)"
              >
                เเก้ไข
              </button>
              <button
                class="btn btn-danger btn-md"
                @click="$bvModal.hide('modal-edit')"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </b-modal>
        <!-- edit  -->
        <!-- create  -->
        <b-modal
          id="modal-create"
          centered
          size="md"
          hide-header-close
          title="สร้างการตั้งค่า Config"
          hide-footer
          ><form>
            <div class="card_config">
              <div class="input_form">
                <span class="px-2 text_modal">สายงาน : </span>
                <!-- <b-form-select
                  type="text"
                  :options="type_line"
                  v-model="dataCreate.line"
                /> -->
                <b-input type="text" v-model="dataCreate.line" />
              </div>
              <div class="input_form">
                <span class="px-2 text_modal">
                  bonusจากยอดฝากของเพื่อน(%) :
                </span>
                <div>
                  <b-input type="number" v-model="dataCreate.bonusFriend" />
                </div>
              </div>
              <div class="input_form">
                <span class="px-2 text_modal">ประเภท : </span>
                <b-form-select
                  type="number"
                  :options="type_obtion"
                  v-model="dataCreate.datatype"
                />
              </div>
              <div class="input_form">
                <span class="px-2 text_modal"
                  >bonusจากยอดเสียของเพื่อน(%) :
                </span>
                <div>
                  <b-input type="number" v-model="dataCreate.bonusloss" />
                </div>
              </div>

              <div class="input_form">
                <span class="px-2 text_modal"
                  >bonusจากturnoverของเพื่อน(%) :
                </span>
                <div>
                  <b-input type="number" v-model="dataCreate.bonusCommission" />
                </div>
              </div>
              <div class="input_form">
                <span class="px-2 text_modal">การรับรายได้ : </span>
                <b-form-select
                  type="number"
                  :options="type_recieve"
                  v-model="dataCreate.type_recieve"
                />
              </div>
            </div>
            <div class="text-center">
              <button class="btn btn-primary btn-md" @click="createconfig()">
                เเก้ไข
              </button>
              <button
                class="btn btn-danger btn-md"
                @click="$bvModal.hide('modal-create')"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </b-modal>
      </div>
      <!-- create  -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      companyname: "membertest",
      agent: "membertest",
      hash: "membertest",
      username: "bk2619016",
      type_recieve: ["รายวัน", "รายเดือน", "รายสัปดาห์"],
      type_line: ["A", "B"],
      type_obtion: ["ครั้งแรก", "ทุกยอดฝาก"],
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
          winlos_rate: 8,
        },
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
        create_by: "",
      },
      settingList: [
        {
          Id: "1358c0f0-06b6-4b76-be61-2ea5b0bcdd26",
          companyname: "membertest",
          agent: "membertest",
          hash: "membertest",
          status: "string",
          configName: "config_mock_17",
          dp_bonus: 2,
          dp_bonus_type: 0,
          commission_rate: 10,
          winlos_rate: 4,
          recieve_mode: 3,
          enable: true,
          created_at: "2021-11-24T21:49:44.956Z",
          created_by: "",
        },
      ],
    };
  },
  methods: {
    search() {
      fetch(
        `http://localhost:3001/api/aff/member/setting/${this.hash}/${this.username}`
      )
        .then((stream) => stream.json())
        .then((data) => (this.dataRender = [data.settings]))
        .catch((error) => console.error(error));
    },
    edit_setting(data) {
      console.log(data);
      this.dataModal = data;
      this.$bvModal.show("modal-edit");
    },
    async editconfig(item) {
      item.dp_bonus = parseInt(item.dp_bonus);
      item.dp_bonus_type = parseInt(item.dp_bonus_type);
      item.commission_rate = parseInt(item.commission_rate);
      item.winlos_rate = parseInt(item.winlos_rate);
      item.recieve_mode = parseInt(item.recieve_mode);
      await this.$axios
        .patch(`http://localhost:3001/api/aff/admin/setting/${item.Id}`, item)
        .then(async (res) => {
          await this.getByHash(this.hash);
          this.$bvModal.hide("modal-edit");
        })
        .catch(function (error) {
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
          created_by: this.username,
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getddlDepositBonusType() {
      fetch(`http://localhost:3001/api/aff/admin/setting/depositBonus_Type`)
        .then((stream) => stream.json())
        .then((data) => (this.type_obtion = data))
        .catch((error) => console.error(error));
    },
    async getddlRecieve_mode() {
      fetch(`http://localhost:3001/api/aff/admin/setting/recieve_mode`)
        .then((stream) => stream.json())
        .then((data) => (this.type_recieve = data))
        .catch((error) => console.error(error));
    },
    async getByHash(hash) {
      fetch(`http://localhost:3001/api/aff/admin/setting/all/${hash}`)
        .then((stream) => stream.json())
        .then((data) => (this.settingList = data))
        .catch((error) => console.error(error));
    },
    async delete_setting(setting) {
      await this.$axios
        .delete(`http://localhost:3001/api/aff/admin/setting/${setting.Id}`)
        .then(async (response) => {
          await this.getByHash(this.hash);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted: async function () {
    await this.getddlRecieve_mode();
    await this.getddlDepositBonusType();
    await this.getByHash(this.hash);
  },
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
#modal-create___BV_modal_header_.modal-header {
  background: linear-gradient(
    to bottom right,
    #111111 0%,
    #002952 100%
  ) !important;
  color: rgb(255, 255, 255);
}
#modal-___BV_modal_header_.modal-header {
  background: linear-gradient(
    to bottom right,
    #111111 0%,
    #002952 100%
  ) !important;
  color: rgb(255, 255, 255);
}
.input_form {
  display: flex;
  align-items: baseline;
  padding: 5px;
  .text_modal {
    color: #180052;
    font-weight: bold;
  }
}
.card_config {
  padding: 10px;
  input,
  select {
    padding: 0;
    margin: 0px 0px;
    border: none;
    border-bottom: 1px solid #aeaeae;
    text-align: center;
    border-radius: 0;
    width: 180px;
    font-style: oblique;
    color: blue;
  }
  .form-control:focus {
    color: #495057;
    background-color: #fff;
    /* border-color: #80bdff; */
    text-align: center;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(255 255 255 / 25%);
  }
}
</style>
