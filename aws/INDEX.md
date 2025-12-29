# AWS Deployment Documentation Index

Complete guide for deploying Advanced Lab Solutions to AWS S3/CloudFront with custom domain.

## 📚 Documentation Files

### Start Here (Before Deploying)
- **[LOCAL_TESTING.md](./LOCAL_TESTING.md)** - Test locally first (recommended!)
  - Setup for Linux, Mac, Windows
  - Development & production testing
  - Cross-platform instructions
  - Troubleshooting guide

### Deployment
- **[QUICK_START.md](./QUICK_START.md)** - Deploy in 15 minutes using CloudFormation
  - Fastest path to production
  - Automated setup with one command
  - Best for most users

### Complete Guides
- **[LOCAL_TESTING.md](./LOCAL_TESTING.md)** - Local testing on Linux, Mac & Windows
  - Development server setup per platform
  - Production build testing
  - Platform-specific installation
  - Troubleshooting guide

- **[README.md](../README.md)** - Full reference guide (4000+ lines)
  - Project overview
  - Prerequisites and setup
  - Both CloudFormation and manual deployment
  - Domain configuration
  - Monitoring and alerts
  - Performance optimization
  - Security best practices
  - CI/CD setup

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Step-by-step manual setup
  - Phase 1: Create S3 bucket
  - Phase 2: Upload files
  - Phase 3: Create CloudFront distribution
  - Phase 4: Configure custom domain
  - Phase 5: Set up monitoring
  - Phase 6: Set up AWS Budget
  - Phase 7: Deploy updates
  - Detailed troubleshooting

### Configuration & Tools
- **[cloudformation-template.yaml](./cloudformation-template.yaml)** - Infrastructure as Code
  - Creates S3 bucket with security settings
  - CloudFront distribution with optimal caching
  - Route53 hosted zone and DNS records
  - CloudWatch dashboard and alarms
  - SNS notifications
  - AWS Budget with email alerts
  - All deployment parameters included

- **[route53-changes.json](./route53-changes.json)** - Route53 DNS configuration template
  - A records for domain and www subdomain
  - CloudFront alias target configuration

- **[budget-setup.md](./budget-setup.md)** - Cost management guide
  - Free tier limits and cost estimates
  - Budget alert setup (3 methods)
  - Cost monitoring tools
  - Optimization strategies
  - Real-world cost examples
  - FAQs and cost estimation

### Deployment Scripts
- **[../deploy.sh](../deploy.sh)** - Automated deployment script
  - One-command deployments
  - Builds → uploads → cache invalidation
  - Dry-run mode for testing
  - Progress reporting with colors
  - Usage: `./deploy.sh --bucket name --distribution id`

## 🚀 Quick Deployment Path

### Option 1: CloudFormation (Recommended - 15 min)

```bash
# 1. Deploy infrastructure
aws cloudformation create-stack \
  --stack-name advanced-lab-solutions \
  --template-body file://aws/cloudformation-template.yaml \
  --parameters \
    ParameterKey=DomainName,ParameterValue=yourdomain.com \
    ParameterKey=AlertEmail,ParameterValue=you@example.com \
    ParameterKey=MonthlyBudgetUSD,ParameterValue=10 \
  --region us-east-1 \
  --capabilities CAPABILITY_NAMED_IAM

# 2. Get deployment info
aws cloudformation describe-stacks \
  --stack-name advanced-lab-solutions \
  --region us-east-1 \
  --query 'Stacks[0].Outputs'

# 3. Update GoDaddy DNS with Route53 nameservers
# (See QUICK_START.md for detailed steps)

# 4. Upload site
./deploy.sh --bucket your-bucket --distribution your-distribution-id
```

### Option 2: Manual Step-by-Step (30 min)
→ See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 7 detailed phases

### Option 3: CLI Commands Only (20 min)
→ See [README.md](../README.md) - Individual CLI commands explained

## 📋 File Structure

```
project/
├── README.md                          # Main reference (START HERE)
├── deploy.sh                          # Deployment script
└── aws/
    ├── INDEX.md                       # This file
    ├── QUICK_START.md                 # 15-minute setup
    ├── DEPLOYMENT_GUIDE.md            # Full manual guide (7 phases)
    ├── cloudformation-template.yaml   # Infrastructure as Code
    ├── route53-changes.json           # DNS configuration
    └── budget-setup.md                # Cost management guide
```

## 🎯 What Gets Created

CloudFormation automatically creates:

**AWS Services:**
- ✓ S3 bucket with versioning & encryption
- ✓ CloudFront distribution with CDN
- ✓ Route53 hosted zone & DNS records
- ✓ CloudWatch dashboard for monitoring
- ✓ CloudWatch alarms for errors
- ✓ SNS notifications via email
- ✓ AWS Budget with alerts
- ✓ IAM policies for access

**Features:**
- ✓ HTTPS/TLS enabled
- ✓ Gzip & Brotli compression
- ✓ Smart caching (HTML no-cache, Assets 1-year)
- ✓ DDoS protection via CloudFront
- ✓ Access logging
- ✓ Version control on S3
- ✓ Email alerts for budget overruns
- ✓ Error rate monitoring

## 💰 Cost Estimation

**Free Tier Limits (Monthly):**
- S3: 5 GB storage
- CloudFront: 50 GB transfer, 10M requests
- Route53: 25 hosted zones free

**Estimated Monthly Cost for Small Site:**
- **$0-2 USD** (mostly within free tier)

**Exceeding Free Tier:**
- CloudFront: $0.085/GB
- S3: $0.023/GB
- Route53: $0.50/zone + $0.40/M queries

## 🔍 Key Configuration Files Explained

### cloudformation-template.yaml
- **Parameters**: DomainName, AlertEmail, MonthlyBudget
- **Resources**: 12 AWS resources (S3, CloudFront, Route53, CloudWatch, SNS, Budget)
- **Outputs**: Bucket name, Distribution ID, Nameservers, Dashboard URL
- **Capabilities**: Creates IAM roles automatically

### route53-changes.json
- Two A records (apex + www)
- CloudFront alias targets (no additional charges)
- Automatic health checks disabled

### deploy.sh
- Prerequisites check (AWS CLI, Node, npm)
- Application build
- Smart S3 sync (HTML no-cache, Assets with long cache)
- CloudFront cache invalidation
- Deployment verification
- Colored output for clarity

## 🌍 Geographic Coverage

Your site will be served from:
- **CloudFront PriceClass_100**: North America + Europe + South Africa
- **South Africa**: Cape Town edge location for fast local delivery
- **Latency**: ~50-100ms from SA

## 📞 Support & Troubleshooting

### DNS Not Resolving
```bash
nslookup yourdomain.com
dig yourdomain.com +trace
```
See [DEPLOYMENT_GUIDE.md - Troubleshooting](./DEPLOYMENT_GUIDE.md#troubleshooting)

### Files Not Updating
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### Cost Issues
→ See [budget-setup.md](./budget-setup.md) for cost monitoring

### Access Denied Errors
→ Verify AWS credentials: `aws sts get-caller-identity`

## 📈 Next Steps After Deployment

1. **Verify Site Works**
   - Test on CloudFront domain
   - Test on custom domain (after DNS propagates)
   - Check page load times

2. **Set Up Monitoring**
   - CloudWatch dashboard (auto-created)
   - Performance metrics in dashboard
   - Monitor cost alerts in email

3. **Optimize Performance**
   - Use GTmetrix.com for speed test
   - Verify caching is working (check cache hit rate in CloudWatch)
   - Optimize images if needed

4. **Automate Deployments** (Optional)
   - Set up GitHub Actions (see README.md)
   - Deploy on every git push
   - Zero manual steps required

5. **Regular Maintenance**
   - Check CloudFront metrics monthly
   - Review AWS Billing for cost optimization
   - Update Route53 if needed

## ❓ Frequently Asked Questions

**Q: How long does DNS take?**
A: Usually 2-48 hours. Check with: `nslookup yourdomain.com`

**Q: Will I be charged immediately?**
A: No, AWS gives you $200 credit in first 12 months. Small sites stay within free tier.

**Q: Can I use my existing GoDaddy domain?**
A: Yes! Just update nameservers to Route53 (CloudFormation creates them automatically).

**Q: How do I deploy updates?**
A: Run `./deploy.sh` - builds, uploads, and invalidates cache automatically.

**Q: Can I rollback if something goes wrong?**
A: Yes! S3 versioning keeps all versions. Check CloudFormation events for what changed.

**Q: How secure is this?**
A: Very! Includes encryption, DDoS protection, access logging, and IAM policies.

**Q: What if my site gets lots of traffic?**
A: Stay within free tier up to 50GB/month (huge for a small site). CloudFront scales automatically.

## 📚 Related Documentation

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [AWS Route53 Documentation](https://docs.aws.amazon.com/route53/)
- [AWS Pricing Calculator](https://calculator.aws/)
- [AWS CloudFormation Reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/)

## 🎓 Learning Resources

**Beginner:** Start with [QUICK_START.md](./QUICK_START.md)
**Intermediate:** Read [README.md](../README.md) sections as needed
**Advanced:** Study [cloudformation-template.yaml](./cloudformation-template.yaml)
**Troubleshooting:** Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#troubleshooting)

## 📝 Version Information

- **Created**: December 2024
- **AWS Services**: S3, CloudFront, Route53, CloudWatch, IAM, Budgets, SNS
- **AWS Region**: us-east-1 (required for CloudFront)
- **Free Tier Eligible**: Yes (small sites only)
- **Maintenance**: Zero downtime updates supported

---

**Ready to Deploy?**

1. **Fastest**: [QUICK_START.md](./QUICK_START.md) (15 min)
2. **Most Control**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) (30 min)
3. **Reference**: [README.md](../README.md) (comprehensive)

**Start now**: Choose your path above and follow the steps!
