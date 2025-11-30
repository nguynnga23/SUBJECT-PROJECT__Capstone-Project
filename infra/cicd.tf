module "unifeed_artifact_registry_repository" {
  source  = "GoogleCloudPlatform/artifact-registry/google"
  version = "0.7.0"

  project_id    = var.unifeed_gcp_project_id
  location      = var.unifeed_gcp_project_region
  repository_id = "unifeed"
  format        = "DOCKER"
  description   = "Docker images repository for Unifeed application"
}

module "ghcr_proxy_artifact_registry_repository" {
  source  = "GoogleCloudPlatform/artifact-registry/google"
  version = "0.7.0"

  project_id    = var.unifeed_gcp_project_id
  location      = var.unifeed_gcp_project_region
  repository_id = "ghcr-proxy"
  format        = "DOCKER"
  mode          = "REMOTE_REPOSITORY"
  description   = "Proxy for GitHub Container Registry (ghcr.io)"

  remote_repository_config = {
    description = "Upstream: https://ghcr.io"

    docker_repository = {
      custom_repository = {
        uri = "https://ghcr.io"
      }
    }
  }
}