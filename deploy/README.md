# GitHub Pages Deployment

This folder contains the built files ready for GitHub Pages deployment.

## How to Deploy

1. Make sure your GitHub repository is named `linkvaultaffiliateprogram`
2. Go to your repository Settings > Pages
3. Under "Source", select "Deploy from a branch"
4. Choose the branch where this folder is located (usually `main` or `gh-pages`)
5. Set the folder to `/deploy` (root) or move these files to the root of your repository
6. Click Save

## Important

- The site will be available at: https://linkvaultaffiliateprogram.pages.dev/
- The base path is configured as `/linkvaultaffiliateprogram/` in vite.config.js
- If you change the repository name, update the base path in vite.config.js and rebuild

## To Update the Site

1. Make changes to the source code in the `src` folder
2. Run `npm run build` to rebuild the project
3. Copy the contents of the `dist` folder to this `deploy` folder
4. Commit and push the changes
