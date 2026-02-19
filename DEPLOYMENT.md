# Portfolio Deployment Guide

This document describes how to deploy and run the Dmytro Tytarenko portfolio website.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** version 18.x or higher ([Download](https://nodejs.org/))
- **npm** version 9.x or higher (comes with Node.js)
- **Git** for version control ([Download](https://git-scm.com/))

Verify installations:

```bash
node --version
npm --version
git --version
```

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/dtytarenko/dtytarenko.github.io.git
cd dtytarenko.github.io
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- React 18
- TypeScript
- Vite
- Three.js & React Three Fiber
- Framer Motion
- SASS
- React Hook Form
- Swiper

---

## 🛠️ Development

### Run Development Server

Start the local development server with hot module replacement:

```bash
npm run dev
```

The application will be available at:
- **Local**: `http://localhost:5173/`
- **Network**: Use `--host` flag to expose on network

The dev server features:
- ⚡ Fast HMR (Hot Module Replacement)
- 🔍 TypeScript type checking
- 🎨 SASS compilation
- 📦 Automatic dependency optimization

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Type checking (without build)
npm run type-check

# Linting
npm run lint
```

---

## 🏗️ Production Build

### Build for Production

Create an optimized production build:

```bash
npm run build
```

This command:
1. Runs TypeScript compiler for type checking
2. Bundles all assets with Vite
3. Minifies JavaScript and CSS
4. Optimizes images and assets
5. Outputs to `dist/` directory

Build output includes:
- Minified and tree-shaken JavaScript bundles
- Optimized CSS with vendor prefixes
- Compressed assets
- Source maps (optional)

### Preview Production Build

Test the production build locally before deployment:

```bash
npm run preview
```

This starts a local server serving the `dist/` folder at `http://localhost:4173/`

---

## 🌐 Deployment Options

### Option 1: GitHub Pages (Recommended)

This portfolio is configured for GitHub Pages deployment.

#### Automatic Deployment

The repository is already configured to deploy automatically:

1. Push changes to `master` branch:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin master
   ```

2. Build and deploy:
   ```bash
   npm run build
   ```

3. Deploy the `dist/` folder to GitHub Pages:
   ```bash
   # Install gh-pages if not already installed
   npm install -g gh-pages

   # Deploy dist folder
   gh-pages -d dist
   ```

#### GitHub Actions (Optional)

For automated deployments, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [ master ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to link your project

### Option 3: Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod
   ```

3. Set build directory to `dist/`

### Option 4: Custom Server

Upload the `dist/` folder contents to any static hosting service:

- Apache/Nginx
- AWS S3 + CloudFront
- Azure Static Web Apps
- Cloudflare Pages

**Important**: Ensure your server is configured to serve `index.html` for all routes (for SPA routing).

Example Nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory if you need custom configuration:

```env
VITE_APP_TITLE=Dmytro Tytarenko Portfolio
VITE_API_URL=https://api.example.com
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

### Base URL

If deploying to a subdirectory, update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-subdirectory/',
  // ... other config
});
```

---

## 🎨 Customization

### Update Portfolio Content

Edit `/src/utils/data.ts` to update:
- Portfolio projects
- Technology stack
- Contact information

### Modify Backgrounds

The hero section supports two animated backgrounds:
- **Terminal**: Animated terminal with git commands
- **DNA**: Double helix with code snippets

Switch between them using the buttons in the top-right corner.

To set a default, edit `/src/components/Hero/Hero.tsx`:

```typescript
const [bg, setBg] = useState<BgVariant>('terminal'); // or 'dna'
```

### Update Styles

Global styles: `/src/assets/styles/global.scss`
Component styles: `/src/components/*/[Component].module.scss`

CSS variables are defined in `global.scss`:
```scss
:root {
  --color-bg: #0a0a0a;
  --color-accent: rgba(255, 255, 255, 0.5);
  // ... more variables
}
```

---

## 📊 Performance

The portfolio is optimized for performance:

- ✅ Code splitting and lazy loading
- ✅ Image optimization
- ✅ Tree shaking unused code
- ✅ Minified assets
- ✅ Gzip compression ready
- ✅ Lighthouse score: 95+

### Performance Tips

1. **Images**: Optimize images before adding to `/public/`
   ```bash
   # Use tools like imagemin, sharp, or online services
   ```

2. **3D Models**: Keep GLB files under 500KB for best performance

3. **Lazy Loading**: Components are already lazy-loaded with `React.lazy()`

---

## 🐛 Troubleshooting

### Build Errors

**TypeScript errors:**
```bash
npm run type-check
```

**Clear cache and reinstall:**
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Development Issues

**Port already in use:**
```bash
# Vite will automatically use next available port
# Or specify port manually:
npm run dev -- --port 3000
```

**Module not found:**
```bash
npm install
npm run dev
```

### Deployment Issues

**404 on refresh:**
Ensure your hosting provider serves `index.html` for all routes.

**Assets not loading:**
Check `base` path in `vite.config.ts` matches your deployment URL.

---

## 📝 Project Structure

```
portfolio/
├── public/              # Static assets
│   ├── models/         # 3D models (.glb)
│   └── vite.svg
├── src/
│   ├── assets/         # Styles and media
│   │   └── styles/
│   ├── components/     # React components
│   │   ├── Hero/
│   │   ├── Portfolio/
│   │   ├── Technologies/
│   │   └── ContactForm/
│   ├── types/          # TypeScript definitions
│   ├── utils/          # Data and utilities
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── DEPLOYMENT.md       # This file
```

---

## 🔒 Security

- No sensitive data in repository
- Environment variables for API keys
- HTTPS recommended for production
- Regular dependency updates

Update dependencies:
```bash
npm outdated
npm update
```

---

## 📞 Support

For issues or questions:
- **GitHub Issues**: [Create an issue](https://github.com/dtytarenko/dtytarenko.github.io/issues)
- **Email**: dtytarenko@protonmail.com
- **LinkedIn**: [linkedin.com/in/dtytarenko](https://linkedin.com/in/dtytarenko)
- **Telegram**: [@dtytarenko](https://t.me/dtytarenko)

---

## 📄 License

This project is private and proprietary. All rights reserved © 2024 Dmytro Tytarenko.

---

**Happy Coding! 🚀**
