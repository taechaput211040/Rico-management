<template>
  <v-flex>
    <loading-page v-if="isLoading"></loading-page>
    <h3 class="mb-4">ธนาคารของเว็บ</h3>
    <v-card class="elevation-3 rounded-lg">
      <div class="pa-3 font-weight-bold">
        <v-btn
          color="primary"
          small
          @click="dlcreate = true"
          :disabled="canwrite"
          >เพิ่มธนาคาร</v-btn
        >
      </div>
      <v-card width="100%" class="elevation-4 rounded-lg">
        <v-data-table
          :headers="bankHeader"
          :items="dataBank"
          hide-default-footer
          disable-pagination
        >
          <template #[`item.status`]="{ item }">
            <v-chip
              color="success"
              label
              outlined
              dark
              small
              v-if="item.status == true"
            >
              <v-icon left small>mdi-circle</v-icon>
              เปิดใช้งาน
            </v-chip>
            <v-chip color="error" small label outlined dark v-else>
              <v-icon left small>mdi-circle</v-icon>
              ปิดใช้งาน
            </v-chip>
          </template>
          <template #[`item.mode`]="{ item }">
            <div class="pt-2" v-if="item.mode == 2">
              <v-chip color="red" small label outlined dark >
                <v-icon left small>mdi-circle</v-icon>
                API
              </v-chip>
            </div>
            <div class="pt-2" v-if="item.mode == 0 && item.Companybank != 'TRUEWALLET'">
              <v-chip color="green" small label outlined dark >
                <v-icon left small>mdi-circle</v-icon>
                SMS
              </v-chip>
            </div>
            <div class="pt-2" v-if="item.mode == 0 && item.Companybank == 'TRUEWALLET'">
              <v-chip color="blue" small label outlined dark >
                <v-icon left small>mdi-circle</v-icon>
                NOTI
              </v-chip>
            </div>
          </template>
          <template #[`item.Companybank`]="{ item }">
            <div class="pt-2">
              <img-bank :value="item.Companybank"></img-bank>
            </div>
          </template>
          <template #[`item.no`]="{ index }">
            <span class="font-weight-bold">
              {{ index + 1 }}
            </span>
          </template>
          <template #[`item.type`]="{ item }">
            <v-chip
              color="yellow"
              v-if="item.type == true"
              class="font-weight-bold"
            >
              ถอน
            </v-chip>

            <v-chip dark color="primary" v-else class="font-weight-bold">
              ฝาก
            </v-chip>
          </template>
          <template #[`item.action`]="{ item }">
            <div class="text-center d-flex justify-center">
              <v-btn
                color="black"
                class="mx-1"
                dark
                small
                :disabled="canwrite"
                @click="updateBank(item)"
                ><v-icon left>mdi-cog</v-icon>แก้ไข</v-btn
              >
              <v-btn
                color="error"
                :disabled="canwrite"
                dark
                small
                @click="deleteBank(item)"
                ><v-icon left>mdi-delete</v-icon>ลบ</v-btn
              >
            </div>
          </template>

          <template #[`item.visibletomember`]="{ item }">
            <span
              v-if="item.type == true && item.visibletomember == false"
              class="font-weight-bold"
              >-</span
            >
            <span
              v-else-if="item.type == false && item.visibletomember == true"
              class="font-weight-bold"
              ><v-btn
                :disabled="canwrite"
                color="success"
                small
                @click="touglestatus(item)"
                >เปิดการมองเห็น</v-btn
              ></span
            >
            <span v-else class="font-weight-bold"
              ><v-btn
                :disabled="canwrite"
                color="grey"
                dark
                @click="touglestatus(item)"
                small
                >ปิดการมองเห็น</v-btn
              ></span
            >
          </template>
        </v-data-table></v-card
      >
    </v-card>
    <!-- create -->
    <v-dialog v-model="dlcreate" max-width="800px" height="auto">
      <v-card class="pa-5">
        <v-card-title>
          <h3 class="font-weight-bold mx-auto primary--text">
            เพิ่มบัญชีธนาคาร
          </h3>
        </v-card-title>
        <v-divider class="py-2"></v-divider>
        <v-row>
          <v-col cols="12" sm="4"
            >ประเภทธนาคาร
            <v-select
              v-model="createBank.type"
              required
              dense
              :items="typebank"
              outlined
              placeholder="เลือกประเภท"
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4"
            >เลือกธนาคาร

            <v-select
            v-if="createBank.type == false"
              required
              :items="bank_options"
              v-model="createBank.Companybank"
              dense
              hide-details="auto"
              placeholder="กรุณาเลือกธนาคาร"
              outlined
            ></v-select>
            <v-select
            v-if="createBank.type == true"
            required
            :items="bank_options_wd"
            v-model="createBank.Companybank"
            dense
            hide-details="auto"
            placeholder="กรุณาเลือกธนาคาร"
            outlined
          ></v-select>
          </v-col>
          <v-col cols="12" sm="4"
            >เลขบัญชี**
            <v-text-field
              required
              v-model="createBank.Companybankacountnumber"
              placeholder="กรุณาใส่เลขบัญชี"
              dense
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4"
            >ฃื่อบัญชี *
            <v-text-field
              required
              v-model="createBank.Companybankname"
              dense
              placeholder="กรุณาใส่ฃื่อบัญชี"
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4">
            เปิดใช้งาน
            <v-switch v-model="createBank.status"></v-switch>
          </v-col>
          <v-col cols="6" sm="4"
            >การมองเห็นของสมาชิก
            <v-switch v-model="createBank.visibletomember"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" v-show="createBank.Companybank == 'SCB'"
            >LOGIN NAME
            <v-text-field
              required
              dense
              hide-details="auto"
              placeholder="กรุณาใส่username"
              outlined
              v-model="createBank.loginname"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" v-show="createBank.Companybank == 'SCB'"
            >PASSWORD
            <v-text-field
              required
              dense
              placeholder="กรุณาใส่Password"
              v-model="createBank.password"
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6"
            >เบอร์โทรศัพท์ที่เชื่อมต่อกับบัญชี
            <v-text-field
              required
              dense
              placeholder="กรุณาใส่เบอร์โทรศัพท์"
              v-model="createBank.phone"
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" v-if="createBank.Companybank == 'SCB'"
            >โหมดการใช้งาน
            <div class="d-flex mt-3">
              <v-radio-group
                v-model.number="createBank.mode"
                hide-details="auto"
                row
              >
                <v-radio label="SMS" :value="0"></v-radio>
                <v-radio label="SCB API" :value="2"></v-radio>
                <v-radio label="SCB web" disabled :value="1"></v-radio>
              </v-radio-group>
            </div>
          </v-col>
          <v-col cols="12" sm="6" v-if="createBank.Companybank == 'TRUEWALLET'"
          >โหมดการใช้งาน
          <div class="d-flex mt-3">
            <v-radio-group
              v-model.number="createBank.mode"
              hide-details="auto"
              row
            >
              <v-radio label="SMS" :value="0"></v-radio>
              <v-radio label="TRUE API" :value="2"></v-radio>
            </v-radio-group>
          </div>
        </v-col>
        </v-row>
        
        <v-card-actions class="mt-5">
          <div class="mx-auto">
            <v-btn color="primary" @click="submitCreateBank" class="mx-1"
              >บันทึก</v-btn
            >
            <v-btn color="error" class="mx-1" @click="dlcreate = false"
              >ปิด</v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- create -->
    <!-- edit -->
    <v-dialog v-model="dlupdate" max-width="800px" height="auto">
      <v-card class="pa-5">
        <v-card-title>
          <h3 class="font-weight-bold mx-auto primary--text">
            แก้ไขบัญชีธนาคาร
          </h3>
        </v-card-title>
        <v-divider class="py-2"></v-divider>
        <v-form ref="EditBank">
          <v-row>
            <v-col cols="12" sm="4"
              >ประเภทธนาคาร
              <v-select
                v-model="createBank.type"
                required
                dense
                :items="typebank"
                outlined
                placeholder="เลือกประเภท"
                hide-details="auto"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4"
              >เลือกธนาคาร

              <v-select
              v-if="createBank.type == false"
                required
                :items="bank_options"
                v-model="createBank.Companybank"
                dense
                hide-details="auto"
                placeholder="กรุณาเลือกธนาคาร"
                outlined
              ></v-select>
              <v-select
              v-if="createBank.type == true"
              required
              :items="bank_options_wd"
              v-model="createBank.Companybank"
              dense
              hide-details="auto"
              placeholder="กรุณาเลือกธนาคาร"
              outlined
            ></v-select>
            </v-col>
            <v-col cols="12" sm="4"
              >เลขบัญชี**
              <v-text-field
                required
                v-model="createBank.Companybankacountnumber"
                placeholder="กรุณาใส่เลขบัญชี"
                dense
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4"
              >ฃื่อบัญชี *
              <v-text-field
                required
                v-model="createBank.Companybankname"
                dense
                placeholder="กรุณาใส่ฃื่อบัญชี"
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="4">
              เปิดใช้งาน
              <v-switch v-model="createBank.status"></v-switch>
            </v-col>
            <v-col cols="6" sm="4"
              >การมองเห็นของสมาชิก
              <v-switch v-model="createBank.visibletomember"></v-switch>
            </v-col>
            <v-col cols="12" sm="6" v-show="createBank.Companybank == 'SCB'"
              >LOGIN NAME
              <v-text-field
                required
                dense
                hide-details="auto"
                placeholder="กรุณาใส่username"
                outlined
                v-model="createBank.loginname"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" v-show="createBank.Companybank == 'SCB'"
              >PASSWORD
              <v-text-field
                required
                dense
                placeholder="กรุณาใส่Password"
                v-model="createBank.password"
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6"
              >เบอร์โทรศัพท์ที่เชื่อมต่อกับบัญชี
              <v-text-field
                required
                dense
                placeholder="กรุณาใส่เบอร์โทรศัพท์"
                v-model="createBank.phone"
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" v-if="createBank.Companybank == 'SCB'"
              >โหมดการใช้งาน
              <div class="d-flex mt-3">
                <v-radio-group
                  v-model.number="createBank.mode"
                  hide-details="auto"
                  row
                >
                  <v-radio label="SMS" :value="0"></v-radio>
                  <v-radio label="SCB API" :value="2"></v-radio>
                  <v-radio label="SCB web" disabled :value="1"></v-radio>
                </v-radio-group>
              </div>
            </v-col>
            <v-col cols="12" sm="6" v-if="createBank.Companybank == 'TRUEWALLET'"
            >โหมดการใช้งาน
            <div class="d-flex mt-3">
              <v-radio-group
                v-model.number="createBank.mode"
                hide-details="auto"
                row
              >
                <v-radio label="SMS" :value="0"></v-radio>
                <v-radio label="TRUE API" :value="2"></v-radio>
              </v-radio-group>
            </div>
          </v-col>
          </v-row>
          <div id="sectionTRUEAPI" class="mt-2" v-if="createBank.Companybank == 'TRUEWALLET' && createBank.mode ==2 && createBank.type == false">
            <div class="elevation-2 rounded-lg pa-2">
              <h3 class="mt-3">ลงทะเบียน TRUE API</h3>
              <p>ยอดฝากต่อเดือนมากกว่า 100 รายการเท่านั้น ติดต่อสอบถามรายละเอียดการใช้งานได้ที่เจ้าหน้าที่</p>
              <div class="row">
                <div class="col-12 ">
                  WEBHOOK LINK
                  <div ref="copytext" id="texttoCopoy">
                    {{ webhookURL+'/'+createBank.Companybankacountnumber}} 
                </div>
                  <v-btn class="mt-3" small color="black white--text" @click="copyCode()">คัดลอก webhook</v-btn>
                </div>
              
            
                <div class="col-12 col-sm-6">
                 SECRET 
                  <v-text-field
                  v-model="createBank.secret"
                    dense
                    label="secret ที่ได้ หลังจากนำ ลิ้ง webhook ไป verify"
                    outlined
                    hide-details="auto"
                  ></v-text-field>
                </div>
              </div>
              <v-card-actions class="justify-end">
                <v-spacer></v-spacer
                ><v-btn small color="black white--text" @click="saveTrueSecret">บันทึก secret</v-btn>
              </v-card-actions>
            </div>
          </div> 
          <v-card-actions class="mt-5">
            <div class="mx-auto">
              <v-btn color="primary" @click="SubmitEditBank" class="mx-1"
                >บันทึก</v-btn
              >
              <v-btn color="error" class="mx-1" @click="dlupdate = false"
                >ปิด</v-btn
              >
            </div>
          </v-card-actions>
        
        </v-form>
      </v-card>
    </v-dialog>
    <!-- edit -->
  </v-flex>
</template>

<script>
import { mapActions, mapState } from "vuex";
import dayjs from "dayjs";

export default {

  data() {
    return {
      isLoading: false,
      modalOtp: false,
      modalSelectnumber: false,
      formScb: {},
      allSetting: {},
      updateitem: {},
      typebank: [
        { value: false, text: "ฝาก" },
        { value: true, text: "ถอน" },
      ],
      bank_options: [
        { value: "SCB", text: "SCB - ธนาคารไทยพานิชย์" },
        { value: "KBANK", text: "KBANK - ธนาคารกสิกรไทย" },
        { value: "TRUEWALLET", text: "TRUEMONEY - ทรูวอลเลท" },
      ],
      bank_options_wd: [
        { value: "SCB", text: "SCB - ธนาคารไทยพานิชย์" },
      ],
      createBank: {
        Companybank: "SCB",
        Companybankacountnumber: "",
        Companybankname: "",
        visibletomember: true,
        balance: 0,
        balanceupdatetime: "",
        status: true,
        type: false,
        loginname: "",
        password: "",
        companyAccref: "",
        updateBy: "",
        createBy: "",
        true_api_status: false,
        mode: 0,
      },
      dlupdate: false,
      dlcreate: false,
      dataBank: [],
      bankHeader: [
        {
          text: "สถานะ",
          value: "status",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "MODE",
          value: "mode",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "ธนาคาร",
          value: "Companybank",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "ชื่อบัญชี",
          value: "Companybankname",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "เลขบัญชี / เบอร์โทรศัพท์",
          value: "Companybankacountnumber",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "ประเภท",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "เปิดให้สมาชิกเห็น",
          value: "visibletomember",
          align: "center",
          sortable: false,
        },
        {
          text: "การดำเนินการ",
          value: "action",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
      ],
    };
  },
  
  async fetch() {
    try {
      let { data } = await this.getCompanybank();
      this.dataBank = data;
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    ...mapState("auth", ["menu"]),
    ...mapState("setting", ["webhookURL"]),
    canwrite() {
      if (this.menu) {
        if (!this.menu.includes("companyBank_write")) return true;
        else return false;
      }
    },
  },
  async mounted() {
    let setting = await this.getSetting();
    console.log("setting", setting);
    this.allSetting = {
      companyName: setting.companyname,
      companyKey: setting.companykey,
      agentPrefixCode: setting.agent_username,
      hash: setting.hash,
    };
  },
  methods: {
    ...mapActions("setting", [
      "getCompanybank",
      "getBankByid",
      "createBankCompany",
      "EditBankCompany",
      "deleteBankCompany",
      "getSetting",
      "saveTrueAPISecret"
    ]),
    async saveTrueSecret(){
      if(!this.createBank.secret){
        this.$swal({
        title: `กรุณากรอก SECRET`,
        icon: "infomation",
 
        allowOutsideClick: true,
       
      })
      return
      }
      this.isLoading = true
      try {
        await this.saveTrueAPISecret(this.createBank)
        this.isLoading = false
        this.$swal({
        title: `บันทึกสำเร็จ`,
        icon: "success",
 
        allowOutsideClick: true,
       
      })
      } catch (error) {
        this.isLoading = false
      }

    },
    copyCode() {
      
      this.selectText(this.$refs.copytext); // e.g. <div ref="text">
      document.execCommand("copy");
    },
    selectText(element) {
      var range;
      if (document.selection) {
        // IE
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    },
    cancelFormScb() {
      console.log("cancel");
      this.formScb = {};
      this.modalOtp = false;
      this.modalSelectnumber = false;
    },
    async touglestatus(status) {
      this.createBank = status;
      if (this.createBank.Companybank != "SCB") {
        this.createBank.mode = 0;
      }
      this.createBank.updateBy = this.$store.state.auth.user;
      this.createBank.createBy = this.$store.state.auth.user;
      if (!this.createBank.secret) {
        this.createBank.secret = "";
      }
      this.Accref();
      status.visibletomember = !status.visibletomember;
      this.$swal({
        title: `${status.visibletomember ? "เปิด" : "ปิด"}การมองเห็น ?`,
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `${status.visibletomember ? "เปิด" : "ปิด"}`,
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.EditBankCompany(this.createBank);
            this.$swal({
              icon: "success",
              title: `${status.visibletomember ? "เปิด" : "ปิด"}การมองเห็นแล้ว`,
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 1500,
            }).then(async (result) => {
              this.dlupdate = false;
              if (result) {
                await this.$fetch();
              }
            });
          } catch (error) {
            console.log(error);
          }
        } else if (result.dismiss === this.$swal.DismissReason.cancel) {
          status.visibletomember = !status.visibletomember;
        }
      });
    },
    async SubmitEditBank() {
      // console.log(this.createBank)
      // if (this.createBank.Companybank != "SCB" || this.createBank.Companybank != "TRUEWALLET" ) {
      //   this.createBank.mode = 0;
      // }
      this.createBank.updateBy = this.$store.state.auth.user;
      this.createBank.createBy = this.$store.state.auth.user;
      // if (!this.createBank.secret) {
      //   this.createBank.secret = "";
      // }
      console.log(this.createBank)
      this.Accref();
      this.$swal({
        title: `บันทึกรายการ ?`,
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "สร้าง",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.EditBankCompany(this.createBank);
            this.$swal({
              icon: "success",
              title: "บันทึกสำเร็จ",
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 1500,
            }).then(async (result) => {
              this.dlupdate = false;
              if (result) {
                await this.$fetch();
              }
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    async submitCreateBank() {
      if (this.createBank.Companybank != "SCB" || this.createBank.Companybank != "TRUEWALLET" ) {
        this.createBank.mode = 0;
      }
      this.createBank.updateBy = this.$store.state.auth.user;
      this.createBank.createBy = this.$store.state.auth.user;
      if (!this.createBank.secret) {
        this.createBank.secret = "";
      }
      this.Accref();
      this.$swal({
        title: `เพิ่มรายชื่อธนาคารเว็บ ?`,
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "สร้าง",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let payload = {
            ...this.createBank,
            ...this.allSetting,
          };
          console.log(payload, "payload");
          try {
            await this.createBankCompany(payload);
            this.$swal({
              icon: "success",
              title: "สร้างสำเร็จ",
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 1500,
            }).then(async (result) => {
              this.dlcreate = false;
              if (result) {
                await this.$fetch();
              }
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    Accref() {
      if (this.createBank.Companybank == "SCB") {
        this.createBank.companyAccref =
          "X" + this.createBank.Companybankacountnumber.slice(4);
      }
      if (this.createBank.Companybank == "KBANK") {
        this.createBank.companyAccref =
          "X" + this.createBank.Companybankacountnumber.slice(3, 9) + "X";
      }
      if (this.createBank.Companybank == "TRUEWALLET") {
        this.createBank.companyAccref = this.createBank.Companybankacountnumber;
      }
    },
    async updateBank(item) {
      let { data } = await this.getBankByid(item.id);
      console.log(data, "item");
      this.createBank = {...data}
      this.dlupdate = true;
    },
    closeEdit() {
      this.dlupdate = false;
      this.$refs.EditBank.reset();
    },
    async deleteBank(item) {
      this.$swal({
        title: `ต้องการลบธนสคารหรือไม่ ?`,
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            let payload = {
              id: item.id,
              updateBy: this.$store.state.auth.name,
            };

            await this.deleteBankCompany(payload);
            this.$swal({
              icon: "success",
              title: "ลบเรียบร้อย",
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 1500,
            }).then(async (result) => {
              if (result) {
                await this.$fetch();
              }
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
  },
};
</script>

<style></style>
