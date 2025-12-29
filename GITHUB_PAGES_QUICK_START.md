# GitHub Pages Quick Start (15 Minutes)

Fast track to deploy Advanced Lab Solutions to GitHub Pages.

## 1. Create GitHub Repository (2 minutes)

```bash
# Go to https://github.com/new
# Name: advanced-lab-solutions
# Choose: Public
# Create repository
```

## 2. Update Configuration (1 minute)

**Edit `vite.config.ts`** - Change this line:

```typescript
base: '/advanced-lab-solutions/',  // Add this
```

## 3. Add Deployment Workflow (2 minutes)

**Create `.github/workflows/deploy.yml`:**

Copy and paste this entire file:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 4. Push to GitHub (3 minutes)

```bash
# Setup git
git config user.email "you@example.com"
git config user.name "Your Name"

# Add and commit
git add .
git commit -m "Setup GitHub Pages deployment"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/advanced-lab-solutions.git

# Push to GitHub
git push -u origin main
```

## 5. Enable GitHub Pages (2 minutes)

1. Go to repository on GitHub
2. **Settings** → **Pages**
3. Under "Source": Select `gh-pages` branch
4. Click **Save**

Your site is live at: `https://YOUR_USERNAME.github.io/advanced-lab-solutions/`

## 6. Add Custom Domain (5 minutes)

### On GoDaddy

1. Go to **DNS Management**
2. Add A Records (all four):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

3. Add CNAME Record:
```
Name: www
Value: YOUR_USERNAME.github.io
```

### On GitHub

1. **Settings** → **Pages**
2. "Custom domain": `yourdomain.co.za`
3. Click **Save**
4. Wait for HTTPS certificate (~5 minutes)
5. Check "Enforce HTTPS"

Your site is now at: `https://yourdomain.co.za`

## Done! 🎉

Every time you push to GitHub:
```bash
git add .
git commit -m "Update site"
git push origin main
```

Your site updates automatically in 2-5 minutes!

## Verify

- Test: https://yourdomain.co.za
- See status: GitHub repo → Actions tab

---

**See `GITHUB_PAGES_DEPLOYMENT.md` for detailed troubleshooting & advanced options**
