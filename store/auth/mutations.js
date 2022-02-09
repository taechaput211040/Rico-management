export function set_login(state, payload) {
  const { key, username, isLoggedIn } = payload;
  state.key = key;
  state.user = payload.username;
  localStorage.setItem("key", key);
  console.log(payload);
  localStorage.setItem("username", username);
  localStorage.setItem("isLoggedIn", isLoggedIn);
}
