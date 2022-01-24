<template>
  <v-card width="100%" class="elevation-4 pa-5 rounded-lg">
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <v-row>
          <v-col cols="12">
            <v-row align="baseline">
              <p class="font-weight-bold">เริ่ม</p>
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
              <p class="font-weight-bold">ถึง</p>
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
          <v-col cols="8" md="8" v-if="searchinput == true"
            ><v-text-field
              label="ค้นหา"
              placeholder="กรอกคำค้นหา"
              dense
              v-model="inputdata"
              outlined
              clearable
              hide-details="auto"
            ></v-text-field
          ></v-col>
          <v-col
            cols="4"
            md="3"
            class="d-flex "
            :class="{ aligncclass: searchinput == false }"
          >
            <v-btn color="primary" @click="search()">
              <v-icon left dark>
                mdi-magnify
              </v-icon>
              ค้นหา</v-btn
            ></v-col
          >
          <v-col cols="8" class="d-flex">
            <v-btn color="success" class="mx-1" dark @click="toyesterday()"
              ><v-icon left>mdi-menu-left</v-icon> เมื่อวาน</v-btn
            ><v-btn color="warning" class="mx-1" @click="today()"
              >วันนี้<v-icon right>mdi-circle-medium</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      inputdata: ""
    };
  },

  props: {
    filter: Object,
    searchinput: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    search() {
      this.$emit("search", this.inputdata);
    },
    toyesterday() {
      this.$emit("yesterday");
    },
    today() {
      this.$emit("today");
    }
  }
};
</script>

<style></style>
