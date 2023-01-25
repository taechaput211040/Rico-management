<template>
  <div>
    <h2 class="mv-4">ตั้งค่าเกมสล็อต</h2>
    <v-card class="elevation-3 rounded-lg">
      <div class="pa-3 font-weight-bold">
        กรุณาเลือกค่ายเกม
        <div class="row pa-3">
          <div
            class="col-sm-2 col-6"
            v-for="(item, index) in groupcard.results"
            :key="index"
          >
            <a href="#list"
              ><img
                :src="item.image"
                style="max-width: 100%; height: auto; cursor: pointer"
                @click="renderitem(item)"
            /></a>
          </div>
        </div>
      </div>
    </v-card>
    <v-card
      class="elevation-3 rounded-lg mt-3"
      id="list"
      v-show="selection != null"
      ><div class="pa-3 text-center">
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
        v-if="listProvider.length > 0"
        v-model="listProvider"
        v-bind="dragOptions"
        class="row d-flex justify-center pa-3"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div
          class="col-lg-2 col-6 col-sm-3 pa-3 text-center pa-4 text-center"
          @dragend="checkProvider"
          :key="index"
          v-for="(item, index) in listProvider"
        >
          <img
            v-if="item.image"
            :src="item.image"
            alt=""
            style="max-width: 100%; height: auto; cursor: pointer"
            width="220"
            height="140"
          />
          <p class="text-center frist_color pa-2">
            {{ item.name }}
          </p>
          <v-row align="center" justify="center">
            <v-checkbox
              hide-details
              v-model="item.status"
              name="check-button"
              switch
            >
            </v-checkbox>
            <div class="text-center m-auto">
              <v-btn
                small
                rounded
                outlined
                color="black"
                pill
                size="sm"
                variant="outline-primary"
                @click="openDetail(item)"
                >image</v-btn
              >
            </div></v-row
          >
        </div>
      </draggable>
      <div style="display: flex; justify-content: center" class="mt-4">
        <v-btn
          small
          rounded
          outlined
          color="black"
          pill
          variant="success"
          @click="saveProvider"
          >บันทึก</v-btn
        >
        <v-btn
          small
          rounded
          outlined
          color="black"
          pill
          variant="warning"
          @click="resetProvider"
          class="ml-4"
          >คืนค่าเริ่มต้น และบันทึก</v-btn
        >
      </div>
    </v-card>
    <v-dialog v-model="showDetail" size="xl" hide-footer>
      <v-card class="pa-3">
        <!-- Emulate built in modal header close button action -->
        <v-row>
          <v-col cols="6">
            <div class="container m-auto">
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
                  <img
                    :src="modal_detail ? modal_detail.image : null"
                    alt=""
                    width="150"
                  />
                </div>

                <div class="text-center m-4">
                  <v-btn
                    small
                    rounded
                    outlined
                    color="black"
                    pill
                    size="sm"
                    variant="outline-success"
                    @click="confirmImage(modal_detail)"
                    >บันทึก</v-btn
                  >
                  <v-btn
                    small
                    rounded
                    outlined
                    color="black"
                    v-if="!changePic"
                    pill
                    size="sm"
                    variant="outline-primary"
                    @click="changePic = !changePic"
                  >
                    เปลี่ยนรูป
                  </v-btn>
                  <v-btn
                    small
                    rounded
                    outlined
                    color="black"
                    pill
                    size="sm"
                    variant="outline-danger"
                    @click="resetImage(modal_detail)"
                  >
                    reset
                  </v-btn>
                </div>
              </v-card>
            </div>
          </v-col>
          <v-col v-if="changePic" cols="6">
            <div v-if="changePic">
              <label for="">**ไม่เกิน 200KB ขนาด 220px * 140px</label>
              <v-file-input
                required
                @change="selectFile"
                :state="Boolean(file)"
                solo
                hide-details
                placeholder="อัพโหลดไฟล์รูป"
                drop-placeholder="หรือลากรูปลงที่นี่"
                class="my-2 mr-sm-2 w-100"
              ></v-file-input>
              <div class="m4-3">ไฟล์ที่เลือก : {{ file ? file.name : "" }}</div>
              <label for=""> PREVIEW</label>
              <div class="m-4">
                <img :src="url" style="max-width: 220px; max-height: 140px" />
              </div>

              <div>
                <v-btn small rounded outlined color="black" @click="uploadImage"
                  >upload</v-btn
                >
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: { draggable },
  data() {
    return {
      changePic: false,
      loading: false,
      groupKey: [],
      selection: null,
      listProvider_backup: [],
      modal_detail: null,
      temp_img: "",
      grouplist: [],
      groupcard: [],
      namegroup: "",
      listProvider: [],
      file: null,
      filecheck: false,
      url: "",
      showDetail: false,
    };
  },
  async created() {
    let { slot } = await this.$store.dispatch("setting/getGroup");

    let res = await this.$store.dispatch("setting/getGame");

    this.grouplist = res;
    console.log(res, "res");
    this.groupKey = Object.keys(this.grouplist);

    console.log(this.groupKey);
    this.groupcard = slot;
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
  },
  methods: {
    selectFile(value) {
      // console.log());
      // if (
      //   event.target.files[0].type != "image/jpeg" &&
      //   event.target.files[0].type != "image/png" &&
      //   event.target.files[0].type != "image/svg+xml"
      // ) {
      //   this.showErrorAlert("โปรดใฃ้ไฟล์รูปภาพเท่านั้น");
      //   this.file = "";

      //   this.filecheck = false;
      //   event.files = null;
      //   this.url = "";
      //   return;
      // }
      // if (parseInt(event.target.files[0].size) > 300000) {
      //   this.file = "";

      //   this.filecheck = false;
      //   event.files = null;
      //   this.url = "";
      //   this.showErrorAlert("ไฟล์ขนาดไม่เกิน 200KB");

      //   return;
      // }
      if (value) {
        this.file = value;
        this.url = URL.createObjectURL(this.file);
        this.loading = false;
      } else {
        this.url = "";
      }
    },
    async uploadImage() {
      this.loading = true;
      const data = new FormData();
      data.append("file", this.file);
      data.append("filename", this.file.name);
      try {
        let response = await axios.post("/api/Upload", data);
        //   "https://all-member-gateway-ehhif4jpyq-as.a.run.app/api/Gateway/Provider/145c4b748540ca78664b32853e4031b5" );

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
    resetProvider() {
      const temp_backup = this.listProvider_backup;
      this.listProvider = temp_backup;
    },
    confirmImage(item) {
      item.image = item.image.trim();
      this.listProvider = this.listProvider.map((x) => {
        if (item.name == x.name) x.image = item.image;
      });
      this.temp_img = "";
      this.showDetail = true;
    },
    resetImage(item) {
      this.modal_detail.image = this.temp_img;
      this.temp_img = "";
      this.showDetail = false;
    },
    openDetail(item) {
      this.modal_detail = item;
      this.modal_detail.group = this.namegroup;
      this.temp_img = item.image;
      this.showDetail = true;
    },
    checkProvider() {
      this.grouplist[this.selection] = this.listProvider;
      // console.log(this.provider)
      // console.log(document.getElementById("simpleList"));
    },
    async saveProvider() {
      this.loading = true;
      let res = await this.$store.dispatch("updateHashGame", this.grouplist);
      this.showSuccessAlert("บันทึกสำเร็จ");
      this.loading = false;
    },
    async resetProvider() {
      this.loading = true;
      let result = await this.$store.dispatch("getMasterGameGroup");
      this.grouplist = result;

      await this.$store.dispatch("updateHashGame", this.grouplist);
      const temp_backup = this.listProvider_backup;
      this.listProvider = temp_backup;
      this.loading = false;
    },
    renderitem(item) {
      console.log(item, "item");
      console.log(this.grouplist, "item");

      // Object.keys(this.grouplist).map((key) => {
      //   const item = this.grouplist[key];
      //   if(Array.isArray(item) )
      //   {
      //      item.map((game) => {
      //           game.status = true;
      //         });
      //   }

      //     });
      this.selection = item.code;
      this.namegroup = item.name;
      this.listProvider = this.grouplist[item.code];

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
