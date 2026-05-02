from typing import List, Dict
from datetime import datetime

class CaseManagementSystem:
    """Manages the lifecycle of security incidents and investigations."""
    
    def create_case(self, alert: Dict[str, Any]):
        return {
            "case_id": f"CASE-{datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:8]}",
            "title": f"Investigation: {alert['type']}",
            "severity": alert["severity"],
            "status": "OPEN",
            "assigned_to": None,
            "evidence": [alert],
            "created_at": datetime.utcnow().isoformat()
        }

class ResponseActionSim:
    """Simulates automated response actions in infrastructure."""
    
    def block_ip(self, ip: str):
        return {"action": "BLOCK_IP", "target": ip, "status": "SUCCESS"}

    def disable_account(self, username: str):
        return {"action": "DISABLE_ACCOUNT", "target": username, "status": "SUCCESS"}

    def isolate_host(self, hostname: str):
        return {"action": "ISOLATE_HOST", "target": hostname, "status": "SUCCESS"}
