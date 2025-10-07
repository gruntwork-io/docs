locals {
  account_hcl       = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  state_bucket_name = local.account_hcl.locals.state_bucket_name

  region_hcl = read_terragrunt_config(find_in_parent_folders("region.hcl"))
  aws_region = local.region_hcl.locals.aws_region
}

remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite"
  }
  config = {
    bucket       = local.state_bucket_name
    region       = local.aws_region
    key          = "${path_relative_to_include()}/tofu.tfstate"
    encrypt      = true
    use_lockfile = true
  }
}

generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
provider "aws" {
  region = "${local.aws_region}"
}
EOF
}
