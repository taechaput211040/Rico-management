export function setDplist(state, payload) {
  state.dplist = payload;
  console.log("setOkDP");
}

export function setWdlist(state, payload) {
  state.wdlist = payload;
  console.log("setOkWD");
}
export function socketDP(state, payload) {
  state.dplist.unshift(payload);
  console.log("addSocketDp");
}

export function socketWD(state, payload) {
  state.wdlist.unshift(payload);
  console.log("addSocketWD");
}
