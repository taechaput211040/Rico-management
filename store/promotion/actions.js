//getcashback
export function getCashback(context) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: {
          casino: 5,
          collect_type: "DAY",
          created_at: "2021-04-26T11:29:02.000000Z",
          esport: 2,
          football: 5,
          game: 5,
          id: 1,
          lotto: 5,
          m2: 2,
          max_amount: 0,
          multi_player: 2,
          parlay: 5,
          pictureUrl:
            "https://image-storage-betkub.s3.ap-southeast-1.amazonaws.com/images/0BOIpDTgDtjz3sLMFjqEzy6BUnJV9fFgASRZT1MM.jpg",
          rate: 5,
          status: 1,
          step: 5,
          update_by: "RICO",
          updated_at: "2022-01-16T05:18:59.000000Z",
          wdlimit_multiply: 1000000,
        },
      };
      // let response = await this.$axios.get("apigetuser")
      // });
      // resolve(response);
      resolve(response);
      console.log(mockuser);
      return;
    } catch (error) {
      reject(error);
    }
  });
}
//getcashback
//getPromotion

export function getPromotion(context) {
  return new Promise(async (resolve, reject) => {
    try {
      // const response = {
      //   data: [
      //     {
      //       id: 3,
      //       promotiondescription:
      //         "New member Promotion\nအဖွဲ့ဝင်အသစ်များ မှတ်ပုံတင်ပြီး 100% ဘောနပ်စ်ကို ရယူလိုက်ပါ။ \nအများဆုံး ဘောနပ် 200,000 mmk/Turnover 20x\nအဖွဲ့ဝင်အသစ်များသည် တစ်ဦးလျှင် ဘောနပ်စ်တစ်ကြိမ်သာရရှိမည်။\nငွေသွင်းပမာဏတွင် ဤပရိုမိုးရှင်းမှရရှိသော ဘောနပ်စ်များ ပါဝင်သည်။\nကြိုတင်သတိမပေးပဲ Beggar119 သည်  ဤပရိုမိုးရှင်းကို အချိန်မရွေး ပယ်ဖျက်ပြောင်းလဲပိုင်ခွင့်ရှိသည်။",
      //       promotionname: "အဖွဲ့ဝင်အသစ်များ ဘောနပ်စ်များ ရရှိပါမည်။  100%",
      //       promotionpic:
      //         "https://image-storage-betkub.s3.ap-southeast-1.amazonaws.com/images/Pae0QS3qc2dmeK4IMURNMCwxv0NmLp8nN7Jfydkv.jpg",
      //       status: true,
      //       detail: [
      //         {
      //           CASINO: 35,
      //           ESPORT: null,
      //           FOOTBALL: 20,
      //           GAME: 20,
      //           LOTTO: 20,
      //           M2: null,
      //           MULTI_PLAYER: null,
      //           PARLAY: 20,
      //           STEP: 20,
      //           bonus: 300,
      //           bonuscount: null,
      //           bonusdurationFrom: null,
      //           bonusdurationTo: null,
      //           bonustype: "%",
      //           bonusvalue: 100,
      //           days: 7,
      //           deposit: 300,
      //           durationstatus: false,
      //           maxbonusvalue: 3000,
      //           maxdp: 100000,
      //           mindp: 0,
      //           promotiontypename: "สมัครสมาชิกใหม่",
      //           newmemberRule: [{ id: 157, mindp: 0, maxdp: 0, bonusvalue: 0 }],
      //           rulestatus: false,
      //           typestatus: true,
      //           wdlimit: 0
      //         },
      //         {
      //           CASINO: 2,
      //           ESPORT: null,
      //           FOOTBALL: 2,
      //           GAME: 2,
      //           LOTTO: 2,
      //           M2: null,
      //           MULTI_PLAYER: null,
      //           PARLAY: 2,
      //           STEP: 2,
      //           bonus: 300,
      //           bonuscount: null,
      //           bonusdurationFrom: null,
      //           bonusdurationTo: null,
      //           bonustype: "%",
      //           bonusvalue: 0,
      //           days: 7,
      //           deposit: 300,
      //           durationstatus: false,
      //           maxbonusvalue: 5000,
      //           maxdp: 100000,
      //           mindp: 0,
      //           promotiontypename: "ฝากครั้งแรกของวัน",
      //           firstdepositRule: [
      //             { id: 158, mindp: 0, maxdp: 0, bonusvalue: 0 }
      //           ],
      //           rulestatus: false,
      //           typestatus: false,
      //           wdlimit: 0
      //         },
      //         {
      //           CASINO: 2,
      //           ESPORT: null,
      //           FOOTBALL: 2,
      //           GAME: 2,
      //           LOTTO: 2,
      //           M2: null,
      //           MULTI_PLAYER: null,
      //           PARLAY: 2,
      //           STEP: 2,
      //           bonus: 300,
      //           bonuscount: null,
      //           bonusdurationFrom: null,
      //           bonusdurationTo: null,
      //           bonustype: "%",
      //           bonusvalue: 0,
      //           days: 7,
      //           deposit: 300,
      //           durationstatus: false,
      //           maxbonusvalue: 5000,
      //           maxdp: 100000,
      //           mindp: 0,
      //           promotiontypename: "ฝากทั้งวัน",
      //           alldayRule: [{ id: 157, mindp: 0, maxdp: 0, bonusvalue: 0 }],
      //           rulestatus: false,
      //           typestatus: false,
      //           wdlimit: 0
      //         },
      //         ,
      //         {
      //           CASINO: 2,
      //           ESPORT: null,
      //           FOOTBALL: 2,
      //           GAME: 2,
      //           LOTTO: 2,
      //           M2: null,
      //           MULTI_PLAYER: null,
      //           PARLAY: 2,
      //           STEP: 2,
      //           bonus: 300,
      //           bonuscount: null,
      //           bonusdurationFrom: null,
      //           bonusdurationTo: null,
      //           bonustype: "%",
      //           bonusvalue: 0,
      //           days: 7,
      //           deposit: 300,
      //           durationstatus: false,
      //           maxbonusvalue: 5000,
      //           maxdp: 100000,
      //           mindp: 0,
      //           promotiontypename: "ฝากต่อเนื่อง",
      //           rulestatus: false,
      //           typestatus: false,
      //           wdlimit: 0
      //         }
      //       ]
      //     },
      //     {
      //       id: 7,
      //       promotiondescription:
      //         "နေ့စဥ်ငွေသွင်း‌ဘောနပ် 50% ရယူချိန်\nနေ့လည် 2 နာရီမှ 4 နာရီ\nturn over 15x အများဆုံးပေးဘောနပ် 33333 mmk ဖြစ်သည်။",
      //       promotionname: "2-4pm နေ့စဥ်ငွေသွင်း‌ဘောနပ် 50% ရယူချိန်",
      //       promotionpic:
      //         "https://image-storage-betkub.s3.ap-southeast-1.amazonaws.com/images/dQswx0LuFsbMT3kbO16XLfMjLwqGgWnOOkZ6hC0R.jpg",
      //       status: false,
      //       detail: [
      //         {
      //           CASINO: 2,
      //           ESPORT: null,
      //           FOOTBALL: 2,
      //           GAME: 2,
      //           LOTTO: 2,
      //           M2: null,
      //           MULTI_PLAYER: null,
      //           PARLAY: 2,
      //           STEP: 2,
      //           bonus: 300,
      //           bonuscount: null,
      //           bonusdurationFrom: null,
      //           bonusdurationTo: null,
      //           bonustype: "%",
      //           bonusvalue: 0,
      //           days: 7,
      //           deposit: 300,
      //           durationstatus: false,
      //           maxbonusvalue: 5000,
      //           maxdp: 100000,
      //           mindp: 0,
      //           promotiontypename: "สมัครสมาชิกใหม่",
      //           rulestatus: false,
      //           typestatus: false,
      //           wdlimit: 0
      //         },
      //         {
      //           CASINO: 2,
      //           ESPORT: null,
      //           FOOTBALL: 2,
      //           GAME: 2,
      //           LOTTO: 2,
      //           M2: null,
      //           MULTI_PLAYER: null,
      //           PARLAY: 2,
      //           STEP: 2,
      //           bonus: 300,
      //           bonuscount: null,
      //           bonusdurationFrom: null,
      //           bonusdurationTo: null,
      //           bonustype: "%",
      //           bonusvalue: 0,
      //           days: 7,
      //           deposit: 300,
      //           durationstatus: false,
      //           maxbonusvalue: 5000,
      //           maxdp: 100000,
      //           mindp: 0,
      //           promotiontypename: "ฝากครั้งแรกของวัน",
      //           rulestatus: false,
      //           typestatus: false,
      //           wdlimit: 0
      //         },
      //         {
      //           CASINO: 30,
      //           ESPORT: null,
      //           FOOTBALL: 15,
      //           GAME: 15,
      //           LOTTO: 15,
      //           M2: null,
      //           MULTI_PLAYER: null,
      //           PARLAY: 15,
      //           STEP: 15,
      //           bonus: 300,
      //           bonuscount: 1,
      //           bonusdurationFrom: "14:30:00",
      //           bonusdurationTo: "16:30:00",
      //           bonustype: "%",
      //           bonusvalue: 50,
      //           days: 7,
      //           deposit: 300,
      //           durationstatus: false,
      //           maxbonusvalue: 500,
      //           maxdp: 100000,
      //           mindp: 0,
      //           promotiontypename: "ฝากทั้งวัน",
      //           rulestatus: false,
      //           typestatus: true,
      //           wdlimit: 0
      //         },
      //         ,
      //         {
      //           CASINO: 2,
      //           ESPORT: null,
      //           FOOTBALL: 2,
      //           GAME: 2,
      //           LOTTO: 2,
      //           M2: null,
      //           MULTI_PLAYER: null,
      //           PARLAY: 2,
      //           STEP: 2,
      //           bonus: 300,
      //           bonuscount: null,
      //           bonusdurationFrom: null,
      //           bonusdurationTo: null,
      //           bonustype: "%",
      //           bonusvalue: 0,
      //           days: 7,
      //           deposit: 300,
      //           durationstatus: false,
      //           maxbonusvalue: 5000,
      //           maxdp: 100000,
      //           mindp: 0,
      //           promotiontypename: "ฝากต่อเนื่อง",
      //           rulestatus: false,
      //           typestatus: true,
      //           wdlimit: 0
      //         }
      //       ]
      //     }
      //   ]
      // };

      let { data } = await this.$axios.get(
        `${
          process.env.ALL_PROMOTION
        }/api/Promotion/Auto/Main/${localStorage.getItem(
          "company"
        )}/${localStorage.getItem("agent")}`
      );

      context.commit("set_promotion", data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export function updatedPromotion({state},payload) {
  return new Promise(async (resolve,reject) =>{
      try{
        let { data } = await this.$axios.patch(
          `${
            process.env.ALL_PROMOTION
          }/api/Promotion/Auto`
        ,{...payload});
        console.log(payload)
          resolve(data)
      }catch(error){
        reject('error')
      }
    
   
  })
}
export function deletedPromotion(contex,payload){
  return new Promise(async (resolve,reject) =>{
    try{
      let { data } = await this.$axios.delete(
        `${
          process.env.ALL_PROMOTION
        }/api/Promotion/Auto/${payload}`);

      console.log( `${
          process.env.ALL_PROMOTION
        }/api/Promotion/Auto/${payload}`)
        resolve(data)
    }catch(error){
      reject('error')
    }
  
 
})
}
//getPromotion
