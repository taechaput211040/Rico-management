<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="font-weight-bold" />
      <button
        class="btn btn-primary btn-sm"
        @click.prevent="
          playSound(
            'http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3'
          )
        "
      ><b> {{setting?.companyurl? setting.companyurl:''}}  </b> <br>
        <span class="fa fa-play-circle-o"></span>
      </button>

      <v-spacer />
      <!-- <audio src="~/assets/sound/Doorbell.wav" controls></audio> -->
      <v-chip outlined class="font-weight-bold" color="success"
        ><v-icon left c>mdi-account</v-icon>{{ memberOnline.count }}
        Online member
        <v-icon class="mx-2" @click="showMember = true">mdi-chart-box</v-icon>
      </v-chip>
      <v-tooltip left color="orange">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="dialogsound = true"
            fab
            dark
            v-bind="attrs"
            v-on="on"
            small
            class="mx-3"
            color="orange"
          >
            <v-icon>mdi-volume-high</v-icon>
          </v-btn>
        </template>
        <span>ตั้งค่าเสียง</span>
      </v-tooltip>
      <v-speed-dial direction="bottom" transition="slide-y-transition">
        <template v-slot:activator>
          <v-btn v-model="fab" color="blue darken-2" dark fab>
            <v-icon> mdi-account-circle </v-icon>
          </v-btn>
        </template>
        <v-tooltip
          left
          color="black"
          v-if="$store.state.auth.name === 'Super Admin'"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              v-bind="attrs"
              v-on="on"
              small
              color="black"
              @click="$router.push('/palette')"
            >
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>
          <span>ต้งค่าเว็ป</span>
        </v-tooltip>
        <v-tooltip left color="red">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              v-bind="attrs"
              v-on="on"
              small
              color="red"
              @click="logoutAuto()"
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>ออกจากระบบ</span>
        </v-tooltip>
      </v-speed-dial>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      app
      fixed
      width="270"
    >
      <v-toolbar-title class="font-weight-bold text-center" align-center>
        <img
          :src="image ? image : this.webPalette.logo"
          class="img_logo_bar"
          @click="$router.push('/')"
        />
      </v-toolbar-title>
      <v-list nav dense>
        <div v-for="(link, i) in items" :key="i">
          <v-list-item
            v-if="!link.subLinks"
            :disabled="link.status == 2"
            :to="link.to"
            class="pa-1 font-weight-bold"
            active-class="bg-primary-grediaun"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="link.title" />
            <v-badge
              color="error"
              right
              style="z-index: -1"
              v-if="link.status == 2"
              :disabled="link.status == 2"
              icon="mdi-tools"
              inline
              overlap
            ></v-badge>
          </v-list-item>
          <v-list-group
            color="deep-purple lighten-2 "
            v-else
            :key="link.title"
            no-action
            :prepend-icon="link.icon"
            :value="false"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </template>
            <v-list-item
              class="pa-1"
              v-for="sublink in link.subLinks"
              :to="sublink.to"
              :key="sublink.text"
              :disabled="sublink.status == 2"
              active-class="bg-primary-grediaun"
            >
              <v-list-item-icon>
                <v-icon>{{ sublink.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="sublink.text" />
              <v-badge
                color="error"
                right
                style="z-index: -1"
                v-if="sublink.status == 2"
                :disabled="sublink.status == 2"
                icon="mdi-tools"
                inline
                overlap
              ></v-badge>
            </v-list-item>
          </v-list-group>
        </div>
        <div>
          <v-list-item @click="logoutAuto()" class="pa-1">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout      </v-list-item-title>
      
          </v-list-item>
       
        </div>
      </v-list>

      <v-toolbar-title
        class="font-weight-bold mt-5 text-center"
        style="position: relative; height: 200px"
      >
        <v-tooltip bottom color="red">
          <template v-slot:activator="{ on, attrs }">
            <v-img
              @click="logdownweb()"
              max-height="100"
              max-width="100"
              contain
              v-bind="attrs"
              v-on="on"
              class="ma-auto mt-5 emergency"
              src="https://image.smart-ai-api.com/public/thongtest/emergency.png"
            ></v-img
          ></template>
          <span>ปิดระบบด่วน!!!!</span>
        </v-tooltip>
      </v-toolbar-title>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-slide-x-transition>
        <v-container>
          <div class="mainshow py-sm-4 px-2 rounded-xl">
            <Nuxt />
          </div>
        </v-container>
      </v-slide-x-transition>
      <v-dialog v-model="dialogsound" max-width="290">
        <v-card>
          <v-card-title>
            <h4>ตั้งค่าการแจ้งเตือน</h4>
          </v-card-title>

          <v-card-text class="font-weight-bold">
            <div class="my-2">
              ฝากเงิน (ไม่ออโต้) :
              <v-btn
                color="primary"
                small
                v-if="soundsetting.noauto == true"
                rounded
                @click="setsound('noauto')"
                ><v-icon left>mdi-volume-high</v-icon> เปิด</v-btn
              >
              <v-btn
                color="grey"
                small
                v-if="soundsetting.noauto == false"
                rounded
                @click="setsound('noauto')"
                ><v-icon left>mdi-volume-mute</v-icon> ปิด</v-btn
              >
            </div>
            <div class="my-2">
              ฝากเงิน :
              <v-btn
                color="primary"
                v-if="soundsetting.dp == true"
                small
                rounded
                @click="setsound('dp')"
                ><v-icon left>mdi-volume-high</v-icon> เปิด</v-btn
              ><v-btn
                color="grey"
                v-if="soundsetting.dp == false"
                small
                rounded
                @click="setsound('dp')"
                ><v-icon left>mdi-volume-mute</v-icon> ปิด</v-btn
              >
            </div>
            <div class="my-2">
              ถอนเงิน :
              <v-btn
                color="primary"
                v-if="soundsetting.wd == true"
                small
                rounded
                @click="setsound('wd')"
                ><v-icon left>mdi-volume-high</v-icon> เปิด</v-btn
              >
              <v-btn
                color="grey"
                v-if="soundsetting.wd == false"
                small
                rounded
                @click="setsound('wd')"
                ><v-icon left>mdi-volume-mute</v-icon> ปิด</v-btn
              >
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogsound = false">
              ปิด
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="showMember" max-width="850px">
        <v-card class="pa-3">
          <v-card-title class="justifiy-center font-weight-bold success--text"
            >Member Online</v-card-title
          >
          <v-data-table
            :headers="headersMember"
            :items="memberOnline.data"
            hide-default-footer
          >
            <template #[`item.updated_at`]="{ item }">
              <span>
                {{ item.created_at | dateFormat }}
              </span>
            </template>
          </v-data-table>
          <v-card-actions class="justify-end">
            <v-btn color="error" @click="showMember = false"> ปิด</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import GradientInput from "../components/palette/GradientInput.vue";
export default {
  components: { GradientInput },
  middleware: "auth",
  data() {
    return {
      image: "",
      audio: null,
      messages: [],
      socket: null,
      headersMember: [
        {
          text: "เวลาเข้าเล่นล่าสุด",
          value: "updated_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "Username",
          value: "username",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "ค่ายเกม",
          value: "provider_name",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "Game",
          value: "game_name",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "Ip",
          value: "ip",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "อุปกรณ์ที่ใช้เข้าเล่น",
          value: "device",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
      ],
      showMember: false,
      soundsetting: {
        noauto: true,
        dp: true,
        wd: true,
      },
      dialogsound: false,
      fab: false,
      dialogOutside: false,
      dialogInside: false,
      clipped: false,
      drawer: true,
      fixed: false,

      items: this.$store.state.menu,
      miniVariant: false,
      right: true,
      rightDrawer: false,
    };
  },
  watch: {
    options: {
      async handler() {
        await this.getsatatusBank();
      },
    },
  },
  mounted() {
    // this.socket = this.$socket();
    // if (this.socket) {
    //   this.socket.on("deposit", (msg) => {
    //     console.log("deposit websocket initiate", msg);
    //     this.socketDP(JSON.parse(msg));
    //     // this.messages.push(JSON.parse(msg));
    //   });
    //   this.socket.on("withdraw", (msg) => {
    //     console.log("withdraw websocket initiate", msg);
    //     this.socketWD(JSON.parse(msg));
    //     // this.messages.push(JSON.parse(msg));
    //   });
    // }
  },
  async fetch() {
    let data = await this.$store.dispatch("report/GetDplist");
    let wd = await this.$store.dispatch("report/GetWdlist");
  },
  async created() {
    try {
      await this.getUser();
      await this.getLockdown();
   
    
     
      await this.getFeature();
      await this.getSetting();
      await this.getOnlineMember();
      // console.log("iiiiiiiiii",this.memberOnline)

      let menuitem = await this.$store.state.menu.filter((x) => {
        return x.status == true;
      });
      let item = await new Promise((resolve, reject) => {
        menuitem.map((x) => {
          if (x.subLinks) {
            x.subLinks = x.subLinks.filter((y) => {
              return y.status == true;
            });
          }
          return x;
        });
        resolve(menuitem);
      });

      // let menuitem = await this.$store.state.auth.menu.filter(x => {
      //   return x.status == true;
      // });

      this.items = [...item];
      if (this.$store.state.auth.menu) {
        this.items = await this.items.filter((menu) =>
          this.$store.state.auth.menu.includes(menu.permission)
        );
      } else if (!this.$store.state.auth.menu) {
        this.items = [];
        this.$router.push("/test");
      }

      this.socket = this.$socket();
      if (this.socket) {
        this.socket.on("deposit", async (msg) => {
          console.log("deposit websocket initiate");
          await this.playDeposit();
          await this.addDeposit(JSON.parse(msg));
        });

        this.socket.on("withdraw", async (msg) => {
          console.log("withdraw websocket initiate");

          const check = await this.findInWdList(JSON.parse(msg));
          if (check) {
            console.log("withdraw founded");
            console.log("commiting update state");
            await this.updateComponentkey(false);
            const list = await this.updateWithdrawlistAction(JSON.parse(msg));
            await this.updateWithdrawlist(list);
            await this.updateComponentkey(true);
            console.log("commiting update state done");

            return;
          } else {
            console.log("withdraw not founded");
            await this.addWithdraw(JSON.parse(msg));
            console.log("playing withdraw sound");
            await this.playWithdraw();
          }
        });

        this.socket.on("autostatus", async (msg) => {
          console.log("autostatus websocket initiate");
          // console.log(msg)
          await this.update_action_bank(JSON.parse(msg));
          this.messages.push(JSON.parse(msg));
        });
        this.socket.on("lockdown", async (msg) => {
          console.log("lockdown websocket initiate");
          // console.log(msg)
          const lockdown = JSON.parse(msg);
          if (lockdown.status) await this.logdownweb();
        });
        this.socket.on("noauto", async (msg) => {
          console.log("noauto websocket initiate");
          // console.log(msg)

          await this.addIncoming(JSON.parse(msg));
          await this.playSoundNoauto();
        });
        this.socket.on("remove_noauto", async (msg) => {
          console.log("remove_noauto websocket initiate");
          console.log(JSON.parse(msg));
          await this.RemoveIncoming(JSON.parse(msg));
          // await this.addIncoming(JSON.parse(msg));
          // await this.playSoundNoauto();
        });
        this.socket.on("balance", async (msg) => {
          console.log("balance websocket initiate");
          console.log(JSON.parse(msg));
          const bank_update = await this.UpdateKBankBalance(JSON.parse(msg));
          await this.updateBank(bank_update);
          // await this.addIncoming(JSON.parse(msg));
          // await this.playSoundNoauto();
        });
      }

      setInterval(async x => {

     await this.getOnlineMember();
      console.log('member online opdated')
    }, 60000);
    } catch (error) {
      console.log(error);
    }
  },
  async beforeMount() {
    await this.CheckOrganize();
  },
  computed: {
    ...mapState("account", ["webPalette"]),
    ...mapState("auth", ["memberOnline"]),
    ...mapState("setting", ["setting"]),
  },
  methods: {
    ...mapActions("auth", [
      "getOnlineMember",
      "getUser",
      "getFeature",
      "logout",
      "getLockdown",
      "setLockdown",
      "findInWdList",
      "updateWithdrawlistAction",
      "GetInfomation",
      "UpdateKBankBalance"
      
    ]),
    ...mapActions("account", ["getPalletePreset"]),
    ...mapMutations("auth", [
      "set_logout",
      "update_action_bank",
      "addIncoming",
      "addDeposit",
      "RemoveIncoming",
      "updateWithdrawlist",
      "addWithdraw",
      "updateComponentkey",
      "updateBank"
    ]),
    ...mapActions("setting", ["getSetting"]),
    async playSoundNoauto() {
      if (this.soundsetting.noauto == true) {
        console.log("playing no auto sound");
        this.audio = new Audio(require("@/assets/sound/Doorbell.wav"));

        this.audio.play();
      }
    },
    async playDeposit() {
      if (this.soundsetting.dp == true) {
        console.log("playing deposit sound");
        this.audio = new Audio(require("@/assets/sound/cash.mp3"));

        this.audio.play();
      }
    },
    async playWithdraw() {
      if (this.soundsetting.wd == true) {
        console.log("playing withdraw sound");
        this.audio = new Audio(require("@/assets/sound/whistle.mp3"));

        this.audio.play();
      }
    },
    async CheckOrganize() {
      try {
        await this.getPalletePreset();
      } catch (error) {
        console.log("norest");
        console.log(error);
      }
    },
    async logdownweb() {
      console.log("lockdown");
      await this.setLockdown();
      // await this.logout()
      //   await localStorage.clear();

      // window.location = "http://www.google.com";
      // window.location = "https://www.youtube.com/watch?v=RE_pN8ZUoNE";
    },
    async setsound(type) {
      if (type === "noauto") {
        this.soundsetting.auto = !this.soundsetting.auto;
      } else if (type === "dp") {
        this.soundsetting.dp = !this.soundsetting.dp;
      } else if (type === "wd") {
        this.soundsetting.wd = !this.soundsetting.wd;
      }
    },
    async logoutAuto() {
      try {
        await this.logout();
        await localStorage.clear();
        await this.$router.push("/login");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang="scss"></style>
