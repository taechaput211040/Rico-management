export function setPallete(state, payload) {
  for (const [key, v] of Object.entries(payload.palette)) {
    if (typeof v === "object") {
      for (const [k, val] of Object.entries(v)) {
        if (val.type == "color" || val.type == "color_text") {
          document.documentElement.style.setProperty(
            `--${key}_${k}`,
            val.value
          );
        } else if (val.type == "linear") {
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
