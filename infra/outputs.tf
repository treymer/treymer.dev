output "website_bucket_name" {
  description = "S3 bucket name for website"
  value       = aws_s3_bucket.website.id
}

output "website_bucket_arn" {
  description = "S3 bucket ARN for website"
  value       = aws_s3_bucket.website.arn
}