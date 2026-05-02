from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_cases():
    return {'status': 'ok', 'component': 'cases'}
