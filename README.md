# treymer.dev

Personal site and engineering blog for Trey Mer.
Built with Next.js, hosted on AWS S3/CloudFront, deployed via GitHub Actions, infrastructure managed with Terraform.

**Live site:** [treymer.dev](https://treymer.dev)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, static export) |
| Styling | Tailwind CSS |
| Content | MDX |
| Hosting | AWS S3 + CloudFront |
| DNS | Cloudflare |
| SSL | AWS ACM |
| IaC | Terraform |
| CI/CD | GitHub Actions (OIDC, no access keys) |

---

## Infrastructure Bootstrap (One-Time Manual Setup)

These resources are created manually via AWS CLI **once** before Terraform is initialized.
They cannot be managed by Terraform because they store Terraform's own state.

### Terraform State Bucket
```bash
aws s3api create-bucket \
  --bucket treymer-dev-terraform-state \
  --region us-west-2 \
  --create-bucket-configuration LocationConstraint=us-west-2

aws s3api put-bucket-versioning \
  --bucket treymer-dev-terraform-state \
  --versioning-configuration Status=Enabled

aws s3api put-bucket-encryption \
  --bucket treymer-dev-terraform-state \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'

aws s3api put-public-access-block \
  --bucket treymer-dev-terraform-state \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

### Terraform State Lock Table (DynamoDB)
```bash
aws dynamodb create-table \
  --table-name treymer-dev-terraform-locks \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-west-2
```

---

## Local Development

### Prerequisites
- Node.js 20+ (via NVM)
- Terraform (via tfenv)
- AWS CLI v2 configured with us-west-2
- Cursor or VS Code

### Run locally
```bash
npm install
npm run dev
```

Site runs at `http://localhost:3000`

### Write a new blog post
1. Create a new `.mdx` file in `src/content/blog/`
2. Add frontmatter: `title`, `date`, `category`, `description`
3. Write your post in Markdown
4. Push to main — CI/CD deploys automatically

---

## Infrastructure

All infrastructure is defined as code in `/infra`.
```bash
cd infra
terraform init
terraform plan
terraform apply
```

---

## CI/CD Pipeline

On every push to `main`:
1. GitHub Actions triggers
2. Next.js static build runs
3. AWS credentials assumed via OIDC (no access keys stored)
4. `/out` directory synced to S3
5. CloudFront cache invalidated

---

## Project Structure
```
treymer.dev/
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD pipeline
├── infra/
│   ├── main.tf               # S3, CloudFront, ACM, IAM
│   ├── variables.tf
│   ├── outputs.tf
│   └── backend.tf            # Remote state config
├── src/
│   ├── app/                  # Next.js App Router pages
│   ├── components/           # Reusable React components
│   └── content/
│       └── blog/             # MDX blog posts
├── public/                   # Static assets
└── README.md
```