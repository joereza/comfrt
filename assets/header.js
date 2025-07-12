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
  headerNavigation.querySelectorAll("[data-dropdown]").forEach((el) => {
    el.addEventListener("click", () => {
      const currentParent = el.parentNode;
      const isCurrentlyOpen = currentParent.classList.contains("open");

      // Close all other dropdowns first
      headerNavigation
        .querySelectorAll(".nav-item.open")
        .forEach((openItem) => {
          if (openItem !== currentParent) {
            openItem.classList.remove("open");
          }
        });

      // Toggle current dropdown
      currentParent.classList.toggle("open");
    });
  });
}

// Desktop Submenu Functionality
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

// Image Loading Handler
document.querySelectorAll("[data-image-loading-skeleton]").forEach((img) => {
  const wrapper = img.closest(".featured-image-wrapper");
  const placeholder = wrapper?.querySelector(".featured-image-placeholder");

  if (wrapper && placeholder) {
    // Skip if image has already been loaded
    if (wrapper.classList.contains("loaded")) {
      return;
    }

    // Check if image is already loaded (cached)
    if (img.complete && img.naturalWidth > 0) {
      wrapper.classList.add("loaded");
      placeholder.style.display = "none";
      return;
    }

    // Handle successful image load
    img.addEventListener(
      "load",
      () => {
        if (wrapper.classList.contains("loaded")) {
          return;
        }

        wrapper.classList.add("loaded");

        // Just a slight delay for smoother transition
        setTimeout(() => {
          placeholder.style.display = "none";
        }, 500);
      },
      { once: true }
    );
  }
});
