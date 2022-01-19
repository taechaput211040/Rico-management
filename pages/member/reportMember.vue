<template>
  <v-flex>
    <v-container>
      <v-row>
        <h2 class="mb-2">รายการสมาฃิก</h2>
        <v-card width="100%" class="elevation-4 pa-5 rounded-lg">
          <v-row>
            <v-col cols="12" md="6" lg="6">
              <v-row>
                <v-col cols="12">
                  <v-row align="baseline">
                    <p>เริ่ม</p>
                    <v-col cols="7">
                      <el-date-picker
                        class="full-width"
                        v-model.trim="filter.startDate"
                        arrow-control
                        placeholder="วันที่"
                        style="width: 100%"
                      />
                    </v-col>
                    <v-col>
                      <el-time-picker
                        class="full-width"
                        v-model.trim="filter.startTime"
                        format="HH:mm"
                        arrow-control
                        placeholder="เวลา"
                        style="width: 100%"
                      >
                      </el-time-picker>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row align="baseline">
                    <p>ถึง</p>
                    <v-col cols="7">
                      <el-date-picker
                        class="full-width"
                        v-model.trim="filter.endDate"
                        arrow-control
                        placeholder="วันที่"
                        style="width: 100%"
                      />
                    </v-col>
                    <v-col>
                      <el-time-picker
                        class="full-width"
                        v-model.trim="filter.endTime"
                        format="HH:mm"
                        arrow-control
                        placeholder="เวลา"
                        style="width: 100%"
                      >
                      </el-time-picker></v-col></v-row></v-col
              ></v-row> </v-col
            ><v-divider vertical class="display-mb"></v-divider>
            <v-col cols="12" md="6" lg="6">
              <v-row>
                <v-col cols="8" md="8"
                  ><v-text-field
                    label="ค้นหา"
                    placeholder="กรอกคำค้นหา"
                    outlined
                    dense
                    filled
                    hide-details="auto"
                  ></v-text-field
                ></v-col>
                <v-col cols="4" md="4">
                  <v-btn color="primary">
                    <v-icon left dark>
                      mdi-magnify
                    </v-icon>
                    ค้นหา</v-btn
                  ></v-col
                >
                <v-col class="text-center">
                  <v-btn color="success" class="mx-1" dark
                    ><v-icon left>mdi-menu-left</v-icon> เมื่อวาน</v-btn
                  ><v-btn color="warning" class="mx-1"
                    >วันนี้<v-icon right>mdi-circle-medium</v-icon></v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-row></v-container
    >
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        startDate: new Date(),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date(),
        endTime: new Date(new Date().setHours(23, 59, 59, 999))
      }
    };
  }
};
</script>

<style></style>
