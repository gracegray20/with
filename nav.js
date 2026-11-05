// Shared bottom navigation behaviour.
// Tap → highlight the tab + replay the pop animation.
// If the tab links to another page, navigate once the pop has played.
(() => {
  const NAV_DELAY = 220; // ms — long enough to see the press/pop motion
  const items = document.querySelectorAll(".bottom-nav__item");

  function activate(item) {
    items.forEach((n) => {
      const on = n === item;
      n.classList.toggle("is-active", on);
      if (on) n.setAttribute("aria-current", "page");
      else n.removeAttribute("aria-current");
    });
  }

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      const href = item.getAttribute("href");
      const goesElsewhere = href && href !== "#" && !item.classList.contains("is-active");
      e.preventDefault();

      activate(item);
      item.classList.remove("is-tapped");
      void item.offsetWidth; // restart animation
      item.classList.add("is-tapped");

      if (goesElsewhere) setTimeout(() => (location.href = href), NAV_DELAY);
    });
    item.addEventListener("animationend", () => item.classList.remove("is-tapped"));
  });

  // Coming back via the browser's back button restores the page from cache —
  // make sure the highlight matches this page again.
  window.addEventListener("pageshow", () => {
    const current = document.querySelector('.bottom-nav__item[data-current]');
    if (current) activate(current);
  });
})();
