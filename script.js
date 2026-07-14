const button = document.getElementById("hello-btn");

const messages = [
    "Hello 👋",
    "Welcome to SudoTADS.",
    "More features coming soon...",
    "Keep building."
];

let index = 0;

button.addEventListener("click", () => {
    button.textContent = messages[index];
    index++;
    if(index >= messages.length){
        index = 0;
    }
});


const facts = [
  "I'm currently studying Mandarin Chinese",
  "This site was built with zero frameworks — just HTML, CSS & JS",
  "BRIS uses Markov chains for NLP",
  "I can touch-type at 70+ wpm *",
  "I founded LunixDV — building privacy-first AI tools",
  "My portfolio at tadstech.dev uses Bun + Vite + GSAP",
  "I'm a Mathematics student at the University of Lagos",
  "This corner took you <3 seconds to discover"
];

let factIndex = 0;
const dykText = document.getElementById("dyk-text");
let dykInterval;

function startDykRotation() {
  dykInterval = setInterval(() => {
    factIndex = (factIndex + 1) % facts.length;
    dykText.style.opacity = "0";
    setTimeout(() => {
      dykText.textContent = facts[factIndex];
      dykText.style.opacity = "1";
    }, 300);
  }, 4000);
}

function stopDykRotation() {
  clearInterval(dykInterval);
}

// ── Corner discovery counter ──
let cornersFound = JSON.parse(localStorage.getItem("cornersFound") || "0");
const counterEl = document.getElementById("corner-count");

function updateCounter() {
  cornersFound = Math.min(cornersFound + 1, 4);
  localStorage.setItem("cornersFound", JSON.stringify(cornersFound));
  if (counterEl) counterEl.textContent = `${cornersFound} / 4`;
}

const zones = document.querySelectorAll(".corner-zone");
zones.forEach(zone => {
  zone.addEventListener("mouseenter", updateCounter, { once: true });
});

// ── Start DYK rotation on load ──
startDykRotation();

// ── Uptime ──
const uptimeEl = document.getElementById("uptime-count");
if (uptimeEl) {
  const start = Date.now();
  setInterval(() => {
    const sec = Math.floor((Date.now() - start) / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    uptimeEl.textContent = `${m}m ${s}s`;
  }, 1000);
}

/* ══════════════════════════════════════════════════════════
   PHASE 4: TOAST + MOBILE CORNERS + SHAKE + FAB
   ══════════════════════════════════════════════════════════ */

// ── Toast notification ──
(function() {
  const toast = document.getElementById("toast");
  const closeBtn = document.getElementById("toast-close");
  if (!toast) return;

  // Update toast text for mobile
  if (window.innerWidth <= 768) {
    toast.querySelector(".toast-text").innerHTML =
      'Tap <kbd>whoami</kbd> or <kbd>>_</kbd> to open terminal';
  }

  // Show after 1s (every page load — reminders don't hurt)
  const showTimer = setTimeout(() => {
    toast.classList.add("visible");
  }, 1000);

  const autoDismiss = setTimeout(() => {
    toast.classList.remove("visible");
  }, 10000);

  function dismiss() {
    toast.classList.remove("visible");
    clearTimeout(showTimer);
    clearTimeout(autoDismiss);
    document.removeEventListener("termOpened", dismiss);
  }

  // Dismiss on first terminal open
  document.addEventListener("termOpened", dismiss);

  // Manual close
  closeBtn.addEventListener("click", dismiss);
})();

// ── Floating action button ──
(function() {
  const fab = document.getElementById("term-fab");
  if (!fab) return;

  fab.addEventListener("click", () => {
    if (window.term) window.term.toggle();
  });

  // Hide FAB when terminal is open, show when closed
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "`") {
      setTimeout(() => {
        if (window.term) {
          fab.style.display = window.term.visible ? "none" : "";
          // Re-check on resize
        }
      }, 50);
    }
  });

  // Watch terminal visibility changes
  const observer = new MutationObserver(() => {
    if (window.term) {
      fab.style.display = window.term.visible ? "none" : "";
    }
  });
  const target = document.getElementById("terminal");
  if (target) {
    observer.observe(target, { attributes: true, attributeFilter: ["class"] });
  }
})();

// ── Terminal trigger on $ whoami tag ──
(function() {
  const trigger = document.getElementById("term-trigger");
  if (!trigger) return;

  trigger.addEventListener("click", () => {
    if (window.term) window.term.toggle();
  });
})();

// ── Mobile corner tap zones ──
(function() {
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (!isTouch) return;

  const panels = document.querySelectorAll(".corner-panel");

  function closeAllPanels(except) {
    panels.forEach(p => {
      if (p !== except) p.classList.remove("tapped");
    });
  }

  document.querySelectorAll(".corner-zone").forEach((zone, i) => {
    const panel = panels[i];
    if (!panel) return;

    zone.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = panel.classList.contains("tapped");
      closeAllPanels(panel);
      if (!isOpen) {
        panel.classList.add("tapped");
        // Auto-hide after 4s
        setTimeout(() => panel.classList.remove("tapped"), 4000);
      }
    });
  });

  // Close panels when tapping outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".corner-zone") && !e.target.closest(".corner-panel")) {
      closeAllPanels();
    }
  });
})();

// ── Shake detection (mobile) ──
(function() {
  if (!("DeviceMotionEvent" in window)) return;

  let lastShake = 0;
  let lastX = 0, lastY = 0, lastZ = 0;

  window.addEventListener("devicemotion", (e) => {
    const acc = e.accelerationIncludingGravity;
    if (!acc) return;

    const x = acc.x, y = acc.y, z = acc.z;
    if (lastX === 0 && lastY === 0 && lastZ === 0) {
      lastX = x; lastY = y; lastZ = z;
      return;
    }

    const delta = Math.abs(x - lastX) + Math.abs(y - lastY) + Math.abs(z - lastZ);
    const now = Date.now();

    if (delta > 25 && now - lastShake > 2000) {
      lastShake = now;
      if (window.term) window.term.toggle();
    }

    lastX = x; lastY = y; lastZ = z;
  });
})();

// ── Blog expand/collapse ──
function toggleBlog(el) {
  const card = el.closest('.blog-card');
  if (!card) return;
  card.classList.toggle('expanded');
  const toggle = card.querySelector('.blog-toggle');
  toggle.textContent = card.classList.contains('expanded') ? 'Close' : 'Read more';
}