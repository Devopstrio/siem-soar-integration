import sys
import time
from core.ingestion.engine import EventIngestionEngine, CorrelationEngine, DetectionEngine, PlaybookEngine

def run_siem_simulation():
    # 1. Initialize Engines
    ingestor = EventIngestionEngine()
    correlator = CorrelationEngine()
    detector = DetectionEngine()
    soar = PlaybookEngine()
    
    print("--- SIEM + SOAR Platform Simulation ---")
    
    # 2. Simulate Raw Log Ingestion
    raw_logs = [
        {"action": "LOGIN_FAILED", "src_ip": "192.168.45.12", "user": "root", "timestamp": "2026-05-02T09:30:01"},
        {"action": "LOGIN_FAILED", "src_ip": "192.168.45.12", "user": "root", "timestamp": "2026-05-02T09:30:05"},
        {"action": "LOGIN_FAILED", "src_ip": "192.168.45.12", "user": "root", "timestamp": "2026-05-02T09:30:10"},
        {"action": "LOGIN_FAILED", "src_ip": "192.168.45.12", "user": "root", "timestamp": "2026-05-02T09:30:15"},
        {"action": "LOGIN_FAILED", "src_ip": "192.168.45.12", "user": "root", "timestamp": "2026-05-02T09:30:20"},
        {"action": "S3_BUCKET_ACCESS", "src_ip": "1.2.3.4", "user": "attacker", "timestamp": "2026-05-02T09:30:25"},
    ]
    
    print(f"Ingested {len(raw_logs)} raw events from distributed sources.")
    
    # 3. Normalize & Detect
    events = [ingestor.normalize(log) for log in raw_logs]
    
    # 4. Correlation & Alerting
    alerts = correlator.correlate(events)
    
    print(f"\n[ALERTS] Correlation engine generated {len(alerts)} high-severity alerts.")
    
    for alert in alerts:
        print(f"  Alert: {alert['type']} | Severity: {alert['severity']} | Source: {alert['source_ip']}")
        
        # 5. SOAR Playbook Orchestration
        if alert["type"] == "BRUTEFORCE_ATTACK":
            playbook = {
                "name": "Intelligent Perimeter Block",
                "steps": [
                    {"action": "BLOCK_IP", "target_key": "source_ip"},
                    {"action": "NOTIFY_SEC_ADMIN", "channel": "PAGERDUTY"},
                    {"action": "OPEN_JIRA_INCIDENT", "priority": "P1"}
                ]
            }
            results = soar.execute_playbook(alert, playbook)
            print(f"  [SOAR] Playbook orchestration completed with {len(results)} actions.")

if __name__ == "__main__":
    run_siem_simulation()
