module "unifeed_vpc_network" {
  source  = "terraform-google-modules/network/google"
  version = "13.0.0"

  project_id   = var.unifeed_gcp_project_id
  network_name = "unifeed-vpc-network"
  routing_mode = "GLOBAL"

  subnets = [
    {
      subnet_name           = "unifeed-private-subnet"
      subnet_ip             = "10.0.1.0/24"
      subnet_region         = var.unifeed_gcp_project_region
      subnet_private_access = true
      description           = "Private subnet for unifeed services"
    },
    {
      subnet_name           = "unifeed-public-subnet"
      subnet_ip             = "10.0.2.0/24"
      subnet_region         = var.unifeed_gcp_project_region
      subnet_private_access = false
      description           = "Public subnet for unifeed services"
    }
  ]

  routes = [{
    name                   = "egress-internet"
    description            = "route through IGW to access internet"
    destination_range      = "0.0.0.0/0"
    tags                   = "egress-inet"
    next_hop_internet      = "true"
  }]
}

resource "google_compute_router" "nat_router" {
  name    = "unifeed-nat-router"
  region  = var.unifeed_gcp_project_region
  network = module.unifeed_vpc_network.network_name
}

# module "nat" {
#   source  = "terraform-google-modules/cloud-nat/google"
#   version = "5.4.0"
#
#   project_id = var.unifeed_gcp_project_id
#   region     = var.unifeed_gcp_project_region
#
#   router = google_compute_router.nat_router.name
#
#   name                               = "unifeed-nat-config"
#   source_subnetwork_ip_ranges_to_nat = "LIST_OF_SUBNETWORKS"
#   subnetworks = [{
#     name                    = "unifeed-private-subnet"
#     source_ip_ranges_to_nat = ["ALL_IP_RANGES"]
#     secondary_ip_range_names = []
#   }]
# }