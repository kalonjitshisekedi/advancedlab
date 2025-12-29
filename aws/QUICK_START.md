# AWS S3 Deployment - Quick Start Guide

Complete your AWS deployment in 15 minutes using CloudFormation.

## Prerequisites

- [x] AWS Account with free tier access
- [x] AWS CLI installed
- [x] GoDaddy domain (or any registrar)
- [x] Build the app locally: `npm run build`

## Step 1: Install AWS CLI (5 minutes)

```bash
# macOS
brew install awscli

# Windows - Download MSI from: https://aws.amazon.com/cli/

# Verify installation
aws --version
```

## Step 2: Configure AWS Credentials (5 minutes)

```bash
aws configure

# You'll be prompted for:
# AWS Access Key ID: [paste from AWS console]
# AWS Secret Access Key: [paste from AWS console]
# Default region: us-east-1
# Default output format: json
```

## Step 3: Deploy with CloudFormation (5 minutes)

```bash
# Replace these values:
DOMAIN="yourdomain.com"
EMAIL="your-email@example.com"
BUDGET="10"  # Monthly budget in USD

# Deploy everything (S3, CloudFront, Route53, Monitoring)
aws cloudformation create-stack \
  --stack-name advanced-lab-solutions \
  --template-body file://aws/cloudformation-template.yaml \
  --parameters \
    ParameterKey=DomainName,ParameterValue=$DOMAIN \
    ParameterKey=AlertEmail,ParameterValue=$EMAIL \
    ParameterKey=MonthlyBudgetUSD,ParameterValue=$BUDGET \
  --region us-east-1 \
  --capabilities CAPABILITY_NAMED_IAM
```

**What this does:**
- ✓ Creates S3 bucket with versioning & encryption
- ✓ Sets up CloudFront CDN with caching rules
- ✓ Creates Route53 hosted zone for your domain
- ✓ Configures CloudWatch monitoring & alarms
- ✓ Sets up AWS Budget with email alerts

## Step 4: Get Deployment Info (2 minutes)

Wait 15-20 minutes for CloudFormation to complete, then:

```bash
aws cloudformation describe-stacks \
  --stack-name advanced-lab-solutions \
  --region us-east-1 \
  --query 'Stacks[0].Outputs' \
  --output table
```

This shows:
- S3 bucket name
- CloudFront domain
- Distribution ID (for invalidation)
- Route53 nameservers
- Dashboard URL

## Step 5: Update GoDaddy DNS (5 minutes)

1. **Log in to GoDaddy**
2. **Go to:** My Products → Domains → Your Domain
3. **Click:** Manage DNS
4. **Select:** Change Nameservers
5. **Choose:** Custom Nameservers
6. **Enter the 4 nameservers from Step 4**
7. **Save changes**

⏱️ DNS propagation takes 24-48 hours (usually faster)

## Step 6: Upload Your Site (2 minutes)

```bash
# Get values from Step 4 outputs
BUCKET="your-bucket-name"
DISTRIBUTION="your-distribution-id"

# Upload files
npm run build

aws s3 sync dist/ s3://$BUCKET/ --delete \
  --cache-control "public, max-age=3600" \
  --exclude "*.html" \
  --exclude "index.html"

aws s3 sync dist/ s3://$BUCKET/ \
  --cache-control "public, max-age=0, must-revalidate" \
  --include "*.html" \
  --delete

# Clear CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION \
  --paths "/*"
```

## Step 7: Test Your Site

```bash
# Test immediately on CloudFront domain
curl https://your-cloudfront-domain.cloudfront.net

# After DNS propagates (check in 2-48 hours)
curl https://yourdomain.com
```

## Verify Everything

✓ CloudFront distribution created and deployed
✓ S3 files uploaded
✓ Route53 records pointing to CloudFront
✓ CloudWatch alarms set up
✓ Budget notifications enabled
✓ Email alerts configured

## Common Issues

### **"domain.com doesn't exist"**
→ DNS takes 24-48 hours to propagate. Check with: `nslookup yourdomain.com`

### **"site doesn't load"**
→ Clear browser cache (Ctrl+Shift+Delete)
→ Files still uploading to S3 (check with: `aws s3 ls s3://bucket-name`)

### **"Access Denied" error**
→ Check AWS credentials: `aws sts get-caller-identity`

### **High costs**
→ Check AWS Billing console
→ Verify caching is working (CloudFront Hit Rate)

## Next Steps

1. **Monitor Performance**
   - CloudWatch Dashboard: Outputs from Step 4
   - Cost Explorer: AWS Console > Billing

2. **Set Up Auto-Deployment** (GitHub)
   - See README.md for GitHub Actions example

3. **Custom Domain with HTTPS**
   - Included automatically via CloudFront

4. **Site Speed Tests**
   - https://gtmetrix.com
   - https://pagespeed.web.dev

## Support Resources

- **AWS Documentation**: https://docs.aws.amazon.com
- **Troubleshooting**: See aws/DEPLOYMENT_GUIDE.md
- **Costs**: See aws/budget-setup.md
- **Full Guide**: See README.md

## Files Reference

| File | Purpose |
|------|---------|
| `README.md` | Complete deployment guide |
| `aws/cloudformation-template.yaml` | Infrastructure as code |
| `aws/DEPLOYMENT_GUIDE.md` | Step-by-step manual setup |
| `aws/budget-setup.md` | Cost management guide |
| `deploy.sh` | Automated deployment script |

## Estimated Costs (Free Tier)

For a small site with:
- 10 GB CloudFront traffic/month
- 100K page views/month
- 1 hosted zone

**Expected cost: $0.50-2.00/month**

Most usage fits within AWS Free Tier limits!

---

**Estimated Setup Time**: 30 minutes total
**Next Deployment**: 2 minutes (using `deploy.sh`)
**Zero downtime updates**: Yes
