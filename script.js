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
  "I can touch-type at 70+ wpm",
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