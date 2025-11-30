module "unifeed_artifact_registry_repository" {
  source  = "GoogleCloudPlatform/artifact-registry/google"
  version = "0.7.0"

  project_id    = var.unifeed_gcp_project_id
  location      = var.unifeed_gcp_project_region
  repository_id = "unifeed"
  format        = "DOCKER"
  description   = "Docker images repository for Unifeed application"
}