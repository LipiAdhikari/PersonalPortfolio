# Lipi Adhikari — Personal Developer Portfolio

A modern, fast-loading, and highly interactive personal developer portfolio website. Built with React (Vite), Tailwind CSS, and Framer Motion, this portfolio is designed to showcase projects, skills, and background with a premium, glassmorphism-inspired aesthetic and smooth micro-interactions.

## 🚀 Key Features

- **Interactive 3D Project Cards:** Cards smoothly tilt in 3D space tracking the user's cursor, complemented by a dynamic radial spotlight gradient that fades in seamlessly on hover.
- **Magnetic CTA Buttons:** Buttons elegantly pull toward the user's cursor when hovered, using performance-optimized Framer Motion springs for a buttery smooth 60fps experience.
- **Cascading Hero Reveal:** A staggered, character-by-character waterfall text reveal on page load, perfectly sequenced to transition into a custom typewriter effect.
- **Custom Preloader:** A lightweight, animated "L" logo preloader that sequences an octagon and letter draw effect.
- **Accessibility First:** Respects OS-level `prefers-reduced-motion` flags globally. All complex cursor tracking and 3D interactions gracefully degrade to static layouts on touch devices or when reduced motion is preferred.
- **Data-Driven Content:** All textual content, projects, and skills are decoupled from the UI components. Updating the portfolio is as simple as editing a JS data file.

## 🛠️ Tech Stack

- **Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS (v4)
- **Animations & Physics:** Framer Motion
- **Icons:** Lucide React
- **Form Handling:** React Hook Form

## 📂 Project Structure

```text
myportfolio/
├── public/                 # Static assets (favicons, resumes, raw images)
│   └── projects/           # Screenshots for portfolio projects
├── src/
│   ├── assets/             # Internal static assets
│   ├── components/
│   │   ├── layout/         # Preloader, Navbar, Footer, Section wrappers
│   │   ├── sections/       # Main page sections (Hero, About, Projects, Contact, etc.)
│   │   └── ui/             # Reusable micro-components (Buttons, Cards, Badges, Logo)
│   ├── data/               # Content data (Edit these to update your portfolio!)
│   │   ├── profile.js
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── timeline.js
│   ├── hooks/              # Custom React hooks (e.g., useMagneticHover)
│   ├── styles/             # Global CSS and Tailwind directives
│   ├── App.jsx             # Main application assembly
│   └── main.jsx            # React root
```

## ⚙️ Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

## 📝 How to Update Content

You do not need to dive into complex React components to update your portfolio content. Simply open the corresponding file in `src/data/`:

- **`projects.js`**: Add or edit your showcased projects. Simply drop new screenshots into `public/projects/` and reference them here.
- **`profile.js`**: Update your name, tagline, bio, and social links.
- **`skills.js`**: Update your tech stack and proficiency levels.
- **`timeline.js`**: Add new educational milestones or professional experiences to your Journey section.

## 🎨 Design System

The portfolio utilizes a custom light-themed design system featuring:
- Soft, translucent glassmorphism surfaces (`backdrop-filter: blur()`).
- A warm, muted multi-hue background gradient (Purple, Pink, Sky).
- A single dominant accent color used strictly for interactive elements to maintain visual hierarchy.
