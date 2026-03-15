terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Second provider for us-east-1
# Required for ACM certs used by CloudFront
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}