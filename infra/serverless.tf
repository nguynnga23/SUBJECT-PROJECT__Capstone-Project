resource "google_cloud_run_v2_service" "changedetection_io_service" {
  name     = "changedetection-io-service"
  location = var.unifeed_gcp_project_region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    scaling {
      min_instance_count = 1
      max_instance_count = 1
    }

    containers {
      image = "ghcr.io/dgtlmoon/changedetection.io:latest"
      resources {
        limits = {
          cpu    = "2"
          memory = "1024Mi"
        }
        cpu_idle = false
      }
      ports {
        container_port = 5000
      }
      args = [
        "-v=datastore-volume:/datastore",
        "--name=changedetection.io",
      ]
    }

    vpc_access {
      network_interfaces {
        network    = module.unifeed_vpc_network.network_name
        subnetwork = module.unifeed_vpc_network.subnets["${var.unifeed_gcp_project_region}/cr-egress-subnet"].id
      }
      egress = "PRIVATE_RANGES_ONLY"
    }
  }

  depends_on = [google_project_service.apis]
}