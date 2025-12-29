# AWS S3 Deployment - Step-by-Step Manual Guide

Complete walkthrough for deploying Advanced Lab Solutions to AWS S3 with CloudFront CDN.

## Prerequisites Checklist

- [ ] AWS Account created
- [ ] AWS CLI installed and configured
- [ ] Node.js 20+ installed
- [ ] Domain name (GoDaddy or other registrar)
- [ ] Project built locally (`npm run build`)

## Phase 1: Create S3 Bucket

### Step 1.1: Create Bucket

```bash
BUCKET_NAME="advanced-lab-solutions-prod"
REGION="us-east-1"

aws s3api create-bucket \
  --bucket $BUCKET_NAME \
  --region $REGION
```

### Step 1.2: Enable Versioning

```bash
aws s3api put-bucket-versioning \
  --bucket $BUCKET_NAME \
  --versioning-configuration Status=Enabled
```

### Step 1.3: Block Public Access

```bash
aws s3api put-public-access-block \
  --bucket $BUCKET_NAME \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

### Step 1.4: Enable Static Website Hosting

```bash
aws s3api put-bucket-website \
  --bucket $BUCKET_NAME \
  --website-configuration file://- << EOF
{
  "IndexDocument": {
    "Suffix": "index.html"
  },
  "ErrorDocument": {
    "Key": "error.html"
  }
}
EOF
```

### Step 1.5: Enable Logging (Optional)

Create logging bucket first:

```bash
LOG_BUCKET="$BUCKET_NAME-logs"

aws s3api create-bucket \
  --bucket $LOG_BUCKET \
  --region $REGION
```

Then enable logging:

```bash
aws s3api put-bucket-logging \
  --bucket $BUCKET_NAME \
  --bucket-logging-status file://- << EOF
{
  "LoggingEnabled": {
    "TargetBucket": "$LOG_BUCKET",
    "TargetPrefix": "access-logs/"
  }
}
EOF
```

## Phase 2: Upload Files to S3

### Step 2.1: Upload Production Build

```bash
BUCKET_NAME="advanced-lab-solutions-prod"

# Navigate to project directory
cd /path/to/project

# Build the project
npm run build

# Upload with appropriate cache headers
aws s3 sync dist/ s3://$BUCKET_NAME/ \
  --delete \
  --cache-control "public, max-age=3600" \
  --exclude "*.html" \
  --exclude "index.html" \
  --exclude "error.html"

# Upload HTML with no-cache headers
aws s3 sync dist/ s3://$BUCKET_NAME/ \
  --cache-control "public, max-age=0, must-revalidate" \
  --include "*.html" \
  --delete
```

### Step 2.2: Upload Error Page

```bash
# If you have a custom error.html
aws s3 cp error.html s3://$BUCKET_NAME/error.html \
  --cache-control "public, max-age=3600"

# Or create a default one
aws s3 cp - s3://$BUCKET_NAME/error.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Error</title>
    <style>
        body { font-family: Arial; text-align: center; padding: 50px; }
        h1 { color: #d32f2f; }
    </style>
</head>
<body>
    <h1>Oops! Something went wrong</h1>
    <p><a href="/">Return to home</a></p>
</body>
</html>
EOF
```

### Step 2.3: Verify Upload

```bash
aws s3 ls s3://$BUCKET_NAME/ --recursive
```

## Phase 3: Create CloudFront Distribution

### Step 3.1: Create Origin Access Identity (OAI)

```bash
DISTRIBUTION_NAME="advanced-lab-solutions"

OAI_ID=$(aws cloudfront create-cloud-front-origin-access-identity \
  --cloud-front-origin-access-identity-config \
    CallerReference=$(date +%s),Comment="OAI for $DISTRIBUTION_NAME" \
  --query 'CloudFrontOriginAccessIdentity.Id' \
  --output text)

echo "OAI ID: $OAI_ID"
```

### Step 3.2: Update Bucket Policy

```bash
BUCKET_NAME="advanced-lab-solutions-prod"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

cat > bucket-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CloudFrontAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity/$OAI_ID"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    },
    {
      "Sid": "BucketListAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity/$OAI_ID"
      },
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::$BUCKET_NAME"
    }
  ]
}
EOF

aws s3api put-bucket-policy \
  --bucket $BUCKET_NAME \
  --policy file://bucket-policy.json
```

### Step 3.3: Create CloudFront Distribution

```bash
BUCKET_NAME="advanced-lab-solutions-prod"
DOMAIN_NAME="yourdomain.com"
OAI_ID="your-oai-id"

cat > cloudfront-config.json << EOF
{
  "CallerReference": "$(date +%s)",
  "Comment": "CDN for Advanced Lab Solutions",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3Origin",
        "DomainName": "$BUCKET_NAME.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": "origin-access-identity/cloudfront/$OAI_ID"
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"]
    },
    "Compress": true,
    "ViewerProtocolPolicy": "redirect-to-https",
    "TargetOriginId": "S3Origin",
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "DefaultTTL": 3600,
    "MaxTTL": 86400
  },
  "CacheBehaviors": [
    {
      "PathPattern": "*.html",
      "AllowedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"]
      },
      "Compress": true,
      "ViewerProtocolPolicy": "redirect-to-https",
      "TargetOriginId": "S3Origin",
      "TrustedSigners": {
        "Enabled": false,
        "Quantity": 0
      },
      "ForwardedValues": {
        "QueryString": false,
        "Cookies": {
          "Forward": "none"
        }
      },
      "MinTTL": 0,
      "DefaultTTL": 0,
      "MaxTTL": 0
    }
  ],
  "Enabled": true,
  "PriceClass": "PriceClass_100",
  "ViewerCertificate": {
    "CloudFrontDefaultCertificate": true
  }
}
EOF

DISTRIBUTION_ID=$(aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json \
  --query 'Distribution.Id' \
  --output text)

echo "CloudFront Distribution ID: $DISTRIBUTION_ID"
```

### Step 3.4: Verify Distribution

```bash
DISTRIBUTION_ID="your-distribution-id"

aws cloudfront get-distribution \
  --id $DISTRIBUTION_ID \
  --query 'Distribution.[DomainName,Status]' \
  --output text
```

Wait for status to be "Deployed" (5-15 minutes).

## Phase 4: Configure Custom Domain

### Step 4.1: Request SSL Certificate (ACM)

```bash
DOMAIN_NAME="yourdomain.com"

CERTIFICATE_ARN=$(aws acm request-certificate \
  --domain-name $DOMAIN_NAME \
  --subject-alternative-names www.$DOMAIN_NAME \
  --validation-method DNS \
  --region us-east-1 \
  --query 'CertificateArn' \
  --output text)

echo "Certificate ARN: $CERTIFICATE_ARN"
```

### Step 4.2: Validate Certificate

```bash
# List pending certificates
aws acm list-certificates \
  --certificate-status PENDING_VALIDATION \
  --region us-east-1

# Get validation options
CERTIFICATE_ARN="your-certificate-arn"

aws acm describe-certificate \
  --certificate-arn $CERTIFICATE_ARN \
  --region us-east-1 \
  --query 'Certificate.DomainValidationOptions'
```

Add DNS CNAME records provided by AWS to your domain registrar.

### Step 4.3: Create Route53 Hosted Zone

```bash
DOMAIN_NAME="yourdomain.com"

ZONE_ID=$(aws route53 create-hosted-zone \
  --name $DOMAIN_NAME \
  --caller-reference $(date +%s) \
  --query 'HostedZone.Id' \
  --output text)

echo "Route53 Hosted Zone ID: $ZONE_ID"

# Get nameservers
aws route53 get-hosted-zone --id $ZONE_ID \
  --query 'DelegationSet.NameServers'
```

### Step 4.4: Update Domain Registrar

1. Log into GoDaddy or your domain registrar
2. Go to DNS settings
3. Change nameservers to the 4 Route53 nameservers
4. Wait for propagation (up to 48 hours)

### Step 4.5: Create Route53 Records

```bash
ZONE_ID="your-zone-id"
DISTRIBUTION_DOMAIN="your-cloudfront-domain.cloudfront.net"
DOMAIN_NAME="yourdomain.com"

# Create A record for domain
cat > route53-change.json << EOF
{
  "Changes": [
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "$DOMAIN_NAME",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z2FDTNDATAQYW2",
          "DNSName": "$DISTRIBUTION_DOMAIN",
          "EvaluateTargetHealth": false
        }
      }
    },
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "www.$DOMAIN_NAME",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z2FDTNDATAQYW2",
          "DNSName": "$DISTRIBUTION_DOMAIN",
          "EvaluateTargetHealth": false
        }
      }
    }
  ]
}
EOF

aws route53 change-resource-record-sets \
  --hosted-zone-id $ZONE_ID \
  --change-batch file://route53-change.json
```

### Step 4.6: Update CloudFront Distribution

```bash
DISTRIBUTION_ID="your-distribution-id"
CERTIFICATE_ARN="your-certificate-arn"
DOMAIN_NAME="yourdomain.com"

# Get current config
aws cloudfront get-distribution-config \
  --id $DISTRIBUTION_ID > distribution-config.json

# Edit the JSON file:
# 1. Set ViewerCertificate.ACMCertificateArn to your certificate ARN
# 2. Set ViewerCertificate.SSLSupportMethod to "sni-only"
# 3. Set ViewerCertificate.MinimumProtocolVersion to "TLSv1.2_2021"
# 4. Add Aliases with items: [$DOMAIN_NAME, www.$DOMAIN_NAME]

# Update the distribution
aws cloudfront update-distribution \
  --id $DISTRIBUTION_ID \
  --distribution-config file://distribution-config.json
```

## Phase 5: Set Up Monitoring

### Step 5.1: Create CloudWatch Dashboard

```bash
cat > cloudwatch-dashboard.json << 'EOF'
{
  "widgets": [
    {
      "type": "metric",
      "properties": {
        "metrics": [
          ["AWS/CloudFront", "Requests", {"stat": "Sum"}],
          [".", "BytesDownloaded", {"stat": "Sum"}],
          [".", "BytesUploaded", {"stat": "Sum"}],
          [".", "4xxErrorRate", {"stat": "Average"}],
          [".", "5xxErrorRate", {"stat": "Average"}],
          [".", "CacheHitRate", {"stat": "Average"}]
        ],
        "period": 300,
        "stat": "Average",
        "region": "us-east-1",
        "title": "CloudFront Performance"
      }
    },
    {
      "type": "metric",
      "properties": {
        "metrics": [
          ["AWS/S3", "BucketSizeBytes", {"stat": "Average"}],
          [".", "NumberOfObjects", {"stat": "Average"}]
        ],
        "period": 86400,
        "stat": "Average",
        "region": "us-east-1",
        "title": "S3 Storage"
      }
    }
  ]
}
EOF

aws cloudwatch put-dashboard \
  --dashboard-name advanced-lab-solutions \
  --dashboard-body file://cloudwatch-dashboard.json
```

### Step 5.2: Create CloudWatch Alarms

```bash
DISTRIBUTION_ID="your-distribution-id"
EMAIL="your-email@example.com"

# Create SNS topic for alerts
TOPIC_ARN=$(aws sns create-topic \
  --name advanced-lab-alerts \
  --query 'TopicArn' \
  --output text)

# Subscribe email
aws sns subscribe \
  --topic-arn $TOPIC_ARN \
  --protocol email \
  --notification-endpoint $EMAIL

# Create alarm for 4xx errors
aws cloudwatch put-metric-alarm \
  --alarm-name "advanced-lab-4xx-errors" \
  --alarm-description "Alert when 4xx error rate exceeds 5%" \
  --metric-name 4xxErrorRate \
  --namespace AWS/CloudFront \
  --statistic Average \
  --period 300 \
  --threshold 5 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions $TOPIC_ARN \
  --dimensions Name=DistributionId,Value=$DISTRIBUTION_ID

# Create alarm for 5xx errors
aws cloudwatch put-metric-alarm \
  --alarm-name "advanced-lab-5xx-errors" \
  --alarm-description "Alert on any 5xx errors" \
  --metric-name 5xxErrorRate \
  --namespace AWS/CloudFront \
  --statistic Average \
  --period 60 \
  --threshold 0 \
  --comparison-operator GreaterThanOrEqualToThreshold \
  --alarm-actions $TOPIC_ARN \
  --dimensions Name=DistributionId,Value=$DISTRIBUTION_ID
```

## Phase 6: Set Up AWS Budget

### Step 6.1: Create Budget

```bash
cat > budget-definition.json << 'EOF'
{
  "BudgetName": "Advanced Lab Solutions",
  "BudgetLimit": {
    "Amount": "10",
    "Unit": "USD"
  },
  "TimeUnit": "MONTHLY",
  "BudgetType": "COST",
  "CostFilters": {
    "Service": ["Amazon Elastic Compute Cloud - Compute"]
  }
}
EOF

aws budgets create-budget \
  --account-id $(aws sts get-caller-identity --query Account --output text) \
  --budget file://budget-definition.json \
  --notifications-with-subscribers file://- << EOF
[
  {
    "Notification": {
      "NotificationType": "FORECASTED",
      "ComparisonOperator": "GREATER_THAN",
      "Threshold": 50,
      "ThresholdType": "PERCENTAGE"
    },
    "Subscribers": [
      {
        "SubscriptionType": "EMAIL",
        "Address": "your-email@example.com"
      }
    ]
  },
  {
    "Notification": {
      "NotificationType": "ACTUAL",
      "ComparisonOperator": "GREATER_THAN",
      "Threshold": 100,
      "ThresholdType": "PERCENTAGE"
    },
    "Subscribers": [
      {
        "SubscriptionType": "EMAIL",
        "Address": "your-email@example.com"
      }
    ]
  }
]
EOF
```

## Phase 7: Deploy Updates

### Quick Deploy Script

Create `deploy.sh`:

```bash
#!/bin/bash

set -e

BUCKET_NAME="advanced-lab-solutions-prod"
DISTRIBUTION_ID="your-distribution-id"

echo "📦 Building application..."
npm run build

echo "📤 Uploading files to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME/ \
  --delete \
  --cache-control "public, max-age=3600" \
  --exclude "*.html" \
  --exclude "index.html" \
  --exclude "error.html"

aws s3 sync dist/ s3://$BUCKET_NAME/ \
  --cache-control "public, max-age=0, must-revalidate" \
  --include "*.html" \
  --delete

echo "♻️  Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"

echo "✅ Deployment complete!"
```

Make executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

## Troubleshooting

### Access Denied Errors

Check IAM permissions:
```bash
aws iam get-user-policy --user-name your-username --policy-name your-policy
```

Required permissions:
- `s3:ListBucket`
- `s3:GetObject`
- `s3:PutObject`
- `s3:DeleteObject`
- `cloudfront:CreateInvalidation`

### Domain Not Resolving

```bash
# Check DNS propagation
nslookup yourdomain.com
dig yourdomain.com +trace

# List Route53 records
aws route53 list-resource-record-sets --hosted-zone-id your-zone-id
```

### High Costs

Monitor in AWS Console:
- Billing > Cost Explorer
- S3 > Bucket size
- CloudFront > Usage
- Route53 > Queries

## Next Steps

1. Set up automated deployments via GitHub Actions
2. Configure email notifications for alerts
3. Enable S3 access logging
4. Set up CloudWatch custom metrics
5. Implement CI/CD pipeline
6. Regular backups and versioning strategy

---

**Last Updated:** December 2024
**AWS Region:** us-east-1 (required for CloudFront)
