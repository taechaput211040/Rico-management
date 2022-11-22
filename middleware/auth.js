export default function({ store, redirect, route }) {
  if (!store.state.auth.key) {
    localStorage.clear();
    sessionStorage.clear();
    return redirect("/login");
  }
  if (store.state.auth.menu) {
    let permission = store.state.auth.menu;
    const mainmenu = store.state.menu;
    const currentPath = route.path;
    if (permission.length > 0 || permission) {
      let listMenu = mainmenu.filter(menu => {
        return permission.includes(menu.permission);
      });
      let isexists = listMenu.find(mainlink => {
        if (mainlink.subLinks) {
          let already = mainlink.subLinks.find(
            sublink => sublink.to == currentPath
          );
          return already;
        } else {
          return mainlink.to == currentPath;
        }
      });
      if (!isexists && listMenu.length > 0) {
        return redirect(
          listMenu[0].to ? listMenu[0].to : listMenu[0].subLinks[0].to
        );
      }
    } else if (!permission) {
      console.log("nooooo")
    }
  }
}
