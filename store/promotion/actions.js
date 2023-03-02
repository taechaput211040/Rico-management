export function getCashback(context) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${
          process.env.ALL_CASHBACK
        }/api/Cashback/GetCashBackSettingAuto/${localStorage.getItem(
          "company"
        )}/${localStorage.getItem("agent")}`
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

export function saveCashback(context, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.patch(
        `${process.env.ALL_CASHBACK}/api/Cashback/SaveCashBackSetting`,
        payload
      );
      resolve(data);
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
      let { data } = await this.$axios.get(
        `${
          process.env.ALL_PROMOTION
        }/api/Promotion/Auto/Main/${localStorage.getItem(
          "company"
        )}/${localStorage.getItem("agent")}`
      );
    
      context.commit("set_promotion", data);

      let bonuslist = data.map((x) => {
        return { text: x.promotionname, value: x.id };
      });
      bonuslist.unshift({ text: "ไม่รับโบนัส", value: "0" });
      context.commit("set_bonuslist", bonuslist);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export function updatedPromotion({ state }, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.patch(
        `${process.env.ALL_PROMOTION}/api/Promotion/Auto`,
        { ...payload }
      );
      console.log(payload);
      resolve(data);
    } catch (error) {
      reject("error");
    }
  });
}
export function addNewPromotion(context, payload) {
  payload.agent = context.rootState.auth.agent
  payload.company = context.rootState.auth.company
  payload.operator = context.rootState.auth.user
  payload.ip_operator = context.rootState.auth.ip
  payload.hash = context.rootState.auth.hash
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.post(
        `${process.env.ALL_PROMOTION}/api/Promotion/Auto`,
        { ...payload }
      );
      resolve(data);
    } catch (error) {
      reject("error");
    }
  });
}

export function deletedPromotion(context, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.delete(
        `${process.env.ALL_PROMOTION}/api/Promotion/Auto/${payload}`
      );
      // console.log('old',context.state.itempromotion)
      let new_ob = context.state.itempromotion.filter(x=>x.id !=payload)
// console.log('new',new_ob)
      context.commit("updatePromotionAfterDelete",new_ob)
      // console.log(`${process.env.ALL_PROMOTION}/api/Promotion/Auto/${payload}`);
      resolve(data);
    } catch (error) {
      reject("error");
    }
  });
}
