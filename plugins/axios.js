export default function({ $axios, redirect, store }) {
  // export default function(config) {
  $axios.onRequest(config => {
    console.log(`${store.state.key}`);
    config.headers["Authorization"] = `${store.state.key}`;
  });
  $axios.onError(error => {
    if (error.response.status === 401) {
      redirect("/login");
    }
  });
}
