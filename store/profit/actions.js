//กำไร / ขาดทุน//
export async function getProfitReport({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: {
          amount: 1050,
          bonus: 812.5,
          bonusAllDay: 187.5,
          bonusCheckin: 178,
          bonusCreditfree: 0,
          bonusDp7Days: 0,
          bonusFirstDp: 0,
          bonusManualTopup: 150,
          bonusNewMember: 255,
          bonusWheel: 0,
          totalCashback: 42,
          totalbonus: 812.5,
          withdraw: 239
        }
      };
      // let response = await api.get(`/api/getProfitReport`, {
      //   params: {
      //     ..fillter
      //   }
      // });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

//รายงานฝาก /ถอน ตามบุคคล//
export async function getProfitByUserReport({ commit }, params){
  return new Promise(async (resolve, reject) => {
    try {
      let {data} = await this.$axios.get(
        `${process.env.ALL_PROFIT_LOSS}/api/profitloss_agent/date?${params}`
      );
      console.log(data);


      // const response = {
      //   data: {
      //     current_page: 1,
      //     data: [
      //       {
      //         username: "BE943959890",
      //         deposit_count: 1,
      //         withdraw_count: null,
      //         deposit_total: 1000,
      //         withdraw_total: null,
      //         total: 1000,
      //         telephone: '0899999991',
      //         upline: 'test',
      //       },
      //       {
      //         username: "BE953145403",
      //         deposit_count: 5,
      //         withdraw_count: 1,
      //         deposit_total: 680,
      //         withdraw_total: 80,
      //         total: 600
      //       },
      //       {
      //         username: "BE9698716644",
      //         deposit_count: 3,
      //         withdraw_count: null,
      //         deposit_total: 525,
      //         withdraw_total: null,
      //         total: 525
      //       },
      //       {
      //         username: "BE9760504482",
      //         deposit_count: 4,
      //         withdraw_count: 2,
      //         deposit_total: 420,
      //         withdraw_total: 1470,
      //         total: -1050
      //       },
      //       {
      //         username: "BE9250732526",
      //         deposit_count: 4,
      //         withdraw_count: null,
      //         deposit_total: 300,
      //         withdraw_total: null,
      //         total: 300
      //       },
      //       {
      //         username: "BE918329719",
      //         deposit_count: 2,
      //         withdraw_count: null,
      //         deposit_total: 270,
      //         withdraw_total: null,
      //         total: 270
      //       },
      //       {
      //         username: "BE838276327",
      //         deposit_count: 6,
      //         withdraw_count: null,
      //         deposit_total: 250,
      //         withdraw_total: null,
      //         total: 250
      //       },
      //       {
      //         username: "BE930319555",
      //         deposit_count: 2,
      //         withdraw_count: null,
      //         deposit_total: 200,
      //         withdraw_total: null,
      //         total: 200
      //       },
      //       {
      //         username: "BE655733683",
      //         deposit_count: 1,
      //         withdraw_count: null,
      //         deposit_total: 134,
      //         withdraw_total: null,
      //         total: 134
      //       },
      //       {
      //         username: "BE912221029",
      //         deposit_count: 2,
      //         withdraw_count: null,
      //         deposit_total: 100,
      //         withdraw_total: null,
      //         total: 100
      //       },
      //       {
      //         username: "BE620269146",
      //         deposit_count: 2,
      //         withdraw_count: null,
      //         deposit_total: 100,
      //         withdraw_total: null,
      //         total: 100
      //       },
      //       {
      //         username: "BE9693513601",
      //         deposit_count: 1,
      //         withdraw_count: null,
      //         deposit_total: 0,
      //         withdraw_total: null,
      //         total: 0
      //       },
      //       {
      //         username: "BE958295770",
      //         deposit_count: 1,
      //         withdraw_count: null,
      //         deposit_total: 0,
      //         withdraw_total: null,
      //         total: 0
      //       }
      //     ],
      //     first_page_url:
      //       "http://rico.beggar119.com/api/GetAllDPWDByUser/2022-2-10T00:00:00/2022-2-10T23:59:59?page=1",
      //     from: 1,
      //     last_page: 1,
      //     last_page_url:
      //       "http://rico.beggar119.com/api/GetAllDPWDByUser/2022-2-10T00:00:00/2022-2-10T23:59:59?page=1",
      //     links: [
      //       {
      //         url: null,
      //         label: "&laquo; Previous",
      //         active: false
      //       },
      //       {
      //         url:
      //           "http://rico.beggar119.com/api/GetAllDPWDByUser/2022-2-10T00:00:00/2022-2-10T23:59:59?page=1",
      //         label: "1",
      //         active: true
      //       },
      //       {
      //         url: null,
      //         label: "Next &raquo;",
      //         active: false
      //       }
      //     ],
      //     next_page_url: null,
      //     path:
      //       "http://rico.beggar119.com/api/GetAllDPWDByUser/2022-2-10T00:00:00/2022-2-10T23:59:59",
      //     per_page: 50,
      //     prev_page_url: null,
      //     to: 13,
      //     total: 13,
      //     deposit_count: "34",
      //     withdraw_count: "3",
      //     deposit_total: 3979,
      //     withdraw_total: "1550",
      //     transaction_total: 2429
      //   }
      // };

      // let response = await api.get(`/api/getProfitByUserReport`, {
      //   params: {
      //     ..fillter
      //   }
      // });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}


//PromotionReport//
export async function getPromotionReport({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: {
          amount: 3979,
          bonus: 1143.5,
          bonusAllDay: 0,
          bonusCheckin: 0,
          bonusCreditfree: 0,
          bonusDp7Days: 0,
          bonusFirstDp: 0,
          bonusManualTopup: 0,
          bonusNewMember: 1000,
          bonusWheel: 30,
          totalCashback: 113.5,
          totalbonus: 1143.5,
          withdraw: 1550
        }
      };
      // let response = await api.get(`/api/getPromotionReport`, {
      //   params: {
      //     ..fillter
      //   }
      // });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
