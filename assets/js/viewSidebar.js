import allMenu from "./dataSidebar.js";
function showMenu() {
  const container = document.getElementById("menu-container");
  const currentLocation = location.href;
  let menuHTML = "";
  allMenu.forEach((menu) => {
    menuHTML += `
    <div class="divider"></div>
    <div class="title mb-2">${menu.title}</div>`;
    menu.nav.forEach((nav) => {
      if (nav.link === currentLocation) {
        menuHTML += `
        <li class="nav-item active mb-2 sidebar-menu">
        <a href="${nav.link}" class="nav-link">
          <i class="fa fa-fw ${nav.icon}"></i>
          <span>${nav.nama}</span>
        </a>
      </li>`;
      } else {
        menuHTML += `
        <li class="nav-item mb-2 sidebar-menu">
        <a href="${nav.link}" class="nav-link">
          <i class="fa fa-fw ${nav.icon}"></i>
          <span>${nav.nama}</span>
        </a>
      </li>`;
      }
    });
  });
  container.innerHTML = menuHTML;
}

showMenu();
