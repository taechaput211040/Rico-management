//login//
export function login(context, { username, password, agentkey }) {
  return new Promise(async (resolve, reject) => {
    console.log(process.env.VUE_APP_PATH_MICROSERVICE, "env");
    try {
      let { data } = await this.$axios.post(
        `${process.env.ALL_RICO_USER}/api/Auth/Login
      `,
        {
          username: username,
          password: password,
          agent: agentkey
        }
      );
      // const mockResponse = {
      //   group: [
      //     {
      //       title: "Dashboard",
      //       to: "/",
      //       icon: "mdi-view-dashboard",
      //       status: true
      //     },
      //     {
      //       title: "รายงานระบบ",
      //       icon: "mdi-chart-bar",
      //       status: true,
      //       subLinks: [
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "สถิติผู้ใช้งาน",
      //           to: "/reportSystem/statistics",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "สถิติฝาก-ถอน",
      //           to: "/reportSystem/transaction",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "รายงานลูกค้าใหม่",
      //           to: "/reportSystem/newaccount",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "รายงานลูกค้าประจำ",
      //           to: "/reportSystem/regularReport",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "รายงานรับโบนัส",
      //           to: "/reportSystem/bonusReport",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "รายงานรับโบนัสชวนเพื่อน",
      //           to: "/reportSystem/affiliate",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "รายงานลูกค้าเลิกเล่น",
      //           to: "quitMember",
      //           status: true
      //         }
      //       ]
      //     },
      //     {
      //       title: "จัดการสมาชิก",
      //       icon: "mdi-account",
      //       status: true,
      //       subLinks: [
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "สมัครสมาชิก",
      //           to: "/member/register",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "รายงานสมาชิก",
      //           to: "/member/reportMember",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "เช็คข้อมูลปัจจุบัน/จำนวนเทิร์น",
      //           to: "/member/memberCheck",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "เช็คข้อมูลการเล่น",
      //           to: "/member/memberReportTransaction",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "ถอนเครดิตสมาชิก(Manual)",
      //           to: "/member/withdrawManual",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "แก้ไขเครดิต/รายการผิดพลาด",
      //           to: "/member/ManualEditCredit",
      //           status: true
      //         }
      //       ]
      //     },
      //     {
      //       title: "รายงานฝาก/ถอน",
      //       icon: "mdi-credit-card-check",
      //       status: true,
      //       subLinks: [
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "รายการฝากสมาชิก",
      //           to: "/reportTransaction/deposite",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "รายการถอนสมาชิก",
      //           to: "/reportTransaction/withdraw",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "รายการถอนสมาชิกล่าสุด",
      //           to: "/reportTransaction/lastWithdrawal",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "รายการฝากแรก",
      //           to: "/reportTransaction/firstDeposit",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "รายการที่ถูกซ่อน",
      //           to: "/reportTransaction/hiddenReport",
      //           status: true
      //         }
      //       ]
      //     },
      //     {
      //       title: "รายงานสรุป",
      //       icon: "mdi-credit-card-plus-outline",
      //       status: true,
      //       subLinks: [
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "กำไร/ขาดทุน",
      //           to: "/profitReport/Report",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "กำไร/ขาดทุน รายบุคคล",
      //           to: "/profitReport/ProfitByUserReport",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "สรุปโปรโมชัน",
      //           to: "/profitReport/PromotionReport",
      //           status: true
      //         }
      //       ]
      //     },
      //     {
      //       title: "จัดการค่ายเกม",
      //       to: "/groupsetting",
      //       icon: "mdi-history",
      //       status: true
      //     },

      //     {
      //       title: "ตั้งค่าโปรโมชั่น",
      //       icon: "mdi-history",
      //       status: true,
      //       subLinks: [
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "โปรโมชันทั่วไป",
      //           to: "/promotion/generalPromotion",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "Cashback",
      //           to: "/promotion/cashback",
      //           status: true
      //         }
      //       ]
      //     },
      //     {
      //       title: "ตั้งค่าลิงก์รับทรัพย์",
      //       icon: "mdi-history",
      //       status: true,
      //       subLinks: [
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "รายงานลิงก์รับทรัพย์",
      //           to: "/Affiliate/report",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "ข้อมูลสมาชิกลิงก์รับทรัพย์",
      //           to: "/Affiliate/infomember",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "ตั้งค่า",
      //           to: "/Affiliate/setting",
      //           status: true
      //         }
      //       ]
      //     },
      //     {
      //       title: "ตั้งค่า Feature",
      //       icon: "mdi-gamepad-variant-outline",
      //       status: true,
      //       subLinks: [
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "เครดิตฟรี",
      //           to: "/feature/creditfree",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "กงล้อนำโชค",
      //           to: "/feature/wheel",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "เปิดไพ่6ใบ",
      //           to: "/feature/sixcard",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "เปิดหีบสมบัติ",
      //           to: "/feature/chest",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "เช็คอินรายวัน",
      //           to: "/feature/checkindaily",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "สะสมเเต้ม",
      //           to: "/feature/point",
      //           status: true
      //         },
      //         {
      //           icon: "mdi-view-dashboard",
      //           text: "ของพรีเมียม",
      //           to: "/feature/premiumn",
      //           status: true
      //         }
      //       ]
      //     },
      //     {
      //       title: "ตั้งค่าระบบ",
      //       to: "/system",
      //       icon: "mdi-cog-outline",
      //       status: true
      //     },
      //     {
      //       title: "รายชื่อมิจฉาชีพ",
      //       to: "/CriminalList",
      //       icon: "mdi-gamepad-square",
      //       status: true
      //     },
      //     {
      //       title: "พนักงาน",
      //       to: "/employee",
      //       icon: "mdi-gamepad-square",
      //       status: true
      //     },
      //     {
      //       title: "ธนาคาร",
      //       to: "/companyBank",
      //       icon: "mdi-gamepad-square",
      //       status: true
      //     }
      //   ]
      // };
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
      console.log('data',data)
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
        `${process.env.ALL_SUPPORT}/api/lockydowns/${rootState.auth.agent}/${rootState.auth.company}`
      );
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
            setting: { status: false, prize: [] }
          },
          point: { activated: false, setting: { status: false, prize: [] } },
          premium: { activated: false, setting: { status: false, prize: [] } },
          sixcard: { activated: false, setting: { status: false, prize: [] } },
          wheel: { activated: true }
        }
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
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        // data: {
        //   OneMonthProfit: 10016,
        //   incomingSMS: [],
        //   dpbank: [
        //     {
        //       Companybank: "KBANK",
        //       Companybankacountnumber: "1171622669",
        //       Companybankname: "วัชรากร ดิสคุ้ม",
        //       agentPrefixCode: "BE",
        //       balance: 5442,
        //       balanceupdatetime: "2022-02-09 10:53:00",
        //       bankAccRef: "X162266X",
        //       companyName: "Smartbet",
        //       createBy: "adnp",
        //       id: "81857d6c-c8d0-4d75-8b5a-dc7729974124",
        //       loginname: null,
        //       phone: "0997839913",
        //       status: true,
        //       updateBy: "_RICO_QUEUE",
        //       visibletomember: true
        //     },
        //     {
        //       Companybank: "SCB",
        //       Companybankacountnumber: "0272694871",
        //       Companybankname: "บุญยืน โพธิสุวรรณ",
        //       agentPrefixCode: "BE",
        //       balance: 0,
        //       balanceupdatetime: "2022-02-06 16:00:15",
        //       bankAccRef: "X694871",
        //       companyName: "Smartbet",
        //       createBy: "adnp",
        //       id: "8124f318-f804-435a-8be4-d2516e19298d",
        //       loginname: "lisa118sp3",
        //       phone: "0658621057",
        //       status: true,
        //       type: false,
        //       updateBy: "adnp"
        //     },
        //     {
        //       Companybank: "TRUEWALLET",
        //       Companybankacountnumber: "0645609241",
        //       Companybankname: "ปริญญา แป้นสุข",
        //       agentPrefixCode: "BE",
        //       balance: 0,
        //       balanceupdatetime: "2022-02-06 16:02:18",
        //       bankAccRef: "0645609241",
        //       companyName: "Smartbet",
        //       createBy: "adnp",
        //       id: "34643451-dd29-4205-a4fb-ee4824bcb6b2",
        //       loginname: null,
        //       phone: "0645609241",
        //       status: true,
        //       type: false,
        //       updateBy: "superadmin2"
        //     }
        //   ],
        //   dplist: [],
        //   wdamountoneday: { amount: 600 },
        //   wdlist: [
        //     {
        //       afAmount: null,
        //       afcredit: 0,
        //       amount: 49,
        //       bankAcc: "09970678690",
        //       bankName: "WAVEPAY",
        //       bfAmount: null,
        //       bfcredit: 49,
        //       created_at: "2022-01-19 01:30:22",
        //       id: 86,
        //       name: "htetzaw myo",
        //       operator: "Ah Lar Hmwe",
        //       remark: "กรุณาทำการโอนด้วยตนเอง",
        //       requsettime: "2022-01-19 01:30:18",
        //       status: "Success",
        //       transferTime: "โอนมือ",
        //       type: "common",
        //       username: "BE9970678690"
        //     },
        //     {
        //       afAmount: null,
        //       afcredit: 0,
        //       amount: 50,
        //       bankAcc: "09970678690",
        //       bankName: "SCB",
        //       bfAmount: null,
        //       bfcredit: 50,
        //       created_at: "2022-01-19 01:30:22",
        //       id: 87,
        //       name: "htetzaw myo",
        //       operator: "Ah Lar Hmwe",
        //       remark: "กรุณาทำการโอนด้วยตนเอง",
        //       requsettime: "2022-01-19 01:30:18",
        //       status: "Error",
        //       transferTime: "โอนมือ",
        //       type: "common",
        //       username: "BE9970678690"
        //     }
        //   ],
        //   wdbank: [
        //     {
        //       Companybank: "SCB",
        //       Companybankacountnumber: "2922448904",
        //       Companybankname: "มานะ เอี่ยมสอิ้ง",
        //       agentPrefixCode: "BE",
        //       balance: 0,
        //       balanceupdatetime: "2022-02-06 16:03:28",
        //       bankAccRef: "X448904",
        //       companyName: "Smartbet",
        //       createBy: "adnp",
        //       id: "4d9933dd-25bb-4715-a174-2a35ee4f2ab4",
        //       loginname: "lisa118sp4",
        //       phone: "0886148727",
        //       status: true,
        //       type: true,
        //       updateBy: "adnp",
        //       visibletomember: true
        //     }
        //   ],
        //   dpamountoneday: { amount: 1911 }
        // }
      };

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
      const response = {
        data: {
          kbank: "start",
          scb: "start",
          true: "start"
        }
      };

      // let response = await this.$axios.get("Autostatus")
      // });
      // resolve(response);
      resolve(response);
      return;
    } catch (error) {
      reject(error);
    }
  });
}

//getautostatus

//logout
export function logout(context) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_RICO_USER}/api/Auth/logout`
      );
      resolve(response);
      context.commit("set_logout");
      // resolve(response);
      return;
    } catch (error) {
      reject(error);
    }
  });
}
