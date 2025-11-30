variable "unifeed_gcp_project_id" {
  description = "The ID of the project in which to create resources."
  type        = string
}

variable "unifeed_gcp_project_region" {
  description = "The default region for resources."
  type        = string
  default     = "asia-southeast1"
}

variable "unifeed_github_repo_owner" {
  description = "The owner of the GitHub repository."
  type        = string
  default     = "nguynnga23"
}

variable "unifeed_github_repository_name" {
  description = "The name of the GitHub repository."
  type        = string
  default     = "SUBJECT-PROJECT__Capstone-Project"
}

variable "unifeed_deployment_environments" {
  description = "The deployment environment."
  type        = list(string)
  default     = ["production"]
  validation {
    condition     = alltrue([for env in var.unifeed_deployment_environments : contains(["production"], env)])
    error_message = "Only 'production' is allowed as deployment environment."
  }
}