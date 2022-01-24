<template>
  <div>
    <input type="number" v-model="renderdata" />
    <button class="btn btn-success" @click="gendata()">gen</button>

    <pre>{{ dataShow }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      renderdata: "",
      dataShow: ""
    };
  },
  methods: {
    gendata() {
      let buffer = ""; /*เก็บค่าที่เอาไว้เเสดงผล*/
      let inputdata = this.renderdata; /*เก็บค่าที่มึงอินพุทมาไอ้ควาย*/

      for (let row = 1; row <= inputdata; row++) {
        /*Loop เอาใว้วนเเถวนะจ๊ะ*/
        for (let column = 1; column <= inputdata; column = column + 1) {
          /*Loop เอาใว้วนคอลัมป์นะจ๊ะ*/
          if (row == column || column == 1 || column == inputdata) {
            /*เงื่อนไขที่ 1 (ถ้าเเถวเท่ากับคอลัมป์) && เงื่อนไขที่ 2 (ถ้าเเถวเท่ากับ 1) && เงื่อนไขที่ 3 (ถ้าเเถวเท่ากับ ค่าที่มึงอินพุทมาไอ้ควาย) */
            buffer += "X"; /*เอาค่า X ไปเก็บไว้ใน buffer*/
          } else {
            buffer += "O"; /*เอาค่า O ไปเก็บไว้ใน buffer*/
          }
        }
        buffer += "\n"; /*วนลูปนอกเเล้ว เอาค่าขึ้นบรรทัด ไปเก็บไว้ใน buffer*/
      }
      this.dataShow = buffer;
    }
  }
};
</script>

<style></style>
