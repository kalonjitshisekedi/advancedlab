# Local Testing Guide - Linux, Mac & Windows

Complete guide for testing the Advanced Lab Solutions website locally before deploying to AWS.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Development Server](#development-server)
- [Production Build Testing](#production-build-testing)
- [Platform-Specific Setup](#platform-specific-setup)
- [Testing Checklist](#testing-checklist)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### All Platforms

Ensure you have installed:

1. **Git** (version control)
2. **Node.js** (v20 or later)
3. **npm** (comes with Node.js)

### Check Installation

```bash
# Check versions
node --version
npm --version
git --version

# Should output:
# v20.x.x or higher
# 10.x.x or higher
# git version 2.x.x or higher
```

### Download & Setup

```bash
# 1. Clone or download your project
git clone <your-repo-url>
cd advanced-lab-solutions

# 2. Install dependencies
npm install

# 3. Verify installation
npm list react
# Should show react version
```

## Development Server

The development server runs on `http://localhost:5000` with hot-reload enabled.

### Start Development Server

**All Platforms (Mac, Linux, Windows):**

```bash
npm run dev
```

### Expected Output

```
> rest-express@1.0.0 dev
> NODE_ENV=development tsx server/index.ts

[express] serving on port 5000
```

### Access the Site

```
http://localhost:5000
```

or

```
http://127.0.0.1:5000
```

### Hot Reload Testing

1. Start dev server: `npm run dev`
2. Open browser to `http://localhost:5000`
3. Edit a React component (e.g., `client/src/pages/Home.tsx`)
4. Save the file
5. **Browser automatically refreshes** - no manual refresh needed!

### Development Testing Checklist

- [ ] Server starts without errors
- [ ] Can access site at localhost:5000
- [ ] All pages load:
  - [ ] Home page
  - [ ] Services page
  - [ ] About page
  - [ ] Contact page
  - [ ] Careers page
- [ ] Navigation links work
- [ ] Contact form displays
- [ ] Images load correctly
- [ ] Styling looks correct
- [ ] Hot reload works (edit a file, browser updates automatically)

## Production Build Testing

### Build for Production

```bash
npm run build
```

### Expected Output

```
> rest-express@1.0.0 build
> tsx script/build.ts

✓ 123 modules transformed.
...
dist/index.html                 2.5 kB
dist/assets/index-abc123.js    45.2 kB
dist/assets/index-def456.css    8.1 kB
dist/assets/logo-ghi789.png    15.3 kB

Build complete!
```

### Verify Build Output

Check that `dist/` folder contains:

```
dist/
├── index.html          ← Main page
├── error.html          ← Error page (if created)
└── assets/
    ├── index-*.js      ← React bundle (minified)
    ├── index-*.css     ← Styles (minified)
    └── [images]        ← Optimized images
```

### Test Production Build Locally

#### Option 1: Using npm (Recommended - All Platforms)

```bash
# Install simple HTTP server
npm install -g http-server

# Serve the build
cd dist
http-server -p 8080

# Access at: http://localhost:8080
```

**Output:**
```
Starting up http-server, serving dist
Available on:
  http://127.0.0.1:8080
  http://192.168.1.100:8080
```

**Stop server:** Press `Ctrl+C`

#### Option 2: Using Python (if installed)

**Python 3.x (Mac/Linux):**
```bash
cd dist
python -m http.server 8080
# Access: http://localhost:8080
```

**Python 2.x (older):**
```bash
cd dist
python -m SimpleHTTPServer 8080
```

**Stop server:** Press `Ctrl+C`

#### Option 3: Using Node.js (No extra installation)

```bash
cd dist
npx serve
# Access: http://localhost:3000 or displayed port
```

#### Option 4: Using Express (Development - All Platforms)

```bash
# At project root (not in dist folder)
npm run dev

# This serves both the backend and frontend
# Access: http://localhost:5000
```

### Production Build Testing Checklist

- [ ] Build completes without errors
- [ ] `dist/` folder created with files
- [ ] `index.html` exists in `dist/`
- [ ] `assets/` folder contains JS/CSS bundles
- [ ] Production server starts
- [ ] Can access site at localhost:8080 (or configured port)
- [ ] All pages load from production build
- [ ] No 404 errors in console
- [ ] Images and styles load correctly
- [ ] Navigation works
- [ ] Contact form submits (if backend running)

## Platform-Specific Setup

### macOS

#### Using Homebrew (Recommended)

```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify installation
node --version
npm --version

# Clone your repo
git clone <your-repo-url>
cd advanced-lab-solutions

# Install dependencies
npm install

# Start development
npm run dev
```

#### Using Official Installer

1. Download from https://nodejs.org/ (LTS recommended)
2. Run the `.pkg` installer
3. Follow prompts
4. Restart terminal
5. Verify: `node --version`

#### Additional Tools

```bash
# Install http-server for production testing
npm install -g http-server

# Install VS Code (optional but recommended)
brew install --cask visual-studio-code
```

#### Terminal Tips

```bash
# Quick project setup
mkdir -p ~/Projects
cd ~/Projects
git clone <your-repo-url>
cd advanced-lab-solutions
npm install && npm run dev

# Keyboard shortcuts
# Stop server: Ctrl+C
# Clear screen: Cmd+K
```

### Linux (Ubuntu/Debian)

#### Using apt Package Manager (Recommended)

```bash
# Update package lists
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version

# Clone your repo
git clone <your-repo-url>
cd advanced-lab-solutions

# Install dependencies
npm install

# Start development
npm run dev
```

#### Using NodeSource Repository (Newer versions)

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js (includes npm)
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

#### Using Snap (Quick but may be slower)

```bash
sudo snap install node --classic

# Verify
node --version
```

#### Additional Tools

```bash
# Install http-server
sudo npm install -g http-server

# Install VS Code (optional)
sudo apt install code
```

#### Terminal Tips

```bash
# Full setup in one command
git clone <your-repo-url> && cd advanced-lab-solutions && npm install

# Run dev in background (optional)
npm run dev &

# Kill all node processes if needed
killall node
```

### Windows

#### Using Chocolatey (Recommended)

```bash
# Install Chocolatey if not installed:
# https://chocolatey.org/install

# Install Node.js
choco install nodejs -y

# Verify (restart PowerShell/CMD after install)
node --version
npm --version

# Navigate to your project
cd C:\Users\YourName\Documents\advanced-lab-solutions

# Install dependencies
npm install

# Start development
npm run dev
```

#### Using Official Installer

1. Download from https://nodejs.org/ (LTS recommended)
2. Run `.msi` installer
3. Follow setup wizard (keep all defaults)
4. **Restart your terminal/PowerShell after installation**
5. Verify: `node --version`

#### Using Windows Terminal + PowerShell

```powershell
# Check if Node.js is installed
node --version

# If not, install using winget (Windows 11)
winget install OpenJS.NodeJS

# Navigate to project (example path)
cd "C:\Users\YourName\Documents\advanced-lab-solutions"

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Test production build
cd dist
npx http-server -p 8080
# Then visit: http://localhost:8080
```

#### Using Git Bash (Alternative)

```bash
# Install Git Bash from: https://git-scm.com/

# Then use same commands as Linux/Mac
node --version
npm --version

git clone <your-repo-url>
cd advanced-lab-solutions
npm install
npm run dev
```

#### Additional Tools

```powershell
# Install http-server globally
npm install -g http-server

# Install VS Code (optional)
choco install vscode -y

# Or download from: https://code.visualstudio.com/
```

#### Terminal Tips

```powershell
# Run as Administrator if permission issues
# Right-click PowerShell → Run as Administrator

# Clear screen
Clear-Host

# Quick setup (paste entire block)
git clone <your-repo-url>; cd advanced-lab-solutions; npm install; npm run dev

# Kill process using port 5000 (if needed)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## Testing Checklist

### Before Each Development Session

```bash
# 1. Navigate to project directory
cd advanced-lab-solutions

# 2. Update code from git (if working with others)
git pull origin main

# 3. Install/update dependencies
npm install

# 4. Start development server
npm run dev

# 5. Open browser to http://localhost:5000
```

### Development Testing

- [ ] **Navigation**: All links work
- [ ] **Pages Load**: Home, Services, About, Contact, Careers
- [ ] **Forms**: Contact form displays and is interactive
- [ ] **Images**: All images display (lab equipment, mineral samples)
- [ ] **Styling**: Colors, fonts, layout look correct
- [ ] **Responsive Design**: Test on narrow screen (F12 → Toggle device toolbar)
- [ ] **Mobile View**: Open DevTools, click device toggle
- [ ] **Console Errors**: F12 → Console tab, no red errors
- [ ] **Performance**: Page loads quickly

### Production Build Testing

```bash
# 1. Build the project
npm run build

# 2. Test the build
cd dist
http-server -p 8080

# 3. Visit http://localhost:8080 and verify:
```

- [ ] **All Pages Load**: Try each navigation link
- [ ] **No 404 Errors**: Check network tab (F12 → Network)
- [ ] **Bundle Size**: Check assets are minified
- [ ] **Images Load**: All images visible
- [ ] **Forms Work**: Contact form is interactive
- [ ] **Performance**: Fast load times

### Cross-Browser Testing

Test in multiple browsers:

```
✓ Chrome/Chromium
✓ Firefox
✓ Safari (macOS/iOS)
✓ Edge (Windows)
```

Each should show:
- Correct layout
- Proper styling
- Working forms
- No console errors

### Device Testing

Use Chrome DevTools (F12):

1. Click device toggle icon (top-left)
2. Test these breakpoints:
   - **Mobile**: 375px (iPhone)
   - **Tablet**: 768px (iPad)
   - **Desktop**: 1920px (Full width)
3. Verify layout adapts properly

## Troubleshooting

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution - All Platforms:**
```bash
# Mac/Linux: Find and kill process
lsof -i :5000
kill -9 <PID>

# Windows PowerShell:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use different port:
npm run dev -- --port 3000
# Then visit: http://localhost:3000
```

### Node/npm Not Found

**Error**: `command not found: npm`

**Solution:**
1. Reinstall Node.js from https://nodejs.org/
2. **Restart terminal completely**
3. Verify: `node --version`

**Windows specific:**
- Restart PowerShell/CMD
- If still not found, add to PATH manually or reinstall

### Dependencies Installation Fails

**Error**: `npm install fails with permission error`

**Solution - Mac/Linux:**
```bash
# Don't use sudo! Instead:
npm install --prefer-offline

# Or clear cache:
npm cache clean --force
npm install
```

**Solution - Windows:**
```powershell
# Run PowerShell as Administrator
# Right-click → Run as Administrator
npm install
```

### Hot Reload Not Working

**Issue**: Changes don't reflect in browser

**Solution:**
1. Check DevTools (F12) for errors
2. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
3. Restart dev server: Stop (Ctrl+C) and `npm run dev` again
4. Check file was actually saved

### Build Fails

**Error**: `npm run build fails`

**Solutions:**
```bash
# 1. Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json  # Mac/Linux
rmdir /s node_modules & del package-lock.json  # Windows

# 2. Reinstall
npm install

# 3. Try build again
npm run build

# 4. Check for TypeScript errors
npm run check
```

### Images Not Loading in Production

**Issue**: Images work in dev but not in production build

**Solution:**
1. Images must be in `client/public/` or imported in code
2. Verify image files exist in `dist/assets/`
3. Check file paths in code (should use relative paths)
4. Clear browser cache: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)

### Form Not Working

**Issue**: Contact form doesn't submit

**Solution:**
1. Ensure backend is running (check console for errors)
2. Check browser DevTools Network tab for request failures
3. Verify backend server is responding
4. Check database connection if applicable

### Slow Performance

**Issue**: Development server or build is slow

**Solution:**
```bash
# 1. Clear node_modules and reinstall
rm -rf node_modules  # Mac/Linux
rmdir /s node_modules  # Windows
npm install

# 2. Use --prefer-offline flag
npm install --prefer-offline

# 3. Upgrade Node.js
node --version  # Check current
# Download latest from nodejs.org

# 4. Restart development server
npm run dev
```

## Testing Workflow

### Typical Development Workflow

```bash
# Start of session
npm run dev

# In another terminal, if needed
npm run check  # Type checking

# During development
# Edit files → Browser auto-refreshes

# Before committing
npm run build
cd dist
npx http-server -p 8080
# Test production build

# Then deploy
./deploy.sh
```

### Automated Testing (Optional)

```bash
# Type checking
npm run check

# Manual testing checklist
# ✓ All pages load
# ✓ Forms work
# ✓ Images display
# ✓ Mobile responsive
# ✓ No console errors
# ✓ Performance acceptable
```

## Performance Testing

### Measure Load Time

**Chrome DevTools:**
1. Open DevTools (F12)
2. Go to Network tab
3. Reload page (Ctrl+R)
4. Check "DOMContentLoaded" and "Load" times

**Goals:**
- DOMContentLoaded: < 1 second
- Full Load: < 2 seconds
- First Contentful Paint: < 1 second

### Check Bundle Size

```bash
# After build
ls -lh dist/assets/
```

**Typical sizes:**
- index-*.js: 40-80 KB
- index-*.css: 5-15 KB

### Online Tools

Test from anywhere:
- https://gtmetrix.com
- https://pagespeed.web.dev
- https://webpagetest.org

## Summary

| Task | Command | Time | Port |
|------|---------|------|------|
| Dev server | `npm run dev` | 2-5s | 5000 |
| Build | `npm run build` | 5-15s | - |
| Test build | `http-server` in dist | 1s | 8080 |
| Type check | `npm run check` | 2-5s | - |

## Next Steps

1. **Development**: `npm run dev` - Edit files freely with hot reload
2. **Testing**: Build locally with `npm run build` and test with http-server
3. **Before Deploy**: Run production build and verify all pages work
4. **Deploy to AWS**: Use `./deploy.sh` when ready

---

**All platforms (Mac, Linux, Windows) use the exact same npm commands!**

The only differences are:
- How to install Node.js (platform-specific installers)
- Some terminal commands for port management
- Everything else is identical

Start with `npm install` then `npm run dev` and you're ready to test!
