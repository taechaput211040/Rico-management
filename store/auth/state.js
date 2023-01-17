import setting from "../setting";

export default function() {
  return {
    verify: false,
    tfa_credential: null,
    tfa_data: null,
    key: localStorage.getItem("key") || null, //token
    user: localStorage.getItem("username") || null,
    menu: localStorage.getItem("menu") || null, // ||
    hash: localStorage.getItem("hash") || null, //token
    agent: localStorage.getItem("agent") || null,
    company: localStorage.getItem("company") || null,
    name: localStorage.getItem("name") || null,
    isAdmin: localStorage.getItem("isAdmin") || null,
    tokenMember: localStorage.getItem("tokenMember") || null,

    datarander : {
      data:false,
      depositbalance: 0,
      withdrawbalance: 0,
      profitlossDate:
        0,
      profitlossmounth: 0
    },
    dpbank : [],
    wdbank : [],
    dplist : [],
    wdlist : [],
    incomingSMS :[],
    actionBankState: [
      {
        kbank:"start"
      },
      {
        scb: "start"
      },
      {
        true: "start"
      }
    ],
  };
  
}
