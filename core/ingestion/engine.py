import json
import uuid
import time
from typing import List, Dict, Any, Optional
from datetime import datetime

class EventIngestionEngine:
    """Ingests and normalizes raw log data into security events."""
    
    def normalize(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "event_id": str(uuid.uuid4()),
            "timestamp": raw_data.get("timestamp", datetime.utcnow().isoformat()),
            "source": raw_data.get("source", "UNKNOWN"),
            "category": raw_data.get("category", "GENERAL"),
            "src_ip": raw_data.get("src_ip"),
            "dst_ip": raw_data.get("dst_ip"),
            "user": raw_data.get("user"),
            "action": raw_data.get("action"),
            "raw": raw_data
        }

class CorrelationEngine:
    """Detects patterns across multiple events to identify potential threats."""
    
    def __init__(self):
        self.active_sessions = {}

    def correlate(self, events: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        alerts = []
        # Rule: Bruteforce Detection (5+ failed logins from same IP in 60s)
        ip_failures = {}
        for event in events:
            if event["action"] == "LOGIN_FAILED" and event["src_ip"]:
                ip = event["src_ip"]
                ip_failures[ip] = ip_failures.get(ip, 0) + 1
                if ip_failures[ip] >= 5:
                    alerts.append({
                        "type": "BRUTEFORCE_ATTACK",
                        "severity": "HIGH",
                        "source_ip": ip,
                        "description": f"Detected 5+ failed login attempts from {ip}",
                        "timestamp": datetime.utcnow().isoformat()
                    })
        return alerts

class DetectionEngine:
    """Analyzes normalized events for specific threat signatures or anomalies."""
    
    def detect(self, event: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        # Rule: Tor Access Detection
        if event.get("src_ip") == "1.2.3.4": # Simulated Tor Exit Node
            return {
                "type": "SUSPICIOUS_IP_ACCESS",
                "severity": "MEDIUM",
                "description": f"Access from known Tor exit node: {event['src_ip']}",
                "event_id": event["event_id"]
            }
        return None

class PlaybookEngine:
    """Orchestrates automated response actions based on alerts."""
    
    def execute_playbook(self, alert: Dict[str, Any], playbook_template: Dict[str, Any]):
        print(f"[SOAR] Executing Playbook: {playbook_template['name']} for Alert: {alert['type']}")
        results = []
        for step in playbook_template["steps"]:
            action = step["action"]
            target = alert.get(step.get("target_key", "source_ip"))
            print(f"  [ACTION] {action} on {target}...")
            results.append({"action": action, "status": "COMPLETED", "target": target})
        return results

if __name__ == "__main__":
    ingestor = EventIngestionEngine()
    correlator = CorrelationEngine()
    detector = DetectionEngine()
    soar = PlaybookEngine()
    
    # 1. Simulate Raw Logs
    raw_logs = [
        {"action": "LOGIN_FAILED", "src_ip": "192.168.1.50", "user": "admin"} for _ in range(6)
    ]
    
    # 2. Ingest & Normalize
    events = [ingestor.normalize(log) for log in raw_logs]
    
    # 3. Detect & Correlate
    alerts = correlator.correlate(events)
    
    print(f"--- SIEM Threat Detection Report ---")
    for alert in alerts:
        print(f"[{alert['severity']}] {alert['type']}: {alert['description']}")
        
        # 4. SOAR Response
        if alert["type"] == "BRUTEFORCE_ATTACK":
            playbook = {
                "name": "Block Attacker IP",
                "steps": [
                    {"action": "BLOCK_IP", "target_key": "source_ip"},
                    {"action": "NOTIFY_SOC", "channel": "SLACK"}
                ]
            }
            soar.execute_playbook(alert, playbook)
