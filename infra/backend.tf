terraform {
  backend "s3" {
    bucket         = "treymer-dev-terraform-state"
    key            = "treymer.dev/terraform.tfstate"
    region         = "us-west-2"
    dynamodb_table = "treymer-dev-terraform-locks"
    encrypt        = true
  }
}