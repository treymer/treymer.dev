variable "aws_region" {
  description = "Primary AWS region"
  type        = string
  default     = "us-west-2"
}

variable "domain_name" {
  description = "Primary domain name"
  type        = string
  default     = "treymer.dev"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "treymer-dev"
}