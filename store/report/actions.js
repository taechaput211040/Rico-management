export async function getStaffLog(
  { rootState },
  params = {
    username: undefined,
    order: "ASC",
    page: undefined,
    take: undefined,
    action: "ALL",
    start: undefined,
    end: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    console.log("work");
    try {
      let response = await this.$axios.get(
        `${
          process.env.ALL_RICO_USER
        }/api/User/Transaction/${localStorage.getItem(
          "agent"
        )}/${localStorage.getItem("company")}`,
        {
          params: {
            username: params.username,
            order: "ASC",
            page: params.page,
            take: params.take,
            action: "ALL",
            start: params.start,
            end: params.end,
          },
        }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function GetDplist({ rootState, commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await this.$axios.get(
        `https://all-deposit-ehhif4jpyq-as.a.run.app/api/Deposit/Dashboard/${rootState.auth.company}/${rootState.auth.agent}`
      );
      commit("setDplist", data);
      resolve(data);
      return;
    } catch (error) {
      reject(error);
    }
  });
}

export function GetWdlist({ rootState,commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await this.$axios.get(
        `https://all-withdraw-ehhif4jpyq-as.a.run.app/api/Withdraw/Auto/DashBoard/${rootState.auth.company}/${rootState.auth.agent}`
      );
      commit("setWdlist", data);
      resolve(data);
      return;
    } catch (error) {
      reject(error);
    }
  });
}
