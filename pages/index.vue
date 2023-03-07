<template>
  <v-flex>
    <!-- sectioncard -->
    <!-- {{ depositlist }} -->
    <loading-page v-if="isLoading"></loading-page>
    <v-row>
      <div class="col-12 col-lg-4">
        <h2 class="pa-2">ยอดรวมทั้งหมด</h2>
        <div class="row">
          <div class="col-12 col-md-6 col-lg-12 col-xl-6 col-sm-6">
            <card-view :value="datarander.depositbalance.toFixed(2)" title="รวมยอดฝากทั้งวัน"
              iconSrc="https://smart-binary.cloud/storage/Rico/savemoney.gif"></card-view>
          </div>
          <div class="col-12 col-md-6 col-lg-12 col-xl-6 col-sm-6">
            <card-view title="รวมยอดถอนทั้งวัน" :value="datarander.withdrawbalance.toFixed(2)"
              iconSrc="https://smart-binary.cloud/storage/Rico/24hour.gif"></card-view>
          </div>
          <div class="col-12 col-md-6 col-lg-12 col-xl-6 col-sm-6">
            <card-view :value="datarander.profitlossDate.toFixed(2)" title="กำไร/ขาดทุน(วันนี้)"
              iconSrc="https://smart-binary.cloud/storage/Rico/today.gif"></card-view>
          </div>
          <div class="col-12 col-md-6 col-lg-12 col-xl-6 col-sm-6">
            <card-view title="กำไร/ขาดทุน(ทั้งเดือน)" :value="datarander.profitlossmounth.toFixed(2)"
              iconSrc="https://smart-binary.cloud/storage/Rico/chart.gif"></card-view>
          </div>
        </div>
      </div>

      <!-- sectioncard -->
      <v-col cols="12" lg="4"><v-card width="100%" class="elevation-5 rounded-lg pa-2">
          <v-card-title primary-title class="font-weight-bold">
            บัญชีฝากทั้งหมด
          </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle primary-title class="font-weight-bold text-center">
            <h3>เปิด-ปิด การฝากออโต้</h3>
          </v-card-subtitle>
          <div class="d-flex">
            <div class="col text-center tougle-system">
              <img-bank value="KBANK"></img-bank>
              <v-switch class="mx-auto text-center" true-value="start" false-value="stop"
                v-model="actionBankState.kbank" @click="updateStatusBank(actionBankState)">
              </v-switch>
            </div>
            <div class="col text-center tougle-system">
              <img-bank value="TRUEWALLET"></img-bank>
              <v-switch class="mx-auto text-center" true-value="start" false-value="stop" v-model="actionBankState.true"
                @click="updateStatusBank(actionBankState)">
              </v-switch>
            </div>
            <div class="col text-center tougle-system">
              <img-bank value="SCB"></img-bank>
              <v-switch class="mx-auto text-center" true-value="start" false-value="stop" v-model="actionBankState.scb"
                @click="updateStatusBank(actionBankState)">
              </v-switch>
            </div>
          </div>

          <v-data-table :headers="bankDepositColumn" :items="dpbank" hide-default-footer>
            <template #[`item.Companybank`]="{ item }">
              <div class="pa-2">
                <img-bank :value="item.Companybank"></img-bank>
              </div>
            </template>
            <template #[`item.Companybankname`]="{ item }">
              <span class="font-weight-bold">
                {{ item.Companybankname }}<br />
                {{ item.Companybankacountnumber }}</span>
            </template>
            <template #[`item.actions`]="{ item }">
              <div v-if="item.Companybank == 'SCB' && item.mode == 2">
                <v-btn v-if="!checking" small rounded color="primary" @click="checkBalance(item)">เช็คยอด</v-btn>
                <v-progress-circular v-if="checking" indeterminate color="primary"></v-progress-circular>
              </div>
            </template>
          </v-data-table>
        </v-card></v-col>
      <v-col cols="12" lg="4"><v-card width="100%" height="100%" class="elevation-3 rounded-lg pa-2">
          <v-card-title primary-title class="font-weight-bold">
            บัญชีถอนทั้งหมด
          </v-card-title>

          <v-data-table :headers="bankWithdrawColumn" :items="wdbank" hide-default-footer>
            <template #[`item.Companybank`]="{ item }">
              <div class="pa-2">
                <img-bank :value="item.Companybank"></img-bank>
              </div>
            </template>
            <template #[`item.Companybankname`]="{ item }">
              <span class="font-weight-bold">
                {{ item.Companybankname }}<br />
                {{ item.Companybankacountnumber }}</span>
            </template>
            <template #[`item.actions`]="{ item }">
              <div v-if="item.Companybank == 'SCB' && item.mode == 2">
                <v-btn v-if="!checking" small rounded color="primary" @click="checkBalance(item)">เช็คยอด</v-btn>
                <v-progress-circular v-if="checking" indeterminate color="primary"></v-progress-circular>
              </div>
            </template>
          </v-data-table> </v-card></v-col>
    </v-row>
    <!-- sectiontable -->

    <!-- sectiontable -->
    <!-- secttiondeposit -->
    <v-row>
      <v-col cols="12" md="12" lg="4">
        <v-card width="100%" class="elevation-3 rounded-lg pa-2 mb-5">
          <v-card-title primary-title class="font-weight-bold primary--text">
            รายการฝากเงินคงค้าง (ออโต้ไม่ผ่าน)
          </v-card-title>

          <v-data-table :headers="logFailedColumn" :items="incomingSMS" :items-per-page="50">
            <!-- <template v-slot:body="props">
              <tbody name="fade" is="transition-group">
                <template >
                <tr class="row" v-for="(item, index) in props.items" :key="index">
                  <td>{{item.companyBank}}</td>
                
                 </tr>
                  </template>
            </tbody>
            </template> -->

            <template #[`item.companyBank`]="{ item }">
              <div>
                <img-bank :value="item.companyBank"></img-bank>
              </div>
              <div>
                {{ item.remark }}

              </div>
              <div>
                {{ item.fromBankRef }}
                
              </div>
            </template>
            <template #[`item.dateSms`]="{ item }">
              {{ item.dateSms.slice(0,10) + ' ' +item.dateSms.slice(11,29)   }}
            </template>
            <template #[`item.actions`]="{ item }">
              <span>
                <v-btn small rounded color="primary" @click="topupDashboard(item)">เติม</v-btn></span>
              <span>
                <v-btn small rounded color="red" @click="hide(item)">ซ่อน</v-btn></span>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="12" lg="4">
        <v-card width="100%" class="elevation-3 rounded-lg pa-2">
          <v-card-title primary-title class="font-weight-bold success--text">
            รายการฝากเงินล่าสุด 20 รายการ
          </v-card-title>

          <v-data-table v-if="dplist.length > 0" :headers="depositColumn" :items="dplist" :items-per-page="20">
            <template #[`item.no`]="{ item }">
              <div class="text-center my-3 my-md-2 showdetail">
                <img-bank :value="item.companyBank"></img-bank>
                <v-chip class="font-weight-bold pa-2 my-1 elevation-2" color="primary" small><v-avatar left>
                    <v-icon>mdi-account-circle</v-icon></v-avatar>{{ item.username }}</v-chip>
                <br />
                <div class="text-start font-weight-bold">
                  ฝาก :
                  <v-chip outlined small class="my-1 elevation-2" color="success" label>
                    {{ item.amount }} บาท </v-chip><br />
                  โบนัส :
                  <v-chip outlined small class="my-1 elevation-2" color="success" label>
                    {{ item.bonusamount ?? 0 }} บาท</v-chip><br />
                  โดย :
                  <v-chip v-if="item.topupby === 'AUTO'" x-small class="my-1 white--text elevation-2" color="success"
                    label>
                    {{ item.topupby }}</v-chip>
                  <v-chip v-else x-small class="my-1 white--text elevation-2" color="pink" label>
                    {{ item.topupby ?? item.bank_name }}</v-chip>
                    
                </div>
              </div>
            </template>
            <template #[`item.timeTransection`]="{ item }">
              <div class="text-center my-3 my-md-2 showdetail">
                <v-chip class="font-weight-bold pa-2 elevation-2" color="grey darken-4" label x-small dark><v-icon
                    class="mr-1" small>mdi-timer</v-icon>เติม</v-chip><br />
                {{ renderDate2(item.created_at ?? item.deposit_time) }}<br />
                <v-chip class="font-weight-bold pa-2 elevation-2 mt-2" color="grey darken-4" dark label x-small>
                  <v-icon class="mr-1" small>mdi-message-processing</v-icon>SMS</v-chip><br />
                {{ item.smsdatetime.slice(0,10) + ' '  +item.smsdatetime.slice(11,19)  }}<br />
              </div>
            </template>
            <template #[`item.credit`]="{ item }">
              <div class="text-center my-3 my-md-2 showdetail">
                <div class="my-2">
                  <span class="font-weight-bold"> หลังเติม</span>
                  <br />
                  <v-icon color="success">mdi-menu-up</v-icon>
                  
                  {{ parseInt(item.afcredit) }}<br />
                </div>

                <div class="my-2">
                  <span class="font-weight-bold"> ก่อนเติม</span><br />
                  {{  parseInt(item.bfcredit) }}<br />
                </div>
              </div>
            </template>
            <template #[`item.actions`]>
              <v-btn small color="primary">ตรวจสอบ</v-btn>
            </template>
          </v-data-table>
        </v-card></v-col>
      <v-col cols="12" md="12" lg="4">
        <v-card width="100%" class="elevation-3 rounded-lg pa-2">
          <!-- {{ wdlist[0]?.status? wdlist[0].status : null }} -->
          <v-card-title primary-title class="font-weight-bold error--text">
            รายการถอนเงินล่าสุด {{ getWdlist.length }} รายการ
          </v-card-title>
          <!-- mobile -->
          <table  v-if="getWdlist.length > 0 && componentKey" class="v-data-table d-md-none d-lg-none" v-for="(item, index) in getWdlist"
            :key="'0_' + index + item.status" style="width:100% ;">
            <tr class="v-data-table__mobile-table-row d-flex col-12">
              <td class="v-data-table__mobile-row col-6">
                รายการ
              </td>
              <td class="v-data-table__mobile-row__cell col">
                <div class="text-center my-3 my-md-2 showdetail">
                  <div class="font-weight-bold">
                    โอนไป<br />
                    <img-bank :value="item.bankName"></img-bank>
                  </div>

                  <v-chip class="font-weight-bold pa-2 my-1 elevation-2" color="primary" small><v-avatar left>
                      <v-icon>mdi-account-circle</v-icon></v-avatar>{{ item.name }}</v-chip>
                  <div class="font-weight-bold my-1">
                    <v-icon small color="grey" class="mx-1">mdi-card-text-outline</v-icon>{{ item.bankAcc }}<br />
                    <v-icon small color="grey">mdi-account</v-icon>
                    {{ item.username }}
                  </div>
                  <div class="my-1 font-weight-bold">
                    โดย:
                    <v-chip x-small class="my-1 white--text elevation-2" color="pink" label>
                      {{ item.operator }}</v-chip>
                  </div>
                  <div class="my-1 font-weight-bold" v-if="item.type == 'affiliate'">
                
                    <v-chip x-small class="my-1 white--text elevation-2" color="red" label>
                      {{ item.type }}</v-chip>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="v-data-table__mobile-table-row d-flex">
              <td class="v-data-table__mobile-row col-6">
                เวลา ถอน/โอน
              </td>
              <td class="col">
                <div class="text-center my-3 my-md-2 showdetail">
                  <v-chip class="font-weight-bold pa-2 elevation-2 mt-2 mb-1" color="grey darken-4" label x-small
                    dark><v-icon class="mr-1" small>mdi-timer</v-icon>ถอน</v-chip><br />
                  {{ renderDateTest(item.requsettime).slice(0,20) }}<br />
                  <v-chip class="font-weight-bold pa-2 elevation-2 mt-2 mb-1" color="grey darken-4" label x-small
                    dark><v-icon class="mr-1" small>mdi-transfer</v-icon>โอน</v-chip><br />
                  {{ item.transferTime }}<br />
                  <v-chip class="font-weight-bold pa-2 elevation-2 mt-2 mb-1" color="grey darken-4" label x-small
                    dark><v-icon class="mr-1" small>mdi-credit-card</v-icon>เครดิตก่อน</v-chip><br />
                  {{ item.bfcredit?.toFixed(2) }}<br />
                  <v-chip class="font-weight-bold pa-2 elevation-2 mt-2 mb-1" color="grey darken-4" label x-small dark>
                    <v-icon class="mr-1" small>mdi-credit-card</v-icon>เครดิตหลัง</v-chip><br />
                  {{ item.afcredit?.toFixed(2) }}
                </div>
              </td>
            </tr>
            <tr class="v-data-table__mobile-table-row d-flex col-12">
              <td class="vv-data-table__mobile-row col-6">
                จำนวน
              </td>
              <td class="col">
                <div class="text-center my-3 my-md-2 showdetail">
                  <div class="font-weight-bold">
                    โอนไป<br />
                    <img-bank :value="item.bankName"></img-bank>
                  </div>

                  <v-chip class="font-weight-bold pa-2 my-1 elevation-2" color="primary" small><v-avatar left>
                      <v-icon>mdi-account-circle</v-icon></v-avatar>{{ item.name }}</v-chip>
                  <div class="font-weight-bold my-1">
                    <v-icon small color="grey" class="mx-1">mdi-card-text-outline</v-icon>{{ item.bankAcc }}<br />
                    <v-icon small color="grey">mdi-account</v-icon>
                    {{ item.username }}
                  </div>
                  <div class="my-1 font-weight-bold">
                    โดย:
                    <v-chip x-small class="my-1 white--text elevation-2" color="pink" label>
                      {{ item.operator }}</v-chip>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="v-data-table__mobile-table-row d-flex col-12">
              <td class="v-data-table__mobile-row col-6">
                ดำเนินการ
              </td>
              <td class="col text-center">
                <div v-if="item.status == 'Success' || item.status == 'rejected'">
                <v-btn color="primary" outlined rounded class="my-1" small @click="showRemark(item)">หมายเหตุ</v-btn>
                </div>
                <div v-if="item.status == 'Error'" class="ma-2 text-center">
                  <v-btn color="error" class="my-1" rounded small @click="rejectWD(item)">ไม่อนุมัติ</v-btn>
                  <v-btn v-if="item.bankName != 'TRUEWALLET'" color="primary" class="my-1" rounded small @click="resetWD(item)">Reset</v-btn>
                  <v-btn v-if="!confirming" color="grey" class="my-1" rounded small
                    @click="manualWd(item)">ถอนมือ</v-btn>
                  <v-btn color="primary" outlined rounded class="my-1" small @click="showRemark(item)">หมายเหตุ</v-btn>
                </div>
                <div v-if="item.status == 'created'" class="ma-2 text-center">
                  <v-btn v-if="item.bankName != 'TRUEWALLET'" color="success" class="my-1" rounded small
                    @click="approveWd(item)">อนุมัติ</v-btn>
                  <v-btn color="error" class="my-1" rounded small @click="rejectWD(item)">ไม่อนุมัติ</v-btn>
                  <v-btn v-if="!confirming" color="grey" class="my-1" rounded small
                    @click="manualWd(item)">ถอนมือ</v-btn>
                  <v-btn color="primary" outlined rounded class="my-1" small @click="showRemark(item)">หมายเหตุ</v-btn>
                </div>

                <div v-if="item.status == 'Pending'" class="ma-2 text-center">

                  <v-btn color="primary" outlined rounded class="my-1" small @click="showRemark(item)">หมายเหตุ</v-btn>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <hr>
              </td>
              <td>
                <hr>
              </td>
            </tr>

          </table>

          <!-- end mobile -->
          <table class="d-none d-md-block">
            <thead class="v-data-table-header">
              <tr>
                <th v-for="(item, index) in withdrawColumn" :key="index"
                  :class="[(index == 0 ? 'col-4' : ''), (index == 3 ? 'col-2' : ''), (index != 1 && index != 3 ? 'col-4' : '')]">
                  {{ item.text }}
                </th>
              </tr>
            </thead>

            <tr v-if="getWdlist.length > 0" v-for="(item, index) in getWdlist" :key="'0_' + index">
              <td>
                <div class="text-center my-3 my-md-2 showdetail">
                  <div class="font-weight-bold">
                    โอนไป<br />
                    <img-bank :value="item.bankName"></img-bank>
                  </div>

                  <v-chip class="font-weight-bold pa-2 my-1 elevation-2" color="primary" small><v-avatar left>
                      <v-icon>mdi-account-circle</v-icon></v-avatar>{{ item.name }}</v-chip>
                  <div class="font-weight-bold my-1">
                    <v-icon small color="grey" class="mx-1">mdi-card-text-outline</v-icon>{{ item.bankAcc }}<br />
                    <v-icon small color="grey">mdi-account</v-icon>
                    {{ item.username }}
                  </div>
                  <div class="my-1 font-weight-bold">
                    โดย:
                    <v-chip x-small class="my-1 white--text elevation-2" color="pink" label>
                      {{ item.operator }}</v-chip>
                  </div>
                  <div class="my-1 font-weight-bold" v-if="item.type == 'affiliate'" >
                  
                    <v-chip x-small class="my-1 white--text elevation-2" color="purple" label>
                      {{ item.type }}</v-chip>
                  </div>
                </div>
              </td>
              <td>
                <div class="text-center my-3 my-md-2 showdetail">
                  <v-chip class="font-weight-bold pa-2 elevation-2 mt-2 mb-1" color="grey darken-4" label x-small
                    dark><v-icon class="mr-1" small>mdi-timer</v-icon>ถอน</v-chip><br />
                  {{ renderDateTest(item.requsettime).slice(0,20) }}<br />
                  <v-chip class="font-weight-bold pa-2 elevation-2 mt-2 mb-1" color="grey darken-4" label x-small
                    dark><v-icon class="mr-1" small>mdi-transfer</v-icon>โอน</v-chip><br />
                  {{item.transferTime }}<br />
                  <v-chip class="font-weight-bol)d pa-2 elevation-2 mt-2 mb-1" color="grey darken-4" label x-small
                    dark><v-icon class="mr-1" small>mdi-credit-card</v-icon>เครดิตก่อน</v-chip><br />
                  {{ item.bfcredit?.toFixed(2) }}<br />
                  <v-chip class="font-weight-bold pa-2 elevation-2 mt-2 mb-1" color="grey darken-4" label x-small dark>
                    <v-icon class="mr-1" small>mdi-credit-card</v-icon>เครดิตหลัง</v-chip><br />
                  {{ item.afcredit?.toFixed(2) }}
                </div>
              </td>
              <td>
                <div class="text-center my-3 my-md-2 showdetail">
                  <span class="font-weight-bold">ยอดถอน</span> <br />
                  <v-chip class="ma-2 font-weight-bold" color="error" label outlined>{{ Math.floor(item.amount?item.amount:0) }}
                    บาท</v-chip><br />
                  <div class="card_status my-2">
                    <span class="font-weight-bold">status</span><br />

                    <v-chip v-if="item.status == 'Success'" x-small label color="success">
                      {{ item.status }}</v-chip>
                    <v-chip v-if="item.status == 'created'" x-small label color="primary">
                      {{ item.status }}</v-chip>
                    <v-chip v-if="item.status == 'Pending'" x-small label color="warning">
                      {{ item.status }}</v-chip>
                    <v-chip v-if="item.status == 'rejected'" x-small label color="error">
                      {{ item.status }}</v-chip>
                    <v-chip v-if="item.status == 'Error'" x-small label color="error">
                      {{ item.status }}</v-chip>

                  </div>
                  <span class="font-weight-bold">หลังถอน</span><br />
                  <span v-if="item.afAmount" class="font-weight-bold"> {{ item.afAmount }} </span>
                  <span v-else> - </span>
                  <br />
                  <span class="font-weight-bold">ก่อนถอน</span><br />
                  <span v-if="item.bfAmount" class="font-weight-bold"> {{ item.bfAmount }} </span>
                  <span v-else> - </span>
                </div>
              </td>
              <td>
                <div v-if="item.status == 'Success' || item.status == 'rejected'">
                <v-btn color="primary" outlined rounded class="my-1" small @click="showRemark(item)">หมายเหตุ</v-btn>
                </div>
                <div v-if="item.status == 'Error'" class="ma-2 text-center">
                  <v-btn color="error" class="my-1" rounded small @click="rejectWD(item)">ไม่อนุมัติ</v-btn>
                  <v-btn v-if="item.bankName != 'TRUEWALLET'" color="primary" class="my-1" rounded small @click="resetWD(item)">Reset</v-btn>
                  <v-btn v-if="!confirming" color="grey" class="my-1" rounded small
                    @click="manualWd(item)">ถอนมือ</v-btn>
                  <v-btn color="primary" outlined rounded class="my-1" small @click="showRemark(item)">หมายเหตุ</v-btn>
                </div>
                <div v-if="item.status == 'created'" class="ma-2 text-center">
                  <v-btn v-if="item.bankName != 'TRUEWALLET'" color="success" class="my-1" rounded small
                    @click="approveWd(item)">อนุมัติ</v-btn>
                  <v-btn color="error" class="my-1" rounded small @click="rejectWD(item)">ไม่อนุมัติ</v-btn>
                  <v-btn v-if="!confirming" color="grey" class="my-1" rounded small
                    @click="manualWd(item)">ถอนมือ</v-btn>
                  <v-btn color="primary" outlined rounded class="my-1" small @click="showRemark(item)">หมายเหตุ</v-btn>
                </div>

                <div v-if="item.status == 'Pending'" class="ma-2 text-center">
                  <v-btn v-if="item.bankName != 'TRUEWALLET'" color="primary" class="my-1" rounded small @click="resetWD(item)">Reset</v-btn>
                  <v-btn color="primary" outlined rounded class="my-1" small @click="showRemark(item)">หมายเหตุ</v-btn>
                </div>
              </td>
            </tr>

          </table>



        </v-card></v-col>
    </v-row>
    <!-- secttiondeposit -->

    <!-- secttion dialog -->
    <v-dialog v-model="dialogTopup" max-width="290">
      <v-card>
        <v-card-title>
          <h4>ยืนยันการเติมเงิน</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div class="my-2" v-if="!incoming_dashboard.username">
            <v-text-field placeholder="กรอก username : " hide-details="auto" v-model="incoming_dashboard.username" dense
              outlined :rules="rulesFrom.usernameRules" required></v-text-field>
          </div>
          <div class="my-2" v-if="incoming_dashboard.username">
            <v-text-field placeholder="กรอก username : " hide-details="auto" v-model="incoming_dashboard.username" dense
              outlined :rules="rulesFrom.usernameRules" required></v-text-field>
          </div>
          <div class="my-2">จำนวนเงิน : {{ incoming_dashboard.amount }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="topUp()"> ยืนยัน</v-btn>
          <v-btn color="red" small @click="dialogTopup = false"> ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogTopup_hide" max-width="290">
      <v-card>
        <v-card-title>
          <h4>ยืนยันการทำรายการ</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div class="my-2">
            ต้องการนำรายการออกจากหน้า Dashboard ใช่หรือไม่ ?
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="hide_incoming()"> ยืนยัน</v-btn>
          <v-btn color="red" small @click="dialogTopup_hide = false">
            ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogRemark" max-width="1080">
      <v-card>
        <v-card-title>
          <h4>ข้อความ</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div v-if="remark_render.qrcode == null">
            <h3 class="my-4 text-center">
              {{ remark_render.remark }}
            </h3>
          </div>
          <div v-if="remark_render.qrcode != null">
            <div class="text-center">
              <div>รายการโอนสำเร็จ</div>
              <div>ยอดก่อนโอน : {{ remark_render.bf_balance }}</div>
              <div>ยอดหลังโอน : {{ remark_render.af_balance }}</div>
  
              <div>QR CODE สำหรับตรวจสอบรายการโอนเงิน</div>
              <div class="d-flex" style="justify-content: center">
                <qr-code :text="remark_render.qrcode"></qr-code>
              </div>
            </div>
          </div>
      
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="dialogRemark = false"> ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogManualWD" max-width="290">
      <v-card>
        <v-card-title>
          <h4>ยืนยันการถอนมือ</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div class="my-2">
            เมื่อกด ถอนมือ ระบบจะเปลี่ยนสถานะของรายการนี้เป็น Success
            ทางเว็บจะต้องดำเนินการโอนเงินให้ลูกค้าเอง ผ่านช่องทางอื่นๆ
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="manualWd_confirm()">
            ยืนยัน</v-btn>
          <v-btn color="red" small @click="dialogManualWD = false">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogRejectWD" max-width="350">
      <v-card>
        <v-card-title>
          <h4>ยืนยันการ Reject รายการถอน</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div class="my-2">
            ปฏิเสธรายการถอน และเติมเครดิต คืนให้กับ <br>user: {{ withdraw_temp?.username }} พร้อมใส่เทิร์นระบบ
            ใช่หรือไม่ ?
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="rejectWd_confirm()">
            ยืนยัน</v-btn>
          <v-btn color="red" small @click="dialogRejectWD = false">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogApproveWD" max-width="350">
      <v-card>
        <v-card-title>
          <h4>ยืนยันการ อนุมัติ รายการถอน</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div class="my-2">
            ยินยันการโอนเงินให้ <br>user: {{ withdraw_temp?.username }}
            ใช่หรือไม่ ?
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="ApproveWd_confirm()">
            ยืนยัน</v-btn>
          <v-btn color="red" small @click="dialogApproveWD = false">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogResetWD" max-width="350">
      <v-card>
        <v-card-title>
          <h4>RESET สถานะ รายการถอน</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div class="my-2">
            ยินยัน RESET สถานะ รายการถอน  ใช่หรือไม่ ?

            <br />
            <br />
            หมายเหตุ:  <br />
            <p> ก่อนการอนุมัติใหม่ หลังจาก reset ให้ตรวจสอบ ยอดเงิน ว่าออกไปหรือยัง ก่อนทำการอนุมัติใหม่ทุกครั้ง
              หากมีการโอนยอดซ้ำออกไป เนื่องจากการกด reset ทางเราจะไม่รับผิดชอบใดๆ ทั้งสิ้น</p>
           
           
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="ResetWd_confirm()">
            ยืนยัน</v-btn>
          <v-btn color="red" small @click="dialogResetWD = false">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    
  </v-flex>
</template>
<script>

import dayjs from 'dayjs';
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import ImgBank from "../components/ImgBank.vue";
import GradientInput from "../components/palette/GradientInput.vue";
export default {
  computed: {
    ...mapGetters("auth", [
      "getWdlist"
    ]),
    ...mapState("auth", [
      "datarander",
      "dpbank",
      "wdbank",
      "dplist",
      "incomingSMS",
      "actionBankState",
      "componentKey"
    ]),
  },
  components: { ImgBank, GradientInput },
  watch: {
    options: {
      async handler() {
        await this.GetInfomation();
        await this.getsatatusBank();
      },
    },
  },
 
  async created() {
    try {
      await this.Autostatus();
      // await this.getsatatusBank();
      await this.GetInfomation();
      console.log("getinfo done");
     
    } catch (error) {
      console.log(error);
    }
    
  },
  mounted() { },
  data() {
    return {
      socket: null,
   

      confirming: false,
      remark_render:{remakr:null,qrcode:null,af_balance:null,bf_balance:null},
      remark: null,
      withdraw_temp: null,

      depositlist: [],
      withdrawlist: [],

      dialogTopup: false,
      dialogTopup_hide: false,
      dialogRemark: false,
      dialogManualWD: false,
      dialogRejectWD: false,
      dialogApproveWD: false,
      dialogResetWD:false,

      incoming_dashboard: { username: "", amount: 0 },
      rulesFrom: {
        usernameRule: [(v) => !!v || "กรุณากรอก username"],
      },

      checking: false,
      datainformation: [],
      isLoading: false,
      bankDepositColumn: [
        {
          text: "ธนาคาร",
          align: "center",
          value: "Companybank",
          sortable: true,
        },
        {
          text: "ชื่อ",
          value: "Companybankname",
          align: "center",
          sortable: true,
        },
        {
          text: "อัพเดทยอดคงเหลือ",
          value: "balanceupdatetime",
          align: "center",
          sortable: false,
        },
        {
          text: "ยอดเงินคงเหลือ",
          value: "balance",
          align: "center",
          sortable: false,
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      bankWithdrawColumn: [
        {
          text: "ธนาคาร",
          align: "center",
          value: "Companybank",
          sortable: true,
        },
        {
          text: "ชื่อ",
          value: "Companybankname",
          align: "center",
          sortable: true,
        },
        {
          text: "อัพเดทยอดคงเหลือ",
          value: "balanceupdatetime",
          align: "center",
          sortable: false,
        },
        {
          text: "ยอดเงินคงเหลือ",
          value: "balance",
          align: "center",
          sortable: false,
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      logFailedColumn: [
        {
          text: "ธนาคาร",
          align: "center",
          value: "companyBank",
          sortable: true,
        },
        {
          text: "เวลาจากธนาคาร",
          value: "dateSms",
          align: "center",
          sortable: true,
        },
        {
          text: "จำนวนเงิน",
          value: "amount",
          align: "center",
          sortable: false,
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      depositColumn: [
        {
          text: "รายการ",
          align: "center",
          value: "no",
          sortable: false,
        },
        {
          text: "เวลาเติมเครดิต",
          value: "timeTransection",
          align: "center",
          sortable: false,
        },
        {
          text: "เครดิต ก่อน/หลัง",
          value: "credit",
          align: "center",
          sortable: false,
        },
      ],
      withdrawColumn: [
        {
          text: "รายการ",
          align: "center",
          value: "no",
          sortable: false,
          class: "col-4",
        },
        {
          text: "เวลา ถอน/โอน",
          value: "timeTransection",
          align: "center",
          sortable: false,
          class: "col-3",
        },
        {
          text: "จำนวน",
          value: "credit",
          align: "center",
          sortable: false,
          class: "col-3",
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false,
          class: "col-2",
        },
      ],
    };
  },

  methods: {
    ...mapActions("auth", [
      "manualWithdrawFromDashboard",
      "manualRejectFromDashboard",
      "manualApproveFromDashboard",
      "manualResetFromDashboard",
      "hideIncomingFromDashBoardByOperator",
      "GetInfomation",
      "Autostatus",
      "checkBalanceBank",
      "updateBalanceBank",
      "updateAutoBankStatus",
      "topupDashboardByOperator",
      "updateIncoming",
      "updateWithdrawlistAction",
      "findInWdList"
    ]),
    ...mapMutations("auth", ["update_action_bank", "updateWithdrawlist"]),
    ...mapMutations("auth", [
      "set_logout",
      "update_action_bank",
      "addIncoming",
      "addDeposit",
      "RemoveIncoming",
      "updateWithdrawlist",
      "addWithdraw"
    ]),
    renderDate2(date){
      if((new Date(date).getSeconds() > 0) ){
        return  dayjs(new Date(date)).format("YYYY-MM-DD HH:mm:ss")
      }
    return '-'
    },
    renderDate(date){
      if(date[0] == 'p'){
      return 'โอนมือ'
     } 
     
     
     return  dayjs(date).add(+7,'hours').format("YYYY-MM-DD HH:mm:ss")
    },
    renderDateTest(date){
     
     return date
     return  dayjs(date).format("YYYY-MM-DD HH:mm:ss")
   },
    approveWd(item) {
      (this.withdraw_temp = item), (this.dialogApproveWD = true);
    },
    manualWd(item) {
      (this.withdraw_temp = item), (this.dialogManualWD = true);
    },
    rejectWD(item) {
      (this.withdraw_temp = item), (this.dialogRejectWD = true);
    },
    resetWD(item){
      (this.withdraw_temp = item), (this.dialogResetWD = true);
    },
    showRemark(item) {
      if(item.remark.startsWith("QR_")) {
        this.remark_render.qrcode = item.remark.slice(3);
        this.remark_render.bf_balance = item.bfAmount;
        this.remark_render.af_balance = item.afAmount;
      } else {
        this.remark_render.remark = item.remark;
        this.remark_render.qrcode = null;
      }

      this.dialogRemark = true;
    },
    topupDashboard(item) {
      this.incoming_dashboard = item;
      this.dialogTopup = true;
    },
    hide(item) {
      this.incoming_dashboard = item;
      this.dialogTopup_hide = true;
    },

    async manualWd_confirm() {
      this.isLoading = true;
      this.confirming = true
      this.withdraw_temp.status = 'Success'
      const list = await this.updateWithdrawlistAction(this.withdraw_temp)
      await this.updateWithdrawlist(list)
      const result = await this.manualWithdrawFromDashboard(this.withdraw_temp);
      this.isLoading = false;
      if (result.status == "success") {
        this.isLoading = false;
        this.dialogManualWD = false;
        this.$swal({
          title: `ทำรายการสำเร็จ`,
          icon: "success",
          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok",
        });
        this.dialogTopup_hide = false;
        this.confirming = false
        return;
      } else {
        this.isLoading = false;
        this.dialogManualWD = false;
        this.$swal({
          title: `รายการไม่สำเร็จ`,
          icon: "error",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "red",
          confirmButtonText: "ok",
        });
        this.dialogTopup_hide = false;
        this.confirming = false
        return;
      }
    },
    
    async ResetWd_confirm() {
      this.isLoading = true;
      this.confirming = true
      this.withdraw_temp.status = 'created'
      const list = await this.updateWithdrawlistAction(this.withdraw_temp)
      await this.updateWithdrawlist(list)
      const result = await this.manualResetFromDashboard(this.withdraw_temp);
      this.isLoading = false;
      if (result.status == "success") {
        this.isLoading = false;
        this.dialogResetWD = false;
        this.$swal({
          title: `ทำรายการสำเร็จ`,
          icon: "success",
      
          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok",
        });
        this.dialogResetWD = false;
        this.confirming = false
        return;
      } else {
        this.isLoading = false;
        this.dialogResetWD = false;
        this.$swal({
          title: `รายการไม่สำเร็จ`,
          icon: "error",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "red",
          confirmButtonText: "ok",
        });
        this.dialogApproveWD = false;
        this.confirming = false
        return;
      }
    },
    async ApproveWd_confirm() {
      this.isLoading = true;
      this.confirming = true
      this.withdraw_temp.status = 'Pending'
      const list = await this.updateWithdrawlistAction(this.withdraw_temp)
      await this.updateWithdrawlist(list)
      const result = await this.manualApproveFromDashboard(this.withdraw_temp);
      this.isLoading = false;
      if (result.status == "success") {
        this.isLoading = false;
        this.dialogApproveWD = false;
        this.$swal({
          title: `นำรายการถอนเข้าคิวสำเร็จ`,
          icon: "success",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok",
        });
        this.dialogTopup_hide = false;
        this.confirming = false
        return;
      } else {
        this.isLoading = false;
        this.dialogApproveWD = false;
        this.$swal({
          title: `รายการไม่สำเร็จ`,
          icon: "error",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "red",
          confirmButtonText: "ok",
        });
        this.dialogApproveWD = false;
        this.confirming = false
        return;
      }
    },
    async rejectWd_confirm() {
      this.isLoading = true;
      this.confirming = true
      this.withdraw_temp.status = 'rejected'
      const list = await this.updateWithdrawlistAction(this.withdraw_temp)
      await this.updateWithdrawlist(list)
      const result = await this.manualRejectFromDashboard(this.withdraw_temp);
      this.isLoading = false;
      if (result.status == "success") {
        this.isLoading = false;
        this.dialogRejectWD = false;
        this.$swal({
          title: `ทำรายการสำเร็จ`,
          icon: "success",
         
          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok",
        });
        this.dialogTopup_hide = false;
        this.confirming = false
        return;
      } else {
        this.isLoading = false;
        this.dialogRejectWD = false;
        this.$swal({
          title: `รายการไม่สำเร็จ`,
          icon: "error",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "red",
          confirmButtonText: "ok",
        });
        this.dialogRejectWD = false;
        this.confirming = false
        return;
      }
    },

    async hide_incoming() {
      this.isLoading = true;
      const result = await this.hideIncomingFromDashBoardByOperator(
        this.incoming_dashboard
      );
      this.isLoading = false;
      if (result.status == "success") {
        this.isLoading = false;
        this.$swal({
          title: `ทำรายการสำเร็จ`,
          icon: "success",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok",
        });
        this.dialogTopup_hide = false;
        this.confirming = false
        return;
      } else {
        this.isLoading = false;
        this.$swal({
          title: `รายการไม่สำเร็จ`,
          icon: "error",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "red",
          confirmButtonText: "ok",
        });
        this.dialogTopup_hide = false;
        this.confirming = false
        return;
      }
    },
    async topUp() {
      if (!this.incoming_dashboard.username) {
        this.$swal({
          title: `กรุณากรอก username`,
          icon: "warning",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ok",
        });
        return;
      }
      this.isLoading = true;
      const result = await this.topupDashboardByOperator(
        this.incoming_dashboard
      );
      this.isLoading = false;
      if (result.status == "success") {
        this.isLoading = false;
        this.$swal({
          title: `ทำรายการสำเร็จ`,
          icon: "success",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok",
        });
        this.dialogTopup = false;
        return;
      } else {
        this.isLoading = false;
        this.$swal({
          title: `รายการไม่สำเร็จ`,
          icon: "error",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "red",
          confirmButtonText: "ok",
        });

        return;
      }
    },

    async updateStatusBank(item) {
      await this.updateAutoBankStatus({ data: item });
    },
    async getsatatusBank() {
      console.log("getsatatusBank");
      try {
     

        console.log("Autostatus done");
      } catch (error) {
        console.log(error);
      }
    },
    async checkBalance(item) {
      this.checking = true;
      try {
        await this.checkBalanceBank({ bank: item });
        this.checking = false;
      } catch (error) {
        this.checking = false;
      }

      // await this.updateBalanceBank({id:item.id,balance:balance})
      this.checking = false;
    },
  },
};
</script> 
<style lang="scss">
.tr-fade-enter-active,
.tr-fade-leave-active {
  transition: all 0.5s !important;
}

.tr-fade-enter,
.tr-fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}

.mycolor {
  background-color: green;
  animation: mymove 5s;
}

@keyframes mymove {
  from {
    background-color: red;
  }

  to {
    background-color: yellow;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}
</style>
