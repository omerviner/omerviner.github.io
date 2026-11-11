// Play each looping clip only while it is on screen. With reduced motion, show controls instead.
(function () {
  var clips = [].slice.call(document.querySelectorAll("video[data-clip]"));
  if (!clips.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    clips.forEach(function (v) { v.controls = true; v.preload = "metadata"; });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { var p = e.target.play(); if (p && p.catch) p.catch(function () {}); }
      else e.target.pause();
    });
  }, { threshold: 0.35 });
  clips.forEach(function (v) { io.observe(v); });
})();
