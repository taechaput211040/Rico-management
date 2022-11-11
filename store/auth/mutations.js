export function set_login(state, payload) {
  console.log(payload, "payload");
  state.key = payload.token;
  state.user = payload.username;
  state.group = JSON.parse(payload.menu);
  state.hash = payload.setting.hash;
  state.company = payload.setting.company;
  state.agent = payload.setting.agent;
  state.isAdmin = payload.s_admin;
  // state.hash = payload.hash;
  localStorage.setItem("isAdmin", payload.s_admin);
  localStorage.setItem("agent", payload.agent);
  localStorage.setItem("company", payload.company);
  localStorage.setItem("hash", payload.setting.hash);
  localStorage.setItem("group", payload.menu);
  localStorage.setItem("key", payload.token); //** */
  localStorage.setItem("username", payload.username);
  localStorage.setItem("name", payload.name);
  // localStorage.setItem("isLoggedIn", isLoggedIn);
}
export function set_user(state, payload) {
  state.name = payload.name;
  localStorage.setItem("name", payload.name);
  // localStorage.setItem("isLoggedIn", isLoggedIn);
}

export function set_logout(state) {
  localStorage.clear();
  state.key = undefined;
  state.user = undefined;
  state.group = undefined;
  state.company = undefined;
  state.agent = undefined;
  state.name = undefined;
  state.isAdmin = false;
  state.hash = undefined;
}
