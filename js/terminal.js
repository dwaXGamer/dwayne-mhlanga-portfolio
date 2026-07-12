// ============================================================
// terminal.js — the interactive "portfolio shell" on index.html
// ============================================================

(function () {
  const termOutput = document.getElementById('term-output');
  const termInput = document.getElementById('term-input');
  const termBody = document.getElementById('term-body');
  if (!termOutput || !termInput || !termBody) return;

  let history = [];
  let histIdx = -1;

  const commands = {
    help: () => [
      { t: 'out', v: 'Available commands:' },
      { t: 'out green', v: '  whoami       — who is dwaX' },
      { t: 'out green', v: '  about        — background & mission' },
      { t: 'out green', v: '  projects     — list of projects' },
      { t: 'out green', v: '  skills       — security & tech stack' },
      { t: 'out green', v: '  certs        — certifications & experience' },
      { t: 'out green', v: '  contact      — get in touch' },
      { t: 'out green', v: '  ciphernest   — featured project' },
      { t: 'out green', v: '  clear        — clear terminal' },
    ],
    whoami: () => [
      { t: 'out white', v: 'Dwayne Mhlanga (dwaX)' },
      { t: 'out', v: 'Cybersecurity & Forensic Auditing student · Developer · Designer' },
      { t: 'out', v: 'University of Zimbabwe — BSc Year 1' },
      { t: 'out', v: 'Location: Harare, Zimbabwe' },
      { t: 'out', v: 'Status: Building CipherNest SIEM · Seeking security internships' },
    ],
    about: () => [
      { t: 'out white', v: '// Education' },
      { t: 'out green', v: 'BSc Cybersecurity & Forensic Auditing — Year 1' },
      { t: 'out', v: 'University of Zimbabwe' },
      { t: 'out', v: '' },
      { t: 'out white', v: '// Previous' },
      { t: 'out', v: 'National Diploma in Information Technology' },
      { t: 'out', v: '' },
      { t: 'out white', v: '// Mission' },
      { t: 'out', v: 'To specialize in penetration testing & cybersecurity operations' },
      { t: 'out', v: 'and build tools that make security accessible and actionable.' },
    ],
    projects: () => [
      { t: 'out white', v: '// Projects (6 shipped)' },
      { t: 'out green', v: '01. CipherNest SIEM       — Python · Linux · Security [IN DEV]' },
      { t: 'out', v: '02. GeekPlanners           — PHP · MySQL · JS' },
      { t: 'out', v: '03. DriveNest              — PHP · MySQL · JS' },
      { t: 'out', v: '04. E-Farm Zimbabwe        — PHP · MySQL · JS' },
      { t: 'out', v: '05. Wattmaster Website     — HTML · CSS · JS' },
      { t: 'out', v: '06. Geeked for Christ Blog — HTML · JS' },
    ],
    skills: () => [
      { t: 'out white', v: '// Security Tools' },
      { t: 'out green', v: '  Kali Linux · Metasploit · Nmap · Burp Suite · Wireshark' },
      { t: 'out white', v: '// Languages' },
      { t: 'out green', v: '  Python · Bash · JavaScript · PHP · PowerShell · C++' },
      { t: 'out white', v: '// Systems' },
      { t: 'out green', v: '  Ubuntu · Docker · Git · Firebase · MySQL' },
      { t: 'out white', v: '// Design' },
      { t: 'out green', v: '  Figma · Illustrator · Photoshop · Adobe XD' },
    ],
    contact: () => [
      { t: 'out white', v: '// Get in touch' },
      { t: 'out green', v: '  email:     dwaynemhlangaa10@gmail.com' },
      { t: 'out green', v: '  whatsapp:  +263 77 979 4123' },
      { t: 'out green', v: '  github:    @dwaXGamer' },
      { t: 'out green', v: '  linkedin:  Dwayne Mhlanga' },
      { t: 'out green', v: '  twitter:   @dwayne_mhlanga' },
    ],
    ciphernest: () => [
      { t: 'out white', v: 'CipherNest — SIEM Platform [In Development]' },
      { t: 'out', v: '' },
      { t: 'out', v: 'A Security Information and Event Management platform' },
      { t: 'out', v: 'for real-time threat detection and incident response.' },
      { t: 'out', v: '' },
      { t: 'out green', v: 'Features:' },
      { t: 'out', v: '  · Real-time log ingestion & anomaly detection' },
      { t: 'out', v: '  · CVE monitoring and alert system' },
      { t: 'out', v: '  · Structured incident report generation' },
      { t: 'out', v: '  · Network traffic visualization' },
      { t: 'out', v: '' },
      { t: 'out', v: 'Stack: Python · JavaScript · Linux · Kali · Bash' },
      { t: 'out', v: 'Status: Active development — github.com/dwaXGamer' },
    ],
    certs: () => [
      { t: 'out white', v: '// Certifications' },
      { t: 'out green', v: '  Google Cybersecurity Professional Certificate' },
      { t: 'out', v: '  Coursera | Google — Oct 2024 to Jan 2025' },
      { t: 'out green', v: '  Introduction to Cybersecurity' },
      { t: 'out', v: '  Cisco — Dec 2025' },
      { t: 'out green', v: '  ICDL International Computer Driving Licence' },
      { t: 'out', v: '  Speciss College, Bulawayo — 2018' },
      { t: 'out green', v: '  UI/UX for Beginners' },
      { t: 'out', v: '  Great Learning Academy — 2024' },
      { t: 'out green', v: '  Graphics Design: Techniques' },
      { t: 'out', v: '  LinkedIn Learning — 2024' },
      { t: 'out', v: '' },
      { t: 'out white', v: '// Experience' },
      { t: 'out green', v: '  IT Technician — Intellego & MMC Capital' },
      { t: 'out', v: '  Jan 2024 to Dec 2024 · 99.7% network uptime achieved' },
    ],
    clear: () => 'CLEAR',
    matrix: () => [
      { t: 'out green', v: '01001000 01100001 01110010 01100001 01110010' },
      { t: 'out green', v: '01100101 00101100 00100000 01011010 01101001' },
      { t: 'out green', v: '01101101 01100010 01100001 01100010 01110111' },
      { t: 'out green', v: '01100101 00101110 00100000 01100100 01110111' },
      { t: 'out green', v: '01100001 01011000 00100000 01101001 01110011' },
      { t: 'out green', v: '00100000 01101000 01100101 01110010 01100101' },
      { t: 'out dim', v: '// Harare, Zimbabwe. dwaX is here.' },
    ]
  };

  function appendLines(lines) {
    if (lines === 'CLEAR') {
      termOutput.innerHTML = '';
      return;
    }
    lines.forEach(l => {
      const d = document.createElement('div');
      d.className = 't-line';
      const s = document.createElement('span');
      s.className = 't-' + l.t;
      s.textContent = l.v;
      d.appendChild(s);
      termOutput.appendChild(d);
    });
    const blank = document.createElement('div');
    blank.className = 't-blank';
    termOutput.appendChild(blank);
    termBody.scrollTop = termBody.scrollHeight;
  }

  function addPromptLine(cmd) {
    const d = document.createElement('div');
    d.className = 't-line';
    d.innerHTML = `<span class="t-prompt">dwayne@ubuntu:~$</span><span class="t-cmd"> ${cmd}</span>`;
    termOutput.appendChild(d);
  }

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const raw = termInput.value.trim();
      if (!raw) return;
      history.unshift(raw);
      histIdx = -1;
      addPromptLine(raw);
      const cmd = raw.toLowerCase();
      if (commands[cmd]) {
        const result = commands[cmd]();
        appendLines(result);
      } else {
        appendLines([{ t: 'out', v: `command not found: ${raw} — type 'help'` }]);
      }
      termInput.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < history.length - 1) histIdx++;
      termInput.value = history[histIdx] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) histIdx--;
      else { histIdx = -1; termInput.value = ''; return; }
      termInput.value = history[histIdx] || '';
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = termInput.value.toLowerCase();
      const match = Object.keys(commands).find(k => k.startsWith(partial));
      if (match) termInput.value = match;
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      termOutput.innerHTML = '';
    }
  });

  termBody.addEventListener('click', () => termInput.focus());
})();
