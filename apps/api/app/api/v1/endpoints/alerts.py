from fastapi import APIRouter, Body
router = APIRouter()
@router.get('/')
def list_alerts():
    return {'alerts': [{'id': 'alt-1', 'type': 'BRUTEFORCE', 'severity': 'HIGH'}]}
@router.post('/respond')
def respond_to_alert(data: dict = Body(...)):
    return {'status': 'RESPONDED', 'action': 'BLOCK_IP'}
