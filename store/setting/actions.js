//ตั้งค่าระบบ
export function getSetting({ rootState }) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_SETTING}/api/Setting/${rootState.auth.hash}`
      );
      resolve(data);
      // const response = {
      //   data: {
      //     datasetting: {
      //       agent_username: "BE",
      //       company: "Smartbet",
      //       companykey: "BEGXT",
      //       companyname: "BE",
      //       companynlineurl: "https://lin.ee/uyiM0Xz",
      //       companyurl: "https://beggar119.com",
      //       hash: "4fe56b880271a98c20495111f7b70e9b",
      //       id: "0729c9b7-5b9e-4adc-915e-9789d95d31fd",
      //       least_wd_credits: 0,
      //       line_name: "@beggar119",
      //       login_link: "https://member.beggar119.com/login",
      //       member_logo_url:
      //         "https://image.smart-ai-api.com/public/image-storage/e376348e-6007-4f50-a43c-d2cfd2853019-WinWay_Logo_300x300.png",
      //       member_site_name: "member.beggar119.com",
      //       register_link: "https://member.beggar119.com/register",
      //       rico_id: 1,
      //       system_status: true,
      //       turnNobonus: 0,
      //       wd_auto_amount: 0,
      //       wdautoAll: false,
      //       wdlimit: true,
      //       wdlimitTime: 0,
      //       wdlimitcredit: 500000,
      //       wdwhenoutstanding: false
      //     },
      //     message: {
      //       agent: null,
      //       company: null,
      //       created_at: "2021-03-09T02:59:08.000000Z",
      //       description:
      //         "ပင်မဝဘ်ဆိုဒ်၊ တည်ငြိမ်ပြီး 100% လုံခြုံသည်\n@beggar119",
      //       header:
      //         "BEGGAR119 မှ ကြိုဆိုပါ၏ ဒီနေ့ တွေ့ကြုံခံစားဖို့ အဆင်သင့်ဖြစ်နေပါပြီ",
      //       id: 1,
      //       img:
      //         "https://image-storage-betkub.s3.ap-southeast-1.amazonaws.com/images/UC6s4GOB1hNpZleYcYom7LPhcIL5ZUY96bjAM8ps.jpg",
      //       operator: "admin",
      //       status: 1,
      //       topic:
      //         "Beggar119 ဖြင့် အတည်ငြိမ်ဆုံးစနစ်၊ အမြန်ငွေသွင်းငွေထုတ်ဝန်ဆောင်မှု၊ ရွေးချယ်ရန်ကမ္ဘာတစ်ဝှမ်းမှဂိမ်းများစွာရှိသည်။",
      //       updated_at: "2022-02-06T08:28:41.000000Z"
      //     }
      //   }
      // };
      // let response = await this.$axios.get("getSetting")
      // });
      // resolve(response);
      // resolve(response);
      // console.log(mockuser);
    } catch (error) {
      reject(error);
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
//ธนาคารของเว็บ
export function getGroup() {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        "https://all-member-gateway-ehhif4jpyq-as.a.run.app/api/Gateway/Provider/145c4b748540ca78664b32853e4031b5"
      );
      localStorage.setItem("groups", JSON.stringify(response.data.group));

      resolve(response);

      return;
    } catch (error) {
      reject(error);
    }
  });
}
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
        `${process.env.ALL_RICO_USER}/api/User`,
        body
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
