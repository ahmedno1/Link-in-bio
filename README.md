# Link-in-Bio

A blazing-fast, beautiful, and fully customizable "Link-in-Bio" site tailored for developers and content creators. Built with vanilla JavaScript, Vite, Tailwind CSS, and Motion One. No React or heavy frameworks.

## 🚀 Features

- **Single Global Config**: Edit EVERYTHING (theme, profile, links) from one file (`src/config.js`).
- **Mobile-First & Fully Responsive**: Optimized for all devices.
- **Micro-Interactions**: Hover states, glowing cards, copying email dynamically.
- **Animations**: Driven by [Motion.dev](https://motion.dev/) — extremely lightweight with staggering and spring physics. Parallax hover on desktop. Respects `prefers-reduced-motion`.
- **Performance**: High performance out of the box. Ships vanilla DOM manipulation behind a Vite build pipeline. 

---

## 💻 Getting Started

### 1. Installation

Clone or download the project and run:
```bash
npm install
```

### 2. Development

Run the Vite dev server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open `http://localhost:5173`. 

### 3. Build for Production

Generate static HTML/JS/CSS ready to deploy anywhere:
```bash
npm run build
```
The output will reside in the `/dist` directory. You can preview it locally using:
```bash
npm run preview
```

---

## 🎨 Customization (IMPORTANT)

All content, styling, and toggles are located inside **`src/config.js`**. 

Open `src/config.js` and modify:
- `theme`: Colors, button variants (glass/solid/outline), border-radius, background-speed.
- `profile`: Your Name, Tagline, Bio, Location, and Avatar URL.
- `links`: Array of objects defining Buttons dynamically. Set icon to one of the supported names (`github`, `linkedin`, `twitter`, `mail`, `briefcase`, `file`). 

*Note regarding Email: If any link uses `mailto:` prefix in the URL, a "Copy to Clipboard" shortcut button automatically reveals on hover!*

---

## 🌍 Deploying to Vercel (Recommended)

Since this project outputs static files, Vercel will host it for free blazing-fast.

1. Create a GitHub repo and push this folder's code to it.
2. Sign in to [Vercel](https://vercel.com/) and click "Add New... -> Project"
3. Import your GitHub Repo.
4. Under **Build and Output Settings** (usually Vercel auto-detects Vite):
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**. In ~20 seconds, your Link in Bio is live. You can attach a custom domain from the Vercel dashboard.

---

### ❤️ Built for the Community
