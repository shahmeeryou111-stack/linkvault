# LinkVault — Free Affiliate Programs Directory

A fully static React + Vite + Tailwind CSS affiliate tracking dashboard. No backend — all data is simulated and stored in the browser's `localStorage`. Deployable to Cloudflare Pages, Netlify, Vercel, or GitHub Pages.

## Tech Stack
- React 18 + Vite
- Tailwind CSS v3
- React Router v6 (HashRouter)
- Recharts, Framer Motion, react-hot-toast, react-helmet-async

## Getting Started
```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Deploy to Cloudflare Pages
1. Push this folder to a GitHub repository.
2. In Cloudflare Pages, create a project connected to the repo.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy. HashRouter is used, so no redirect rules are needed.

## Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: LinkVault"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## Notes
- The dashboard simulation runs while the tab is open and persists progress in `localStorage`.
- All affiliate URLs are fixed in `src/data/links.js` and never modified.
- SEO: static tags live in `index.html`; per-page tags use `react-helmet-async`. `robots.txt` and `sitemap.xml` are in `public/`.
- Earnings figures shown are illustrative/simulated — see the earnings disclaimer in Terms.
