//ตั้งค่าระบบ
export function getSetting({ rootState, commit, state }) {
  return new Promise(async (resolve, reject) => {
    if (!state.setting) {
      try {
        console.log("no");
        let { data } = await this.$axios.get(
          `${process.env.ALL_SETTING}/api/Setting/${rootState.auth.hash}`
        );
        await commit("setAllsetting", data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    } else {
      console.log("hio");
      resolve(state.setting);
    }
  });
}
//ตั้งค่าระบบ
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
  console.log('get bank')
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_COMPANY_BANK}/api/Company?company=${rootState.auth.hash}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
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

//ธนาคารของเว็บ

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
        `${process.env.ALL_RICO_USER}/api/User`,
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
