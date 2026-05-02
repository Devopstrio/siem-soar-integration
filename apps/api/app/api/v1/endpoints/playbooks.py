from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_playbooks():
    return {'status': 'ok', 'component': 'playbooks'}
