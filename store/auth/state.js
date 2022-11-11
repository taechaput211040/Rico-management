import setting from "../setting";

export default function() {
  return {
    key: localStorage.getItem("key") || null, //token
    user: localStorage.getItem("username") || null,
    group: JSON.parse(localStorage.getItem("group")) || null,
    hash: localStorage.getItem("hash") || null, //token
    agent: localStorage.getItem("agent") || null,
    company: localStorage.getItem("company") || null,
    name: localStorage.getItem("name") || null,
    isAdmin: localStorage.getItem("isAdmin") || null
  };
}
