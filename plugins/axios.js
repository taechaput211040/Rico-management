export default function ({ $axios, redirect, store, app }) {
  // export default function(config) {

  $axios.onRequest((config) => {
  //  console.log("asdasdasdasdasdads",store)
    const version = localStorage.getItem("version")
    console.log("v",version)
    console.log("v",localStorage.getItem("version"))
    if(version != process.env.VERSION_APP){
      localStorage.clear();
      redirect("/login");
    }
    config.headers.common["Authorization"] = `Bearer ${store.state.auth.key}`;
  });
  $axios.onError((error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      redirect("/login");
    }
  });
  $axios.onError((error) => {
    if (error.response.status) {
      app.$swal({
        icon: "error",
        title: `${error.response.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
}
