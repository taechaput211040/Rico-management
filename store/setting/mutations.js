export function setGameHash(state, payload) {
  state.game_hash = payload;
}
export function setProviderHash(state, payload) {
  state.provider_hash = payload;
}
export function setAllsetting(state, payload) {
  state.setting = payload;
}
export function setAllmessage(state, payload) {
  state.message = payload;
}
export function setActivity(state, payload) {
  state.activity = payload;
}

export function setActivityLogout(state, payload) {
  state.activity = null;
}
