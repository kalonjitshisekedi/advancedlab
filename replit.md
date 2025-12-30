# Advanced Lab Solutions Website

## Overview

Professional static website for Advanced Lab Solutions, a mineral processing laboratory based in Germiston, South Africa. The site showcases mineralogical and metallurgical testing services with ISO/IEC 17025:2017 accreditation. Originally built with React/Vite, it has been converted to pure HTML and CSS for simple static hosting.

**Key Pages:** Home, Services, About, Contact, Careers

**Company Details:**
- Location: 6 Knights Road, Germiston, South Africa
- Founded: 2019
- Email: info@advlabsolution.co.za
- Careers: career@advlabsolution.co.za

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Current Implementation: Pure HTML/CSS Static Site**
- 5 HTML pages (index.html, services.html, about.html, contact.html, careers.html)
- Single CSS file (styles.css) with 650+ lines of responsive styling
- No JavaScript frameworks or build process required
- Professional stock images stored in `attached_assets/stock_images/`

**Legacy React/Vite Setup (still present in codebase):**
- React with TypeScript located in `client/` directory
- Vite build system with Tailwind CSS
- shadcn/ui components configured in `components.json`
- The static HTML version is the primary deployment target

**Design System:**
- Color palette: Scientific blue (#3B82F6) and white
- Typography: Inter for body, Montserrat for headings
- Mobile-responsive layout with CSS media queries

### Deployment Architecture

**Primary Target: GitHub Pages (Recommended)**
- Completely free hosting
- Automatic HTTPS with free SSL
- Git push triggers deployment
- Custom domain support for GoDaddy

**Alternative: AWS S3 + CloudFront**
- CloudFormation template available in `aws/cloudformation-template.yaml`
- S3 for static file hosting
- CloudFront CDN with edge locations including Cape Town (South Africa)
- Route53 for DNS management
- CloudWatch for monitoring and alerts

### Build Process

For the React version (if used):
```bash
npm install
npm run build  # Creates dist/ folder
```

For pure HTML version:
- No build required
- Files can be served directly via Python HTTP server or any static host

## External Dependencies

### Hosting Options
- **GitHub Pages** - Free static hosting with automatic deployments
- **AWS S3** - Object storage for static files
- **AWS CloudFront** - CDN for global distribution
- **AWS Route53** - DNS management

### Domain Configuration
- Primary registrar: GoDaddy (referenced in documentation)
- Custom domain setup guides available for both GitHub Pages and AWS

### Development Dependencies (React version only)
- Node.js 20+
- npm package manager
- Vite build tool
- React with TypeScript
- Tailwind CSS with shadcn/ui components

### Fonts (loaded via Google Fonts)
- Inter (body text)
- Montserrat (headings)
- DM Sans, Fira Code, Geist Mono (available in React version)

### Images
- Professional laboratory stock images stored locally in `attached_assets/stock_images/`
- No external image CDN dependencies