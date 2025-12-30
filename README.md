# Advanced Lab Solutions - Static Website

Professional static website for Advanced Lab Solutions, a mineral processing laboratory based in Germiston, South Africa.

## 🛠 How to Edit

This is a simple static website built with **HTML** and **CSS**. No build process or complex installation is required.

1.  **Edit Content:** Open any `.html` file (e.g., `index.html`) in your editor and change the text within the tags.
2.  **Edit Styles:** Open `styles.css` to modify colors, fonts, and layout.
3.  **Images:** New images should be placed in `attached_assets/stock_images/`. To update an image on a page, change the `src` attribute in the HTML `<img>` tag or the `background-image` property in the inline style.
4.  **Local Preview:** Use the "Run" button in Replit to start the web server and preview your changes.

## 🚀 How to Deploy for FREE to GitHub Pages (with GoDaddy Domain)

GitHub Pages is the best free hosting solution for this static site.

### Step 1: Create a GitHub Repository
1.  Go to [GitHub](https://github.com) and create a new public repository named `advanced-lab-solutions`.
2.  Upload all the files from this Replit project (except hidden system files) to that repository.

### Step 2: Enable GitHub Pages
1.  In your GitHub repository, go to **Settings** > **Pages**.
2.  Under **Build and deployment** > **Source**, select **Deploy from a branch**.
3.  Select the `main` branch and `/ (root)` folder, then click **Save**.

### Step 3: Connect your GoDaddy Domain
1.  In the same **GitHub Pages settings** page, find the **Custom domain** section.
2.  Enter your GoDaddy domain (e.g., `advlabsolution.co.za`) and click **Save**.
3.  GitHub will provide you with DNS records to add. Usually, this includes:
    *   **A records** pointing to GitHub's IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
    *   A **CNAME record** for `www` pointing to `[your-username].github.io`.
4.  Log in to your **GoDaddy DNS Management** console and add these records.
5.  Once DNS propagates (up to 24 hours), check "Enforce HTTPS" on the GitHub Pages settings page.

## Project Structure
- `index.html`: Home page
- `services.html`: Services page
- `about.html`: About page
- `contact.html`: Contact page
- `careers.html`: Careers page
- `styles.css`: Global styling
- `attached_assets/stock_images/`: Professional industry images
