<template>
  <v-flex>
    <h3 class="mb-4">พนักงาน</h3>
    <v-card class="elevation-4 mt-5 rounded-lg" width="100%">
      <div class="pa-3 font-weight-bold">
        <v-btn color="primary" small @click="openDialog()">เพิ่มพนักงาน</v-btn>
      </div>
      <v-card width="100%" class="elevation-4 rounded-lg">
        <v-data-table
          :headers="employeeHeader"
          :items="employee"
          hide-default-footer
          disable-pagination
        >
          <template #[`item.no`]="{index}">
            <span class="font-weight-bold">
              {{ index + 1 }}
            </span>
          </template>
          <template #[`item.action`]="{item}">
            <div class="text-center d-flex justify-center">
              <v-btn
                color="black"
                class="mx-1"
                dark
                small
                @click="editEmployee(item)"
                ><v-icon left small>mdi-cog</v-icon>แก้ไข</v-btn
              >
              <v-btn color="error" dark small @click="deleteUser(item)"
                ><v-icon left small>mdi-delete</v-icon>ลบ</v-btn
              >
            </div>
          </template>
          <template #[`item.position`]="{item}">
            <span v-if="item.is_admin == true">ADMIN</span>
            <span v-else>STAFF</span>
          </template>
          <template #[`item.created_at`]="{item}">
            <div class="pa-2">{{ item.created_at | dateFormat }}</div>
          </template>
          <template #[`item.status`]="{item}">
            <v-chip
              color="success"
              small
              outlined
              dark
              v-if="item.status == true"
            >
              <v-icon left small>mdi-circle</v-icon>
              เปิดใช้งาน
            </v-chip>
            <v-chip color="error" small outlined dark v-else>
              <v-icon left small>mdi-circle</v-icon>
              ปิดใช้งาน
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
    </v-card>
    <!--createdialog -->
    <v-dialog v-model="dlemployee" max-width="800px" height="auto">
      <v-card class="pa-5 ">
        <v-form ref="formCreate">
          <v-card-title>
            <h4 class="font-weight-bold mx-auto  primary--text">
              {{ createEmployee ? `เพิ่ม` : `แก้ไข` }}พนักงาน
            </h4></v-card-title
          >

          <v-row class="py-3">
            <v-col cols="12" sm="6">
              <span class="font-weight-bold">ชื่อ-นามสกุล</span>
              <v-text-field
                required
                placeholder="ชื่อ-นามสกุล"
                dense
                :rules="[v => !!v || 'กรุณากรอกชื่อ นามสกุล']"
                v-model="createAccount.name"
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <span class="font-weight-bold">เบอร์โทรศัพท์</span>
              <v-text-field
                required
                placeholder="กรอกเบอร์โทรศัพท์"
                dense
                :rules="[
                  v => !!v || 'กรุณากรอกเบอร์มือถือ',
                  v =>
                    (v && v.length >= 10 && v.length < 16) ||
                    'กรุณากรอก กรุณากรอกเบอร์มือถือ 10 ถึง 15 ตัว'
                ]"
                v-model="createAccount.phone"
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <span class="font-weight-bold">Username</span>
              <v-text-field
                required
                placeholder="กรอก Username"
                v-model="createAccount.username"
                dense
                :rules="[v => !!v || 'กรุณากรอก Username']"
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <span class="font-weight-bold">Password</span>
              <v-text-field
                required
                placeholder="กรอก Password"
                dense
                :rules="[v => !!v || 'กรุณากรอก Password ']"
                v-model="createAccount.password"
                prepend-inner-icon="mdi-lock"
                :type="hidden ? 'password' : 'text'"
                @click:append="() => (hidden = !hidden)"
                :append-icon="hidden ? 'mdi-eye' : 'mdi-eye-off'"
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <span class="font-weight-bold">เลือกตำแหน่ง</span>
              <v-radio-group
                class="py-2"
                hide-details="auto"
                v-model="createAccount.is_admin"
              >
                <v-radio label="ADMIN" :value="true"></v-radio>
                <v-radio label="STAFF" :value="false"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="6" sm="3">
              <span class="font-weight-bold">สถานะ</span>
              <v-switch
                hide-details="auto"
                :label="`${createAccount.status ? 'เปิด' : 'ปิด'}`"
                v-model="createAccount.status"
              ></v-switch>
            </v-col>
            <v-col cols="6" sm="3">
              <span class="font-weight-bold">ยืนยันตัวตน 2 ชั้น</span>
              <v-switch
                hide-details="auto"
                :label="`${createAccount.tfa_status ? 'เปิด' : 'ปิด'}`"
                v-model="createAccount.tfa_status"
              ></v-switch>
            </v-col>
            <v-col cols="6" sm="3">
              <span class="font-weight-bold">ลิมิตการเติมเครดิต</span>
              <v-switch
                hide-details="auto"
                :label="`${createAccount.limittopup ? 'เปิด' : 'ปิด'}`"
                v-model="createAccount.limittopup"
              ></v-switch>
            </v-col>
            <v-col cols="12" sm="12" v-show="createAccount.limittopup == true">
              <span class="font-weight-bold">เครดิตที่เติมได้ต่อวัน</span>
              <v-text-field
                required
                type="number"
                dense
                v-model="createAccount.creditperday"
                outlined
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="customlist">
            <v-card class="mt-3">
              <v-card-title>
                <h4 class="purple--text">ตั้งค่าการเข้าถึงเมนู</h4>
              </v-card-title>
              <v-data-table
                class="elevation-2"
                :headers="List"
                :items="item_menu"
                hide-default-footer
                disable-pagination
              >
                <template #[`item.title`]="{item}">
                  <div class="pa-2">{{ item.title }}</div>
                </template>
                <template #[`header.read`]>
                  <v-checkbox
                    hide-details="auto"
                    v-model="selectedReadAll"
                    label="ดู"
                    :value="
                      selected.filter(x => x.endsWith('_read')).length > 0
                    "
                    :indeterminate="
                      selected.filter(x => x.endsWith('_read')).length > 0 &&
                        selected.filter(x => x.endsWith('_read')).length <
                          item_menu.length
                    "
                    @change="
                      handleReadAllPermission(selectedReadAll, item_menu)
                    "
                  ></v-checkbox>
                </template>
                <template #[`header.write`]>
                  <v-checkbox
                    v-model="selectedWriteAll"
                    hide-details="auto"
                    label="แก้ไข"
                    :value="
                      selected.filter(x => x.endsWith('_write')).length > 0
                    "
                    :indeterminate="
                      selected.filter(x => x.endsWith('_write')).length > 0 &&
                        selected.filter(x => x.endsWith('_write')).length <
                          item_menu.length
                    "
                    @change="
                      handleWriteAllPermission(selectedWriteAll, item_menu)
                    "
                  >
                  </v-checkbox>
                </template>
                <template #[`item.read`]="{ item }">
                  <div class="px-4">
                    <v-checkbox
                      hide-details="auto"
                      v-model="selected"
                      :value="`${item.menu}_read`"
                      @change="handleReadPermission(`${item.menu}_read`)"
                    ></v-checkbox>
                  </div>
                </template>
                <template #[`item.write`]="{ item }">
                  <div class="px-4">
                    <v-checkbox
                      hide-details="auto"
                      v-model="selected"
                      :value="`${item.menu}_write`"
                      @change="handleWritePermission(`${item.menu}_write`)"
                    ></v-checkbox>
                  </div>
                </template>
              </v-data-table>
            </v-card>
          </div>

          <v-card-actions>
            <div class="mx-auto">
              <v-btn color="primary" @click="CreateEmployee"
                >เพิ่มพนักงาน</v-btn
              >
              <v-btn color="error" @click.stop="close()">ยกเลิก</v-btn>
            </div>
          </v-card-actions></v-form
        >
      </v-card>
    </v-dialog>
    <!-- createdialog -->
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
export default {
  watch: {},
  data() {
    return {
      hidden: String,
      List: [
        {
          text: "Menu",
          value: "title",
          sortable: false
        },
        {
          text: "View",
          value: "read",
          sortable: false,
          align: "center"
        },
        {
          text: "Edit",
          value: "write",
          sortable: false,
          align: "center"
        }
      ],
      selected: [],
      selectedReadAll: false,
      selectedWriteAll: false,
      createEmployee: true,
      item_menu: this.$store.state.menu,
      group: this.$store.state.menu,
      modellist: [],
      seletstatus: [],
      changepass: false,
      editAccount: {},
      createAccount: {
        creditperday: 0,
        is_admin: false,
        limittopup: false,
        name: "",
        phone: "",
        status: false,
        username: "",
        password: "",
        tfa_status: false
      },
      dledit: false,
      dlemployee: false,
      employeeHeader: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "50px"
        },
        {
          text: "ชื่อ",
          value: "name",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold"
        },
        {
          text: "เบอร์โทรศัพท์",
          value: "phone",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "USERNAME",
          value: "username",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold primary--text"
        },
        {
          text: "ระดับพนักงาน",
          value: "position",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold error--text"
        },
        {
          text: "สถานะ",
          value: "status",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "สร้างโดย",
          value: "operator",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เมื่อ",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "การดำเนินการ",
          value: "action",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        }
      ],
      employee: []
    };
  },

  async fetch() {
    try {
      let response = await this.getEmployee();
      this.employee = response.data.filter(x => {
        return x.s_admin == false;
      });
      console.log(this.employee, "agentUser");
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    handleReadPermission(value) {
      const item = value.split("_");
      this.selected = this.selected.filter(
        selected => selected != `${item[0]}_write`
      );
    },
    handleWritePermission(value) {
      const item = value.split("_");
      if (
        this.selected.findIndex(selected => selected == `${item[0]}_read`) < 0
      ) {
        this.selected.push(`${item[0]}_read`);
      }
    },
    handleReadAllPermission(state, items) {
      if (state) {
        this.selected = items.map(item => {
          return `${item.menu}_read`;
        });
      } else {
        this.selected = [];
      }
    },
    handleWriteAllPermission(state, items) {
      if (state) {
        this.selected = items
          .map(item => {
            return [`${item.menu}_read`, `${item.menu}_write`];
          })
          .reduce((prev, curr) => [...prev, ...curr], []);
      } else {
        this.selected = this.selected.filter(
          selected => !selected.endsWith("_write")
        );
      }
    },
    ...mapActions("setting", ["getEmployee", "DeleteUser", "createUser"]),
    openDialog() {
      this.createEmployee = true;
      this.dlemployee = true;
    },
    async CreateEmployee() {
      if (this.$refs.formCreate.validate()) {
        let body = {
          ...this.createAccount,
          operator: this.$store.state.auth.user,
          company: this.$store.state.auth.company,
          agent: this.$store.state.auth.agent,
          menu_permission: this.selected
        };

        this.$swal({
          title: `ยืนยันการสร้างพนักงาน?`,
          icon: "question",
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "สร้างพนักงาน",
          cancelButtonText: "ยกเลิก"
        }).then(async result => {
          if (result.isConfirmed) {
            try {
              await this.createUser(body);
              this.$swal({
                icon: "success",
                title: "สร้างสำเร็จ",
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 1500
              }).then(async result => {
                this.dlemployee = false;
                if (result) {
                  await this.$fetch();
                }
              });
            } catch (error) {
              console.log(error);
            }
          }
        });
      }
    },
    editEmployee(item) {
      this.createEmployee = false;
      this.dlemployee = true;
      this.createAccount = Object.assign({}, item);
    },
    close() {
      this.dlemployee = false;
      this.$refs.formCreate.reset();
    },
    async deleteUser(item) {
      try {
        this.$swal({
          title: `ต้องการลบพนักงาน<br/>  username : ${item.username}<br/> ใช่หรือไม่ ?`,
          icon: "question",
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ลบ",
          cancelButtonText: "ยกเลิก"
        }).then(async result => {
          if (result.isConfirmed) {
            // console.log(this.formCreate)
            try {
              await this.DeleteUser(item.id);
              this.$swal({
                icon: "success",
                title: "ลบสำเร็จแล้ว",
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 1500
              }).then(async result => {
                if (result) {
                  await this.$fetch();
                }
              });
            } catch (error) {}
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss">
.customlist {
  .v-list-item__icon {
    display: none !important;
  }
}

.customlist .v-list-item__action {
  padding-right: 0px !important ;
}
</style>
