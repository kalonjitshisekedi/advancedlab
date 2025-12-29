# Advanced Lab Solutions - AWS S3 Deployment Guide

A professional mineral processing laboratory website built with React, TypeScript, and Vite. This guide provides step-by-step instructions for deploying to AWS S3 with CloudFront and custom domain support.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Local Testing](#local-testing)
- [Building for Production](#building-for-production)
- [AWS Deployment](#aws-deployment)
- [Domain Configuration](#domain-configuration)
- [Monitoring and Alerts](#monitoring-and-alerts)

## Project Overview

Advanced Lab Solutions is a static website showcasing mineralogical and metallurgical testing services. The site includes:

- **Home**: Hero section with service overview
- **Services**: Detailed service offerings
- **About**: Company information and accreditations
- **Contact**: Contact form and location details
- **Careers**: Job listings and application information

**Tech Stack:**
- Frontend: React 18, TypeScript, Tailwind CSS
- Build Tool: Vite
- Routing: Wouter
- Form Handling: React Hook Form with Zod validation
- Animations: Framer Motion
- UI Components: Radix UI

## Prerequisites

Before deploying, ensure you have:

1. **AWS Account** with free tier access
2. **AWS CLI** installed and configured with credentials
3. **Node.js** 20+ and npm installed
4. **GoDaddy Domain** (or transfer to Route53)
5. **Git** for version control

### AWS CLI Setup

```bash
# Install AWS CLI (if not already installed)
# macOS with Homebrew:
brew install awscli

# Windows with MSI installer:
# Download from https://aws.amazon.com/cli/

# Configure credentials
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Default region: us-east-1 (required for CloudFront)
# Default output format: json
```

### Verify Installation

```bash
aws s3 ls
```

## Local Development

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Site will be available at http://localhost:5000
```

### Available Scripts

```bash
# Development server
npm run dev

# Type checking
npm check

# Build for production
npm run build

# Database migrations (if needed)
npm run db:push
```

## Local Testing

For detailed platform-specific testing guides (Linux, Mac, Windows), see **[aws/LOCAL_TESTING.md](./aws/LOCAL_TESTING.md)**

### Quick Start

```bash
# 1. Development with hot reload
npm run dev
# Access: http://localhost:5000

# 2. Production build testing
npm run build
cd dist
npx http-server -p 8080
# Access: http://localhost:8080
```

### Testing Coverage

- Development server with hot reload
- Production build verification
- Cross-platform setup (Linux, Mac, Windows)
- Port management and troubleshooting
- Performance testing
- Browser DevTools testing

**See [aws/LOCAL_TESTING.md](./aws/LOCAL_TESTING.md) for complete testing guide**

## Building for Production

### 1. Build the Static Site

```bash
npm run build
```

This creates a `dist` folder containing:
- `index.html` - Main entry point
- `assets/` - JavaScript, CSS, and images
- `error.html` - Error page (if configured)

### 2. Verify the Build

```bash
# The dist folder should contain:
# - index.html
# - assets/
#   - index-*.js
#   - index-*.css
#   - [other asset files]
```

### 3. Test Production Build Locally

```bash
# Using npm's built-in server (for testing)
cd dist
npx http-server
# Visit http://localhost:8080
```

## AWS Deployment

### Option 1: Automated Deployment with CloudFormation (Recommended)

This method uses CloudFormation to automate the entire setup including S3, CloudFront, Route53, monitoring, and budgets.

#### Step 1: Prepare CloudFormation Template

Save the CloudFormation template from `aws/cloudformation-template.yaml` to your local machine.

#### Step 2: Deploy Stack

```bash
# Replace with your actual values
STACK_NAME="advanced-lab-solutions"
DOMAIN_NAME="yourdomain.com"
EMAIL_FOR_ALERTS="your-email@example.com"
BUDGET_LIMIT="10"  # Monthly budget in USD

aws cloudformation create-stack \
  --stack-name $STACK_NAME \
  --template-body file://aws/cloudformation-template.yaml \
  --parameters \
    ParameterKey=DomainName,ParameterValue=$DOMAIN_NAME \
    ParameterKey=AlertEmail,ParameterValue=$EMAIL_FOR_ALERTS \
    ParameterKey=MonthlyBudgetUSD,ParameterValue=$BUDGET_LIMIT \
  --region us-east-1 \
  --capabilities CAPABILITY_NAMED_IAM
```

#### Step 3: Monitor Stack Creation

```bash
# Check stack status
aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --region us-east-1

# Watch for CREATE_COMPLETE status (takes ~15-20 minutes)
```

#### Step 4: Get Stack Outputs

```bash
aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --region us-east-1 \
  --query 'Stacks[0].Outputs' \
  --output table
```

This will display:
- CloudFront Distribution ID
- CloudFront Domain Name
- S3 Bucket Name
- CloudWatch Dashboard URL

### Option 2: Manual Deployment

Follow the detailed step-by-step guide in `aws/DEPLOYMENT_GUIDE.md`.

## Uploading Files to S3

### Using AWS Console

1. Navigate to S3 service
2. Open your bucket (created by CloudFormation or manually)
3. Click "Upload"
4. Select all files from the `dist` folder
5. Click "Upload"

### Using AWS CLI (Recommended)

```bash
# Set your bucket name
BUCKET_NAME="your-bucket-name"

# Upload all files, preserving directory structure
aws s3 sync dist/ s3://$BUCKET_NAME/ \
  --delete \
  --cache-control "public, max-age=3600" \
  --exclude "*.html" \
  --exclude "index.html"

# Upload HTML files with no-cache headers for versioning
aws s3 sync dist/ s3://$BUCKET_NAME/ \
  --cache-control "public, max-age=0, must-revalidate" \
  --include "*.html" \
  --delete
```

### Bash Script for Easy Deployment

Create `deploy.sh`:

```bash
#!/bin/bash

BUCKET_NAME="your-bucket-name"
DISTRIBUTION_ID="your-cloudfront-distribution-id"

echo "Building site..."
npm run build

echo "Uploading to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME/ \
  --delete \
  --cache-control "public, max-age=3600" \
  --exclude "*.html" \
  --exclude "index.html"

aws s3 sync dist/ s3://$BUCKET_NAME/ \
  --cache-control "public, max-age=0, must-revalidate" \
  --include "*.html" \
  --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"

echo "Deployment complete!"
```

Make it executable:

```bash
chmod +x deploy.sh
./deploy.sh
```

## Domain Configuration

### Using GoDaddy with Route53

#### Step 1: Create Hosted Zone in Route53

```bash
DOMAIN_NAME="yourdomain.com"

aws route53 create-hosted-zone \
  --name $DOMAIN_NAME \
  --caller-reference $(date +%s)
```

#### Step 2: Get Name Servers

```bash
# Find your hosted zone ID
aws route53 list-hosted-zones \
  --query "HostedZones[?Name=='$DOMAIN_NAME.'].Id" \
  --output text

# Get name servers
ZONE_ID="your-zone-id"
aws route53 get-hosted-zone --id $ZONE_ID
```

Note the 4 name servers displayed.

#### Step 3: Update GoDaddy DNS Settings

1. Log in to GoDaddy account
2. Go to "My Products" > "Domains"
3. Click your domain
4. Select "Manage DNS" > "Change Nameservers"
5. Select "Custom Nameservers"
6. Enter the 4 Route53 name servers from Step 2
7. Save changes (may take up to 48 hours to propagate)

#### Step 4: Create Route53 Records

If using CloudFormation, this is done automatically. For manual setup:

```bash
ZONE_ID="your-zone-id"
DISTRIBUTION_DOMAIN="your-cloudfront-domain.cloudfront.net"

# Create A record pointing to CloudFront
aws route53 change-resource-record-sets \
  --hosted-zone-id $ZONE_ID \
  --change-batch file://route53-changes.json
```

See `aws/route53-changes.json` for the required JSON format.

## Static Content Configuration

### index.html

The main entry point for your React application. Vite generates this automatically during the build process. It includes:
- Meta tags for SEO
- Viewport configuration for responsive design
- Link to your app bundle
- Fallback for non-JavaScript environments

### error.html

Optional custom error page for S3/CloudFront errors. This is handled by CloudFormation if using the automated setup. Otherwise, create `dist/error.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error - Advanced Lab Solutions</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #f5f5f5;
        }
        .container {
            text-align: center;
            padding: 20px;
        }
        h1 { color: #333; margin: 0; }
        p { color: #666; }
        a { color: #0066cc; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Oops! Something went wrong</h1>
        <p>We're sorry, but something unexpected happened.</p>
        <p><a href="/">Return to home page</a></p>
    </div>
</body>
</html>
```

### Other Static Files

- `assets/` - JavaScript bundles, CSS, and optimized images
- `public/favicon.png` - Browser tab icon

## Monitoring and Alerts

### CloudWatch Dashboard

The CloudFormation template creates a dashboard showing:

- S3 Request metrics
- CloudFront performance
- Error rates
- Bandwidth usage
- Cache hit ratio

Access via AWS Console > CloudWatch > Dashboards > `advanced-lab-solutions-dashboard`

### Budget Alerts

AWS Budget sends email alerts when:
- You reach 50% of your monthly budget
- You reach 100% of your monthly budget

Configure in AWS Console > Billing > Budgets

### Custom Alarms

The CloudFormation template includes alarms for:
- **4xx Errors**: Alert when error rate exceeds 5%
- **5xx Errors**: Alert when any 5xx errors occur
- **Bandwidth**: Alert when daily bandwidth exceeds threshold

## Performance Optimization

### Cache Headers

Different cache strategies are applied:

- **HTML files**: No cache (0 seconds) - ensures users get latest version
- **CSS/JS bundles**: 1 hour cache - named files allow longer caching
- **Images**: 24 hours cache - rarely change

### CloudFront Settings

- Gzip compression enabled
- Brotli compression enabled
- HTTP/2 enabled
- IPv6 support enabled
- TLS 1.2+ required

## Troubleshooting

### Domain Not Resolving

```bash
# Check DNS propagation
nslookup yourdomain.com
dig yourdomain.com

# Verify Route53 configuration
aws route53 list-resource-record-sets --hosted-zone-id your-zone-id
```

### Files Not Updating After Upload

1. Clear CloudFront cache:
```bash
aws cloudfront create-invalidation \
  --distribution-id your-distribution-id \
  --paths "/*"
```

2. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

### S3 Bucket Access Denied

Verify:
1. IAM user has S3 permissions
2. Bucket policy allows public read access
3. CloudFront distribution is associated with bucket

### High Costs

Check:
1. Data transfer costs - verify caching is working
2. API calls - use `aws s3 sync` not repeated uploads
3. CloudFront usage - ensure free tier limits not exceeded

## Cost Estimation (Free Tier)

**Monthly free allocation:**
- S3 storage: 5 GB
- Data transfer: 1 GB
- CloudFront: 50 GB
- Requests: 1 million API calls + 10 million HTTP requests

**Estimated monthly cost for small site:** $0 - $2 USD

Exceeding free tier results in approximately:
- S3 storage: $0.023/GB
- Data transfer: $0.085/GB (first 10TB)
- CloudFront: $0.085/GB
- Requests: $0.0075 per 10,000

## Security Best Practices

1. **Enable Versioning**: Allows rollback if needed
   ```bash
   aws s3api put-bucket-versioning \
     --bucket your-bucket-name \
     --versioning-configuration Status=Enabled
   ```

2. **Enable MFA Delete**: Requires MFA for version deletion
3. **Block Public ACLs**: CloudFormation does this by default
4. **Enable Logging**: Track all bucket access
5. **Use CloudFront only**: Don't expose S3 directly

## Continuous Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to S3

on:
  push:
    branches: [ main ]

env:
  AWS_REGION: us-east-1

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '20'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to S3
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      run: |
        aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete
    
    - name: Invalidate CloudFront
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      run: |
        aws cloudfront create-invalidation \
          --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
          --paths "/*"
```

Store secrets in GitHub repository settings.

## Support and Maintenance

For issues or updates:
1. Check AWS documentation: https://docs.aws.amazon.com
2. Review CloudFormation events for deployment errors
3. Check CloudWatch logs for runtime errors
4. Monitor costs in AWS Billing dashboard

## License

MIT License - See LICENSE file for details

---

**Last Updated:** December 2024
**AWS Services Used:** S3, CloudFront, Route53, CloudWatch, IAM, AWS Budgets
