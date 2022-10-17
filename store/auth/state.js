export default function() {
  return {
    key: localStorage.getItem("key") || "", //token
    user: localStorage.getItem("username") || null,
    group: JSON.parse(localStorage.getItem("group")) || null
  };
}
