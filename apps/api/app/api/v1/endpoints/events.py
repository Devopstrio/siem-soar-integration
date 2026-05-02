from fastapi import APIRouter, Body
router = APIRouter()
@router.post('/ingest')
def ingest_events(data: dict = Body(...)):
    return {'status': 'INGESTED', 'event_id': 'evt-123'}
