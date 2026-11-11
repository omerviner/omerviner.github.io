// Mobile menu: open and close the sidebar.
(function () {
  var toggle = document.getElementById("menuToggle");
  var bar = document.getElementById("bar");
  var overlay = document.getElementById("overlay");
  if (!toggle || !bar) return;

  function setOpen(open) {
    bar.classList.toggle("open", open);
    overlay.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", function () { setOpen(!bar.classList.contains("open")); });
  overlay.addEventListener("click", function () { setOpen(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && bar.classList.contains("open")) { setOpen(false); toggle.focus(); }
  });
})();
