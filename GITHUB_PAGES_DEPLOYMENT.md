# GitHub Pages Deployment Guide

Complete guide for deploying Advanced Lab Solutions to GitHub Pages with custom GoDaddy domain.

## Why GitHub Pages?

✅ **Completely Free** - No costs ever
✅ **Automatic HTTPS** - Free SSL certificate
✅ **Fast & Reliable** - GitHub's infrastructure
✅ **Easy Updates** - Git push = site updates
✅ **Custom Domain** - Works with GoDaddy
✅ **No Maintenance** - GitHub handles everything

## Prerequisites

1. **GitHub Account** (free at https://github.com)
2. **Git installed** on your computer
3. **Project code locally** (all HTML, CSS, images)
4. **GoDaddy Domain** (already registered)

## Step-by-Step Deployment

### Step 1: Create GitHub Repository (5 minutes)

1. Go to https://github.com/new
2. **Repository name**: `advanced-lab-solutions`
3. **Description**: "Professional mineral processing laboratory website"
4. Choose **Public** (required for free GitHub Pages)
5. Click **Create repository**

You now have an empty repository ready for your code.

### Step 2: Prepare Your Local Project (2 minutes)

Make sure your project folder contains:

```
advanced-lab-solutions/
├── index.html
├── services.html
├── about.html
├── contact.html
├── careers.html
├── styles.css
└── attached_assets/
    └── stock_images/
        ├── chemical_engineering_*.jpg
        ├── industrial_furnace_*.jpg
        └── laboratory_equipment_*.jpg
```

### Step 3: Initialize Git & Push Code (5 minutes)

Open terminal/command prompt in your project folder:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial website commit - HTML and CSS"

# Add remote repository (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/advanced-lab-solutions.git

# Verify it worked
git remote -v

# Push code to GitHub
git branch -M main
git push -u origin main
```

**What this does:**
- Creates git repository
- Stages all your files
- Commits with message
- Connects to GitHub
- Pushes code online

**If you get an error:**
- Make sure USERNAME matches your GitHub username
- Repository must be created on GitHub first
- Try again after creating repo

### Step 4: Enable GitHub Pages (3 minutes)

1. Go to your repository on GitHub
2. Click **Settings** (top-right area)
3. Left sidebar → Click **Pages**
4. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `main`
   - **Folder**: Select `/ (root)`
5. Click **Save**

GitHub will automatically:
- Build your site
- Deploy to GitHub Pages
- Provide a public URL

**Your site is now live at:**
```
https://USERNAME.github.io/advanced-lab-solutions/
```

Test it! Visit that URL in your browser.

### Step 5: Add Custom Domain (10 minutes)

#### Part A: Update GoDaddy DNS

1. Log in to GoDaddy
2. Go to **Domains** → Select your domain
3. Click **DNS** (or "DNS Management")

**Add A Records** (these point your domain to GitHub):

Click "Add" and add these 4 records:

| Type | Host | Points to | TTL |
|------|------|-----------|-----|
| A | @ | 185.199.108.153 | 1 hour |
| A | @ | 185.199.109.153 | 1 hour |
| A | @ | 185.199.110.153 | 1 hour |
| A | @ | 185.199.111.153 | 1 hour |

**Add CNAME Record** (for www subdomain):

| Type | Host | Points to | TTL |
|------|------|-----------|-----|
| CNAME | www | USERNAME.github.io | 1 hour |

**Result after DNS changes:**
- `yourdomain.com` → GitHub Pages
- `www.yourdomain.com` → GitHub Pages

#### Part B: Configure GitHub Pages

1. Go back to your GitHub repository
2. **Settings** → **Pages**
3. Under "Custom domain":
   - Enter: `yourdomain.com` (without www)
   - Click **Save**

GitHub will:
- Create a `CNAME` file in your repo
- Start checking DNS setup
- Generate HTTPS certificate (~5 minutes)

**Wait 5-10 minutes** for DNS to propagate.

#### Part C: Verify & Enable HTTPS

1. Refresh GitHub Pages settings
2. You should see: "Your site is live at https://yourdomain.com"
3. Check ✓ **Enforce HTTPS** (once available)

**DNS Propagation Time:**
- Usually 5-30 minutes
- Sometimes up to 24 hours
- Check status: https://dnschecker.org

## Your Site is Live!

**Visit:**
- `https://yourdomain.com` ← Your custom domain
- `https://www.yourdomain.com` ← Also works
- `https://USERNAME.github.io/advanced-lab-solutions/` ← GitHub default

All three URLs work!

## Making Updates

### Update Your Site

When you make changes locally:

```bash
# Make edits to HTML/CSS files
# (edit in your text editor)

# Stage changes
git add .

# Commit changes
git commit -m "Update services page description"

# Push to GitHub
git push origin main
```

**That's it!** GitHub automatically:
- Detects the push
- Rebuilds your site
- Deploys to live URL
- Updates in 1-2 minutes

### Update Content Examples

**Change company email:**
```bash
# Edit any HTML file
# Find: info@advlabsolution.co.za
# Replace: newemail@example.com
git add .
git commit -m "Update company email"
git push origin main
```

**Update service description:**
```bash
# Edit services.html
# Update service text
git add .
git commit -m "Update service descriptions"
git push origin main
```

**Add new image:**
```bash
# Add image to attached_assets/stock_images/
# Reference in HTML: <img src="attached_assets/stock_images/newimage.jpg">
git add .
git commit -m "Add new equipment image"
git push origin main
```

## Troubleshooting

### Domain Not Working

**Problem**: Domain shows "connection refused" or default GitHub page

**Solution:**
1. Verify DNS records on GoDaddy
   - All 4 A records must point to 185.199.x.x
   - CNAME for www must point to USERNAME.github.io
2. Wait 24 hours for full DNS propagation
3. Check: https://dnschecker.org (paste your domain)
4. Clear browser cache (Ctrl+Shift+Delete)

**Test:**
```bash
# Check if DNS is set up correctly
nslookup yourdomain.com
dig yourdomain.com

# Should show GitHub Pages IPs
```

### HTTPS Not Working

**Problem**: Site shows "Not Secure" in browser

**Solution:**
1. Wait 5-10 minutes after adding domain
2. Refresh GitHub Pages settings
3. Check "Enforce HTTPS" once available
4. Clear browser cache

**If still not working:**
1. Remove custom domain from GitHub settings
2. Wait 5 minutes
3. Re-add custom domain
4. Wait for HTTPS certificate

### Site Shows Old Content

**Problem**: Changes don't appear after push

**Solution:**
1. Verify changes were committed: `git log`
2. Verify push succeeded: `git push origin main`
3. Wait 2-3 minutes for GitHub to rebuild
4. Clear browser cache (Ctrl+Shift+Delete)
5. Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)

**Check GitHub status:**
1. Go to repository
2. Click **Actions** tab
3. Look for your recent commit
4. Green checkmark = successful deploy
5. Red X = build failed, see error logs

### 404 Error on Pages

**Problem**: Links give 404 errors

**Solution:**
1. Check HTML file exists (e.g., services.html)
2. Verify link is correct: `<a href="services.html">`
3. Don't use `/services.html` (absolute path)
4. File names are case-sensitive: `Services.html` ≠ `services.html`
5. Test locally first before pushing

### Images Not Loading

**Problem**: Images show broken icon

**Solution:**
1. Verify image exists in `attached_assets/stock_images/`
2. Check path in HTML is correct
3. Use forward slashes: `attached_assets/stock_images/image.jpg`
4. Clear browser cache
5. Check file permissions (can read)

## File Structure for GitHub Pages

Your repository will look like:

```
advanced-lab-solutions/
├── .git/                    (created by git)
├── CNAME                    (created by GitHub)
├── index.html
├── services.html
├── about.html
├── contact.html
├── careers.html
├── styles.css
├── attached_assets/
│   └── stock_images/
│       ├── chemical_engineering_*.jpg
│       ├── industrial_furnace_*.jpg
│       └── laboratory_equipment_*.jpg
└── [documentation files - optional]
    ├── LOCAL_DEVELOPMENT.md
    ├── GITHUB_PAGES_DEPLOYMENT.md
    ├── README.md
    └── etc.
```

## Best Practices

### Git Commits
- Commit frequently (after each change)
- Write clear commit messages
- Example: `"Update contact email"` not `"changes"`

### Version Control
- Always commit before making big changes
- Check `git status` before pushing
- Can revert to previous versions if needed

### Testing
1. Test locally first: `python3 -m http.server 8000`
2. Check all pages, links, images
3. Test on mobile (DevTools)
4. Then push to GitHub
5. Verify live site

### Domain Management
- Keep DNS records for 24+ months
- Renew domain before expiration
- Update CNAME if GitHub Pages IPs change
- Keep GoDaddy account secure

## Security Notes

- GitHub Pages is HTTPS (secure)
- Your code is public (on GitHub)
- Don't commit sensitive data (keys, passwords)
- Contact form needs backend (use Formspree or similar)

## Ongoing Maintenance

### Regular Updates
```bash
# Every time you change something
git add .
git commit -m "Describe your changes"
git push origin main
```

### Backup
```bash
# Clone your repo as backup
git clone https://github.com/USERNAME/advanced-lab-solutions.git backup
```

### Monitor Site
- Check GitHub **Actions** tab for deploy status
- Visit your domain regularly to verify
- Monitor Analytics (if enabled)

## FAQ

**Q: How long do updates take to appear?**
A: Usually 1-2 minutes. Sometimes up to 5 minutes. Check GitHub Actions for status.

**Q: Can I have multiple domains?**
A: Yes. Use CNAME file for primary domain, then set additional domains in registrar.

**Q: What if I accidentally break something?**
A: Use `git revert <commit-hash>` to undo changes. All history is saved.

**Q: Can I use a subdomain?**
A: Yes. Set CNAME for subdomain to USERNAME.github.io, or use DNS CNAME/A records.

**Q: Is there a limit on how many times I can push?**
A: No. Push as often as you want. No limits on free GitHub Pages.

**Q: What about SEO?**
A: GitHub Pages is SEO-friendly. Ensure:
- Proper title tags in HTML
- Meta descriptions
- Plain text content (not in images)
- Proper heading hierarchy

**Q: Can I use JavaScript or a backend?**
A: GitHub Pages is static only. No server-side code. Use Formspree for form submission.

## Contact Form Note

The current contact.html form won't work without a backend service. To make it functional:

**Option 1: Formspree (Easiest)**
1. Go to https://formspree.io
2. Create free account
3. Create new form
4. Get form ID
5. Update form action in contact.html:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

**Option 2: EmailJS**
Similar to Formspree, connects to your email.

**Option 3: Netlify Forms**
Use Netlify instead of GitHub Pages (but loses some benefits).

## Summary

✅ Create GitHub repository
✅ Push local code to GitHub
✅ Enable GitHub Pages
✅ Configure custom domain on GoDaddy
✅ Update DNS records
✅ Wait for HTTPS certificate
✅ Site is live!

**Every update:**
- Make changes locally
- `git push origin main`
- Site updates automatically

**Forever free!** 🎉
