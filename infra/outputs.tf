output "unifeed_vpc_network_name" {
  description = "The name of the VPC network for unifeed services"
  value       = module.unifeed_vpc_network.network_name
}

output "unifeed_vpc_private_subnet_self_link" {
  description = "The self link of the private subnet in the unifeed VPC network"
  value       = module.unifeed_vpc_network.subnets[0].self_link
}

output "unifeed_vpc_public_subnet_self_link" {
  description = "The self link of the public subnet in the unifeed VPC network"
  value       = module.unifeed_vpc_network.subnets[1].self_link
}

# output "unifeed_strapi_cms_postgresql_db_generated_password" {
#   description = "The password for the database user"
#   value       = random_password.unifeed_strapi_cms_postgresql_production_db_generated_password.result
#   sensitive   = true
# }

# output "unifeed_strapi_cms_postgresql_db_instance_connection_name" {
#   description = "The instance connection name for the Strapi CMS PostgreSQL database"
#   value       = module.unifeed_strapi_cms_postgresql_production_db.instance_connection_name
# }
#
# output "unifeed_strapi_cms_postgresql_db_private_ip_address" {
#   description = "The private IP address of the Strapi CMS PostgreSQL database"
#   value       = module.unifeed_strapi_cms_postgresql_production_db.private_ip_address
# }
#
# output "artifact_registry_repo_url" {
#   description = "The URL of the artifact registry repository"
#   value       = "${var.unifeed_gcp_project_id}.pkg.${var.unifeed_gcp_project_region}.artifactregistry.googleapis.com/docker/${module.unifeed_artifact_registry_repository.artifact_name}"
# }