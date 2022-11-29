export function set_login(state, payload) {
  // console.log(payload, "payload");
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

export function set_user(state, payload) {
  state.name = payload.name;
  // state.hash = payload.setting.hash;
  state.company = payload.company;
  state.agent = payload.agent;
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

export function set_logout(state) {
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
