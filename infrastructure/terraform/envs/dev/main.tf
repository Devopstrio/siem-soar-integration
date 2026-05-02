module "siem_db" {
  source = "./modules/database"

  db_name = "siem_event_metadata"
}

module "soar_queue" {
  source = "./modules/redis"

  cluster_mode = false
}

module "security_monitoring" {
  source = "./modules/monitoring"

  retention_days = 365
}

resource "kubernetes_namespace" "security_ops" {
  metadata {
    name = "security-operations"
    labels = {
      "security.ops/managed" = "true"
    }
  }
}

resource "kubernetes_config_map" "siem_configs" {
  metadata {
    name      = "siem-global-configs"
    namespace = kubernetes_namespace.security_ops.metadata[0].name
  }

  data = {
    "correlation-window" = "60s"
    "bruteforce-limit"   = "5"
    "autoblock-enabled"  = "true"
  }
}
