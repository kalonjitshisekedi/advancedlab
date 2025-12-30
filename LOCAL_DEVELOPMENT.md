# Local Development Guide

Complete guide for running Advanced Lab Solutions locally on your computer.

## System Requirements

- **Python 3** (for local server)
- **A text editor** (VS Code, Sublime, Notepad++, etc.)
- **A modern web browser** (Chrome, Firefox, Safari, Edge)
- **Git** (optional, for version control)

## Running Locally

### Option 1: Python (Easiest)

Python is pre-installed on most computers.

**On Mac or Linux:**
```bash
# Navigate to your project folder
cd /path/to/advanced-lab-solutions

# Start local server
python3 -m http.server 8000

# Open browser and visit:
http://localhost:8000
```

**On Windows:**
```bash
# Navigate to your project folder
cd C:\path\to\advanced-lab-solutions

# Start local server
python -m http.server 8000

# Open browser and visit:
http://localhost:8000
```

### Option 2: Node.js (Alternative)

If you have Node.js installed:

```bash
# Install http-server globally (one time only)
npm install -g http-server

# Start server in your project folder
http-server

# Visit: http://localhost:8080
```

### Option 3: VS Code Live Server

If using VS Code:

1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Browser opens automatically

## File Structure

```
advanced-lab-solutions/
├── index.html              ← Home page
├── services.html           ← Services page
├── about.html             ← About page
├── contact.html           ← Contact page
├── careers.html           ← Careers page
├── styles.css             ← All styling
└── attached_assets/
    └── stock_images/      ← Images for pages
        ├── chemical_engineering_*.jpg
        ├── industrial_furnace_*.jpg
        └── laboratory_equipment_*.jpg
```

## Editing the Website

### Edit HTML
1. Open any `.html` file with text editor
2. Make changes (e.g., update text, links)
3. Save file
4. Refresh browser (Ctrl+R or Cmd+R)
5. Changes appear immediately

### Edit Styling
1. Open `styles.css`
2. Update CSS rules
3. Save file
4. Refresh browser
5. Styling changes appear

### Add Images
1. Place image in `attached_assets/stock_images/`
2. Reference in HTML: `<img src="attached_assets/stock_images/image.jpg" alt="Description">`
3. Save and refresh

## Troubleshooting

### Port Already in Use

If you get "Address already in use" error:

**On Mac/Linux:**
```bash
# Use different port
python3 -m http.server 9000

# Or find what's using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>
```

**On Windows:**
```bash
# Use different port
python -m http.server 9000

# Or find and kill process
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Images Not Loading

**Problem**: "Image not found" or broken image icons

**Solution**:
1. Check image path in HTML: `attached_assets/stock_images/image.jpg`
2. Verify file exists in that location
3. Use forward slashes (/) not backslashes (\)
4. Clear browser cache (Ctrl+Shift+Delete)
5. Refresh page (Ctrl+R)

### Links Not Working

**Problem**: Clicking links shows 404 error

**Solution**:
1. Check file exists (e.g., `services.html`)
2. Use correct filenames in href: `href="services.html"`
3. Don't use absolute paths like `/index.html`
4. Restart your local server

### Browser Cache Issues

Clear cache to see latest changes:
- **Chrome/Edge**: Ctrl+Shift+Delete
- **Firefox**: Ctrl+Shift+Delete
- **Safari**: Cmd+Option+E

Or use "Hard Refresh":
- **Chrome/Linux/Windows**: Ctrl+Shift+R
- **Mac**: Cmd+Shift+R

## Testing Checklist

Before deploying, test locally:

- [ ] **Navigation**: All menu links work
- [ ] **Pages Load**: All 5 pages display correctly
- [ ] **Images Show**: All images display properly
- [ ] **Forms Work**: Contact form appears complete
- [ ] **Mobile**: Test on phone/tablet (if possible)
- [ ] **Text**: Check for typos and formatting
- [ ] **Links**: All external links work
- [ ] **Styling**: No broken CSS or layout issues

### Manual Testing Steps

1. **Homepage**
   - Visit http://localhost:8000
   - Check hero section displays
   - Click "Explore Services" → goes to services.html
   - Click "Contact Us" → goes to contact.html

2. **Services Page**
   - All 3 services visible
   - Images load correctly
   - Links work

3. **About Page**
   - Mission statement visible
   - Values displayed
   - ISO 17025 badge shows

4. **Contact Page**
   - Form fields appear
   - Contact info displays
   - Email link works: info@advlabsolution.co.za

5. **Careers Page**
   - Job listing visible
   - Apply email link works: career@advlabsolution.co.za

## Development Tips

### Live Editing
1. Keep browser window open
2. Edit HTML/CSS in text editor
3. Save file
4. Refresh browser to see changes
5. No build process needed!

### Browser DevTools
Press F12 to open Developer Tools:
- **Inspector**: Check HTML structure
- **Console**: See any errors
- **Network**: Check image loading
- **Responsive**: Test mobile view

### Backup Your Work
```bash
# If using Git
git add .
git commit -m "Save local changes"
git push origin main
```

## Common Tasks

### Change Company Email
1. Open any HTML file
2. Find: `info@advlabsolution.co.za`
3. Replace with new email
4. Save all files

### Update Company Address
1. Open `contact.html`
2. Find: "6 Knights Road, Germiston"
3. Update with new address
4. Save file

### Add New Service
1. Open `services.html`
2. Copy existing `<div class="service-item">` block
3. Modify title and description
4. Add image path
5. Save file

## Next Steps

When happy with local version:

1. **Push to GitHub** (see GITHUB_PAGES_DEPLOYMENT.md)
2. **Deploy to GitHub Pages** (free hosting)
3. **Add custom domain** (from GoDaddy)
4. **Go live!**

See `GITHUB_PAGES_DEPLOYMENT.md` for deployment instructions.

## Need Help?

**Check:**
- File paths are correct
- Images exist in `attached_assets/stock_images/`
- HTML files are in project root
- `styles.css` is in project root
- No typos in filenames

**Test:**
- Clear browser cache
- Try different port number
- Close and reopen browser
- Restart local server

**Verify:**
- Port is not blocked by firewall
- File permissions allow reading
- Disk space available
- Browser is up to date
