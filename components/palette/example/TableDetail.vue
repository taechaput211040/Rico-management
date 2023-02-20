<template>
  <v-card :style="` background:${bgTable} !important;`"
    ><v-data-table
      class="headerColor"
      hide-default-footer
      :item-class="itemRowBackground"
      :items="dataExample"
      :headers="header"
    >
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      header: [
        {
          text: "header1",
          value: "examplevalue1",
          sortable: false,
          align: "center",
          class: "headerText",
        },
        {
          text: "header1",
          value: "examplevalue2",
          sortable: false,
          align: "center",
        },
        {
          text: "header1",
          value: "examplevalue3",
          sortable: false,
          align: "center",
        },
        {
          text: "header1",
          value: "examplevalue4",
          sortable: false,
          align: "center",
        },
      ],
      dataExample: [
        {
          examplevalue1: "body1",
          examplevalue2: "body2",
          examplevalue3: "body3",
          examplevalue4: "body4",
        },
      ],
    };
  },
  props: {
    bgHeader: { default: String },
    textColor: { default: String },
  },
  mounted() {
    this.selectTextColor();
    this.selectBgheaderColor();
  },
  watch: {
    bgHeader() {
      this.selectBgheaderColor();
    },

    textColor() {
      this.selectTextColor();
    },
  },
  methods: {
    selectBgheaderColor() {
      //   let boxParaRule
      document.getElementsByClassName(
        "v-data-table-header"
      )[0].style.background = this.bgHeader;
      console.log(this.bgHeader, "this.bgHeader");
      //   bgColorBtn.style.setProperty('background-color', activeMenu)
    },
    itemRowBackground: function (item) {
      return "itemRowBackground";
    },

    selectTextColor() {
      console.log(
        document.getElementsByClassName("headerText")[0].style.color,
        "asds"
      );
      document.getElementsByClassName("headerText")[0].style.color =
        this.textColor;
    },
  },
};
</script>

<style></style>
