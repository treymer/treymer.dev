output "website_bucket_name" {
  description = "S3 bucket name for website"
  value       = aws_s3_bucket.website.id
}

output "website_bucket_arn" {
  description = "S3 bucket ARN for website"
  value       = aws_s3_bucket.website.arn
}

output "acm_certificate_arn" {
  description = "ACM certificate ARN"
  value       = aws_acm_certificate.website.arn
}

output "acm_validation_records" {
  description = "DNS validation records to add to Cloudflare"
  value       = aws_acm_certificate.website.domain_validation_options
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.website.id
}

output "cloudfront_domain_name" {
  description = "CloudFront domain name"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "github_actions_role_arn" {
  description = "IAM role ARN for GitHub Actions - add to GitHub secrets"
  value       = aws_iam_role.github_actions.arn
}