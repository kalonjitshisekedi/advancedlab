#!/bin/bash

#########################################
# Advanced Lab Solutions Deployment Script
# Deploys React static site to AWS S3/CloudFront
#########################################

set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BUCKET_NAME="${S3_BUCKET_NAME:-}"
DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID:-}"
DRY_RUN=${DRY_RUN:-false}

# Functions
print_header() {
    echo -e "${YELLOW}════════════════════════════════════════${NC}"
    echo -e "${YELLOW}$1${NC}"
    echo -e "${YELLOW}════════════════════════════════════════${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"
    
    # Check AWS CLI
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI not found. Please install: https://aws.amazon.com/cli/"
        exit 1
    fi
    print_success "AWS CLI found"
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js not found"
        exit 1
    fi
    print_success "Node.js found ($(node --version))"
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm not found"
        exit 1
    fi
    print_success "npm found"
    
    # Check AWS credentials
    if ! aws sts get-caller-identity &> /dev/null; then
        print_error "AWS credentials not configured. Run: aws configure"
        exit 1
    fi
    print_success "AWS credentials configured"
    
    # Check bucket name
    if [ -z "$BUCKET_NAME" ]; then
        print_error "S3_BUCKET_NAME environment variable not set"
        print_info "Set it with: export S3_BUCKET_NAME='your-bucket-name'"
        exit 1
    fi
    print_success "S3 bucket: $BUCKET_NAME"
    
    # Check distribution ID
    if [ -z "$DISTRIBUTION_ID" ]; then
        print_error "CLOUDFRONT_DISTRIBUTION_ID environment variable not set"
        print_info "Set it with: export CLOUDFRONT_DISTRIBUTION_ID='your-distribution-id'"
        exit 1
    fi
    print_success "CloudFront distribution: $DISTRIBUTION_ID"
}

# Build the application
build_app() {
    print_header "Building Application"
    
    if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
        print_info "Building production bundle..."
        npm run build
        print_success "Build complete"
    else
        print_info "Using existing build (dist folder found)"
    fi
    
    # Verify build output
    if [ ! -f "dist/index.html" ]; then
        print_error "Build failed - index.html not found in dist/"
        exit 1
    fi
    print_success "index.html verified"
}

# Upload to S3
upload_to_s3() {
    print_header "Uploading to S3"
    
    # Upload assets with long cache
    print_info "Uploading static assets (with 1-year cache)..."
    
    if [ "$DRY_RUN" = "true" ]; then
        print_info "[DRY RUN] aws s3 sync dist/ s3://$BUCKET_NAME/ --delete --exclude '*.html'"
    else
        aws s3 sync dist/ s3://$BUCKET_NAME/ \
            --delete \
            --cache-control "public, max-age=31536000" \
            --exclude "*.html" \
            --exclude "error.html" \
            --exclude "index.html" \
            --region us-east-1
    fi
    print_success "Static assets uploaded"
    
    # Upload HTML with no cache
    print_info "Uploading HTML files (with no-cache)..."
    
    if [ "$DRY_RUN" = "true" ]; then
        print_info "[DRY RUN] aws s3 sync dist/ s3://$BUCKET_NAME/ --include '*.html' --delete"
    else
        aws s3 sync dist/ s3://$BUCKET_NAME/ \
            --cache-control "public, max-age=0, must-revalidate" \
            --include "*.html" \
            --delete \
            --region us-east-1
    fi
    print_success "HTML files uploaded"
    
    # List uploaded files
    print_info "Files in S3:"
    aws s3 ls s3://$BUCKET_NAME/ --recursive --region us-east-1 | tail -20
}

# Invalidate CloudFront cache
invalidate_cache() {
    print_header "Invalidating CloudFront Cache"
    
    if [ "$DRY_RUN" = "true" ]; then
        print_info "[DRY RUN] aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths '/*'"
    else
        INVALIDATION_ID=$(aws cloudfront create-invalidation \
            --distribution-id $DISTRIBUTION_ID \
            --paths "/*" \
            --query 'Invalidation.Id' \
            --output text)
        
        print_success "Invalidation created: $INVALIDATION_ID"
        print_info "Cache invalidation in progress (usually completes in 1-2 minutes)..."
    fi
}

# Verify deployment
verify_deployment() {
    print_header "Verifying Deployment"
    
    # Check S3 bucket size
    BUCKET_SIZE=$(aws s3 ls s3://$BUCKET_NAME/ --recursive --human-readable --summarize \
        --region us-east-1 | grep "Total Size" | awk '{print $3}')
    print_info "Total S3 bucket size: $BUCKET_SIZE"
    
    # Get file count
    FILE_COUNT=$(aws s3 ls s3://$BUCKET_NAME/ --recursive --region us-east-1 | wc -l)
    print_info "Total files in bucket: $FILE_COUNT"
    
    # Check CloudFront distribution status
    DIST_STATUS=$(aws cloudfront get-distribution \
        --id $DISTRIBUTION_ID \
        --query 'Distribution.Status' \
        --output text)
    print_info "CloudFront status: $DIST_STATUS"
    
    print_success "Deployment verified"
}

# Display summary
show_summary() {
    print_header "Deployment Complete!"
    
    echo ""
    echo "Deployment Summary:"
    echo "  S3 Bucket: $BUCKET_NAME"
    echo "  CloudFront Distribution: $DISTRIBUTION_ID"
    echo ""
    
    DISTRIBUTION_DOMAIN=$(aws cloudfront get-distribution \
        --id $DISTRIBUTION_ID \
        --query 'Distribution.DomainName' \
        --output text)
    
    echo "Access your site:"
    echo "  CloudFront: https://$DISTRIBUTION_DOMAIN"
    echo "  Custom domain: Check Route53 records"
    echo ""
    
    echo "Next steps:"
    echo "  1. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)"
    echo "  2. Visit your domain to verify"
    echo "  3. Monitor CloudWatch dashboard"
    echo "  4. Check email for any alerts"
    echo ""
    
    print_success "All done!"
}

# Main execution
main() {
    echo ""
    print_header "Advanced Lab Solutions - AWS Deployment"
    
    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --dry-run)
                DRY_RUN=true
                print_info "DRY RUN MODE - No changes will be made"
                shift
                ;;
            --bucket)
                BUCKET_NAME="$2"
                shift 2
                ;;
            --distribution)
                DISTRIBUTION_ID="$2"
                shift 2
                ;;
            --help)
                show_help
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # Run deployment steps
    check_prerequisites
    build_app
    upload_to_s3
    invalidate_cache
    verify_deployment
    show_summary
}

show_help() {
    cat << EOF
Advanced Lab Solutions - AWS Deployment Script

Usage: ./deploy.sh [OPTIONS]

Options:
    --bucket NAME           S3 bucket name (or set S3_BUCKET_NAME env var)
    --distribution ID       CloudFront distribution ID (or set CLOUDFRONT_DISTRIBUTION_ID env var)
    --dry-run               Show what would be done without making changes
    --help                  Show this help message

Environment Variables:
    S3_BUCKET_NAME              Name of S3 bucket
    CLOUDFRONT_DISTRIBUTION_ID  CloudFront distribution ID
    DRY_RUN                     Set to 'true' for dry-run mode

Examples:
    # Using environment variables
    export S3_BUCKET_NAME="my-bucket"
    export CLOUDFRONT_DISTRIBUTION_ID="E1234567890ABC"
    ./deploy.sh
    
    # Using command-line arguments
    ./deploy.sh --bucket my-bucket --distribution E1234567890ABC
    
    # Dry run mode
    ./deploy.sh --dry-run
    
    # Quick deploy with all options
    ./deploy.sh --bucket my-bucket --distribution E1234567890ABC

For more information, see README.md or aws/DEPLOYMENT_GUIDE.md
EOF
}

# Run main function
main "$@"
