<div align="center">

# André Toyama — Portfolio

**Personal developer portfolio with a cyberpunk aesthetic, interactive 3D models, and ambient music.**

[![Live Site](https://img.shields.io/badge/Live-andretoyama--dev.com.br-ff003c?style=for-the-badge&logo=firefoxbrowser&logoColor=white)](https://andretoyama-dev.com.br)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-222?style=for-the-badge&logo=github&logoColor=white)](https://github.com/andretoyama-dev/portfolio-andretoyama/actions)

</div>

---

## Features

- **Cyberpunk UI** — Dark theme with neon red accents, scanline overlays, glitch animations, and glass-morphism cards
- **Interactive 3D Viewer** — Rotatable Carnotaurus model rendered with Three.js and React Three Fiber
- **Ambient Music Player** — Hover-activated audio with fade-in/fade-out and animated equalizer
- **Live Age Counter** — Real-time counter with 15-decimal precision using `requestAnimationFrame`
- **Tilt Cards** — Mouse-tracking 3D perspective effect with spring physics
- **Responsive Layout** — Fully adapted for desktop, tablet, and mobile screens
- **Automated Deployment** — CI/CD pipeline via GitHub Actions to GitHub Pages

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 19, TypeScript, Tailwind CSS v4 |
| **3D Graphics** | Three.js, React Three Fiber, Drei |
| **Animations** | Framer Motion (motion/react) |
| **Icons** | Lucide React |
| **Build Tool** | Vite 6 |
| **Deployment** | GitHub Actions → GitHub Pages |
| **Domain** | andretoyama-dev.com.br (registro.br) |

---

## Project Structure

```
src/
├── assets/                      # Media files (images, audio)
├── components/
│   ├── Portfolio.tsx             # Main page layout and sections
│   ├── AgeCounter.tsx            # Real-time age counter
│   ├── CarnotaurusViewer.tsx     # 3D model viewer (Three.js Canvas)
│   ├── Equalizer.tsx             # Animated audio equalizer bars
│   └── TiltCard.tsx              # Mouse-tracking 3D tilt effect
├── App.tsx                       # Root component with background effects
├── main.tsx                      # Application entry point
└── index.css                     # Global styles, theme, and animations
```


