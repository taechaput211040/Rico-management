//รายชื่อธนาคาร//
export async function getbankinfo({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: {
          bankinfo: [],
          bankSummary: [
            {
              companyBank: "RICO",
              companyAccRef: "xxxxxxx",
              total_sum: 2121
            },
            {
              companyBank: "KBANK",
              companyAccRef: "X162266X",
              total_sum: 630
            },
            {
              companyBank: "SCB",
              companyAccRef: "x694871",
              total_sum: 1485
            },
            {
              companyBank: "TRUEWALLET",
              companyAccRef: "0645609241",
              total_sum: 500
            }
          ]
        }
      };
      // let response = await api.get(`/api/getbankinfo`, {
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

//ลิสยอดฝากรวม แยก ธนาคาร
export async function getdpListtransaction({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: {
          data: [
            {
              afcredit: 300,
              amount: 150,
              bfcredit: "0",
              bonusamount: "150",
              companyBank: "KBANK",
              created_at: "2022-02-09 17:48:55",
              dpref: "d26b0a79-d330-4687-8cf3-cc31329815eb",
              id: 2787,
              member_id: "BE972536184",
              remark:
                "เติม150.00 บาท โบนัส 150บาท  สำเร็จ โดยRicoAutoSystem สมัครสมาชิกใหม่",
              smsdatetime: "2022-02-09 17:48:00",
              sum: null,
              topupby: "RicoAutoSystem",
              updated_at: "2022-02-09 17:48:55"
            },
            {
              afcredit: 70,
              amount: 70,
              bfcredit: "0",
              bonusamount: "0",
              companyBank: "SCB",
              created_at: "2022-02-09 16:37:54",
              dpref: "c6c10738-44ca-4f7c-8087-0425e691b6a5",
              id: 2786,
              member_id: "BE958343712",
              remark:
                "เติม70.00 บาท โบนัส 0บาท  สำเร็จ โดยRicoAutoSystem ไม่มีโปรโมชั่น",
              smsdatetime: "2022-02-09 16:37:00",
              sum: null,
              topupby: "RicoAutoSystem",
              updated_at: "2022-02-09 16:37:54"
            }
          ],
          link: [],
          meta: []
        }
      };
      // let response = await api.get(`/api/getdpListtransaction`, {
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
//ลิสยอดฝากรวม แยก ธนาคาร

//ลิสยอดถอนรวม แยก ธนาคาร
export async function getwdListtransaction({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: {
          data: [
            {
              afAmount: null,
              afcredit: 100,
              amount: 1600,
              bankAcc: "09401631989",
              bankName: "KBZpay",
              bfAmount: null,
              bfcredit: 1700,
              id: 209,
              name: "Tint Wai Phyo",
              operator: "phoe mu kyi",
              remark: "กรุณาทำการโอนด้วยตนเอง",
              requsettime: "2022-01-25 11:38:42",
              status: "Success",
              transferTime: "โอนมือ",
              type: "common",
              username: "BE9401631989"
            },
            {
              afAmount: null,
              afcredit: 0,
              amount: 552,
              bankAcc: "9693319559",
              bankName: "WAVEPAY",
              bfAmount: null,
              bfcredit: 552,
              id: 208,
              name: "Ko Thu",
              operator: "phoe mu kyi",
              remark: "กรุณาทำการโอนด้วยตนเอง",
              requsettime: "2022-01-25 10:15:04",
              status: "Error",
              transferTime: "โอนมือ",
              type: "common",
              username: "BE9693319559"
            }
          ]
        }
      };
      // let response = await api.get(`/api/getwdListtransaction`, {
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
//ลิสยอดถอนรวม แยก ธนาคาร
// รายการถอนเงินของสมาชิกล่าสุด
export async function getLastwithdraw({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: {
          data: [
            {
              afAmount: null,
              afcredit: 100,
              amount: 1600,
              bankAcc: "09401631989",
              bankName: "KBZpay",
              bfAmount: null,
              bfcredit: 1700,
              id: 209,
              name: "Tint Wai Phyo",
              operator: "phoe mu kyi",
              remark: "กรุณาทำการโอนด้วยตนเอง",
              requsettime: "2022-01-25 11:38:42",
              status: "Success",
              transferTime: "โอนมือ",
              type: "common",
              username: "BE9401631989"
            },
            {
              afAmount: null,
              afcredit: 0,
              amount: 552,
              bankAcc: "9693319559",
              bankName: "WAVEPAY",
              bfAmount: null,
              bfcredit: 552,
              id: 208,
              name: "Ko Thu",
              operator: "phoe mu kyi",
              remark: "กรุณาทำการโอนด้วยตนเอง",
              requsettime: "2022-01-25 10:15:04",
              status: "Error",
              transferTime: "โอนมือ",
              type: "common",
              username: "BE9693319559"
            }
          ]
        }
      };
      // let response = await api.get(`/api/getLastwithdraw`, {
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
// รายการฝากครั้งเเรก
export async function getFirstdeposit({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: {
          data: [
            {
              afcredit: 150,
              amount: 75,
              bfcredit: "0",
              bonusamount: "75",
              companyBank: "RICO",
              created_at: "2022-01-26 03:30:01",
              dpref: "1824150c-01c0-4f67-884e-b214509f88fe",
              id: 1319,
              member_id: "BE9983616528",
              remark:
                "เติม75 บาท โบนัส 75บาท  สำเร็จ โดยphue phue สมัครสมาชิกใหม่",
              smsdatetime: "2022-01-25T02:57:24",
              sum: null,
              topupby: "phue phue",
              updated_at: "2022-01-26 03:30:01"
            },
            {
              afcredit: 360,
              amount: 180,
              bfcredit: "0",
              bonusamount: "180",
              companyBank: "RICO",
              created_at: "2022-01-26 03:18:42",
              dpref: "ba4a3b1e-4cad-4aca-953f-a4d3b1f385c2",
              id: 1318,
              member_id: "BE9670812088",
              remark:
                "เติม180 บาท โบนัส 180บาท  สำเร็จ โดยphue phue สมัครสมาชิกใหม่",
              smsdatetime: "2022-01-25T02:48:15",
              sum: null,
              topupby: "phue phue",
              updated_at: "2022-01-26 03:18:42"
            }
          ]
        }
      };
      // let response = await api.get(`/api/getFirstdeposit`, {
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
