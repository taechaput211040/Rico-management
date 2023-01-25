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
    }
  });
}
//login//

//two-facter
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
      console.log(response.feature);
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
    if (context.state.datarander.data == true) return;
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

      context.commit("update_action_bank", response.data);

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
      // console.log('feeee')
      // console.log(context)
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
      context.commit("set_logout");
      resolve(response);

      // resolve(response);
      return;
    } catch (error) {
      reject(error);
    }
  });
}
