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

  // Hide on scroll down, show again on scroll up.
  const nav = document.querySelector(".bottom-nav");
  if (nav) {
    const THRESHOLD = 8; // px of movement before reacting, ignores jitter
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      // clamp so iOS rubber-band overscroll at either end doesn't count as a direction change
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const y = Math.min(Math.max(0, window.scrollY), maxY);
      const delta = y - lastY;
      if (y <= 0) nav.classList.remove("is-hidden"); // always show at the top
      else if (Math.abs(delta) < THRESHOLD) return;
      else if (delta > 0) nav.classList.add("is-hidden");
      else if (delta < 0) nav.classList.remove("is-hidden");
      lastY = y;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    // keyboard focus on a hidden tab brings the bar back
    nav.addEventListener("focusin", () => nav.classList.remove("is-hidden"));
  }

  // Coming back via the browser's back button restores the page from cache —
  // make sure the highlight matches this page again.
  window.addEventListener("pageshow", () => {
    const current = document.querySelector('.bottom-nav__item[data-current]');
    if (current) activate(current);
  });
})();
