# GitHub Pages Deployment Guide

Complete guide for deploying Advanced Lab Solutions to GitHub Pages with custom GoDaddy domain.

## Why GitHub Pages?

✅ **Completely Free** - No costs ever
✅ **Fast & Reliable** - CDN-backed hosting
✅ **Easy Setup** - Just push to GitHub
✅ **Custom Domain** - Works with GoDaddy
✅ **HTTPS** - Free SSL/TLS certificate
✅ **No Maintenance** - GitHub handles everything

## Prerequisites

1. **GitHub Account** (free at https://github.com)
2. **Git** installed on your computer
3. **Project repository** on GitHub
4. **GoDaddy Domain** (or any domain registrar)
5. **Node.js 20+** for local testing

## Step 1: Prepare Your Repository

### 1.1 Create GitHub Repository

1. Go to https://github.com/new
2. Name: `advanced-lab-solutions` (or any name)
3. Choose **Public** (required for free GitHub Pages)
4. Create repository

### 1.2 Update Vite Configuration

GitHub Pages serves from `username.github.io/repository-name` by default.

**Edit `vite.config.ts`:**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/advanced-lab-solutions/',  // ← Add this line
  server: {
    port: 5000,
    host: '0.0.0.0'
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './attached_assets')
    }
  }
})
```

### 1.3 Initialize Git Repository

```bash
# Navigate to your project
cd advanced-lab-solutions

# Initialize git (if not already done)
git init

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/advanced-lab-solutions.git

# Verify remote
git remote -v
```

## Step 2: Build & Deploy

### 2.1 Build Your Site

```bash
# Install dependencies (if not already done)
npm install

# Build for production
npm run build

# Verify dist/ folder created
ls -la dist/
```

Expected output:
```
dist/
├── index.html
├── error.html (optional)
└── assets/
    ├── index-*.js
    ├── index-*.css
    └── [images]
```

### 2.2 Deploy to GitHub Pages

#### Option A: Using GitHub Actions (Recommended - Automatic)

This automatically deploys every time you push to GitHub.

**Create `.github/workflows/deploy.yml`:**

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

**Push to GitHub:**

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit with GitHub Actions deployment"

# Push to main branch
git push origin main
```

GitHub will automatically build and deploy your site!

#### Option B: Manual Deployment (One-time)

If you prefer to build and deploy manually:

```bash
# 1. Build the site
npm run build

# 2. Deploy the dist folder
# Using gh-pages CLI:
npm install -g gh-pages
gh-pages -d dist
```

### 2.3 Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top-right)
3. Click **Pages** (left sidebar)
4. Under "Source", select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

Your site will be live at: `https://YOUR_USERNAME.github.io/advanced-lab-solutions/`

## Step 3: Add Custom Domain (GoDaddy)

### 3.1 Point Domain to GitHub Pages

**On GoDaddy:**

1. Go to **DNS Management** for your domain
2. Add these DNS records:

**Type A Records:**
```
Record Type: A
Name: @
Value: 185.199.108.153
TTL: 1 hour

Record Type: A
Name: @
Value: 185.199.109.153

Record Type: A
Name: @
Value: 185.199.110.153

Record Type: A
Name: @
Value: 185.199.111.153
```

**Type CNAME Record (for www subdomain):**
```
Record Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
TTL: 1 hour
```

**Result:**
```
yourdomain.co.za         → GitHub Pages (A records)
www.yourdomain.co.za     → GitHub Pages (CNAME)
```

### 3.2 Configure GitHub Pages with Domain

1. Go to repository **Settings** → **Pages**
2. Under "Custom domain", enter: `yourdomain.co.za`
3. Click **Save**
4. Check "Enforce HTTPS" (wait ~5 minutes for certificate)

GitHub will automatically:
- Create a `CNAME` file in your repository
- Generate free SSL/TLS certificate
- Redirect `www` to domain automatically

### 3.3 Verify Domain Works

**Test DNS:**
```bash
# Resolve your domain
nslookup yourdomain.co.za
dig yourdomain.co.za

# Should show GitHub Pages IPs:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

**Test in Browser:**
```
https://yourdomain.co.za        ✓ Should work
https://www.yourdomain.co.za    ✓ Should redirect to yourdomain.co.za
https://YOUR_USERNAME.github.io/advanced-lab-solutions/  ✓ Also works
```

## Step 4: Automated Deployments

### Every Push Deploys Automatically

The GitHub Actions workflow deploys your site automatically:

```bash
# Edit a file
# Commit and push
git add .
git commit -m "Update Services page"
git push origin main

# GitHub automatically:
# 1. Builds your site (npm run build)
# 2. Deploys to GitHub Pages
# 3. Your site updates in ~2-5 minutes
```

### No Manual Deployment Needed!

You never have to run deployment commands again. Just:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

## Updating Your Site

### Daily Development

```bash
# 1. Make changes locally
npm run dev
# Test at http://localhost:5000

# 2. When satisfied:
git add .
git commit -m "Add new feature"
git push origin main

# 3. GitHub deploys automatically (2-5 minutes)
```

### Version Control Best Practices

```bash
# See what changed
git status

# See detailed changes
git diff

# Commit only specific files
git add client/src/pages/Services.tsx
git commit -m "Update Services page description"

# View commit history
git log --oneline

# Revert a commit if needed
git revert <commit-hash>
git push origin main
```

## Troubleshooting

### Site Not Updating After Push

**Issue**: You pushed but site hasn't updated

**Solution:**
1. Wait 2-5 minutes (GitHub Actions takes time)
2. Check Actions tab on GitHub:
   - Go to repository → Actions
   - Look for your recent push
   - If orange circle → still building
   - If green checkmark → deployed
   - If red X → build failed, see error logs

3. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
4. Check your site URL

### Domain Not Resolving

**Issue**: Domain doesn't point to site

**Solution:**
```bash
# Check DNS setup
nslookup yourdomain.co.za

# Should return GitHub Pages IPs
# If not, wait 24-48 hours for DNS propagation
```

**On GoDaddy:**
1. Go to DNS Management
2. Verify A records point to GitHub (185.199.x.x)
3. Verify CNAME for www points to YOUR_USERNAME.github.io
4. If changed, wait 24-48 hours for propagation

### HTTPS Not Working

**Issue**: Site shows "Not Secure"

**Solution:**
1. Wait ~5 minutes after setting domain
2. Check "Enforce HTTPS" in GitHub Pages settings
3. Clear browser cache
4. If still not working, remove and re-add domain:
   - GitHub Settings → Pages → Remove custom domain
   - Wait 5 minutes
   - Add custom domain again

### 404 Error on Pages

**Issue**: Pages work on root but not at /about etc.

**Solution:**
Make sure your `vite.config.ts` has correct base path:

```typescript
export default defineConfig({
  base: '/advanced-lab-solutions/',  // Must match repo name
  // ... rest of config
})
```

Then rebuild:
```bash
npm run build
git add .
git commit -m "Fix base path"
git push origin main
```

### Images Not Loading

**Issue**: Images show broken in production

**Solution:**
1. Check images are in `client/public/` folder
2. Images must be referenced correctly:
   - In code: `import logo from '@assets/logo.png'`
   - In HTML: `<img src="/advanced-lab-solutions/images/file.png" />`
3. Verify image files exist in `dist/assets/` after build
4. Clear browser cache

### Large Files Slow to Deploy

**Issue**: Push takes too long or GitHub Actions times out

**Solution:**
1. Keep images optimized (< 1 MB per image)
2. Don't commit `node_modules/` (add to `.gitignore`)
3. Don't commit `dist/` before pushing (build on GitHub instead)

**Check `.gitignore`:**
```
node_modules/
dist/
.env
.DS_Store
```

## Performance Optimization

### Reduce Bundle Size

GitHub Pages is fast, but smaller is better:

```bash
# Build and check size
npm run build

# Check sizes
ls -lh dist/assets/

# Typical sizes:
# index-*.js:  40-80 KB
# index-*.css: 5-15 KB
```

### Enable Compression

GitHub Pages automatically serves:
- Gzip compression
- HTTPS/TLS
- CDN edge caching

No configuration needed!

### Monitor Performance

Test your site:
- https://pagespeed.web.dev/ - Google PageSpeed
- https://gtmetrix.com/ - Detailed metrics
- https://webpagetest.org/ - In-depth testing

## Cost Comparison

| Platform | Monthly Cost | Setup Time |
|----------|------------|-----------|
| **GitHub Pages** | **FREE** | 15 min |
| AWS Free Tier | ~$0.50 | 30-60 min |
| Netlify Free | FREE | 10 min |
| Shared Hosting | $5-15 | 1 hour |
| VPS | $5+ | 2+ hours |

**GitHub Pages is completely free forever!**

## What You Have

✅ Free hosting on GitHub Pages
✅ Free custom domain setup (GoDaddy DNS)
✅ Free HTTPS/SSL certificate
✅ Automatic deployments via GitHub Actions
✅ Version control with Git
✅ History of all changes
✅ Easy rollback if needed

## Workflow Summary

```
Edit Files Locally
        ↓
Test with: npm run dev
        ↓
git push origin main
        ↓
GitHub Actions builds automatically
        ↓
Site deploys to yourdomain.co.za (2-5 min)
        ↓
Visit your live site!
```

## Next Steps

1. **Create GitHub Repository**
   - https://github.com/new

2. **Update Vite Config**
   - Set `base: '/advanced-lab-solutions/'`

3. **Add GitHub Actions Workflow**
   - Create `.github/workflows/deploy.yml`

4. **Push to GitHub**
   - `git push origin main`

5. **Configure Domain**
   - Add DNS records on GoDaddy
   - Set custom domain in GitHub Pages

6. **Verify Live**
   - Check https://yourdomain.co.za

## Support Resources

- **GitHub Pages Docs**: https://pages.github.com/
- **GitHub Actions**: https://docs.github.com/actions
- **GoDaddy DNS Help**: https://www.godaddy.com/help/
- **DNS Checker**: https://dnschecker.org/

## Summary

You now have:

✅ Free GitHub Pages hosting
✅ Automatic deployments on every git push
✅ Custom GoDaddy domain setup
✅ Free HTTPS/SSL
✅ Version control & history
✅ Zero ongoing costs

**Ready to deploy? Start with Step 1!**
