<template>
  <div>
    <loading-page v-if="loading"></loading-page>
    <h2 class="mb-4">ตั้งค่าค่ายเกม</h2>
    <v-card class="elevation-3 rounded-lg">
      <div class="pa-3 font-weight-bold">
        กรุณาเลือกหมวดเกม
        <div class="row pa-3" v-if="grouplist.group?grouplist.group :false ">
          <draggable
         
          v-model="grouplist.group.results"
          v-bind="dragOptions"
          class="row d-flex justify-center pa-1"
          group="groupcard"
          @start="drag = true"
          @end="drag = false"
        > 
        <div
        class="col-sm-2 col-6"
        v-for="(item, index) in this.grouplist.group.results"
        :key="index"
      >
        <img
          :src="item.image"
          style="max-width: 100%; height: auto; cursor: pointer"
          @click="renderitem(item)"
        />
        <div class="text-center m-auto">
          <v-btn
            small
            rounded
            outlined
            color="black"
            :disabled="canwrite"
            @click="openDetailGroup(item)"
            >image</v-btn
          >
        </div>
      </div>

      
    </draggable>
        </div>
      </div>
    </v-card>
    <div v-show="selection != null">
      <div class="pa-3 text-center">
        <h2 class="font-weight-bold">ตั้งค่า : {{ namegroup }}</h2>
        <div class="error--text font-weight-bold">
          **หมายเหตุ : คลิกที่ค่ายเกมค้างไว้แล้วลากเพื่อจัดเรียง** <br />

          <b style="color: red">
            --การกดบันทึก หรือคืนค่าเริ่มต้น จะบันทึก หรือ คืนค่า
            การตั้งค่าทั้งหมดของทุกค่ายเกม ให้ทำการแกะไขลำดับ และ รูปภาพ
            ให้เสร็จสิ้นก่อนการกดบันทึก--</b
          >
        </div>
      </div>

      <draggable
        v-if="selection == 'LC'"
        v-model="grouplist.casino.results"
        v-bind="dragOptions"
        class="row d-flex justify-center pa-1"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div
          class="col-lg-2 col-12 col-sm-3 text-center pa-1 pa-sm-2 text-center"
          @dragend="checkProvider"
          :key="index"
          v-for="(item, index) in grouplist.casino.results"
        >
          <div class="rounded-lg elevation-4 pa-2">
            <v-switch
              class="my-2 switch-center"
              :label="`${item.status ? 'เปิด' : 'ปิด'}`"
              v-model="item.status"
              hide-details="auto"
            >
            </v-switch>
            <div class="text-center d-flex">
              <v-img
                v-if="item.image"
                :src="item.image"
                alt=""
                height="150"
                width="250"
              />
            </div>

            <p class="text-center frist_color pa-2">
              {{ item.name }}
            </p>

            <div class="text-center">
              <v-btn
                small
                rounded
                outlined
                class="ml-0 ml-sm-3 ml-lg-6"
                color="primary"
                @click="openDetail(item)"
                :disabled="canwrite"
                >images</v-btn
              >
            </div>
          </div>
        </div>
      </draggable>
      <draggable
        v-if="selection == 'SL'"
        v-model="grouplist.slot.results"
        v-bind="dragOptions"
        class="row d-flex justify-center pa-3"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div
          class="col-lg-2 col-12 col-sm-3 text-center pa-1 pa-sm-2 text-center"
          @dragend="checkProvider"
          :key="index"
          v-for="(item, index) in grouplist.slot.results"
        >
          <div class="rounded-lg elevation-4 pa-2">
            <v-switch
              class="my-2 switch-center"
              :label="`${item.status ? 'เปิด' : 'ปิด'}`"
              v-model="item.status"
              hide-details="auto"
            >
            </v-switch>
            <div class="text-center d-flex">
              <v-img
                v-if="item.image"
                :src="item.image"
                alt=""
                height="150"
                width="250"
              />
            </div>

            <p class="text-center frist_color pa-2">
              {{ item.name }}
            </p>

            <div class="text-center">
              <v-btn
                small
                rounded
                outlined
                class="ml-0 ml-sm-3 ml-lg-6"
                color="primary"
                @click="openDetail(item)"
                :disabled="canwrite"
                >images</v-btn
              >
            </div>
          </div>
        </div>
      </draggable>
      <draggable
        v-if="selection == 'ES'"
        v-model="grouplist.esport.results"
        v-bind="dragOptions"
        class="row d-flex justify-center pa-3"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div
          class="col-lg-2 col-12 col-sm-3 text-center pa-1 pa-sm-2 text-center"
          @dragend="checkProvider"
          :key="index"
          v-for="(item, index) in grouplist.esport.results"
        >
          <div class="rounded-lg elevation-4 pa-2">
            <v-switch
              class="my-2 switch-center"
              :label="`${item.status ? 'เปิด' : 'ปิด'}`"
              v-model="item.status"
              hide-details="auto"
            >
            </v-switch>
            <div class="text-center d-flex">
              <v-img
                v-if="item.image"
                :src="item.image"
                alt=""
                height="150"
                width="250"
              />
            </div>

            <p class="text-center frist_color pa-2">
              {{ item.name }}
            </p>

            <div class="text-center">
              <v-btn
                small
                rounded
                outlined
                class="ml-0 ml-sm-3 ml-lg-6"
                color="primary"
                @click="openDetail(item)"
                :disabled="canwrite"
                >images</v-btn
              >
            </div>
          </div>
        </div>
      </draggable>
      <draggable
        v-if="selection == 'FH'"
        v-model="grouplist.fishing.results"
        v-bind="dragOptions"
        class="row d-flex justify-center pa-3"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div
          class="col-lg-2 col-12 col-sm-3 text-center pa-1 pa-sm-2 text-center"
          @dragend="checkProvider"
          :key="index"
          v-for="(item, index) in grouplist.fishing.results"
        >
          <div class="rounded-lg elevation-4 pa-2">
            <v-switch
              class="my-2 switch-center"
              :label="`${item.status ? 'เปิด' : 'ปิด'}`"
              v-model="item.status"
              hide-details="auto"
            >
            </v-switch>
            <div class="text-center d-flex">
              <v-img
                v-if="item.image"
                :src="item.image"
                alt=""
                height="150"
                width="250"
              />
            </div>

            <p class="text-center frist_color pa-2">
              {{ item.name }}
            </p>

            <div class="text-center">
              <v-btn
                small
                rounded
                outlined
                class="ml-0 ml-sm-3 ml-lg-6"
                color="primary"
                @click="openDetail(item)"
                :disabled="canwrite"
                >images</v-btn
              >
            </div>
          </div>
        </div>
      </draggable>
      <draggable
        v-if="selection == 'OT'"
        v-model="grouplist.horse.results"
        v-bind="dragOptions"
        class="row d-flex justify-center pa-3"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div
          class="col-lg-2 col-12 col-sm-3 text-center pa-1 pa-sm-2 text-center"
          @dragend="checkProvider"
          :key="index"
          v-for="(item, index) in grouplist.horse.results"
        >
          <div class="rounded-lg elevation-4 pa-2">
            <v-switch
              class="my-2 switch-center"
              :label="`${item.status ? 'เปิด' : 'ปิด'}`"
              v-model="item.status"
              hide-details="auto"
            >
            </v-switch>
            <div class="text-center d-flex">
              <v-img
                v-if="item.image"
                :src="item.image"
                alt=""
                height="150"
                width="250"
              />
            </div>

            <p class="text-center frist_color pa-2">
              {{ item.name }}
            </p>

            <div class="text-center">
              <v-btn
                small
                rounded
                outlined
                class="ml-0 ml-sm-3 ml-lg-6"
                color="primary"
                @click="openDetail(item)"
                :disabled="canwrite"
                >images</v-btn
              >
            </div>
          </div>
        </div>
      </draggable>
      <draggable
        v-if="selection == 'LT'"
        v-model="grouplist.lotto.results"
        v-bind="dragOptions"
        class="row d-flex justify-center pa-3"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div
          class="col-lg-2 col-12 col-sm-3 text-center pa-1 pa-sm-2 text-center"
          @dragend="checkProvider"
          :key="index"
          v-for="(item, index) in grouplist.lotto.results"
        >
          <div class="rounded-lg elevation-4 pa-2">
            <v-switch
              class="my-2 switch-center"
              :label="`${item.status ? 'เปิด' : 'ปิด'}`"
              v-model="item.status"
              hide-details="auto"
            >
            </v-switch>
            <div class="text-center d-flex">
              <v-img
                v-if="item.image"
                :src="item.image"
                alt=""
                height="150"
                width="250"
              />
            </div>

            <p class="text-center frist_color pa-2">
              {{ item.name }}
            </p>

            <div class="text-center">
              <v-btn
                small
                rounded
                outlined
                class="ml-0 ml-sm-3 ml-lg-6"
                color="primary"
                @click="openDetail(item)"
                :disabled="canwrite"
                >images</v-btn
              >
            </div>
          </div>
        </div>
      </draggable>
      <draggable
        v-if="selection == 'SB'"
        v-model="grouplist.sportbook.results"
        v-bind="dragOptions"
        class="row d-flex justify-center pa-3"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div
          class="col-lg-2 col-12 col-sm-3 text-center pa-1 pa-sm-2 text-center"
          @dragend="checkProvider"
          :key="index"
          v-for="(item, index) in grouplist.sportbook.results"
        >
          <div class="rounded-lg elevation-4 pa-2">
            <v-switch
              class="my-2 switch-center"
              :label="`${item.status ? 'เปิด' : 'ปิด'}`"
              v-model="item.status"
              hide-details="auto"
            >
            </v-switch>
            <div class="text-center d-flex">
              <v-img
                v-if="item.image"
                :src="item.image"
                alt=""
                height="150"
                width="250"
              />
            </div>

            <p class="text-center frist_color pa-2">
              {{ item.name }}
            </p>

            <div class="text-center">
              <v-btn
                small
                rounded
                outlined
                class="ml-0 ml-sm-3 ml-lg-6"
                color="primary"
                @click="openDetail(item)"
                :disabled="canwrite"
                >images</v-btn
              >
            </div>
          </div>
        </div>
      </draggable>
    </div>
    <div class="d-flex justify-center my-3">
      <v-btn
        small
        pill
        color="success"
        :disabled="canwrite"
        @click="saveProvider"
        >บันทึก</v-btn
      >
      <v-btn
        small
        pill
        color="warning"
        :disabled="canwrite"
        class="mx-2"
        @click="resetProvider"
        >คืนค่าเริ่มต้น และบันทึก</v-btn
      >
    </div>
    <v-dialog v-model="showDetail" max-width="800px">
      <v-card>
        <v-row v-if="modal_detail">
          <v-col cols="12" sm="6">
            <div>
              <v-card class="pa-2">
                <div>
                  <small
                    >preview : หากต้องการเปลี่ยนรูป
                    ให้ทำการอัพโหลดรูปของท่านจากผู้ให้บริการ hosting image
                    จากนั้นนำ URL รูปที่อัพโหลด มาใส่แทนที่ URL ปัจจุบัน
                    แล้วกดบันทึก ขนาด frame รูป 220px * 140px
                  </small>
                </div>
                <div class="text-center m-4">
                  <img :src="modal_detail.image" alt="" width="150" />
                </div>
                <div class="text-center m-4">
                  <v-text-field v-model="modal_detail.name"></v-text-field>
                </div>
                <div>
                  <v-text-field
                    type="text"
                    disabled
                    v-model="modal_detail.image"
                  >
                  </v-text-field>
                </div>
                <div class="text-center m-4">
                  <v-btn
                    small
                    pill
                    size="sm"
                    color="success"
                    @click="confirmImage(modal_detail)"
                    >บันทึก</v-btn
                  >
                  <v-btn
                    small
                    v-if="!changePic"
                    pill
                    size="sm"
                    color="primary"
                    @click="changePic = !changePic"
                  >
                    เปลี่ยนรูป
                  </v-btn>
                  <v-btn
                    small
                    pill
                    size="sm"
                    color="error"
                    @click="resetImage(modal_detail)"
                  >
                    reset
                  </v-btn>
                </div>
              </v-card>
            </div>
          </v-col>
          <v-col v-if="changePic" cols="12" sm="6">
            <div v-if="changePic" class="pa-3">
              <label for="">**ไม่เกิน 200KB ขนาด 220px * 140px</label>
              <v-file-input
                required
                @change="selectFile"
                placeholder="อัพโหลดไฟล์รูป"
                drop-placeholder="หรือลากรูปลงที่นี่"
                class="mb-2 mr-sm-2 mb-sm-0 w-100"
              ></v-file-input>
              <div class="m4-3">ไฟล์ที่เลือก : {{ file ? file.name : "" }}</div>
              <label for=""> PREVIEW</label>
              <div class="m-4">
                <img :src="url" style="max-width: 220px; max-height: 140px" />
              </div>

              <div>
                <v-btn color="black" dark small @click="uploadImage"
                  >upload</v-btn
                >
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <!-- Emulate built in modal header close button action -->
    </v-dialog>

    <v-dialog v-model="showDetail_group" max-width="800px">
      <v-card class="pa-3">
        <v-row v-if="modal_detail">
          <v-col cols="12" sm="6">
            <div>
              <v-card class="pa-2">
                <div>
                  <small
                    >preview : หากต้องการเปลี่ยนรูป
                    ให้ทำการอัพโหลดรูปของท่านจากผู้ให้บริการ hosting image
                    จากนั้นนำ URL รูปที่อัพโหลด มาใส่แทนที่ URL ปัจจุบัน
                    แล้วกดบันทึก ขนาด frame รูป 220px * 140px
                  </small>
                </div>
                <div class="text-center m-4">
                  <img :src="modal_detail.image" alt="" width="150" />
                </div>
                <div class="text-center m-4">
                  <v-text-field v-model="modal_detail.name"></v-text-field>
                </div>
                <div>
                  <v-text-field
                    type="text"
                    disabled
                    v-model="modal_detail.image"
                  >
                  </v-text-field>
                </div>
                <v-card-actions class="justify-center">
                  <v-btn
                    small
                    pill
                    size="sm"
                    color="success"
                    @click="confirmImageGroup(modal_detail)"
                    >บันทึก</v-btn
                  >
                  <v-btn
                    small
                    v-if="!changePic"
                    pill
                    size="sm"
                    color="primary"
                    @click="changePic = !changePic"
                  >
                    เปลี่ยนรูป
                  </v-btn>
                  <v-btn
                    small
                    pill
                    size="sm"
                    color="error"
                    @click="resetImage(modal_detail)"
                  >
                    reset
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-col>
          <v-col v-if="changePic" cols="12" sm="6" class="pa-4">
            <div v-if="changePic">
              <label for="">**ไม่เกิน 200KB ขนาด 220px * 140px</label>
              <v-file-input
                required
                @change="selectFile"
                outlined
                dense
                accept="image/png, image/jpeg, image/jpg , image/webp"
                placeholder="อัพโหลดไฟล์รูป"
                drop-placeholder="หรือลากรูปลงที่นี่"
                class="mb-2 mr-sm-2 mb-sm-0 w-100"
              ></v-file-input>
              <div class="m4-3">ไฟล์ที่เลือก : {{ file ? file.name : "" }}</div>
              <label for=""> PREVIEW</label>
              <div class="m-4">
                <img :src="url" style="max-width: 220px; max-height: 140px" />
              </div>

              <div>
                <v-btn
                  color="black"
                  :disabled="canwrite"
                  dark
                  small
                  @click="uploadImage"
                  >upload</v-btn
                >
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <!-- Emulate built in modal header close button action -->
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import draggable from "vuedraggable";
export default {
  components: { draggable },
  data() {
    return {
      showDetail: false,
      selection: null,
      changePic: false,
      loading: false,
      file: null,
      filecheck: false,
      url: "",
      listProvider_backup: [],
      modal_detail: null,
      temp_img: "",
      grouplist: [],
      groupcard: [],
      namegroup: "",
      listProvider: [],
      showDetail_group: false,
    };
  },
  async created() {
    let res = await this.$store.dispatch("setting/getGroup");
    console.log('xczxczxczxc',res);
    this.grouplist = res.json;

    this.groupcard = JSON.parse(localStorage.getItem("groups"));
    // try {
    //   let { data: group } = await this.getGroup();
    //   this.grouplist = group;

    //   console.log(group);
    // } catch (error) {}
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: "ghost",
      };
    },
    ...mapState("auth", ["menu"]),
    canwrite() {
      if (this.menu) {
        if (!this.menu.includes("manageGroup_write")) return true;
        else return false;
      }
    },
  },
  methods: {
    ...mapActions("setting", ["updateHash","getMasterProviderGroup"]),
    selectFile(event) {
      if (event) {
        this.file = event;
        this.url = URL.createObjectURL(this.file);
      }

      this.loading = false;
    },
    async uploadImage() {
      this.loading = true;
      const data = new FormData();
      data.append("file", this.file);
      data.append("filename", this.file.name);
      try {
        let response = await this.$axios.post("https://admin-static-api-qlws7pv5wa-as.a.run.app/api/Update/file/Dynamic/test/secret123", data);
        //   "https://all-member-gateway-qlws7pv5wa-as.a.run.app/api/Gateway/Provider/145c4b748540ca78664b32853e4031b5" );

        console.log(response.data);
        this.modal_detail.image = response.data.picture_url;
        this.changePic = false;
        this.showSuccessAlert(
          "อัพโหลดสำเร็จ อย่าลืมกดบันทึก ด้านล่างสุดเพื่อบันทึกผลการเปลี่ยนแปลง"
        );

        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    async saveProvider() {
      this.loading = true;
      console.log('gdgfdgdg',this.grouplist)
      let res = await this.updateHash( this.grouplist);
      this.$swal({
          title: `ทำรายการสำเร็จ`,
          icon: "success",
          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok",
        });
      this.loading = false;
    },
    async resetProvider() {
      this.loading = true;
      let result = await this.getMasterProviderGroup();
      console.log('master',result)
      this.grouplist = result.json;

      this.groupcard = JSON.parse(localStorage.getItem("groups"));
this.grouplist.hash.replace('_m','')
      await this.updateHash( this.grouplist);
      const temp_backup = this.listProvider_backup;
      this.listProvider = temp_backup;
      this.$swal({
          title: `ทำรายการสำเร็จ`,
          icon: "success",
          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok",
        });
      this.loading = false;
    },
    confirmImageGroup(item) {
      const result = this.grouplist.group.results.find(
        (x) => x.code == item.code
      );
      result.image = item.image.trim();

      this.temp_img = "";
      this.showDetail_group = true;
    },
    confirmImage(item) {
      const result = this.grouplist[item.group].results.find(
        (x) => x.code == item.code
      );
      result.image = item.image.trim();

      this.temp_img = "";
      this.showDetail = false;
    },
    resetImage(item) {
      this.modal_detail.image = this.temp_img;
      this.temp_img = "";
      this.showDetail = false;
    },
    openDetailGroup(item) {
      this.modal_detail = item;
      this.modal_detail.group = this.namegroup;
      this.temp_img = item.image;
      this.showDetail_group = true;
    },
    openDetail(item) {
      this.modal_detail = item;
      this.modal_detail.group = this.namegroup;
      this.temp_img = item.image;
      this.showDetail = true;
    },
    checkProvider() {
      // console.log(this.provider)
      console.log(document.getElementById("simpleList"));
    },

    renderitem(item) {
      // Object.keys(this.grouplist).map((key) => {
      //   const item = this.grouplist[key];
      //   if (item?.results) {
      //     item?.results.map((game) => {
      //       game.status = true;
      //     });
      //   }
      // });
      this.selection = item.code;

      if (item.code == "LC") {
        this.namegroup = "casino";
        // this.listProvider = this.grouplist.casino.results;
      } else if (item.code == "OT") {
        this.namegroup = "horse";
        // this.listProvider = this.grouplist.horse.results;
      } else if (item.code == "SB") {
        this.namegroup = "sportbook";
        // this.listProvider = this.grouplist.sportbook.results;
      } else if (item.code == "ES") {
        this.namegroup = "esport";
        // this.listProvider = this.grouplist.esport.results;
      } else if (item.code == "SL") {
        this.namegroup = "slot";
        // this.listProvider = this.grouplist.slot.results;
      } else if (item.code == "FH") {
        this.namegroup = "fishing";
        // this.listProvider = this.grouplist.fishing.results;
      } else if (item.code == "LT") {
        this.namegroup = "lotto";
        // this.listProvider = this.grouplist.lotto.results;
      }
      // this.listProvider.forEach((x) => {
      //   x.status = true;
      // });
      const temp = this.listProvider;
      this.listProvider_backup = temp;
    },
  },
};
</script>

<style></style>
