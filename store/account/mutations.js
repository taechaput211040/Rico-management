export function setPallete(state, payload) {
  for (const [key, v] of Object.entries(payload.palette)) {
    // console.log(key, v, 'jetmea')
    if (typeof v === "object") {
      for (const [k, val] of Object.entries(v)) {
        if (val.type == "color") {
          document.documentElement.style.setProperty(
            `--${key}_${k}`,
            val.value
          );
        }
      }
    }
  }
  state.webPalette = payload;
  console.log("set palete success");
  // localStorage.setItem('presetPallete', JSON.stringify(payload))
}
