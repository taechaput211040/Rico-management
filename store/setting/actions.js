//ตั้งค่าระบบ
export function getSetting(context) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: {
          datasetting: {
            agent_username: "BE",
            company: "Smartbet",
            companykey: "BEGXT",
            companyname: "BE",
            companynlineurl: "https://lin.ee/uyiM0Xz",
            companyurl: "https://beggar119.com",
            hash: "4fe56b880271a98c20495111f7b70e9b",
            id: "0729c9b7-5b9e-4adc-915e-9789d95d31fd",
            least_wd_credits: 0,
            line_name: "@beggar119",
            login_link: "https://member.beggar119.com/login",
            member_logo_url:
              "https://image.smart-ai-api.com/public/image-storage/e376348e-6007-4f50-a43c-d2cfd2853019-WinWay_Logo_300x300.png",
            member_site_name: "member.beggar119.com",
            register_link: "https://member.beggar119.com/register",
            rico_id: 1,
            system_status: true,
            turnNobonus: 0,
            wd_auto_amount: 0,
            wdautoAll: false,
            wdlimit: true,
            wdlimitTime: 0,
            wdlimitcredit: 500000,
            wdwhenoutstanding: false
          },
          message: {
            agent: null,
            company: null,
            created_at: "2021-03-09T02:59:08.000000Z",
            description:
              "ပင်မဝဘ်ဆိုဒ်၊ တည်ငြိမ်ပြီး 100% လုံခြုံသည်\n@beggar119",
            header:
              "BEGGAR119 မှ ကြိုဆိုပါ၏ ဒီနေ့ တွေ့ကြုံခံစားဖို့ အဆင်သင့်ဖြစ်နေပါပြီ",
            id: 1,
            img:
              "https://image-storage-betkub.s3.ap-southeast-1.amazonaws.com/images/UC6s4GOB1hNpZleYcYom7LPhcIL5ZUY96bjAM8ps.jpg",
            operator: "admin",
            status: 1,
            topic:
              "Beggar119 ဖြင့် အတည်ငြိမ်ဆုံးစနစ်၊ အမြန်ငွေသွင်းငွေထုတ်ဝန်ဆောင်မှု၊ ရွေးချယ်ရန်ကမ္ဘာတစ်ဝှမ်းမှဂိမ်းများစွာရှိသည်။",
            updated_at: "2022-02-06T08:28:41.000000Z"
          }
        }
      };
      // let response = await this.$axios.get("getSetting")
      // });
      // resolve(response);
      resolve(response);
      console.log(mockuser);
      return;
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
      const response = {
        data: [
          {
            bankAcc: "6222803450",
            bankName: "SCB",
            created_at: "2022-02-05 17:13:59",
            lastname: "สมานทอง",
            name: "นายธีรภัทร",
            operator: "DD",
            phone: "0968649689"
          }
        ]
      };
      // let response = await this.$axios.get("getCriminallist",{param: ...param})
      // });
      // resolve(response);
      resolve(response);
      return;
    } catch (error) {
      reject(error);
    }
  });
}

//เพิ่มรายชื่อ มิจฉาชีพ
//พนักงาน
export function getEmployee(context) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: [
          {
            created_at: "2021-11-29 13:33:41",
            creditperday: 20000,
            id: 24,
            is_admin: true,
            limittopup: false,
            name: "admin",
            operator: "Super Admin",
            phone: "0881999969",
            status: true,
            username: "adnp"
          }
        ]
      };
      // let response = await this.$axios.get("getCriminallist",{param: ...param})
      // });
      // resolve(response);
      resolve(response);
      return;
    } catch (error) {
      reject(error);
    }
  });
}
//พนักงาน

//ธนาคารของเว็บ
export function getCompanybank(context) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: [
          {
            Companybank: "KBANK",
            Companybankacountnumber: "1171622669",
            Companybankname: "วัชรากร ดิสคุ้ม",
            agentPrefixCode: "BE",
            balance: 720,
            balanceupdatetime: "2022-02-06 18:59:00",
            bankAccRef: "X162266X",
            companyName: "Smartbet",
            createBy: "adnp",
            id: "81857d6c-c8d0-4d75-8b5a-dc7729974124",
            loginname: null,
            phone: "0997839913",
            status: true,
            type: false,
            updateBy: "_RICO_QUEUE",
            visibletomember: true
          }
        ]
      };
      // let response = await this.$axios.get("getCompanybank")
      // });
      // resolve(response);
      resolve(response);

      return;
    } catch (error) {
      reject(error);
    }
  });
}
//ธนาคารของเว็บ
