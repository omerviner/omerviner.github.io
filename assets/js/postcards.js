// Digital Postcards: a looping, layered panorama.
// Drag or swipe, trackpad scroll, arrow keys, the arrow buttons or a destination name move it.
// It drifts slowly on its own until someone touches it (not with reduced motion).
(function () {
  var root = document.querySelector("[data-pano]");
  if (!root) return;

  var ART_RATIO = 16356.98 / 800; // strip width / height of every layer
  var PERIOD = 0.8843;            // the strip repeats after this share of its width (night sky at both ends)
  var DRIFT = 28;                 // px per second while idle

  var frame = root.querySelector(".pano-frame");
  var layers = [].slice.call(root.querySelectorAll(".pano-layer"));
  var stops = [].slice.call(root.querySelectorAll(".pano-stops button"));
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var W = 0, P = 0, V = 0;        // strip width, loop period, frame width (px)
  var x = 0;                      // current scroll position (px from strip start)
  var vel = 0;                    // px per second
  var target = null;              // eased jump target
  var touched = false, dragging = false, visible = true;
  var lastX = 0, lastT = 0, hoverSpeed = 0, parallax = 0;
  var lookAim = 0, look = 0;      // pointer position across the frame, -0.5..0.5, for hover parallax
  var LOOK = 0.16;                // how far the nearest layer shifts, as a share of the frame width

  function measure() {
    var h = frame.clientHeight;
    V = frame.clientWidth;
    var f = W ? x / W : 0.2;
    W = h * ART_RATIO;
    P = W * PERIOD;
    layers.forEach(function (l) {
      l.style.width = (W + P) + "px";
      l.children[0].style.width = W + "px";
      l.children[1].style.width = W + "px";
      l.children[1].style.left = P + "px";
    });
    x = f * W;
  }

  function wrap(v) { return ((v % P) + P) % P; }
  function centerOf(at) { return at * W - V / 2; }

  // shortest way round the loop to a destination
  function goTo(at) {
    var t = centerOf(at), d = wrap(t - x);
    if (d > P / 2) d -= P;
    target = x + d;
    touched = true;
  }

  function nearestStop(dir) {
    var here = wrap(x + V / 2) / W, best = null, bestD = Infinity;
    stops.forEach(function (b) {
      var at = parseFloat(b.dataset.at), d = (at - here) * dir;
      if (d < 0.01) d += PERIOD;
      if (d < bestD) { bestD = d; best = at; }
    });
    return best;
  }

  var prev = 0;
  function frameStep(t) {
    var dt = Math.min(0.05, (t - (prev || t)) / 1000);
    prev = t;
    if (visible && W) {
      if (target !== null) {
        var d = target - x;
        x += d * Math.min(1, dt * 4);
        vel = d * 4;
        if (Math.abs(d) < 0.5) { x = target; target = null; vel = 0; }
      } else if (!dragging) {
        vel *= Math.pow(0.04, dt);                       // inertia after a drag
        var idle = (!touched && !reduce) ? DRIFT : 0;
        x += (vel + idle + hoverSpeed) * dt;
      }
      parallax += ((vel + hoverSpeed) * 0.12 - parallax) * Math.min(1, dt * 3);
      parallax = Math.max(-V * 0.25, Math.min(V * 0.25, parallax));
      look += (lookAim - look) * Math.min(1, dt * 5);
      var M = V * 0.5, base = wrap(x - M) + M;   // keep room on both sides so shifted layers never show an edge
      layers.forEach(function (l) {
        var depth = parseFloat(l.dataset.depth);
        var shift = parallax * depth + look * LOOK * V * depth * depth;  // nearer layers move much more
        l.style.transform = "translate3d(" + (-base - shift) + "px,0,0)";
      });
      var here = wrap(x + V / 2) / W;
      stops.forEach(function (b) {
        var on = Math.abs(parseFloat(b.dataset.at) - here) < 0.06;
        b.classList.toggle("on", on);
        if (on) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current");
      });
    }
    requestAnimationFrame(frameStep);
  }

  function interact() {
    touched = true;
    root.classList.add("pano-used");
  }

  // drag / swipe
  frame.addEventListener("pointerdown", function (e) {
    if (e.target.closest("button")) return;
    dragging = true; target = null; vel = 0;
    lastX = e.clientX; lastT = e.timeStamp;
    frame.setPointerCapture(e.pointerId);
    frame.classList.add("dragging");
    interact();
  });
  frame.addEventListener("pointermove", function (e) {
    if (dragging) {
      var dx = e.clientX - lastX, dt = Math.max(1, e.timeStamp - lastT) / 1000;
      x -= dx;
      vel = -dx / dt;
      lastX = e.clientX; lastT = e.timeStamp;
    } else if (e.pointerType === "mouse") {
      // like the original: the pointer near an edge travels that way
      var r = frame.getBoundingClientRect(), p = (e.clientX - r.left) / r.width - 0.5;
      lookAim = reduce ? 0 : p;
      hoverSpeed = Math.abs(p) > 0.3 ? Math.sign(p) * (Math.abs(p) - 0.3) * 1400 : 0;
      if (hoverSpeed) interact();
    }
  });
  function endDrag() { dragging = false; frame.classList.remove("dragging"); }
  frame.addEventListener("pointerup", endDrag);
  frame.addEventListener("pointercancel", endDrag);
  frame.addEventListener("pointerleave", function () { hoverSpeed = 0; lookAim = 0; });

  // trackpad: horizontal scroll only, so page scrolling still works
  frame.addEventListener("wheel", function (e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      target = null; x += e.deltaX; vel = 0;
      interact();
    }
  }, { passive: false });

  frame.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(nearestStop(e.key === "ArrowRight" ? 1 : -1));
      interact();
    }
  });
  root.querySelector(".pano-prev").addEventListener("click", function () { goTo(nearestStop(-1)); interact(); });
  root.querySelector(".pano-next").addEventListener("click", function () { goTo(nearestStop(1)); interact(); });
  stops.forEach(function (b) {
    b.addEventListener("click", function () { goTo(parseFloat(b.dataset.at)); interact(); });
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(frame);
  }
  window.addEventListener("resize", measure);
  measure();
  x = centerOf(0.215); // start at the beach
  requestAnimationFrame(frameStep);
})();
