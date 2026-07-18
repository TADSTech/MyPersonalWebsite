# SudoTADS: Personal Site

My personal corner of the internet. Built with plain HTML, CSS, and JavaScript (with some cdn exports) that just files that ship straight to a browser without any build steps.

**Live look:** portfolio + terminal-style easter egg + a few hidden interactions scattered around the page.

---

## What's in here

A single-page site for myself (Michael, aka SudoTADS 'aliased as' TADSTech) — Mathematics student at the University of Lagos, builder of small tools and occasionally-finished side projects.

Sections: hero, about, hobbies, a stats strip, project list, and a devlog/blog block. Nothing exotic, just a clean scroll with some GSAP-powered motion on entry.

The one thing I actually had fun building is the **terminal**. Press " Ctrl + \` " (or tap the floating button on mobile) and you get a fake shell you can type real commands into:

```
help          → list all commands
whoami        → who I am
projects      → what I've shipped
skills        → tech I actually use
neofetch      → system info, but personalized
cat [dir]     → read a virtual file
theme [color] → swap the accent color
matrix        → toggle the rain effect
cowsay [msg]  → because why not
ping / curl   → simulated, not real network calls
sudo          → does nothing, obviously
```

There's a `history`, `clear`, `exit`, and a handful of other standard-shell commands too, All inspired by the Alacritty terminal back when I was on linux.
Type `help` inside it for the full list.

## Tech stack

- **HTML/CSS/JS**: no framework, no bundler. Kept it dependency-free on purpose.
- **GSAP + ScrollTrigger** (via CDN): scroll-triggered animations and the blob morph in the hero.
- **JetBrains Mono**: the only font on the page, loaded from Google Fonts.
- **localStorage**: used sparingly, just to remember how many "corners" you've discovered.

It's static files you can open with any web server (or literally just double-click `index.html`).

## File structure

```
.
├── index.html       # all page markup + inline GSAP setup
├── style.css         # main site styles, theme variables live here
├── terminal.css       # styles for the terminal overlay + toast + FAB
├── script.js          # button interactions, "did you know" rotator, corner counter
└── terminal.js         # the terminal emulator — command registry + input handling
```

## Running it locally

No install required.

```bash
git clone <this-repo>
cd sudotads
```

Then just open `index.html` in a browser, or serve it if you want relative paths to behave nicer:

```bash
python3 -m http.server 8000
# or
npx serve .
# or (as a bun supporter)
bun index.html
```

## Little details worth knowing

- Four corners of the screen have hidden hover/tap panels — nav links, session uptime, and a rotating "did you know" fact card. There's a counter tracking how many you've found (max 4/4).
- Shaking your phone (yes, actually) also opens the terminal, if `DeviceMotionEvent` is supported.
- The toast on load nudges first-time visitors toward the terminal, and dismisses itself once you open it.

## Why it's built this way

Even while there was a lotta Inspo from stuff I've seen online.
I didn't want a templated portfolio. Most of this exists because I wanted an excuse to write vanilla JS without reaching for a framework, and the terminal specifically because I thought a text-based Easter egg fit better than another "contact me" form.

## Contact

- GitHub: [TADSTech](https://github.com/TADSTech)
- LinkedIn: [tadstech](https://linkedin.com/in/tadstech)
- Email: motrenewed@gmail.com

---

*Built and maintained by Michael Tunwashe.*