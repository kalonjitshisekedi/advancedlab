# AWS Budget and Cost Management Guide

## Overview

AWS Free Tier provides generous limits for small projects. This guide helps you stay within budget and receive alerts before unexpected charges.

## Free Tier Limits (Monthly)

| Service | Free Tier Limit |
|---------|-----------------|
| S3 Storage | 5 GB |
| S3 Requests | 1M GET + 10M API calls |
| CloudFront | 50 GB data transfer |
| CloudFront Requests | 10M HTTP/HTTPS requests |
| Route53 | First 25 hosted zones free |
| CloudWatch | 10 custom metrics, 1M API calls |

## Cost Breakdown for Small Site

**Assumed Usage:**
- 100 GB/month page views
- 10 MB average page size
- 100K unique visitors/month

**Estimated Costs:**

| Service | Usage | Cost |
|---------|-------|------|
| S3 Storage | 0.5 GB | $0.00 |
| S3 Requests | 500K | $0.00 |
| CloudFront Transfer | 1 GB | $0.00 |
| CloudFront Requests | 100K | $0.00 |
| Route53 | 1 zone | $0.50 |
| CloudWatch | Standard | $0.00 |
| **Monthly Total** | | **$0.50** |

## Setting Up Budget Alerts

### Method 1: AWS Console

1. Navigate to **Billing Dashboard**
2. Click **Budgets** in left menu
3. Click **Create Budget**
4. Select **Cost budget**
5. Configure:
   - Budget name: "Advanced Lab Monthly"
   - Set amount: $10 USD
   - Time period: Monthly
6. Add alert thresholds:
   - At 50% of budget ($5)
   - At 100% of budget ($10)
7. Subscribe email notifications
8. Create budget

### Method 2: CloudFormation (Automated)

The included CloudFormation template automatically creates:

1. **Budget**: $10 USD/month
2. **Notifications**:
   - 50% threshold (Forecast)
   - 100% threshold (Forecast)
   - 100% threshold (Actual)
3. **Alert email**: Sent to your email address

Deploy with:

```bash
aws cloudformation create-stack \
  --stack-name advanced-lab-budget \
  --template-body file://aws/cloudformation-template.yaml \
  --parameters \
    ParameterKey=DomainName,ParameterValue=yourdomain.com \
    ParameterKey=AlertEmail,ParameterValue=your-email@example.com \
    ParameterKey=MonthlyBudgetUSD,ParameterValue=10
```

### Method 3: AWS CLI

```bash
# Create budget
aws budgets create-budget \
  --account-id $(aws sts get-caller-identity --query Account --output text) \
  --budget BudgetName="Advanced Lab",BudgetType=COST,TimeUnit=MONTHLY,BudgetLimit="{Amount=10,Unit=USD}" \
  --notifications-with-subscribers file://notifications.json
```

Content of `notifications.json`:

```json
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
```

## Monitoring Costs

### Daily Cost Check

```bash
# Get last 7 days of costs
aws ce get-cost-and-usage \
  --time-period Start=$(date -d '7 days ago' +%Y-%m-%d),End=$(date +%Y-%m-%d) \
  --granularity DAILY \
  --metrics BlendedCost \
  --group-by Type=DIMENSION,Key=SERVICE
```

### Cost by Service

```bash
# Get current month costs by service
aws ce get-cost-and-usage \
  --time-period Start=$(date +%Y-%m-01),End=$(date +%Y-%m-%d) \
  --granularity MONTHLY \
  --metrics UnblendedCost \
  --group-by Type=DIMENSION,Key=SERVICE
```

## Cost Optimization Tips

### 1. CloudFront PriceClass

The template uses `PriceClass_100` which is cheapest:

- **PriceClass_100**: North America + Europe (~$0.085/GB)
- **PriceClass_200**: Add Asia Pacific (~$0.115/GB)
- **PriceClass_All**: All regions (~$0.165/GB)

### 2. S3 Lifecycle Policies

Move old logs to cheaper storage:

```bash
aws s3api put-bucket-lifecycle-configuration \
  --bucket advanced-lab-logs \
  --lifecycle-configuration file://lifecycle.json
```

Content of `lifecycle.json`:

```json
{
  "Rules": [
    {
      "Id": "DeleteOldLogs",
      "Status": "Enabled",
      "ExpirationInDays": 30,
      "NoncurrentVersionExpirationInDays": 7
    }
  ]
}
```

### 3. CloudFront Caching

Optimal caching reduces costs:

- **HTML**: 0 second TTL (no cache)
- **CSS/JS**: 1 year TTL (long cache)
- **Images**: 30 day TTL

The template already optimizes this.

### 4. Route53 Optimization

- Delete unused hosted zones ($0.50 each)
- Consolidate subdomains in one zone
- Use health checks only if needed

### 5. CloudWatch Optimization

Default metrics are free. Avoid:
- Custom metrics beyond 10
- Excessive API calls
- Detailed monitoring for non-production

## Avoiding Unexpected Charges

### ✅ Stay in Free Tier

- Keep S3 storage under 5 GB
- Keep CloudFront usage under 50 GB/month
- Use only 1-2 hosted zones
- Stick to basic CloudWatch metrics

### ✅ Set Up Alarms

```bash
# Check if alarms exist
aws cloudwatch describe-alarms
```

### ✅ Regular Reviews

Check monthly:
1. **AWS Billing Console**
2. **Cost Explorer**
3. **Budget alerts in email**

### ✅ Enable Termination Protection

Prevent accidental resource deletion:

```bash
aws cloudformation update-stack \
  --stack-name advanced-lab-solutions \
  --no-enable-termination-protection
```

## Responding to Budget Alerts

### If You Get a 50% Alert

1. Check Cost Explorer for anomalies
2. Review CloudFront metrics
3. Check S3 for unexpected files
4. Verify no DDoS attacks

### If You Get a 100% Alert

1. Immediately check AWS Billing
2. Review last 24 hours usage
3. Identify anomalies
4. Consider:
   - Reducing CloudFront PriceClass
   - Implementing rate limiting
   - Adjusting cache settings
   - Adding Web Application Firewall

## Cost Examples

### Scenario 1: High Traffic

**Setup**: 1M monthly visitors, 10 MB pages

```
CloudFront: 10 GB = $0.85
S3 requests: 1M GET = $0.00
Route53: 1 zone = $0.50
Total: ~$1.35/month ✓ (well within free tier)
```

### Scenario 2: Extreme Traffic

**Setup**: 1B monthly requests, 100 MB pages (extreme)

```
CloudFront: 100 GB = $8.50
S3 requests: 1B GET = $5.00
Route53: 1 zone = $0.50
Total: ~$14/month (exceeds budget)
Action: Enable CloudFront caching, optimize images
```

## CloudWatch Alarms Setup

### Alarm for Data Transfer Spike

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name "cloudfront-high-transfer" \
  --alarm-description "Alert if daily transfer exceeds 10 GB" \
  --metric-name BytesDownloaded \
  --namespace AWS/CloudFront \
  --statistic Sum \
  --period 86400 \
  --threshold 10737418240 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:region:account:topic
```

### Alarm for Request Spike

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name "cloudfront-high-requests" \
  --alarm-description "Alert if requests exceed 1M daily" \
  --metric-name Requests \
  --namespace AWS/CloudFront \
  --statistic Sum \
  --period 86400 \
  --threshold 1000000 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:region:account:topic
```

## FAQs

**Q: Will I be charged if I exceed free tier?**
A: Yes, but only for overage. Free tier limits are generous for small sites.

**Q: How accurate are forecasted alerts?**
A: AWS forecasts based on current usage patterns. Enable both forecasted and actual alerts.

**Q: Can I reduce budget alerts after setup?**
A: Yes, edit budget in Billing > Budgets console anytime.

**Q: What if I accidentally run up charges?**
A: Contact AWS Support within 30 days for potential credit (one-time).

**Q: Should I delete unused resources?**
A: Yes, delete unused hosted zones, distributions, and old CloudWatch logs.

## Resources

- [AWS Free Tier](https://aws.amazon.com/free/)
- [AWS Pricing Calculator](https://calculator.aws/)
- [AWS Budgets Documentation](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/budgets-managing-costs.html)
- [Cost Explorer Guide](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ce-what-is.html)
