resource "google_project_service" "apis" {
  for_each = toset([
    "run.googleapis.com",
    "compute.googleapis.com",
    "artifactregistry.googleapis.com",
    "serviceusage.googleapis.com"
  ])
  service            = each.key
  disable_on_destroy = false
}