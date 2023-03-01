//ตั้งค่าระบบ
export function getSetting(context, rootState, commit, state) {
  console.log(context);
  return new Promise(async (resolve, reject) => {
    if (!context.rootState.setting.setting) {
      try {
        console.log("no");
        let { data } = await this.$axios.get(
          `${process.env.ALL_SETTING}/api/Setting/${context.rootState.auth.hash}`
        );
        await context.commit("setAllsetting", data);

        console.log("asdasdasdasd", data);
        resolve(data);
      } catch (error) {
        reject(error);
        //** */
      }
    } else {
      console.log("hio");
      resolve(context.rootState.setting.setting);
    }
  });
}
//ตั้งค่าระบบ

//ตั้งค่าอื่นๆ
export function getIncome(context, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${
          process.env.ALL_NOTIFICATE
        }/all_notifly/api/setting?agent=${localStorage.getItem(
          "agent"
        )}&company=${localStorage.getItem("company")}`
      );

      resolve(data);
      return;
    } catch (error) {
      reject(error);
    }
  });
}
//ตั้งค่าอื่นๆ
//ตั้งค่าอื่นๆ
export function setNotification(context, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.patch(
        `${process.env.ALL_NOTIFICATE}/all_notifly/api/setting/${payload.id}`,
        payload
      );

      resolve(data);
      return;
    } catch (error) {
      reject(error);
    }
  });
}
//ตั้งค่าอื่นๆ

//เพิ่มรายชื่อ มิจฉาชีพ
export function getCriminallist(context, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_CRIMINAL}/GetCriminal100`
      );

      resolve(response);
      return;
    } catch (error) {
      reject(error);
    }
  });
}
export function createCriminallist(context, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_CRIMINAL}/AddCriminal`,
        body
      );

      resolve(response);
      return;
    } catch (error) {
      reject(error);
    }
  });
}

//เพิ่มรายชื่อ มิจฉาชีพ
//พนักงาน
export function getEmployee({ rootState }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_RICO_USER}/api/User/${localStorage.getItem("agent")}`
      );
      resolve(response);
      resolve(response);
      return;
    } catch (error) {
      reject(error);
    }
  });
}

//พนักงาน

//ธนาคารของเว็บ
export function getCompanybank({ rootState }) {
  console.log("get bank");
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_COMPANY_BANK}/api/Company?company=${rootState.auth.hash}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      // resolve(response);
      resolve(response);

      return;
    } catch (error) {
      reject(error);
    }
  });
}

// getBankByid

export function getBankByid(context, id) {
  return new Promise(async (resolve, reject) => {
    console.log(id);
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_COMPANY_BANK}/api/Company/${id}`
      );

      // resolve(response);
      resolve(response);

      return;
    } catch (error) {
      reject(error);
    }
  });
}
//ธนาคารของเว็บ

export function getEmailBody(context, rootState) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_SCB_CORE}/api/Email/History/${localStorage
          .getItem("agent")
          .toLowerCase()}/${localStorage.getItem("company").toLowerCase()}`
      );
      console.log(response, "restr");
      // resolve(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function getBalanceSCB(context, acc_number) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.API_SCB_CORE}/api/ScbCore/Summary`,
        { acc_number: acc_number }
      );
      console.log(response, "getBalanceSCB");
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
//ธนาคารของเว็บ

// export function getBalanceSCB(context, acc_number) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let response = await this.$axios.get(
//         `${process.env.API_SCB_CORE}/api/Email/Transaction/${acc_number}?page=${page}`
//       );
//       console.log(response, "getBalanceSCB");
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export function sendEmailSCB(context, data_email) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.API_SCB_CORE}/api/Email/SendCode`,
        {
          ...data_email,
          agent: localStorage.getItem("agent").toLowerCase(),
          company: localStorage.getItem("company").toLowerCase(),
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function sendEmailSCBVerify(context, data_send) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.API_SCB_CORE}/api/Email/Verify`,
        {
          ...data_send,
          agent: localStorage.getItem("agent").toLowerCase(),
          company: localStorage.getItem("company").toLowerCase(),
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
//update setting

export function updateSetting({ rootState }, data) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.put(
        `${process.env.ALL_SETTING}/api/Setting/${rootState.auth.hash}/${process.env.AUTH_SECRET}`,
        data
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function tougleStatus({}, status) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_MESSAGE_WEB}/updated`,
        { status: status }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function updateMessage({}, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_MESSAGE_WEB}/updated`,
        payload
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function getMessage({ rootState, commit, state }) {
  return new Promise(async (resolve, reject) => {
    if (!state.message) {
      try {
        let { data } = await this.$axios.get(
          `${process.env.ALL_MESSAGE_WEB}/agent/${rootState.auth.hash}`
        );
        await commit("setAllmessage", data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    } else {
      resolve(state.message);
    }
  });
}

export function DeleteUser({}, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `${process.env.ALL_RICO_USER}/api/User/${id}`
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function createUser({}, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_RICO_USER}/api/User/V2`,
        body
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function updateUser({}, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `${process.env.ALL_RICO_USER}/api/User/V2`,
        body
      );
      console.log("work");
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function createBankCompany({}, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_COMPANY_BANK}/api/Company/V2`,
        body
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function EditBankCompany({}, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `${process.env.ALL_COMPANY_BANK}/api/Company/${body.id}`,
        body
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function deleteBankCompany(contaxt, payload) {
  return new Promise(async (resolve, reject) => {
    console.log(payload, "payload");
    try {
      let response = await this.$axios.delete(
        `${process.env.ALL_COMPANY_BANK}/api/Company/${payload.id}`,
        { data: { updateBy: payload.updateBy } }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function getGroup({ commit, state }) {
  return new Promise(async (resolve, reject) => {
    if (!state.provider_hash) {
      try {
        let response = await this.$axios.get(
          `https://all-member-gateway-ehhif4jpyq-as.a.run.app/api/Gateway/Provider/a4cd92ab1f743a02f94952d8f0b2ec62`
        );
        localStorage.setItem("groups", JSON.stringify(response.data.group));
        commit("setProviderHash", response.data);
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    }
    localStorage.setItem("groups", JSON.stringify(state.provider_hash.group));
    commit("setProviderHash", state.provider_hash);
    resolve(state.provider_hash);
  });
}

export function getGame({ commit, state }) {
  return new Promise(async (resolve, reject) => {
    if (!state.game_hash) {
      try {
        let response = await this.$axios.get(
          "https://all-json-config-ehhif4jpyq-as.a.run.app/api/Provider/Game/admin/aca3656a066a8407ec390f52c297f078"
        );

        localStorage.setItem("Gamelist", JSON.stringify(response.data));
        commit("setGameHash", response.data);

        resolve(response.data);
      } catch (error) {
        reject(error);
        console.log(error);
      }
    }
    resolve(state.game_hash);
  });
}

export function getMasterGameGroup({ commit, state }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get("/api/Game/Master");
      //   "https://all-member-gateway-ehhif4jpyq-as.a.run.app/api/Gateway/Provider/145c4b748540ca78664b32853e4031b5" );

      resolve(response.data);
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
}
export function updateHash({ commit, state }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.put("/api/Provider", {
        json: payload,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function updateHashGame({ commit, state }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.put("/api/Provider/Game", {
        json: payload,
      });
      //
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function getgame({ commit, state }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://all-json-config-ehhif4jpyq-as.a.run.app/api/Provider/admin/game/al/ls`
      );
      //
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function getCreditFree({ commit, rootState }) {
  return new Promise(async (resolve, reject) => {
    try {
      // let { data } = await this.$axios.get(`api/Creditfree/Activity`);
      let { data } = await this.$axios.get(
        `${process.env.ALL_CREDIT_FREE}/api/Activity/admin?hash=${rootState.auth.hash}`,
        {
          headers: {
            Authorization: "f3900da4ef8305ad228dea2eb219baef",
          },
        }
      );
      commit("setActivity", data);
      //
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export function createActivity({ commit, rootState }, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      // let { data } = await this.$axios.get(/api/Activity/admin`);
      let { data } = await this.$axios.post(
        `${process.env.ALL_CREDIT_FREE}/api/Activity/admin`,
        {
          ...payload,
          hash: rootState.auth.hash,
          company: rootState.auth.company,
          agent: rootState.auth.agent,
        },
        {
          headers: {
            Authorization: "f3900da4ef8305ad228dea2eb219baef",
          },
        }
      );
      //
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

export function searchUserAdmin({ commit }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      // let { data } = await this.$axios.get(``);
      let { data } = await this.$axios.get(
        `${process.env.ALL_CREDIT_FREE}/api/Activity/admin/activity/withuser`,
        {
          params: {
            id: params.id,
            username: params.username,
          },
        },
        {
          headers: {
            Authorization: "f3900da4ef8305ad228dea2eb219baef",
          },
        }
      );

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export function topupById({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      // let { data } = await this.$axios.get(``);
      let { data } = await this.$axios.post(
        `${process.env.ALL_CREDIT_FREE}/api/Activity/admin/activity?id='${id}`,
        {
          headers: {
            Authorization: "f3900da4ef8305ad228dea2eb219baef",
          },
        }
      );

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export function updateUserFreecredit({ commit }, user_id) {
  return new Promise(async (resolve, reject) => {
    try {
      // let { data } = await this.$axios.get(``);
      let { data } = await this.$axios.patch(
        `${process.env.ALL_CREDIT_FREE}/api/User/${user_id}`,
        {
          headers: {
            Authorization: "f3900da4ef8305ad228dea2eb219baef",
          },
        }
      );

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export function deleteFreecredit({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      // let { data } = await this.$axios.get(``);
      let data = await this.$axios.delete(
        `${process.env.ALL_CREDIT_FREE}/api/Activity/admin?id=${id}`,
        {
          headers: {
            Authorization: "f3900da4ef8305ad228dea2eb219baef",
          },
        }
      );

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export function updateActivity({ commit, rootState }, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      // let { data } = await this.$axios.get(``);
      let data = await this.$axios.patch(
        `${process.env.ALL_CREDIT_FREE}/api/Activity/admin/${payload.id}`,
        {
          ...payload,
          hash: rootState.auth.hash,
          company: rootState.auth.company,
          agent: rootState.auth.agent,
        },
        {
          headers: {
            Authorization: "f3900da4ef8305ad228dea2eb219baef",
          },
        }
      );

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
