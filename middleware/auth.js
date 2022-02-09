export default function({ store, redirect }) {
  if (!store.state.auth.key) {
    return redirect("/login");
  }
}
