// เชครีพอตเมมเบอร์
export async function getReportmember({ commit }, fillter = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${
          process.env.ALL_MEMBER
        }/api/Member/Agent/SubScribe/${localStorage.getItem(
          "company"
        )}/${localStorage.getItem("agent")}`,
        {
          params: {
            ...fillter
          }
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

export async function changePasswordMember({ commit }, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.patch(
        `${process.env.ALL_MEMBER}/api/Member/Agent/Password`,
        {
          id: payload.id,
          password: payload.password
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function changeStatus({ commit }, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.patch(
        `${process.env.ALL_MEMBER}/api/Member/Agent/Status`,
        {
          id: payload.id,
          stats: payload.stats
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
// เชครีพอตเมมเบอร์
// เชครีพอตเมมเบอร์ ID
export async function getReportmemberbyid({ commit }, fillter = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: [
          {
            bankAcc: "09772778704",
            bankAccRef: "X2778704",
            bankName: "WAVEPAY",
            birthdate: null,
            bonusid: 3,
            created_at: "2022-01-20 12:47:38",
            dpAuto: true,
            gender: "male",
            knowFrom: "สมัครจากหน้าเว็บ",
            lastname: "aayt",
            lastnameEng: null,
            lineID: "ไม่มีข้อมูล",
            name: "aayt",
            nameEng: null,
            operator: "RICO",
            phone: "09778772704",
            recommender: null,
            remark: null,
            status: true,
            updated_at: "2022-01-20 12:51:23",
            username: "BE9778772704",
            wdAuto: false
          }
        ]
      };
      // let response = await api.get(`/api/progress/${fillter.username}`, {
      //   params: {
      //     ...fillter
      //   }
      // });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
// เชครีพอตเมมเบอร์ ID
//เชคข้อมูลปัจจุบัน turn
export async function getTurnByid({ commit, username }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: {
          result: {
            credit: 0,
            id: "ecaa9f1a-28c9-4f85-8ef0-f121143f6210",
            name: "อูเซ็ง โต๊ะแม",
            phone: "0824786902",
            provider_active: "PG",
            role: "e82ca544-9954-4eb4-baa2-a8e55c18f8b1",
            status: 1,
            user: "BE824786902"
          },
          ip_data: {
            id: "70e17dce-f6e8-4b6d-908d-e7b8ca41950d",
            created_at: "2022-02-08T17:05:34.763Z",
            updated_at: "2022-02-09T07:31:08.533Z",
            code: "PG",
            provider_name: "PG",
            game_name: "f95b7092-2b10-4438-b49f-cac796656572",
            username: "BE824786902",
            ip: "49.230.173.219",
            device:
              "Mozilla/5.0 (Linux; Android 11; vivo 1904 Build/RP1A.200720.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/93.0.4577.62 Mobile Safari/537.36 Line/11.16.2/IAB"
          }
        }
      };
      // let response = await api.get(`/api/progress/${fillter.username}`, {
      //   params: {
      //     username
      //   }
      // });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
} //เชคข้อมูลปัจจุบัน turn
//เชคข้อมูลปัจจุบัน transection
export async function getTransactionid({ commit, username }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: {
          dp: {
            afcredit: "1",
            amount: "0",
            bfcredit: "0",
            bonusamount: "1",
            companyBank: "checkin",
            created_at: "2022-01-20T23:53:46.000000Z",
            dp_count: 0,
            dpref: "58579427-a2b0-41e5-9501-b9350f7804ba",
            id: 595,
            member_id: 321,
            remark: "เติม 0 บาท โบนัส 1บาท  สำเร็จ โดยRICO หมายเหตุ : Checkin ",
            smsdatetime: "-",
            topupby: "RICO",
            updated_at: "2022-01-20T23:53:46.000000Z",
            ip: "103.83.188.31",
            provider_active: "JL"
          },
          stats: [
            {
              bet: 1842.1,
              commission: 0,
              currencyname: "TH",
              grouped: "JL",
              p_share: 0,
              p_win: 0,
              payout: 1617.87,
              turnover: 1842.1,
              wagers: 0,
              winlose: 224.23
            },
            {
              bet: 0,
              commission: 0,
              currencyname: "TH",
              grouped: "UF",
              p_share: 0,
              p_win: 0,
              payout: 0,
              turnover: 0,
              wagers: 0,
              winlose: 0
            }
          ]
        }
      };
      // let response = await api.get(`/api/progress/${fillter.username}`, {
      //   params: {
      //     username
      //   }
      // });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
//เชคข้อมูลปัจจุบัน transection
//เเก้ไขเครดิต/รายการผิดพลาด
export async function getManualEditCredit({ commit, fillter }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: {
          data: [
            {
              afcredit: 0,
              bfcredit: 0,
              bonus: 0,
              created_at: "2022-01-24T14:41:51.000000Z",
              credit: 75,
              id: 903,
              operator: "nan mon",
              remark:
                "เติมเงินให้ BE9794691646 จำนวน 75 บาท ,รายการไม่เข้าระบบ,เติมตามเงื่อนไขโปรโมชั่น โปรดเช็ครายการฝาก,เติมโดย nan mon หมายเหตุเพิ่มเติม t",
              topupcredit: 0,
              type: "SYSTEMNODATA",
              username: "BE9794691646"
            },
            {
              afcredit: 0,
              bfcredit: 0,
              bonus: 0,
              created_at: "2022-01-24T14:41:51.000000Z",
              credit: 75,
              id: 904,
              operator: "nan mon",
              remark:
                "เติมเงินให้ BE9794691646 จำนวน 75 บาท ,รายการไม่เข้าระบบ,เติมตามเงื่อนไขโปรโมชั่น โปรดเช็ครายการฝาก,เติมโดย nan mon หมายเหตุเพิ่มเติม t",
              topupcredit: 0,
              type: "SYSTEMNODATA",
              username: "BE9794691646"
            }
          ],
          total_bonus: 0,
          total_cutcredit: 100,
          total_nodata: 2121
        }
      };
      // let response = await api.get(`/api/getManualEditCredit`, {
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
//เเก้ไขเครดิต/รายการผิดพลาด

export function getTransactionMember(context, params) {
  // console.log(context.state)
  // return

  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.REAL_TIME_REPORT_URL_SEAMLESS}/memberProvider`,
        { params }
      );
      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function createMember({}, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_MEMBER}/api/Member/Agent`,
        body
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function getMemberDeposit(context, username) {
  // console.log(context.state)
  // return

  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_SUPPORT}/api/Website/Rico/Member/DepositV2?username=${username}`
      );
      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function getMemberWithdraw(context, username) {
  // console.log(context.state)
  // return

  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_SUPPORT}/api/Website/Rico/Member/WithdrawV2?username=${username}`
      );
      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
