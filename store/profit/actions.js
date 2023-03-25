//กำไร / ขาดทุน//
export async function getProfitReport({ commit }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_RICO_REPORT}/api/profitloss_agent/sum_date`,
        {
          params: params,
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

//รายงานฝาก /ถอน ตามบุคคล//
export async function getProfitByUserReport({ commit }, params) {
  return new Promise(async (resolve, reject) => {
    console.log(params, "param");
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_RICO_REPORT}/api/profitloss_member/date`,
        {
          params: params,
        }
      );

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

//PromotionReport//
export async function getProfitByUserReport2({ commit }, paramsIn) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_RICO_REPORT}/api/profitloss_member/date`,
        {
          params: paramsIn,
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

//PromotionReport//
export async function getPromotionReport({ commit }, paramsIn) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_RICO_REPORT}/api/bonus_member/date`,
        {
          params: paramsIn,
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getDetailPromotion( context , paramsIn) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('sss',paramsIn)
      let { data } = await this.$axios.get(
        // `http://localhost:3100/api/Deposit/DetailPromotion/${context.rootState.auth.company}/${context.rootState.auth.agent}`,
      
        `${process.env.ALL_DEPOSIT}/api/Deposit/DetailPromotion/${context.rootState.auth.company}/${context.rootState.auth.agent}`,
        {
          params: paramsIn,
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}