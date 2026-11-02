# Personal Portfolio Website – Kavya Sudha Kondaveeti

A modern, elegant, high-performance personal portfolio website for **Kavya Sudha Kondaveeti**, 2nd-year B.Tech Computer Science & Engineering (Artificial Intelligence and Machine Learning) student at **Tirumala Engineering College**.

Inspired by minimalist agency & product designer portfolio aesthetics from Dribbble, tailored specifically for an AI & Machine Learning student.

---

## 🎨 Design System & Visual Palette

- **Primary Canvas:** Clean white (`#FFFDFD`) with soft blush-pink background tinting (`#FAF5F7`, `#FDF4F6`).
- **Accent Shades:** Deep berry & muted rose (`#B8536E`, `#A2425E`, `#EAA8B8`) for buttons, badges, and focal elements.
- **Typography:** High-contrast dark charcoal (`#1C1D22` & `#4A4D57`) for optimal readability and accessibility.
- **Visuals:** Custom vector AI/neural network abstract illustration with synapse pulses and interactive 3D mouse micro-interactions (no placeholder photos used).
- **Typography Pairing:** *Plus Jakarta Sans* (modern geometric headlines) and *Inter* (crisp, readable body text).

---

## 🚀 How to Run the Website Locally

You can open and view the website immediately in any modern web browser:

### Option 1: Direct File Opening
Double-click [`index.html`](file:///c:/Users/kavya/OneDrive/Desktop/Web/index.html) or right-click and choose **Open with > Chrome / Edge / Firefox / Safari**.

### Option 2: Local Python Server (Recommended for local testing)
Open PowerShell in this directory and run:
```powershell
python -m http.server 8000
```
Then open: [http://localhost:8000](http://localhost:8000)

---

## 📁 Project File Structure

```
Web/
├── index.html         # Main semantic HTML5 markup with all sections & SEO
├── css/
│   └── style.css      # Design tokens, responsive styles, animations & typography
├── js/
│   └── main.js        # Interactive modals, scroll spy, validations & effects
├── assets/
│   └── favicon.svg    # Custom monogram SVG favicon (KSK)
└── README.md          # Documentation and customization guide
```

---

## 🛠️ Personalization & Updates Guide

All information has been crafted so you can update it in seconds:

### 1. Linking Your LinkedIn & GitHub Profiles
In [`index.html`](file:///c:/Users/kavya/OneDrive/Desktop/Web/index.html#L425), look for the `.social-cards-row` container and replace the `onclick` handler with your real profile URLs:
```html
<a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" class="social-placeholder-card">
  <!-- svg icon -->
  <span>LinkedIn</span>
</a>
```

### 2. Adding Your Real Resume PDF
Place your exported PDF file named `resume.pdf` in the root folder `Web/`. The resume buttons in the navigation bar and hero section will be ready to link directly to `resume.pdf`.

### 3. Adding New Projects
A clean placeholder slot is already included in [`index.html`](file:///c:/Users/kavya/OneDrive/Desktop/Web/index.html#L330). You can duplicate the `<article class="project-card">` structure to add new computer vision, NLP, or full-stack projects as you build them.

### 4. Updating Certifications
In the Certifications section, click "View Info" to open the interactive modal. To link a scanned image or PDF certificate, simply add the file link to the modal trigger in [`js/main.js`](file:///c:/Users/kavya/OneDrive/Desktop/Web/js/main.js#L210).

---

## ✨ Key Features & Accessibility

- **Responsive:** Fluid layouts tested across mobile, tablet, laptop, and desktop.
- **Accessible:** Semantic HTML5, high-contrast text ratios exceeding WCAG AA, and native respect for `prefers-reduced-motion`.
- **Zero Heavy Dependencies:** Built with pure HTML5, vanilla CSS3, and modern ES6 JavaScript for fast load times and universal hosting compatibility (GitHub Pages, Netlify, Vercel, etc.).
- **Dynamic Interactions:** Sticky frosted glass header, active section scroll-spy, toast notifications, project detail modals, and client-side contact validation.
