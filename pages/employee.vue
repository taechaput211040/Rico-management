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
                v-model="createAccount.password"
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
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
            <v-col cols="6" sm="4">
              <span class="font-weight-bold">สถานะ</span>
              <v-switch
                hide-details="auto"
                v-model="createAccount.status"
              ></v-switch>
            </v-col>
            <v-col cols="6" sm="4">
              <span class="font-weight-bold">ลิมิตการเติมเครดิต</span>
              <v-switch
                hide-details="auto"
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
            <v-card class="pa-3 mt-3 ">
              <v-card-title>
                <h4 class="purple--text">ตั้งค่าการเข้าถึงเมนู</h4>
              </v-card-title>
              <v-list>
                <v-list-item-group multiple>
                  <v-list dense class="red_list">
                    <div v-for="(link, i) in group" :key="i">
                      <v-list-item
                        v-if="!link.subLinks"
                        class="v-list-item font-weight-bold "
                        style="padding-left: 25px;"
                      >
                        <v-list-item-action>
                          <v-checkbox
                            v-model="link.status"
                            color="deep-purple accent-4"
                          ></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-title class="" v-text="link.title" />
                      </v-list-item>

                      <v-list-group
                        group
                        sub-group
                        active-class=" deep-purple--text"
                        v-else
                        :key="link.title"
                        :value="false"
                      >
                        <template v-slot:activator>
                          <v-list-item-action class="">
                            <v-checkbox
                              v-model="link.status"
                              color="deep-purple accent-4"
                            ></v-checkbox>
                          </v-list-item-action>
                          <v-list-item-title
                            class=" h1 d-flex"
                            style="margin-left: 31px;"
                            >{{ link.title }}<v-spacer></v-spacer>
                            <v-icon>mdi-menu-down</v-icon></v-list-item-title
                          >
                        </template>

                        <v-list-item
                          v-for="sublink in link.subLinks"
                          :key="sublink.text"
                        >
                          <v-list-item-action>
                            <v-checkbox
                              v-model="sublink.status"
                              color="deep-purple accent-4"
                            ></v-checkbox>
                          </v-list-item-action>
                          <v-list-item-title v-text="sublink.text" />
                        </v-list-item>
                      </v-list-group>
                    </div>
                  </v-list>
                </v-list-item-group>
              </v-list>
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
      createEmployee: true,
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
        password: ""
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
    ...mapActions("setting", ["getEmployee", "DeleteUser", "createUser"]),
    openDialog() {
      this.createEmployee = true;
      this.dlemployee = true;
    },
    async CreateEmployee() {
      await this.createUser(this.createAccount)
      console.log(this.createAccount, "create");
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
