<template>
  <v-flex>
    <h3 class="mb-4">ธนาคารของเว็บ</h3>
    <v-card class="elevation-3 rounded-lg ">
      <div class="pa-3 font-weight-bold">
        <v-btn color="primary" small @click="dlcreate = true"
          >เพิ่มธนาคาร</v-btn
        >
      </div>
      <v-card width="100%" class="elevation-4 rounded-lg">
        <v-data-table
          :headers="bankHeader"
          :items="dataBank"
          hide-default-footer
        >
          <template #[`item.status`]="{item}">
            <v-chip
              color="success"
              label
              outlined
              dark
              v-if="item.status == true"
            >
              <v-icon left>mdi-circle</v-icon>
              เปิดใช้งาน
            </v-chip>
            <v-chip color="error" label outlined dark v-else>
              <v-icon left>mdi-circle</v-icon>
              ปิดใช้งาน
            </v-chip>
          </template>
          <template #[`item.Companybank`]="{item}">
            <div class="pt-2">
              <img-bank :value="item.Companybank"></img-bank>
            </div>
          </template>
          <template #[`item.no`]="{index}">
            <span class="font-weight-bold">
              {{ index + 1 }}
            </span>
          </template>
          <template #[`item.type`]="{item}">
            <v-chip
              color="yellow"
              v-if="item.type == true"
              class="font-weight-bold "
            >
              ถอน
            </v-chip>

            <v-chip dark color="primary" v-else class="font-weight-bold ">
              ฝาก
            </v-chip>
          </template>
          <template #[`item.action`]="{item}">
            <div class="text-center d-flex justify-center">
              <v-btn
                color="black"
                class="mx-1"
                dark
                small
                @click="updateBank(item)"
                ><v-icon left>mdi-cog</v-icon>แก้ไข</v-btn
              >
              <v-btn color="error" dark small
                ><v-icon left>mdi-delete</v-icon>ลบ</v-btn
              >
            </div>
          </template>

          <template #[`item.visibletomember`]="{item}">
            <span
              v-if="item.type == true && item.visibletomember == false"
              class="font-weight-bold"
              >-</span
            >
            <span
              v-else-if="item.type == false && item.visibletomember == true"
              class="font-weight-bold"
              ><v-btn color="success" small @click="touglestatus(item)"
                >เปิดการมองเห็น</v-btn
              ></span
            >
            <span v-else class="font-weight-bold"
              ><v-btn color="grey" dark @click="touglestatus(item)" small
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
              required
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
        </v-row>
        <v-card-actions class="mt-5">
          <div class="mx-auto">
            <v-btn color="primary" class="mx-1">บันทึก</v-btn>
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
        <v-row>
          <v-col cols="12" sm="4"
            >ประเภทธนาคาร
            <v-select
              v-model="updateitem.type"
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
              required
              v-model="updateitem.Companybank"
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
              v-model="updateitem.Companybankacountnumber"
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
              v-model="updateitem.Companybankname"
              dense
              placeholder="กรุณาใส่ฃื่อบัญชี"
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4">
            เปิดใช้งาน
            <v-switch v-model="updateitem.status"></v-switch>
          </v-col>
          <v-col cols="6" sm="4"
            >การมองเห็นของสมาชิก
            <v-switch v-model="updateitem.visibletomember"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" v-show="updateitem.Companybank == 'SCB'"
            >LOGIN NAME
            <v-text-field
              required
              dense
              hide-details="auto"
              placeholder="กรุณาใส่username"
              outlined
              v-model="updateitem.loginname"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" v-show="updateitem.Companybank == 'SCB'"
            >PASSWORD
            <v-text-field
              required
              dense
              placeholder="กรุณาใส่Password"
              v-model="updateitem.password"
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
              v-model="updateitem.phone"
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions class="mt-5">
          
          <div class="mx-auto">
            <v-btn color="primary" class="mx-1">บันทึก</v-btn>
            <v-btn color="error" class="mx-1" @click="dlupdate = false"
              >ปิด</v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- edit -->
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      updateitem: [],
      typebank: [
        { value: false, text: "ฝาก" },
        { value: true, text: "ถอน" }
      ],
      createBank: {
        type: false,
        Companybank: "",
        Companybankacountnumber: "",
        Companybankname: "",
        status: false,
        visibletomember: false,
        loginname: null,
        password: "",
        phone: ""
      },
      dlupdate: false,
      dlcreate: false,
      dataBank: [
        {
          Companybank: "KBANK",
          Companybankacountnumber: "1171622669",
          Companybankname: "วัชรากร ดิสคุ้ม",
          agentPrefixCode: "BE",
          balance: 720,
          balanceupdatetime: "2022-02-06 18:59:00",
          bankAccRef: "X162266X",
          companyName: "Smartbet",
          createBy: "adnp",
          id: "81857d6c-c8d0-4d75-8b5a-dc7729974124",
          loginname: null,
          phone: "0997839913",
          status: true,
          type: false,
          updateBy: "_RICO_QUEUE",
          visibletomember: true
        }
      ],
      bankHeader: [
        {
          text: "สถานะ",
          value: "status",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ธนาคาร",
          value: "Companybank",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ชื่อบัญชี",
          value: "Companybankname",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เลขบัญชี / เบอร์โทรศัพท์",
          value: "Companybankacountnumber",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ประเภท",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เปิดให้สมาชิกเห็น",
          value: "visibletomember",
          align: "center",
          sortable: false
        },
        {
          text: "การดำเนินการ",
          value: "action",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        }
      ]
    };
  },
  methods: {
    async touglestatus(status) {
      status.visibletomember = !status.visibletomember;
    },
    updateBank(item) {
      this.dlupdate = true;
      this.updateitem = item;
    }
  }
};
</script>

<style></style>
