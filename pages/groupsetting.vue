<template>
  <v-flex>
    <h2 class="mb-4">ตั้งค่าค่ายเกม</h2>
    <v-card class="elevation-3 rounded-lg ">
      <div class="pa-3 font-weight-bold">
        กรุณาเลือกหมวดเกม
        <div class="row pa-3">
          <div
            class="col-sm-2 col-6"
            v-for="(item, index) in this.groupcard.results"
            :key="index"
          >
            <img
              :src="item.image"
              style="max-width: 100%;height: auto;cursor: pointer;"
              @click="renderitem(item)"
            />
          </div>
        </div>
      </div>
    </v-card>
    <v-card
      class="elevation-3 rounded-lg mt-3 "
      v-show="listProvider.length > 0"
      ><div class=" pa-3 text-center">
        <h2 class=" font-weight-bold">ตั้งค่า : {{ namegroup }}</h2>
        <div class="error--text font-weight-bold">
          **หมายเหตุ : คลิกที่ค่ายเกมค้างไว้แล้วลากเพื่อจัดเรียง**
        </div>
      </div>

      <draggable
        v-model="listProvider"
        v-bind="dragOptions"
        class="row d-flex justify-center pa-3"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div
          class="col-lg-2 col-6 col-sm-3 pa-3 text-center pa-4"
          @dragend="checkProvider"
          :key="index"
          v-for="(item, index) in listProvider"
        >
          <img
            v-if="item.image"
            :src="item.image"
            alt=""
            style="max-width: 100%;height: auto;cursor: pointer;"
          />
          <p class="text-center frist_color pa-2">
            {{ item.name }}
            <v-switch hide-details="auto" v-model="item.status"></v-switch>
          </p>
        </div>
      </draggable>
      <v-card-actions class="justify-center">
        <v-btn class="btn_sty" dark rounded
          ><v-icon small left>mdi-content-save-settings</v-icon>บันทึก</v-btn
        ><v-btn class="red" dark rounded
          ><v-icon small left>mdi-refresh</v-icon>ยกเลิก</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
import draggable from "vuedraggable";
export default {
  components: { draggable },
  data() {
    return {
      grouplist: [],
      groupcard: [],
      namegroup: "",
      listProvider: []
    };
  },
  async fetch() {
    this.groupcard = JSON.parse(localStorage.getItem("groups"));
    try {
      let { data: group } = await this.getGroup();
      this.grouplist = group;

      console.log(group);
    } catch (error) {}
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  methods: {
    checkProvider() {
      // console.log(this.provider)
      console.log(document.getElementById("simpleList"));
    },
    ...mapActions("setting", ["getGroup"]),
    renderitem(item) {
      this.namegroup = item.name;
      if (item.code == "LC") {
        this.listProvider = this.grouplist.casino.results;
      } else if (item.code == "OT") {
        this.listProvider = this.grouplist.horse.results;
      } else if (item.code == "SB") {
        this.listProvider = this.grouplist.sportbook.results;
      } else if (item.code == "ES") {
        this.listProvider = this.grouplist.esport.results;
      } else if (item.code == "SL") {
        this.listProvider = this.grouplist.slot.results;
      } else if (item.code == "FH") {
        this.listProvider = this.grouplist.fishing.results;
      }
      this.listProvider.forEach(x => {
        x.status = true;
      });
      console.log(this.listProvider);
    }
  }
};
</script>

<style></style>
