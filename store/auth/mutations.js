import dayjs from "dayjs";

export function set_login(state, payload) {
  // console.log(payload, "payload");
  state.company = payload.company
  state.agent = payload.agent
  state.key = payload.token;
  state.user = payload.username;
  state.menu = payload.menu;
  state.isAdmin = payload.s_admin;
  // state.tokenMember = payload.setting.token;
  localStorage.setItem("isAdmin", payload.s_admin);
  localStorage.setItem("menu", payload.menu);
  localStorage.setItem("key", payload.token); //** */
  localStorage.setItem("username", payload.username);
  // localStorage.setItem("tokenMember", payload.setting.token);
}
export function set_online_member(state,payload){
  state.memberOnline = payload
}
export function set_dashboard_data_flag(state, payload) {
  // console.log(payload, "payload");
  state.datarander.data = payload;
  
}
export function update_action_bank(state, payload) {
  console.log(payload, "payload")
  state.actionBankState = payload;
  
}
export function update_dp_bank(state, payload) {
  // console.log(payload, "payload");
  state.datarander.dpbank = payload;
  
}
export function update_wd_bank(state, payload) {
  // console.log(payload, "payload");
  state.datarander.wdbank = payload;
  
}
export function set_dashboard(state, payload) {
  // console.log(payload, "payload");
  state.datarander.depositbalance = payload.dpamountoneday.amount;
  state.datarander.withdrawbalance = payload.wdamountoneday.amount;
  state.datarander.profitlossDate = payload.dpamountoneday.amount -payload.wdamountoneday.amount ;
  state.datarander.profitlossmounth = payload.OneMonthProfit;
 
  
  state.dpbank = payload.dpbank;
  state.wdbank = payload.wdbank;
  state.dplist = payload.dplist;
  state.wdlist = payload.wdlist;
  state.incomingSMS = payload.incomingSMS;
  // state.tokenMember = payload.setting.token;

  // localStorage.setItem("tokenMember", payload.setting.token);
}
export function set_user(state, payload) {
  state.name = payload.name;
  // state.hash = payload.setting.hash;
  state.company = payload.company;
  state.agent = payload.agent;
  state.ip = payload.ip;
  localStorage.setItem("agent", payload.agent);
  localStorage.setItem("company", payload.company);
  // localStorage.setItem("hash", payload.hash);
  localStorage.setItem("name", payload.name);
}

export function set_data_secret(state, payload) {
  state.hash = payload.hash;
  state.tokenMember = payload.token;
  localStorage.setItem("hash", payload.hash);
  localStorage.setItem("tokenMember", payload.token);
}

export function set_logout(state,context) {
  console.log(state)
  console.log(context)
  context.rootState.setting.setting = null
  context.rootState.setting.message = null
  context.rootState.provider_hash = null
  context.rootState.game_hash = null

  context.rootState.itempromotion = []
  context.rootState.bonus_list = []
  localStorage.clear();
  state.key = null;
  state.user = null;
  state.group = null;
  state.company = null;
  state.agent = null;
  state.name = null;
  state.menu = null;
  state.isAdmin = false;
  state.hash = null;
  state.tokenMember = null;
  // state.rootState.setting.setting = null;
  state.datarander=  {
    data:false,
    depositbalance: 0,
    withdrawbalance: 0,
    profitlossDate:
      0,
    profitlossmounth: 0
  },
  state.dpbank = []
  state.wdbank = []
  state.dplist = []
  state.wdlist = []
  state.incomingSMS =[]
  state.agent = null
  state.company =null
  state.tfa_credential =null
  state.tfa_data =null
  state.tokenMember =null
  state.user =null
  state.verify =null
  state.key =null

  state.isAdmin =false


}
// playSoundNoauto() {
//   //127.0.0.1:8000/
//   console.log(this.dpAlertToggle);
//   var sounddpdata = {
//       soundurl: "/medias/DoorBellmp3.mp3"
//   };

//   var audio = new Audio(sounddpdata.soundurl);
//   if (this.$store.state.NoautoAlertToggle == true) {
//       audio.play();
//   }
// },

// playSoundDP() {
//   //127.0.0.1:8000/

//   var sounddpdata = {
//       soundurl: "/medias/cash.mp3"
//   };

//   var audio = new Audio(sounddpdata.soundurl);
//   if (this.$store.state.dpAlertToggle == true) {
//       audio.play();
//   }
// },
// playSoundWD() {
//   var soundwddata = {
//       soundurl: "/medias/whistle.mp3"
//   };
//   var audio = new Audio(soundwddata.soundurl);
//   if (this.$store.state.wdAlertToggle == true) {
//       audio.play();
//   }
// },

export function addWithdraw(state, payload) {
  state.wdlist.unshift(payload) 
  if(state.wdlist.length > 30){
    state.wdlist.slice(0,29)
  }
}
export function addDeposit(state, payload) {
  payload.created_at = dayjs(payload.created_at).format('YYYY-MM-DD HH:mm:ss')
  payload.smsdatetime = dayjs(payload.smsdatetime).format('YYYY-MM-DD HH:mm:ss')
 
  state.dplist.unshift(payload) 
  if(state.dplist.length > 30){
    // state.dplist.slice(0,29)
  }
}


export function addIncoming(state, payload) {
  state.incomingSMS.unshift(payload) 
  if(state.incomingSMS.length > 20){
    state.incomingSMS.slice(0,19)
  }
}
export function updateIncoming(state, payload) {
  state.incomingSMS = payload
  if(state.incomingSMS.length > 20){
    state.incomingSMS.slice(0,19)
  }
}
export function updateWithdrawlist(state, payload) {
  console.log('doing')
  state.wdlist = payload

}
export function updateComponentkey(state, payload) {
  console.log('componentKey ',payload)
  state.componentKey = payload

}

export function RemoveIncoming(state, payload) {

  
 
 
}
export function serTfa_credential(state, payload) {
  state.tfa_credential = payload;
}

export function setTFAdata(state, payload) {
  state.tfa_data = payload;
}

export function setVerify(state, payload) {
  state.verify = payload;
}
