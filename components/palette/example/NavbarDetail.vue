<template>
  <div style="width: 100%" class="row">
    <div class="col-12 col-sm-6">
      <v-card
        class="mx-auto overflow-hidden"
        :style="`color:${text_color}; background:${bgMainColor} !important;`"
        height="200"
        width="100%"
      >
        <v-card class="rounded-none"  height="50" :style="`background: ${Color} !important;`">
          <div class="d-flex align-center">
            <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>

            <v-spacer></v-spacer>
          </div>
        </v-card>
        <v-card
          height="120px "
          class="pa-2 ma-2 rounded-xl"
          :style="`background: ${bgColorIner} !important;`"
        >
          <v-card-text>
            <h1 :style="`color:${text_color} !important;`">background-color</h1>
          </v-card-text>
        </v-card>
      </v-card>
    </div>
    <div class="col-12 col-sm-6">
      <v-list
        dark
        nav
        dense
        :style="`background:${bgSidebarColor} !important;`"
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            class="v-list-item class-menu pa-1 font-weight-bold"
            active-class="activeColor"
          >
            <v-list-item-title :style="`color:${textWithIcon} !important;`"
              >menu1</v-list-item-title
            >
          </v-list-item>

          <v-list-item
            disabled
            class="v-list-item class-menu pa-1 font-weight-bold"
          >
            <v-list-item-title :style="`color:${textWithIcon} !important;`"
              >menu2
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            disabled
            class="v-list-item class-menu pa-1 font-weight-bold"
          >
            <v-list-item-title :style="`color:${textWithIcon} !important;`"
              >menu3</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    ActiveClass() {
      return;
    },
  },

  data() {
    return {
      drawer: false,
      group: 0,
    };
  },
  props: {
    Color: { default: String },
    bgSidebarColor: { default: String },
    bgMainColor: { default: String },
    bgColorIner: { default: String },
    activeMenu: { default: String },
    text_color: { default: String },
    textWithIcon: { default: String },
  },
  mounted() {
    this.selectColor();
  },
  watch: {
    group() {
      this.drawer = false;
    },
    activeMenu() {
      this.selectColor();
    },
  },
  methods: {
    selectColor() {
      //   let boxParaRule
      var el = (document.getElementsByClassName(
        "activeColor"
      )[0].style.background = this.activeMenu);
      console.log(el);
      //   bgColorBtn.style.setProperty('background-color', activeMenu)
    },
  },
};
</script>

<style></style>
