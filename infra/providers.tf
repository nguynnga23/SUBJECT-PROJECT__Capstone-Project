terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 7.12.0"
    }

    github = {
      source  = "integrations/github"
      version = "~> 6.8.3"
    }
  }
}

provider "google" {
  project = var.unifeed_gcp_project_id
  region  = var.unifeed_gcp_project_region
}

# provider "github" {
#   owner = var.unifeed_github_repo_owner
# }