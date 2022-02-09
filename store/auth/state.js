export default function() {
  return {
    key: localStorage.getItem("key") || "",
    user:localStorage.getItem("username") || null
  };
}
