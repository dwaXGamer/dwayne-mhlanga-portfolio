# Dwayne Mhlanga — Cybersecurity Portfolio

A clean, multi-page static portfolio site split into separate files.

## 📁 Project structure

```
dwayne-portfolio/
├── index.html              Main portfolio page
│                           (hero, terminal, projects, stack, certs, blog preview, about, contact)
├── blog.html               Standalone blog page with all 3 full articles
├── css/
│   └── style.css           All site styles — shared by both pages
├── js/
│   ├── main.js             Shared behaviour: nav, hero animation, typewriter,
│   │                       canvas, scroll-reveal, hamburger, stack pill hover, clock
│   └── terminal.js         Interactive shell command engine (index.html only)
├── images/                 Store your local images here
│   ├── profile1.webp       → Hero section profile photo
│   ├── dwaXGamer1.png      → About section photo
│   └── projects/
│       ├── ciphernest1.png
│       ├── geekplanners1.png
│       ├── drivenest1.jpg
│       ├── efarm1.png
│       ├── wattmaster1.png
│       └── geeked1.png
└── README.md               This file
```

## 🖼 About the images

The site currently loads images from the live GitHub Pages URL:
`https://dwaxgamer.github.io/dwayne-mhlanga-portfolio/images/...`

To make it work fully offline, download each image and place it in the
`images/` or `images/projects/` folder using the filenames listed above.
Then update the `src` attributes in `index.html` to use relative paths like:

```html
<!-- Before -->
<img src="https://dwaxgamer.github.io/dwayne-mhlanga-portfolio/images/profile1.webp">

<!-- After (local) -->
<img src="images/profile1.webp">
```

## ▶️ How to use it

1. Unzip / open the `dwayne-portfolio/` folder.
2. Open `index.html` in your browser — the whole site runs locally.
3. Edit styling → `css/style.css`
4. Edit interactivity → `js/main.js` or `js/terminal.js`
5. Edit blog posts → `blog.html`
6. Edit main page content → `index.html`

## ✍️ Adding a new blog post

When you add a new article in `blog.html`, always stamp it with the **real
date and time you actually published it** — and put the newest post last so the
dates run in order. Use this exact block just under the post title:

```html
<div class="post-published">
  <span class="pp-dot"></span>
  <span>Published 07 July 2026</span>
  <span class="pp-sep">|</span>
  <span>14:50hrs</span>
</div>
```

Use 24-hour time with the `hrs` suffix (e.g. `09:20hrs`, `14:50hrs`), and match
the date on the homepage preview card in `index.html` so the two stay in sync.

Current posts, oldest → newest:
- Post 1 (career): 12 June 2026 | 09:20hrs
- Post 2 (SIEM):   28 June 2026 | 10:41hrs
- Post 3 (cloud):  07 July 2026 | 14:50hrs

## 🧩 Notes

- **No backend needed** — fully static HTML/CSS/JS.
- Blog posts live as real, linkable page sections: `blog.html#post-1`, `#post-2`, `#post-3`
- The "read post ↗" buttons on the homepage link directly to `blog.html#post-N`
- If you want a working contact form (that emails you), or a CMS-driven blog
  so you don't hand-edit HTML for new posts, ask and I can add a small Flask or
  Node backend.

## 🔗 Live links (in the code)

| Resource | URL |
|---|---|
| GitHub | https://github.com/dwaXGamer |
| LinkedIn | https://www.linkedin.com/in/dwayne-mhlanga-27b34614a/ |
| Email | dwaynemhlangaa10@gmail.com |
| WhatsApp | +263 77 979 4123 |
| Instagram | https://www.instagram.com/dwax_the_geek/ |
| CV | https://dwaxgamer.github.io/dwayne-mhlanga-portfolio/Dwayne_Mhlanga_CV.pdf |

## 📬 Blog subscribe form (Buttondown)

The "Get new posts in your inbox" section uses **Buttondown** — a newsletter
tool with a generous free tier (up to 100 subscribers). Unlike a plain form
service, Buttondown actually emails your subscribers:

- When someone subscribes, they **automatically get a confirmation email**.
- When you publish a new post, you write it in Buttondown and hit send once —
  **every subscriber gets it**.

### One-time setup (about 3 minutes)

1. Sign up free at https://buttondown.com
2. Pick your username during signup — say it's `dwayne`.
3. Open `index.html` and find the two spots that say `YOUR_USERNAME` in the
   subscribe `<form>` tag (in the `action` URL and the `onsubmit` popup URL):
   ```html
   action="https://buttondown.com/api/emails/embed-subscribe/YOUR_USERNAME"
   ...
   onsubmit="window.open('https://buttondown.com/YOUR_USERNAME', 'popupwindow')"
   ```
   Replace **both** `YOUR_USERNAME` with your real username:
   ```html
   action="https://buttondown.com/api/emails/embed-subscribe/dwayne"
   ...
   onsubmit="window.open('https://buttondown.com/dwayne', 'popupwindow')"
   ```
4. Save. Done — subscribers now get a real confirmation email, and the form on
   your site shows an inline "check your inbox to confirm" message.

### Sending a new-post email
Log into Buttondown → New email → write (or paste your blog post) → Send.
All confirmed subscribers receive it. That's the whole workflow.

### Note on the free tier
Buttondown's free plan adds a small "powered by Buttondown" footer to emails.
You can remove it on a paid plan later if you want. Everything else works free.
