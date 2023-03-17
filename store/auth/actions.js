import dayjs from "dayjs";

//login//
export function login(context, { username, password, agentkey }) {
  return new Promise(async (resolve, reject) => {
    console.log(process.env.VUE_APP_PATH_MICROSERVICE, "env");


    try {
      let { data } = await this.$axios.post(
        // `${process.env.ALL_RICO_USER}/api/Auth/Login`,
        `${process.env.ALL_RICO_USER}/api/Auth/Login`,
        {
          username: username,
          password: password,
          agent: agentkey,
        }
      );

      console.log(data, "data");
      await context.commit("set_login", data);
      // await context.dispatch("getUser");
      resolve(data);
      // return;
    } catch (error) {
      reject(error);
      // if(error == '​' )
    }
  });
}
//login//

//two-facter
export function getOnlineMember(context) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${
          process.env.CHECK_MAINTAINANCE
        }/api/UserStat/online/${context.rootState.auth.agent.toLowerCase()}`
      );
      await context.commit("set_online_member", data);
      resolve(data);
      // return;
    } catch (error) {
      reject(error);
    }
  });
}

export function twofactor(context, input) {
  return new Promise(async (resolve, reject) => {
    console.log(process.env.VUE_APP_PATH_MICROSERVICE, "env");
    try {
      let { data } = await this.$axios.post(
        `${process.env.ALL_RICO_USER}/api/Auth/two-factor`,
        input
      );
      await context.commit("set_login", data);
      resolve(data);
      // return;
    } catch (error) {
      reject(error);
    }
  });
}
//two-facter

//getuser//
export function getUser(context, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_RICO_USER}/api/Auth/user/V2`
      );
      context.commit("set_user", data);
      resolve(data);
      // return;
    } catch (error) {
      reject(error);
    }
  });
}
//getuser//

//getLockdown
export function getLockdown({ rootState }) {
  return new Promise(async (resolve, reject) => {
    console.log(rootState.auth.agent, "agent");
    console.log(rootState.auth.company, "company");
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_SUPPORT}/api/Lockdowns/${rootState.auth.agent}/${rootState.auth.company}`
      );
      if (response.data.status) {
        try {
          let response = await this.$axios.post(
            `${process.env.ALL_RICO_USER}/api/Auth/logout`
            // `http://localhost:3200/api/Auth/logout`
          );

          // resolve(response);
          localStorage.clear();
          window.location.href = "https://youtube.com";

          resolve(response);
        } catch (error) {
          reject(error);
        }

        // window.location("https://google.com")
        // this.$router.push("https://google.com");
      }
      resolve(response);
      // return;
    } catch (error) {
      reject(error);
    }
  });
}
export function setLockdown(context) {
  return new Promise(async (resolve, reject) => {
    console.log(context.state.company, "company");
    const body = {
      operator: context.state.user,
      company: context.state.company,
      agent: context.state.agent,
      status: true,
    };
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT}/api/Lockdowns/lockdown`,
        body
      );
      if (response.data.status) {
        try {
          let response = await this.$axios.post(
            `${process.env.ALL_RICO_USER}/api/Auth/logout`
            // `http://localhost:3200/api/Auth/logout`
          );

          // resolve(response);
          localStorage.clear();
          context.state.key = null;
          context.state.user = null;
          context.state.group = null;
          context.state.company = null;
          context.state.agent = null;
          context.state.name = null;
          context.state.menu = null;
          context.state.isAdmin = false;
          context.state.hash = null;
          context.state.tokenMember = null;
          window.location.href = "https://youtube.com";
          resolve(response);
        } catch (error) {
          reject(error);
        }

        // window.location("https://google.com")
        // this.$router.push("https://google.com");
      }
      resolve(response);
      // return;
    } catch (error) {
      reject(error);
    }
  });
}
//getfeaturestatus//
export function getFeature(context) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        feature: {
          checkin: { activated: false, setting: { status: false, prize: [] } },
          chest: { activated: false, setting: { status: false, prize: [] } },
          creditfree: {
            activated: true,
            setting: { status: false, prize: [] },
          },
          point: { activated: false, setting: { status: false, prize: [] } },
          premium: { activated: false, setting: { status: false, prize: [] } },
          sixcard: { activated: false, setting: { status: false, prize: [] } },
          wheel: { activated: true },
        },
      };
      // console.log(response.feature);
      // let response = await this.$axios.get("apigetFeature")
      // });
      // resolve(response);
      resolve(response);
      return;
    } catch (error) {
      reject(error);
    }
  });
}
//getuser//

// getinformation
export function GetInfomation(context) {
  console.log("GetInfomation");
  return new Promise(async (resolve, reject) => {
    if (context.state.datarander.data == true) {
      // await context.commit("set_dashboard", context.auth.data);
      return;
    }
    try {
      const query = {
        start: dayjs().month() + 1,
        end: dayjs().month() + 1,
        year: dayjs().year(),
        company: context.state.company,
        agent: context.state.agent,
      };

      let response = await this.$axios.get(
        `${process.env.ALL_RICO_REPORT}/api/profitloss_agent/Dashboard?start=${query.start}&end=${query.end}&year=${query.year}&company=${query.company}&agent=${query.agent}`
      );

      response.data.dplist.map((x) => {
        x.created_at = dayjs(x.created_at).format("YYYY-MM-DD HH:mm:ss");
        return x;
      });

      await context.commit("set_dashboard", response.data);
      await context.commit("set_dashboard_data_flag", true);
      // let response = await this.$axios.get("GetInfomation")
      // });
      // resolve(response);
      resolve(response);
      return;
    } catch (error) {
      reject(error);
    }
  });
}

// getinformation
//getautostatus
export function Autostatus(context) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_SUPPORT}/api/Website/AutoBankStatus/${context.state.company}/${context.state.agent}`
      );
      let status_auto;
      //[{"kbank":"start"},{"scb":"start"},{"true":"start"}]
      if (Array.isArray(response.data)) {
        status_auto = {
          kbank: response.data[0].kbank,
          scb: response.data[0].scb,
          true: response.data[0].true,
        };
      } else {
        status_auto = response.data;
      }
      context.commit("update_action_bank", status_auto);

      resolve(response);
      return response;
    } catch (error) {
      reject(error);
    }
  });
}
// update balance bank
export function updateAutoBankStatus(context, { data }) {
  console.log("sss:jjj");
  console.log("sss:", data);
  context.commit("update_action_bank", data);

  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT}/api/Website/AutoBankStatus/${context.state.company}/${context.state.agent}`,
        data
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function updateIncoming(context, incomingSMS) {
  // console.log('geee')
  console.log("ssss:", incomingSMS);
  incomingSMS.operator = context.state.user;
  let incomingData = context.state.incomingSMS;
  for (let index = 0; index < state.incomingSMS; index++) {
    const element = incomingData[index];
    console.log(element.id);
    console.log("count", index);
    if (element.id == payload.id) {
      delete incomingData[index];
    }
  }

  console.log("incomingData:", incomingData);
}

export async function UpdateKBankBalance(context, payload) {
  let bank = context.state.dpbank;

  for (let index = 0; index < bank.length; index++) {
    const element = bank[index];
    if (element.id == payload.id) {
      console.log("found id :", payload);
      bank[index] = payload;
    }
  }

  return bank;
}
export async function updateWithdrawlistAction(context, payload) {
  let wd_temp = context.state.wdlist;

  for (let index = 0; index < wd_temp.length; index++) {
    const element = wd_temp[index];
    if (element.id == payload.id) {
      console.log("found id :", payload);
      wd_temp[index] = payload;
    }
  }

  return wd_temp;
}
export async function findInWdList(context, withdrawlist) {
  let temp_wd = context.state.wdlist;

  for (let index = 0; index < temp_wd.length; index++) {
    const element = temp_wd[index];
    if (element.id == withdrawlist.id) {
      return true;
    }
  }
  return false;
}

export async function memberManualWithdrawByOperator(context, body) {
  // console.log('geee')

  console.log("before send:", body);

  try {
    let response = await this.$axios.post(
      `${process.env.ALL_SUPPORT}/api/Website/Rico/ManualWd/Operator`,
      {
        credit: body.wdAmount,
        username: body.username,
        operator: context.state.user,
        ip_operator: context.state.ip,
      }
    );

    return { status: "success", message: response.data.message };
  } catch (error) {
    return { status: "error", message: error.response.data.message };
  }
}
export async function manualRejectFromDashboard(context, withdrawlist) {
  // console.log('geee')

  withdrawlist.operator = context.state.user;
  withdrawlist.ip_operator = context.state.ip;
  withdrawlist.remark = `${context.state.user} กด reject ยอด ${withdrawlist.amount}`;

  try {
    let response = await this.$axios.post(
      `${process.env.ALL_SUPPORT}/api/Website/Rico/RejectWd/Dashboard`,
      withdrawlist
    );
    //             "balance" => $balance,
    //             "balanceupdatetime" => Carbon::now()->toDateTimeString(),
    //             "updateBy" => "by " . env('AGENT')
    // resolve(response);
    // context.$swal({
    //   title: `ทำรายการสำเร็จ`,
    //   icon: "success",
    //   // text:response.data.message,
    //   allowOutsideClick: true,
    //   confirmButtonColor: "green",
    //   confirmButtonText: "ok"
    // })
    return { status: "success", message: response.data.message };
  } catch (error) {
    return { status: "error", message: error.response.data.message };
  }
}
export async function manualWithdrawFromDashboard(context, withdrawlist) {
  // console.log('geee')

  withdrawlist.operator = context.state.user;
  withdrawlist.ip_operator = context.state.ip;

  console.log("before send:", withdrawlist);
  console.log("before send state:", context.state.wdlist);

  try {
    let response = await this.$axios.post(
      `${process.env.ALL_SUPPORT}/api/Website/Rico/ManualWd/Dashboard`,
      withdrawlist
    );
    //             "balance" => $balance,
    //             "balanceupdatetime" => Carbon::now()->toDateTimeString(),
    //             "updateBy" => "by " . env('AGENT')
    // resolve(response);
    // context.$swal({
    //   title: `ทำรายการสำเร็จ`,
    //   icon: "success",
    //   // text:response.data.message,
    //   allowOutsideClick: true,
    //   confirmButtonColor: "green",
    //   confirmButtonText: "ok"
    // })
    return { status: "success", message: response.data.message };
  } catch (error) {
    return { status: "error", message: error.response.data.message };
  }
}

export async function manualApproveFromDashboard(context, withdrawlist) {
  // console.log('geee')

  withdrawlist.operator = context.state.user;
  withdrawlist.ip_operator = context.state.ip;
  withdrawlist.amount = Math.floor(withdrawlist.amount);
  withdrawlist.remark = `${context.state.user} อนุมัติรายการถอน ยอด ${withdrawlist.amount} user: ${withdrawlist.username}`;

  try {
    let response = await this.$axios.post(
      `${process.env.ALL_SUPPORT}/api/Website/Rico/ApproveWd/Dashboard`,
      withdrawlist
    );
    //             "balance" => $balance,
    //             "balanceupdatetime" => Carbon::now()->toDateTimeString(),
    //             "updateBy" => "by " . env('AGENT')
    // resolve(response);
    // context.$swal({
    //   title: `ทำรายการสำเร็จ`,
    //   icon: "success",
    //   // text:response.data.message,
    //   allowOutsideClick: true,
    //   confirmButtonColor: "green",
    //   confirmButtonText: "ok"
    // })
    return { status: "success", message: response.data.message };
  } catch (error) {
    return { status: "error", message: error.response.data.message };
  }
}
export async function manualResetFromDashboard(context, withdrawlist) {
  // console.log('geee')

  withdrawlist.operator = context.state.user;
  withdrawlist.ip_operator = context.state.ip;
  withdrawlist.remark = `${context.state.user} กด RESET รายการถอน ยอด ${withdrawlist.amount} user: ${withdrawlist.username}`;

  try {
    let response = await this.$axios.post(
      `${process.env.ALL_SUPPORT}/api/Website/Rico/ResetWd/Dashboard`,
      withdrawlist
    );
    //             "balance" => $balance,
    //             "balanceupdatetime" => Carbon::now()->toDateTimeString(),
    //             "updateBy" => "by " . env('AGENT')
    // resolve(response);
    // context.$swal({
    //   title: `ทำรายการสำเร็จ`,
    //   icon: "success",
    //   // text:response.data.message,
    //   allowOutsideClick: true,
    //   confirmButtonColor: "green",
    //   confirmButtonText: "ok"
    // })
    return { status: "success", message: response.data.message };
  } catch (error) {
    return { status: "error", message: error.response.data.message };
  }
}

export async function hideIncomingFromDashBoardByOperator(
  context,
  incomingSMS
) {
  // console.log('geee')

  incomingSMS.operator = context.state.user;
  const state_incomingData = context.state.incomingSMS;

  let updated_state_incomingData = state_incomingData
    .map((x) => {
      if (x.id != incomingSMS.id) {
        return x;
      }
      return null;
    })
    .filter((x) => x);

  context.commit("updateIncoming", updated_state_incomingData);
  try {
    let response = await this.$axios.post(
      `${process.env.ALL_SUPPORT}/api/Website/Rico/Hide/Dashboard`,
      incomingSMS
    );
    //             "balance" => $balance,
    //             "balanceupdatetime" => Carbon::now()->toDateTimeString(),
    //             "updateBy" => "by " . env('AGENT')
    // resolve(response);
    // context.$swal({
    //   title: `ทำรายการสำเร็จ`,
    //   icon: "success",
    //   // text:response.data.message,
    //   allowOutsideClick: true,
    //   confirmButtonColor: "green",
    //   confirmButtonText: "ok"
    // })
    return { status: "success", message: response.data.message };
  } catch (error) {
    return { status: "error", message: error.response.data.message };
  }
}
export async function topupDashboardByOperator(context, incomingSMS) {
  // console.log('geee')
  console.log("ssss:", incomingSMS);
  incomingSMS.operator = context.state.user;
  console.log("state:", context.state);
  incomingSMS.operator = context.state.user;
  const state_incomingData = context.state.incomingSMS;

  let updated_state_incomingData = state_incomingData
    .map((x) => {
      if (x.id != incomingSMS.id) {
        return x;
      }
      return null;
    })
    .filter((x) => x);

  context.commit("updateIncoming", updated_state_incomingData);
  try {
    let response = await this.$axios.post(
      `${process.env.ALL_SUPPORT}/api/Website/Rico/Topup/DashboardV2/${incomingSMS.username}/${context.rootState.auth.company}/${context.rootState.auth.agent}`,
      incomingSMS
    );
    //             "balance" => $balance,
    //             "balanceupdatetime" => Carbon::now()->toDateTimeString(),
    //             "updateBy" => "by " . env('AGENT')
    // resolve(response);
    // context.$swal({
    //   title: `ทำรายการสำเร็จ`,
    //   icon: "success",
    //   // text:response.data.message,
    //   allowOutsideClick: true,
    //   confirmButtonColor: "green",
    //   confirmButtonText: "ok"
    // })
    return { status: "success", message: response.data.message };
  } catch (error) {
    return { status: "error", message: error.response.data.message };
  }
}
export function updateBalanceBank(context, { id, balance }) {
  // console.log('geee')

  // return
  return new Promise(async (resolve, reject) => {
    const body = {
      balance: balance,
      balanceupdatetime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      updateBy: context.state.user,
    };
    try {
      let response = await this.$axios.patch(
        `${process.env.ALL_COMPANY_BANK}/api/Company/${id}`,
        body,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      //             "balance" => $balance,
      //             "balanceupdatetime" => Carbon::now()->toDateTimeString(),
      //             "updateBy" => "by " . env('AGENT')
      // resolve(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
//check balance SCBAPI

export function checkBalanceBank(context, { bank }) {
  // console.log(bank.Companybankacountnumber)

  return new Promise(async (resolve, reject) => {
    try {
      // console.log('feeesse')
      let response = await this.$axios.get(
        `${process.env.ALL_SUPPORT}/api/Website/ScbBalance/${bank.Companybankacountnumber}`
      );

      // 
      context.dispatch("updateBalanceBank", {
        id: bank.id,
        balance: response.data.balance,
      });
      if (bank.type) {
        const temp_bank_list = context.state.wdbank;
        temp_bank_list.map((x) => {
          if (x.id == bank.id) {
            x.balance = response.data.balance;
            x.balanceupdatetime = dayjs().format("YYYY-MM-DD HH:mm:ss");
            return x;
          }
          return x;
        });
        context.commit("update_wd_bank", temp_bank_list);
      } else {
        const temp_bank_list = context.state.dpbank;
        // console.log(temp_bank_list)
        temp_bank_list.map((x) => {
          if (x.id == bank.id) {
            x.balance = response.data.balance;
            x.balanceupdatetime = dayjs().format("YYYY-MM-DD HH:mm:ss");
            return x;
          }
          return x;
        });
        context.commit("update_dp_bank", temp_bank_list);
      }

      resolve(response.data.balance);

      // // $url = env('API_SCB_CORE') . '/api/ScbCore/Summary';

      // // $data = ['acc_number' => $acc_number];
      // // $res =  Http::post($url, $data);
      // // if($res->status() < 400){
      // //     return $res->json()['balance'];
      // // } else {
      // //     return 0;
      // // }
      //     $balance = CompanybankController::getBalanceSCB($wd_bank['Companybankacountnumber'],$request);

      //     $response = Http::patch(
      //         env('ALL_COMPANY_BANK') . '/api/Company/' . $id,
      //         [
      //             "balance" => $balance,
      //             "balanceupdatetime" => Carbon::now()->toDateTimeString(),
      //             "updateBy" => "by " . env('AGENT')
      //         ]
      //     );

      //     $bank = Http::get(
      //         env('ALL_COMPANY_BANK') . '/api/Company/' . $id
      //     );

      //     (new  UserController())->createTransaction($request->user()['username'], "CHECK", "กดตรวจสอบยอดเงินคงเหลือธนาคาร: " . $bank->json()["Companybankname"], $bank->json(), $request);

      //     return response()->json([
      //         "data" => $bank->json()

      //     ], 200);

      // } else {
      //     return response()->json([
      //         "message" => "ข้อมูลไม่ถูกต้อง"
      //     ], 400);
      // }
    } catch (error) {
      console.log("pppp");
      console.log(error);
      reject(error);
    }
  });
}
//logout
export function logout(context) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_RICO_USER}/api/Auth/logout`
        // `http://localhost:3200/api/Auth/logout`
      );
      context.commit("set_logout", context);
      resolve(response);

      // resolve(response);
      return;
    } catch (error) {
      reject(error);
    }
  });
}
export function getHashStatic({ state, commit }) {
  return new Promise(async (resolve, reject) => {
    if (!state.statichash) {
      try {
        let response = await this.$axios.get(
          `${process.env.ALL_SUPPORT}/api/Website/StaticInfo/${state.company}/${state.agent}`
        );
        commit("set_statichash", response);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    } else {
      resolve(state.statichash);
    }
  });
}
