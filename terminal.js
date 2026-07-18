(function() {
  'use strict';

  const COMMANDS = {};

  // ── Utils ──

  function timestamp() {
    return new Date().toLocaleTimeString();
  }

  function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const LINES = [
    "A ship in harbor is safe, but that's not what ships are built for.",
    "Talk is cheap. Show me the code. — Linus Torvalds",
    "First, solve the problem. Then, write the code. — John Johnson",
    "Make it work, make it right, make it fast. — Kent Beck",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Don't count the days, make the days count. — Muhammad Ali",
    "Simplicity is prerequisite for reliability. — Edsger W. Dijkstra",
    "It works on my machine.",
    "Software is a great combination between artistry and engineering. — Bill Gates",
    "Fix the cause, not the symptom. — Steve Maguire",
    "Premature optimization is the root of all evil. — Donald Knuth",
    "Code is like humor. When you have to explain it, it's bad.",
    "The only way to learn a new programming language is by writing programs in it. — Dennis Ritchie",
    "It's not a bug — it's an undocumented feature.",
    "Before software can be reusable it first has to be usable. — Ralph Johnson",
    "Learning Mandarin is like learning to code — it rewires your brain.",
    "I use Arch, by the way.",
  ];

  const COW = [
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||",
  ];

  const SUDO_DENIALS = [
    "Permission denied. This incident will be reported.",
    "Nice try. sudo: 3 incorrect attempts. Locking out for 5 minutes (not really, but imagine).",
    "You are not in the sudoers file. This incident will be reported.",
    "sudo: unable to resolve host: common sense",
    "sudo: effective uid is not 0. Have you tried turning it off and on again?",
    "Nah. I don't feel like it.",
  ];

  const BANNER = `
 ███████  ██████  ██████  ██████  ████████  █████  ██████  ███████
 ██      ██    ██ ██   ██ ██   ██    ██    ██   ██ ██   ██ ██
 ███████ ██    ██ ██   ██ ██   ██    ██    ███████ ██   ██ ███████
      ██ ██    ██ ██   ██ ██   ██    ██    ██   ██ ██   ██      ██
 ███████  ██████  ██████  ██████     ██    ██   ██ ██████  ███████
  `;

  const NEOASCII = `
       ████████
     ██        ██
    ██  █    █  ██
    ██  █    █  ██
    ██  █    █  ██
    ██   ████   ██
     ██        ██
      ██████████
     ██        ██
    ██  ██████  ██
   ██  ████████  ██
   ██  ████████  ██
   ██  ████████  ██
    ██  ██████  ██
     ██        ██
       ████████
  `;

  // ── Define all commands ──

  function register(name, desc, fn) {
    COMMANDS[name] = { desc, fn };
  }

  // help
  register('help', 'Show this help message', function(args, term) {
    const sorted = Object.keys(COMMANDS).sort();
    let out = 'Available commands:\n';
    for (const cmd of sorted) {
      out += '  ' + cmd.padEnd(14) + COMMANDS[cmd].desc + '\n';
    }
    term.print(out, 'info');
  });

  // whoami
  register('whoami', 'Display user info', function(args, term) {
    const lines = [
      'Michael Tunwashe (SudoTADS)',
      ' Founder @ LunixDV',
      ' Mathematics — University of Lagos',
      ' Data & Systems Engineer',
      ' Location: Lagos, Nigeria',
      ' Languages: Python, SQL, Bash, MQL5, Mandarin (learning)',
    ];
    term.print(lines.join('\n'));
  });

  // projects
  register('projects', 'List shipped projects', function(args, term) {
    const out = [
      ' WXATA      — WhatsApp automation (Bun, TypeScript, React)',
      ' BRIS       — ETL platform, Markov chain NLP (FastAPI, PostgreSQL)',
      ' Centaur    — Trading API, ML lifecycle (Python, FastAPI)',
      ' ClauseZero — AI legal auditor in Rust (LunixDV)',
      ' Tairesume  — AI-powered resume builder',
      '',
      ' 10+ total projects. More cooking.',
    ];
    term.print(out.join('\n'));
  });

  // skills
  register('skills', 'Show technical skills', function(args, term) {
    const out = [
      ' Languages:      Python  SQL  Bash  MQL5  Mandarin',
      ' Tools:          Docker  Git  SQLAlchemy  dbt  DuckDB  Prometheus',
      ' Platforms:      Linux (Fedora)  Vercel  DigitalOcean',
      ' Domains:        Data Engineering  SRE  LLM Evaluation  Algo Trading',
    ];
    term.print(out.join('\n'));
  });

  // neofetch
  register('neofetch', 'Show system info (personalized)', function(args, term) {
    const uptime = Math.floor((Date.now() - term.sessionStart) / 1000);
    const m = Math.floor(uptime / 60);
    const s = uptime % 60;
    const out = [
      NEOASCII,
      ' OS:        SudoTADS v1.0',
      ' Host:      Michael Tunwashe',
      ' Kernel:    JavaScript (V8)',
      ' Uptime:    ' + m + 'm ' + s + 's',
      ' Shell:     bash',
      ' DE:        JetBrains Mono',
      ' Init:      vanilla',
      ' Packages:  25+ commands',
      ' CPU:       Biological (approx 86 billion neurons)',
    ];
    term.print(out.join('\n'), 'ascii');
  });

  // banner
  register('banner', 'Show ASCII banner', function(args, term) {
    term.print(BANNER, 'ascii');
  });

  // ls
  register('ls', 'List virtual directories', function(args, term) {
    term.print('about/   projects/   skills/   contact/   blog/');
  });

  // cat
  register('cat', 'Read a virtual file. Usage: cat [dir]', function(args, term) {
    const file = args[0];
    const files = {
      about: 'Hi, I\'m Michael (SudoTADS). Mathematics student at UNILAG, building open-source tools, AI experiments, and products that solve real problems. Founder @ LunixDV. Data & Systems Engineer.',
      projects: 'Active projects:\n  WXATA — WhatsApp automation\n  BRIS — ETL platform\n  Centaur — Trading API\n  ClauseZero — AI legal auditor\n  Tairesume — AI resume builder\n\nSee `projects` for details.',
      skills: 'Languages: Python, SQL, Bash, MQL5, Mandarin\nTools: Docker, Git, SQLAlchemy, dbt, DuckDB, Prometheus\nDomains: Data Engineering, SRE, LLM Eval, Algo Trading\n\nSee `skills` for details.',
      contact: 'Email: motrenewed@gmail.com\nGitHub: github.com/TADSTech\nLinkedIn: linkedin.com/in/tadstech\n\nUse `email`, `github`, or `linkedin` to open.',
      blog: 'No posts yet. Coming soon. I write devlogs though — check the website corners.',
    };
    if (!file) {
      term.print('Usage: cat [about|projects|skills|contact|blog]', 'err');
      return;
    }
    if (files[file]) {
      term.print(files[file]);
    } else {
      term.print('cat: ' + file + ': No such file or directory', 'err');
    }
  });

  // clear
  register('clear', 'Clear the terminal', function(args, term) {
    term.clear();
  });

  // exit
  register('exit', 'Close the terminal', function(args, term) {
    term.close();
  });

  // date
  register('date', 'Show current date and time', function(args, term) {
    term.print(new Date().toString());
  });

  // uptime
  register('uptime', 'Show session uptime', function(args, term) {
    const sec = Math.floor((Date.now() - term.sessionStart) / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    const h = Math.floor(m / 60);
    const rm = m % 60;
    term.print('Session uptime: ' + h + 'h ' + rm + 'm ' + s + 's');
  });

  // fortune
  register('fortune', 'Random developer quote', function(args, term) {
    term.print(rand(LINES));
  });

  // echo
  register('echo', 'Repeat a message. Usage: echo [text]', function(args, term) {
    term.print(args.join(' ') || '');
  });

  // theme
  register('theme', 'Cycle accent color. Usage: theme [green|blue|purple|red]', function(args, term) {
    const colors = {
      green: '#9AFD08',
      blue: '#3B82F6',
      purple: '#A78BFA',
      red: '#FF5F57',
      cyan: '#22D3EE',
      orange: '#FB923C',
    };
    if (!args[0]) {
      term.print('Usage: theme [green|blue|purple|red|cyan|orange]', 'err');
      return;
    }
    const c = colors[args[0]];
    if (!c) {
      term.print('theme: unknown color "' + args[0] + '". Try: green, blue, purple, red, cyan, orange', 'err');
      return;
    }
    document.documentElement.style.setProperty('--accent', c);
    term.print('Theme changed to ' + args[0]);
  });

  // github
  register('github', 'Open GitHub profile', function(args, term) {
    term.print('Opening github.com/TADSTech ...');
    window.open('https://github.com/TADSTech', '_blank');
  });

  // linkedin
  register('linkedin', 'Open LinkedIn profile', function(args, term) {
    term.print('Opening linkedin.com/in/tadstech ...');
    window.open('https://linkedin.com/in/tadstech', '_blank');
  });

  // email
  register('email', 'Show email address', function(args, term) {
    term.print('motrenewed@gmail.com');
  });

  // uname
  register('uname', 'Print system information', function(args, term) {
    term.print('SudoTADS');
  });

  // pwd
  register('pwd', 'Print working directory', function(args, term) {
    term.print('/home/sudotads');
  });

  // sudo
  register('sudo', 'Execute a command as root (not really)', function(args, term) {
    if (!args[0]) {
      term.print('usage: sudo [command]', 'err');
      return;
    }
    const cmd = args[0];
    // catch obvious destructive commands
    if (cmd === 'rm' || cmd === 'shutdown' || cmd === 'reboot' || cmd === 'poweroff' || cmd === 'init') {
      term.print('sudo: ' + rand([
        'Nice try, skid.',
        'lol no.',
        'I\'m not falling for that one.',
        'sudo: unable to destroy system: process too smart',
        'This is a static site. What did you expect?',
      ]));
      return;
    }
    if (COMMANDS[cmd]) {
      term.print('sudo: ' + cmd + ': Permission granted. Running elevated...');
      setTimeout(function() { COMMANDS[cmd].fn(args.slice(1), term); }, 200);
    } else {
      term.print(rand(SUDO_DENIALS));
    }
  });

  // history
  register('history', 'Show command history', function(args, term) {
    if (term.history.length === 0) {
      term.print('No commands in history.');
      return;
    }
    term.print(term.history.map(function(c, i) { return ' ' + (i + 1) + '  ' + c; }).join('\n'));
  });

  // ping
  register('ping', 'Ping a host. Usage: ping [host]', function(args, term) {
    const host = args[0] || 'localhost';
    term.print('PING ' + host + ' (127.0.0.1): 56 bytes of data');
    var count = 0;
    var interval = setInterval(function() {
      count++;
      var ms = Math.floor(Math.random() * 40 + 5);
      term.print('64 bytes from 127.0.0.1: icmp_seq=' + count + ' ttl=64 time=' + ms + 'ms');
      if (count >= 4) {
        clearInterval(interval);
        term.print('\n--- ' + host + ' ping statistics ---');
        term.print('4 packets transmitted, 4 received, 0% packet loss');
      }
    }, 500);
  });

  // matrix
  register('matrix', 'Toggle Matrix rain effect', function(args, term) {
    term.matrixActive = !term.matrixActive;
    term.matrixCanvas.classList.toggle('active', term.matrixActive);
    if (term.matrixActive) {
      term.startMatrixRain();
      term.print('Entering the Matrix...');
    } else {
      term.stopMatrixRain();
      term.print('Left the Matrix.');
    }
  });

  // cowsay
  register('cowsay', 'ASCII cow says something. Usage: cowsay [message]', function(args, term) {
    var msg = args.join(' ') || 'Moo.';
    var border = '+=' + '-'.repeat(Math.min(msg.length, 40)) + '=+';
    var line = '| ' + msg.substring(0, 40).padEnd(40) + ' |';
    var out = [border, line, border, '', COW.join('\n')];
    term.print(out.join('\n'), 'ascii');
  });

  // vim
  register('vim', 'Open vim editor', function(args, term) {
    term.print('E325: ATTENTION', 'err');
    term.print('Found a swap file by the name of "~/.something.swp"');
    term.print('Vim: Sorry. You need a proper terminal for that.');
    term.print('In the meantime: :q', 'sys');
  });

  // nano
  register('nano', 'Open nano editor', function(args, term) {
    term.print('nano: Nice try. Use `echo` instead.', 'err');
  });

  // weather
  register('weather', 'Show current weather (totally real)', function(args, term) {
    var conditions = [
      '27°C, partly cloudy',
      '29°C, sunny as always',
      '26°C, harmattan haze',
      '31°C, clear with a chance of data',
      '28°C, light breeze of innovation',
    ];
    term.print('Lagos, Nigeria: ' + rand(conditions));
  });

  // curl
  register('curl', 'Fetch a URL (simulated). Usage: curl [url]', function(args, term) {
    if (!args[0]) {
      term.print('curl: try \'url missing\'? Maybe specify one.', 'err');
      return;
    }
    term.print('curl: ' + args[0] + ' ...');
    setTimeout(function() {
      var responses = [
        '<html><body><h1>You found the secret page!</h1><p>There is nothing here. Go build something.</p></body></html>',
        '{ "status": "ok", "message": "Keep shipping.", "data": null }',
        'Error 418: I\'m a teapot.',
        '<!DOCTYPE html><html><body>This is the void. It stares back.</body></html>',
      ];
      term.print(rand(responses));
    }, 600);
  });

  // whois
  register('whois', 'Look up information about someone', function(args, term) {
    if (!args[0]) {
      term.print('whois: try a name. Like "Michael" or "SudoTADS"', 'err');
      return;
    }
    var name = args[0].toLowerCase();
    if (name === 'michael' || name === 'sudotads' || name === 'tadstech' || name === 'tunwashe') {
      term.print([
        'Domain:      SudoTADS',
        'Registrant:  Michael Tunwashe',
        'Location:    Lagos, Nigeria',
        'Created:     2024',
        'Status:      Always building',
        'Registrar:   University of Lagos',
      ].join('\n'));
    } else {
      term.print('whois: ' + args[0] + ': No records found. They\'re probably busy shipping.');
    }
  });

  // ── Terminal class ──

  function Terminal() {
    this.history = [];
    this.historyIdx = -1;
    this.sessionStart = Date.now();
    this.matrixActive = false;
    this.matrixInterval = null;
    this.buffer = '';
    this.overlay = document.getElementById('terminal');
    this.output = document.getElementById('term-output');
    this.input = document.getElementById('term-input');
    this.matrixCanvas = document.getElementById('term-matrix');
    this.visible = false;
  }

  Terminal.prototype.print = function(text, cls) {
    cls = cls || 'out';
    if (typeof text !== 'string') text = String(text);
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
      var div = document.createElement('div');
      div.className = 'term-line ' + cls;
      div.textContent = lines[i];
      this.output.appendChild(div);
    }
    this.output.scrollTop = this.output.scrollHeight;
  };

  Terminal.prototype.clear = function() {
    this.output.innerHTML = '';
  };

  Terminal.prototype.open = function() {
    if (this.visible) return;
    this.visible = true;
    this.overlay.classList.remove('closing');
    this.overlay.classList.add('active');
    this.input.value = '';
    this.historyIdx = this.history.length;
    setTimeout(function(self) {
      self.input.focus();
    }, 100, this);
  };

  Terminal.prototype.close = function() {
    if (!this.visible) return;
    if (this.matrixActive) {
      this.matrixActive = false;
      this.matrixCanvas.classList.remove('active');
      this.stopMatrixRain();
    }
    this.overlay.classList.add('closing');
    var self = this;
    setTimeout(function() {
      self.overlay.classList.remove('active', 'closing');
      self.visible = false;
    }, 200);
  };

  Terminal.prototype.toggle = function() {
    if (this.visible) this.close();
    else this.open();
  };

  Terminal.prototype.startMatrixRain = function() {
    var self = this;
    var canvas = this.matrixCanvas;
    var ctx = canvas.getContext('2d');
    var w, h, drops, fontSize, interval;

    function resize() {
      w = canvas.width = canvas.parentElement.offsetWidth;
      h = canvas.height = canvas.parentElement.offsetHeight;
      fontSize = 10;
      var cols = Math.floor(w / fontSize);
      drops = Array(cols).fill(1);
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#9AFD08';
      ctx.font = fontSize + 'px monospace';
      for (var i = 0; i < drops.length; i++) {
        var char = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    resize();
    this.matrixInterval = setInterval(draw, 60);
    window.matrixResize = resize;
  };

  Terminal.prototype.stopMatrixRain = function() {
    if (this.matrixInterval) {
      clearInterval(this.matrixInterval);
      this.matrixInterval = null;
    }
    var ctx = this.matrixCanvas.getContext('2d');
    ctx.clearRect(0, 0, this.matrixCanvas.width, this.matrixCanvas.height);
  };

  Terminal.prototype.execute = function(cmd) {
    cmd = cmd.trim();
    if (!cmd) return;

    this.history.push(cmd);
    this.historyIdx = this.history.length;

    this.print(this.promptText() + ' ' + cmd, 'sys');

    var parts = cmd.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    var name = parts[0].toLowerCase();
    var args = parts.slice(1).map(function(a) { return a.replace(/^"(.*)"$/, '$1'); });

    if (COMMANDS[name]) {
      COMMANDS[name].fn(args, this);
    } else if (name) {
      this.print('bash: ' + name + ': command not found. Try `help`.', 'err');
    }
  };

  Terminal.prototype.promptText = function() {
    return 'SudoTADS@dev:~$';
  };

  Terminal.prototype.handleKeydown = function(e) {
    var key = e.key;

    if (e.ctrlKey && key === '`') {
      e.preventDefault();
      this.toggle();
      return;
    }

    if (key === 'Escape') {
      e.preventDefault();
      this.close();
      return;
    }

    if (key === 'Enter') {
      e.preventDefault();
      var val = this.input.value;
      this.execute(val);
      this.input.value = '';
      return;
    }

    if (key === 'ArrowUp') {
      e.preventDefault();
      if (this.history.length === 0) return;
      this.historyIdx = Math.max(0, this.historyIdx - 1);
      this.input.value = this.history[this.historyIdx] || '';
      return;
    }

    if (key === 'ArrowDown') {
      e.preventDefault();
      if (this.history.length === 0) return;
      this.historyIdx = Math.min(this.history.length, this.historyIdx + 1);
      this.input.value = this.history[this.historyIdx] || '';
      return;
    }

    if (key === 'Tab') {
      e.preventDefault();
      var val = this.input.value.trim();
      if (!val) return;
      var matches = Object.keys(COMMANDS).filter(function(c) { return c.startsWith(val); });
      if (matches.length === 1) {
        this.input.value = matches[0];
      } else if (matches.length > 1) {
        this.print(matches.join('    '), 'sys');
      }
      return;
    }

    if (key === 'l' && e.ctrlKey) {
      e.preventDefault();
      this.clear();
      return;
    }
  };

  // ── Init ──

  var term;

  document.addEventListener('DOMContentLoaded', function() {
    term = new Terminal();

    // input events
    term.input.addEventListener('keydown', term.handleKeydown.bind(term));

    // close on overlay background click (not on output/input area)
    term.overlay.addEventListener('mousedown', function(e) {
      if (e.target === term.overlay || e.target.classList.contains('terminal-output') && e.target.scrollHeight <= e.target.clientHeight) {
        // only close if clicking empty space outside the input row
        if (!e.target.closest('.term-input-row') && !e.target.closest('.term-title-bar')) {
          term.close();
        }
      }
    });

    // Show welcome on first open
    var welcomed = false;
    var origOpen = term.open.bind(term);
    term.open = function() {
      origOpen();
      document.dispatchEvent(new CustomEvent('termOpened'));
      if (!welcomed) {
        welcomed = true;
        setTimeout(function() {
          term.print('Welcome to SudoTADS Terminal v1.0', 'ok');
          term.print('Type `help` for available commands. Press Ctrl+` or Esc to close.\n', 'sys');
        }, 100);
      }
    };

    // Expose terminal globally
    window.term = term;
  });

  // ── Global key listener for toggle ──
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === '`') {
      e.preventDefault();
      if (!term) return;
      term.toggle();
    }
  });
})();
