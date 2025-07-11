const headerNavigation = document.querySelector("[data-header-navigation]");
const headerNavigationOverlay = document.querySelector(
  "[data-header-menu-overlay]"
);

// Mobile and Overlay Toggle
document.querySelectorAll("[data-header-menu-toggle]").forEach((el) => {
  el.addEventListener("click", () => {
    document.body.classList.toggle("overflow-hidden");

    if (headerNavigation) {
      headerNavigation.classList.toggle("nav-open");
    }
    if (headerNavigationOverlay) {
      headerNavigationOverlay.classList.toggle("overlay-visible");
    }
  });
});

// Mobile Dropdown Functionality
if (headerNavigation) {
  headerNavigation
    .querySelectorAll(".dropdown-button[data-dropdown]")
    .forEach((el) => {
      el.addEventListener("click", () => {
        el.parentNode.classList.toggle("open");
      });
    });
}

let submenuTimer;
let activeSubmenu = null;

document.querySelectorAll(".top-level-link").forEach((group) => {
  const submenu = group.querySelector(".desktop-submenu");

  if (submenu) {
    const showSubmenu = () => {
      clearTimeout(submenuTimer);

      if (activeSubmenu && activeSubmenu !== submenu) {
        activeSubmenu.classList.remove("submenu-visible");
        activeSubmenu.classList.add("submenu-hidden");
      }

      activeSubmenu = submenu;

      submenu.classList.remove("submenu-hidden");
      submenu.classList.add("submenu-visible");
    };

    const hideSubmenu = () => {
      submenuTimer = setTimeout(() => {
        submenu.classList.remove("submenu-visible");
        submenu.classList.add("submenu-hidden");

        if (activeSubmenu === submenu) {
          activeSubmenu = null;
        }
      }, 500);
    };

    group.addEventListener("mouseenter", showSubmenu);
    group.addEventListener("mouseleave", hideSubmenu);
  }
});
