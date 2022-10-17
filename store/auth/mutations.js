export function set_login(state, payload) {
  console.log(payload,'payload')
  state.key = payload.token;
  state.user = payload.username;
  state.group = payload.group;
  // localStorage.setItem("group", JSON.stringify(payload.group));
  localStorage.setItem("key", payload.token);
  console.log(payload);
  localStorage.setItem("username", payload.username);
  // localStorage.setItem("isLoggedIn", isLoggedIn);
}

export function set_logout(state) {
  localStorage.clear();
  state.key = undefined;
  state.user = undefined;
  state.group = undefined;
}
